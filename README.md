# img-lazyload
a light &amp; tiny image lazyload script with no dependancy

## todo
> * load different image according to different retina screen
> * add the image loaded callback

## use
```javascript
<img class="lazyload" data-src="./w375.jpg" alt="">
...
window.addEventListener('load', function(e) {
   lazyload({
       lazyClass: '.lazyload',
       lazyAttr: 'data-src'
   });
}, false);
```