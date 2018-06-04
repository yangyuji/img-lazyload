/*
* author: "oujizeng",
* license: "MIT",
* name: "lazyload.js",
* version: "1.1.0"
*/

(function (root, factory) {
    if (typeof module != 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        root['lazyload'] = factory();
    }
}(this, function () {
    'use strict'

    var utils = {
        // 节流函数
        throttle: function (method, delay, duration) {
            var timer = null;
            var begin = new Date();
            return function () {
                var context = this,
                    args = arguments;
                var now = new Date();
                clearTimeout(timer);
                if(now - begin >= duration) {
                    method.apply(context, args);
                    begin = now;
                } else {
                    timer = setTimeout(function() {
                        method.apply(context, args);
                    }, delay);
                }
            }
        }
    }

    var lazyload = {

        init: function() {
            var win = window,
                doc = document,
                dpr = win.devicePixelRatio || 1,
                clientHeight = win.innerHeight || doc.documentElement.clientHeight || win.screen.availHeight;

            //被iframe引用时，禁止缩放
            dpr = win.top === win.self ? dpr : 1;

            // 获取懒加载图片
            var imgs = doc.querySelectorAll('img.lazyload');
            // 桥接，方便销毁
            var detect = utils.throttle(lazyLoad, 0, 1000/60);
            // 执行一次
            detect();

            // 绑定 scroll 和 resize
            win.addEventListener('scroll', detect, false);
            win.addEventListener('resize', detect, false);

            // 懒加载方法
            function lazyLoad () {
                [].forEach.call(imgs, function (img) {
                    if (dpr >= 2) {
                        var src = img.getAttribute('data-2x');
                    } else {
                        var src = img.getAttribute('data-src');
                    }
                    if (src) {
                        var bound = img.getBoundingClientRect();
                        if (bound.top < clientHeight * 1.2) {
                            img.setAttribute('src', src);
                            img.removeAttribute('data-src');
                            img.removeAttribute('data-2x');
                            // fadeIn显示
                            img.addEventListener('load' , function() {
                                img.classList.add('lazyloaded');
                            }, false);
                        }
                    }
                });
                //完成所有替换后注销事件
                [].every.call(imgs, function (img) {
                    return !img.getAttribute('data-src')
                }) && (win.removeEventListener("scroll", detect, false),
                    win.removeEventListener("resize", detect, false));
            }
        }
    }

    return lazyload;
}));