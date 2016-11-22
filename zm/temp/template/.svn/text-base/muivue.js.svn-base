define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			data: {

			},
			par: {

			},
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
			},
			initpage: function(ref) {
				var self = this;
				self.data = ref;
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				//				mui('.footer').on('tap', 'button', function() {
				//					app.showWaiting();
				//					app.post('api/Ride/PayOrder', self.par,
				//						function(data) {
				//							app.closeWaiting();
				//						},
				//						function() {
				//							app.closeWaiting();
				//						});
				//				});
				//				if(!mui.os.plus) {
				//					mui.toast('muiReady' + app.getQueryString('ref.type'));
				//				}
				//				app.openPage("../rider/reservation.html", "rider_reservation", self.data, function(w) {});
				//				mui.openWindow({
				//							url: '../pub/yylive.html',
				//							id: 'pub_yylive'
				//						});
			});
			mui.plusReady(function() {
				app.pageLoaded();
				var curPageView = plus.webview.currentWebview();
				self.initpage(curPageView.ref);
				window.addEventListener('reload', function(e) {
					self.initpage(e.detail.ref);
				});
				window.addEventListener('unload', function(e) {
					app.closeWaiting();
				});
			});
		}
	});
});