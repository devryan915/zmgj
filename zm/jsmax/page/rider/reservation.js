define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				resnum: 1,
			},
			selDate: undefined,
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
			initpage: function(ref) {
				var self = this;
				self.data = ref;
				app.loadImg();
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
				mui('.buyop').on('tap', '.buy-add', function() {
					self.par.resnum++;
				});
				mui('.buyop').on('tap', '.buy-minus', function() {
					self.par.resnum--;
				});
				mui('.reservation-date').on('tap', 'li', function() {
					var el = this;
					mui.toast(el.dataset.id);
					if(self.selDate) {
						self.selDate.classList.remove('seldate');
					}
					self.selDate = el;
					self.selDate.classList.add('seldate');
				});
				mui('.footer').on('tap', 'button', function() {
					app.openWin("../rider/creservation.html", "rider_creservation", {
						type: 'reservation',
					}, function(w) {});
				}, function(w) {});
			});
			mui.plusReady(function() {
				var wc = plus.webview.currentWebview();
				self.initpage(wc.ref);
				window.addEventListener('reload', function(e) {
					self.initpage(e.detail.ref);
				});
				window.addEventListener('unload', function(e) {});
				app.pageLoaded();
			});
		}
	});
});