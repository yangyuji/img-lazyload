# img-lazyload
移动端图片懒加载的基本实现，可以在此基础上丰富。

## 实现技术
> * 原生js实现，无依赖；

## 特点
> * 代码非常小，只有几十行，简单易懂，方便进行扩展和修改；
> * 无依赖，这样就可以用于任何地方了；
> * 支持根据用户端devicePixelRatio加载不同尺寸的图片；

## 待做功能
> * 向上滚动懒加载；
> * 增加一些回调钩子；

## 使用方法
```javascript
<img class="lazyload" data-src="./w375.jpg" data-2x="./w750.jpg" alt="">
...
document.addEventListener('DOMContentLoaded', function(e) {
   lazyload.init();
}, false);
```