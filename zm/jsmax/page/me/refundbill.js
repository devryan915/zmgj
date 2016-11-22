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
			par: {
				oid: '',
			},
			user: app.User.get(),
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
				self.par.oid = self.data.Oid;
				app.loadImg();
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				self.paytipel = document.querySelector('.mui-backdrop');
				mui('.footer').on('tap', 'button', function() {
					app.showWaiting();
					//					app.post('api/Ride/PayOrder', self.par,
					//						function(data) {
					self.paytipel.classList.remove('mui-hidden');
					app.closeWaiting();
					//						},
					//						function() {
					//							app.closeWaiting();
					//						});
				});
				mui('.mui-backdrop').on('tap', 'button', function() {
					var el = this;
					if(el.dataset.type == '0') {
						app.openWin("../rider/index.html", "wrider_list", {
							type: 'cbill',
						}, function(w) {});
						self.paytipel.classList.add('mui-hidden');
					} else if(el.dataset.type == '1') {
						app.openPage("../rider/reservation.html", "rider_reservation", self.data, function(w) {});
						self.paytipel.classList.add('mui-hidden');
					}
				});
				if(!mui.os.plus) {
					mui.toast('muiReady' + app.getQueryString('ref.type'));
				}
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					self.initpage(e.detail.ref);
				});
				window.addEventListener('unload', function(e) {
					app.closeWaiting();
					self.paytipel.classList.add('mui-hidden');
				});
				var wc = plus.webview.currentWebview();
				self.initpage(wc.ref);
				//				mui.toast('plusReady' + wc.ref.type);
				app.pageLoaded();
			});
		}
	});
});