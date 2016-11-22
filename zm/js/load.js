/**
 * options{
 * 	aniClass:引用animation
 * 	selector:动画作用的元素选择器
 * }
 * 
 */define("load",[],function(){this.show=function(a){var b=a&&a.aniClass||"fadeIn";if(a=document.querySelectorAll(a&&a.selector||".mui-content"))for(var c=0;c<a.length;c++){var d=a[c];d.classList.remove("mui-hidden");d.classList.add("animated");d.classList.add(b)}};this.hide=function(a){if(a=document.querySelectorAll(a&&a.selector||".mui-content"))for(var b=0;b<a.length;b++)a[b].classList.add("mui-hidden")};return{show:this.show,hide:this.hide}});