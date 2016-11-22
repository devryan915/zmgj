define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				qty: 1,
				shopID: undefined,
			},
			tprice: '1马币',
			data: {
				Prc: undefined,
				NImgUrl: undefined,
				ClubName: undefined,
				ShopName: undefined,
				Qty: 0,
				Tprice: '',
				Oid: '',
			},
			isCommit: undefined, //订单是否提交了
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
				self.par.shopID = self.data.ShopID;
				//				console.log(self.data.Prc + ' ' + self.par.qty + ' ' + (self.par.qty * self.data.Prc));
				self.tprice = (self.par.qty * self.data.Prc) + '马币';
				app.loadImg();
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				mui('.buyop').on('tap', '.buy-add', function() {
					if(self.data.Prc) {
						self.par.qty++;
						self.tprice = (self.par.qty * self.data.Prc) + '马币';
					}
				});
				mui('.buyop').on('tap', '.buy-minus', function() {
					if(self.data.Prc && self.par.qty > 1) {
						self.par.qty--;
						self.tprice = (self.par.qty * self.data.Prc) + '马币';
					}
				});
				mui('.footer').on('tap', 'button', function() {
					if(self.isCommit) {
						mui.toast('订单已提交');
						return;
					}
					app.showWaiting();
					app.post('api/Ride/AddOrder', self.par, function(data) {
						if(data) {
							self.isCommit = true;
							self.data.Qty = self.par.qty;
							self.data.Tprice = self.tprice;
							self.data.Oid = data;
							app.openPage("../rider/paybill.html", "rider_paybill", self.data, function(w) {});
						}
						app.closeWaiting();
					}, function() {
						app.closeWaiting();
					});

				});
				if(!mui.os.plus) {
					mui.toast('muiReady' + app.getQueryString('ref.type'));
				}
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					self.data = undefined;
					self.isCommit = false;
					self.initpage(e.detail.ref);
				});
				window.addEventListener('unload', function(e) {

				});
				var wc = plus.webview.currentWebview();
				self.initpage(wc.ref);
			});
		}
	});
});