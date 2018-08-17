/*
* author: "oujizeng",
* license: "MIT",
* github: "https://github.com/yangyuji/img-lazyload",
* name: "lazyload.js",
* version: "1.3.1"
*/

(function (root, factory) {
    if (typeof module != 'undefined' && module.exports) {
        module.exports = factory();
    } else if (typeof define == 'function' && define.amd) {
        define(function () {
            return factory();
        });
    } else {
        root['lazyload'] = factory();
    }
}(this, function () {
    'use strict'

    function lazyload(opts) {
        var win = window,
            doc = document,
            imgs = doc.querySelectorAll(opts.lazyClass);

        if (imgs.length <= 0 || !opts.lazyAttr) return;

        // throttle scroll and resize
        win.addEventListener('scroll', scroller, false);
        win.addEventListener('resize', scroller, false);
        scroller();

        function scroller() {
            requestAnimationFrame(inView);
        }

        function inView() {
            var offsetY = win.pageYOffset,
                offsetB = offsetY + win.innerHeight,
                hasLazy = false,
                cRect, imgTop, imgBottom,
                i = 0;

            while (i < imgs.length) {
                if (imgs[i].hasAttribute(opts.lazyAttr)) {
                    hasLazy = true;

                    cRect = imgs[i].getBoundingClientRect();
                    imgTop = offsetY + cRect.top;
                    imgBottom = imgTop + cRect.height;
                    if (offsetY < imgBottom && offsetB > imgTop) {
                        loadImg(imgs[i]);
                    }
                }
                i++;
            }

            if (!hasLazy) {
                destroy();
            }
        }

        function loadImg(img) {
            var src = img.getAttribute(opts.lazyAttr);
            if (src) {
                img.setAttribute('src', src);
                img.removeAttribute(opts.lazyAttr);
                if (typeof opts.lazyLoaded === 'function') {
                    // image loaded callback
                    img.addEventListener('load', function () {
                        opts.lazyLoaded(img);
                    }, false);
                }
            }
        }

        function destroy() {
            // remove scroll and resize listener
            win.removeEventListener("scroll", scroller, false);
            win.removeEventListener("resize", scroller, false);
            imgs = [];
        }
    }

    return lazyload;
}));