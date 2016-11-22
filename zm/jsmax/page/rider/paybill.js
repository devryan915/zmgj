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
			goFirstPage: function() {
				//					var oldback = mui.back;
				//					mui.back = function() {
				//						//							var curPage = plus.webview.currentWebview();
				//						//							curPage.canBack(function(e) {
				//						//								console.log(e.canBack);
				//						//							});
				//						//mui.js 2635 name: 'mui',index: 5,     2666 name: '5+',index: 10,    2590 name: 'browser',index: 100,
				//						console.log(mui.hooks["backs"][2].handle);
				//						var oldHandleBrowser = mui.hooks["backs"][2].handle;
				//						mui.hooks["backs"][2].handle = function() {
				//							if(window.history.length > 4) {
				//								window.history.back(-4);
				//								return true;
				//							}
				//							return false;
				//						};
				//						oldback();
				//						mui.hooks["backs"][2].handle = oldHandleBrowser;
				//					};
				var curPage = plus.webview.currentWebview();
				var parentPage = plus.webview.getWebviewById(curPage.ref.parentPageID);
				for(var i = 0; i < 4; i++) {
					if(parentPage) {
						console.log(parentPage.id);
						parentPage.hide();
						parentPage = plus.webview.getWebviewById(parentPage.ref.parentPageID);
					}
				}

			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				self.paytipel = document.querySelector('.mui-backdrop');
				mui('.footer').on('tap', 'button', function() {
					app.showWaiting();
					app.post('api/Ride/PayOrder', self.par,
						function(data) {
							self.paytipel.classList.remove('mui-hidden');
							app.closeWaiting();
						},
						function() {
							app.closeWaiting();
						});
				});

				mui('.mui-backdrop').on('tap', 'button', function() {
					var el = this;
					if(el.dataset.type == '0') {
						//返回首页
						//						window.history.back(-4);
						//						app.openWin("../rider/index.html", "wrider_list", {
						//							type: 'cbill',
						//						}, function(w) {});
						self.goFirstPage();
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