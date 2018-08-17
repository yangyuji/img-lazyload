# img-lazyload
a light &amp; tiny image lazyload script

## todo
> * load different image according to different retina screen

## use
```javascript
<img class="lazyload" data-src="./w375.jpg" alt="">
...
window.addEventListener('load', function(e) {
   lazyload({
       lazyClass: '.lazyload',
       lazyAttr: 'data-src',
       lazyLoaded: function (img) {
           img.classList.add('lazyloaded');
       }
   });
}, false);
```

## preview
> * page [click here](https://yangyuji.github.io/img-lazyload/demo.html)
> * ![qrcode](https://github.com/yangyuji/img-lazyload/blob/master/qrcode.png)