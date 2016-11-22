define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			data: {
				ShopID: undefined,
				Prc: undefined,
				NImgUrl: undefined,
				ClubName: undefined,
				ShopName: undefined,
				Qty: 0,
				Tprice: '',
				Oid: '',
			},
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
				mui('.mui-scroll').on('tap', '.rider-selitem', function() {
					var id = this.dataset.id;
					self.data.ShopID=id;
				});
				mui('.footer').on('tap', 'button', function() {
					app.openPage("../rider/reservation.html", "rider_reservation", self.data, function(w) {});
				});
//				if(!mui.os.plus) {
//					mui.toast('muiReady' + app.getQueryString('ref.type'));
//				}
//				app.toggleActive('rider-selitem');
			});
			mui.plusReady(function() {
				app.pageLoaded();
				window.addEventListener('reload', function(e) {});
				window.addEventListener('unload', function(e) {});
				var wc = plus.webview.currentWebview();
			});
		}
	});
});