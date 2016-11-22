define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {},
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

			});
			mui.plusReady(function() {
				//				app.pageLoaded();
				//				var curpage = plus.webview.currentWebview();
				//				mui.back = function() {
				//					mui.toast("退出直播");
				//					plus.webview.currentWebview().close();
				//				};
				//				window.addEventListener('reload', function(e) {
				//
				//				});
				//				window.addEventListener('unload', function(e) {
				//					try {
				//						mui.toast('unload');
				//					} catch(e) {
				//						//TODO handle the exception
				//					}
				//				});
				//				self.scanQRCode();
			});
		}
	});
});