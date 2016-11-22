/**
 * options{
 * 	aniClass:引用animation
 * 	selector:动画作用的元素选择器
 * }
 * 
 */
define("load", [],
	function() {
		//		var head = document.getElementsByTagName('head')[0];
		//		var prefetch = document.createElement('link');
		//		prefetch.setAttribute('rel', 'stylesheet');
		//		prefetch.setAttribute('href', '../../css/animation.css');
		this.show = function(options) {
			var aniClass = (options && options.aniClass) || 'fadeIn';
			var selector = (options && options.selector) || '.mui-content';
			var aniEL = document.querySelectorAll(selector)
				//			console.log(selector);
				//			console.log(aniClass);
			if(aniEL) {
				for(var i = 0; i < aniEL.length; i++) {
					var el = aniEL[i];
					el.classList.remove('mui-hidden');
					el.classList.add('animated');
					el.classList.add(aniClass);
				}
				//				aniEL.each(function(el) {
				//					el.classList.remove('mui-hidden');
				//					el.classList.add('animated');
				//					el.classList.add(aniClass);
				//				});
			}
		};
		this.hide = function(options) {
			var selector = (options && options.selector) || '.mui-content';
			var aniEL = document.querySelectorAll(selector)
				//console.log(aniEL);
				//console.log(aniClass);
			if(aniEL) {
				for(var i = 0; i < aniEL.length; i++) {
					var el = aniEL[i];
					el.classList.add('mui-hidden');
				}
				//				aniEL.each(function(el) {
				//					el.classList.add('mui-hidden');
				//				});
			}
		};
		return {
			show: this.show,
			hide: this.hide,
		};
	}
);