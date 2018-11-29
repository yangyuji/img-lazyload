/**
* author: "oujizeng",
* license: "MIT",
* github: "https://github.com/yangyuji/img-lazyload",
* name: "lazyload.js",
* version: "2.0.0"
*/

(function (root, factory) {
    if (typeof module != 'undefined' && module.exports) {
        module.exports = factory();
    } else if (typeof define == 'function' && define.amd) {
        define(function () {
            return factory();
        });
    } else {
        root['lazyLoad'] = factory();
    }
}(this, function () {
    'use strict'

    function lazyLoad(opts) {
        this.options = {
            lazyClass: opts.lazyClass || '.lazyload',
            lazyAttr: opts.lazyAttr || 'data-src',
            lazyLoaded: opts.lazyLoaded || null
        };
        this.LazyLoadImages = document.querySelectorAll(this.options.lazyClass);
        this.init();
    }

    lazyLoad.prototype = {
        version: '2.0.0',
        init: function () {
            if (this.LazyLoadImages.length <= 0)
                return;
            // throttle scroll and resize
            this.scroller = this._scroller.bind(this);
            window.addEventListener('scroll', this.scroller, false);
            window.addEventListener('resize', this.scroller, false);
            // run first
            this._scroller();
        },
        // 动态添加的图片执行update方法
        update: function () {
            this.LazyLoadImages = document.querySelectorAll(this.options.lazyClass);
            this._scroller();
        },
        destroy: function () {
            // remove scroll and resize listener
            window.removeEventListener("scroll", this.scroller, false);
            window.removeEventListener("resize", this.scroller, false);
            this.LazyLoadImages = [];
        },
        _scroller: function () {
            requestAnimationFrame(this._inView.bind(this));
        },
        _inView: function () {
            var offsetY = window.pageYOffset,
                offsetB = offsetY + window.innerHeight,
                hasLazy = false,
                cRect, imgTop, imgBottom,
                i = 0;

            while (i < this.LazyLoadImages.length) {
                if (this.LazyLoadImages[i].hasAttribute(this.options.lazyAttr)) {
                    hasLazy = true;

                    cRect = this.LazyLoadImages[i].getBoundingClientRect();
                    imgTop = offsetY + cRect.top;
                    imgBottom = imgTop + cRect.height; // 图片要设置高度100%，否则图片加载前高度是0
                    if ((offsetY < imgBottom && offsetB > imgTop)) {
                        if (this.LazyLoadImages[i].tagName.toUpperCase() == 'IMG')
                            this._loadImg(this.LazyLoadImages[i], this.options);
                        else
                            this._loadDiv(this.LazyLoadImages[i], this.options);
                    }
                }
                i++;
            }

            if (!hasLazy) {
                this.destroy.call(this);
            }
        },
        _loadImg: function (img, opts) {
            var src = img.getAttribute(opts.lazyAttr);
            if (src) {
                img.setAttribute('src', src);
                img.removeAttribute(opts.lazyAttr);
                img.addEventListener('load', function () {
                    opts.lazyLoaded(img);
                }, false);
            }
        },
        _loadDiv: function (div, opts) {
            var src = div.getAttribute(opts.lazyAttr);
            if (src) {
                div.style.backgroundImage = 'url(' + src + ')';
                div.removeAttribute(opts.lazyAttr);
                var tmp = new Image();
                tmp.setAttribute('src', src);
                tmp.addEventListener('load', function () {
                    opts.lazyLoaded(div);
                }, false);
            }
        }
    }

    return lazyLoad;
}));