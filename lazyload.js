/*
* author: "oujizeng",
* license: "MIT",
* github: "https://github.com/yangyuji/img-lazyload",
* name: "lazyload.js",
* version: "1.3.0"
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
            var wT = win.pageYOffset,
                wB = wT + win.innerHeight,
                hasLazy = false,
                cRect, pT, pB, i = 0;

            while (i < imgs.length) {
                cRect = imgs[i].getBoundingClientRect();
                pT = wT + cRect.top;
                pB = pT + cRect.height;

                if (imgs[i].hasAttribute(opts.lazyAttr)) {
                    hasLazy = true;

                    if (wT < pB && wB > pT) {
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
                // fadeIn display
                img.addEventListener('load', function () {
                    img.classList.add('lazyloaded');
                }, false);
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