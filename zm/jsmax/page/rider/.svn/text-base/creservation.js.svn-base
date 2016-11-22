define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				resnum: 1,
			},
			selDate: undefined,
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});
				mui.init({
					gestureConfig: {
						//开启长按功能
					},
				});
				//				app.openWin("../rider/paybill.html", "rider_paybill", {
				//					type: 'cbill',
				//				}, function(w) {});
				if(!mui.os.plus) {
					mui.toast('muiReady' + app.getQueryString('ref.type'));
				}
				var paytipel = document.querySelector('.mui-backdrop');
				mui('.footer').on('tap', 'button', function() {
					paytipel.classList.remove('mui-hidden');
				});
				mui('.mui-backdrop').on('tap', 'button', function() {
					var el = this;
					if(el.dataset.type == '0') {
						//						if(mui.os.plus) {
						//							var top = plus.webview.getTopWebview();
						//							plus.webview.close(top);
						//							mui.toast(top.getURL());
						//						}
						app.openWin("../rider/index.html", "wrider_list", {
							type: 'cbill',
						}, function(w) {});
					}
				});
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {});
				window.addEventListener('unload', function(e) {});
				var wc = plus.webview.currentWebview();
				mui.toast('plusReady' + wc.ref.type);
			});
		}
	});
});