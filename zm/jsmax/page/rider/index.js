define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			curcity: '',
			par: {
				lat: '',
				city: '',
				strCon: '',
				lng: '',
				pageIndex: '1',
				pageSize: '99999',
			},
			firstLoad: '0',
			lstatus: '0', //定位状态
			idxlist: [],
		},
		computed: {

		},
		methods: {
			detail: function(el) {
				var w = plus.webview.getWebviewById('wnews_detail');
				var d = el.dataset.data ? JSON.parse(el.dataset.data) : {};
				if(w) {
					mui.fire(w, 'reload', {
						ref: d
					}), w.show('slide-in-right');
				} else {
					w = mui.preload({
						url: '../news/detail.html',
						id: 'wnews_detail',
						styles: {
							popGesture: 'hide'
						},
						extras: {
							ref: d
						}
					});
					w.show('slide-in-right');
					w.addEventListener('hide', function() {
						mui.fire(w, 'unload', {});
					});
				}
			},
			load: function() {
				var self = this;
				if(self.lstatus == '1') {
					app.post('api/Ride/GetFirstPage', self.par, function(data) {
						self.idxlist = data.Clubs.Items;
						app.loadImg();
						app.closeWaiting();
					}, function() {
						app.closeWaiting();
						self.idxlist || app.showError(function() {
							app.showWaiting(1, 1);
							self.load();
						}, 1);
					});
				}
			},
			pickcity: function() {
				var self = this;
				app.openPage("../rider/pickcity.html", "rider_pickcity", {}, function(w) {});
			},
			locate: function() {
				var self = this;
				self.lstatus = '0';
				self.curProvince = '正在定位...';
				plus.geolocation.getCurrentPosition(function(addr) {
					self.par.lat = addr.coords.latitude;
					self.par.city = addr.address.city;
					self.par.lng = addr.coords.longitude;
					self.curcity = addr.address.city;
					self.lstatus = '1';
					self.load();
					if(self.firstLoad == '0') {
						self.firstLoad = 1;
					}
				}, function(e) {
					self.curProvince = '定位失败(' + e.message + ')';
					self.pickcity();
				}, {
					provider: 'baidu'
				});
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
				//				mui.back = function() {
				//					if(mui.os.plus) {
				//						var top = plus.webview.getTopWebview();
				//						plus.webview.close(top);
				//					}
				//				};
				mui('.mui-bar-tab').on('tap', '.mui-tab-item', function() {
					var el = this;
					if(el.dataset.type == '4') {
						app.fExpect();
						return;
					}
					//					mui.openWindow({
					//						url: '../../temp/p01/main.html',
					//						id: 'temp_main',
					//						styles: {
					//							top: "10px", //新页面顶部位置
					//							bottom: "10px", //新页面底部位置
					//							width: "80%", //新页面宽度，默认为100%
					//							height: "80%", //新页面高度，默认为100%
					//						},
					//						extras: {},
					//						createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					//						show: {
					//							autoShow: true, //页面loaded事件发生后自动显示，默认为true
					//							aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
					//							duration: 100, //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					//						},
					//						waiting: {
					//							autoShow: true, //自动显示等待框，默认为true
					//							title: '正在加载...', //等待对话框上显示的提示内容
					//							options: {
					//								width: "100px", //等待框背景区域宽度，默认根据内容自动计算合适宽度
					//								height: "100px", //等待框背景区域高度，默认根据内容自动计算合适高度
					//							}
					//						},
					//					});
					//					mui.openWindow({
					//						url: 'http://act.3g.yy.com/outEmbed/tttest?src=21',
					//						id: 'rider_live',
					//						styles: {
					//							top: "10px", //新页面顶部位置
					//							bottom: "10px", //新页面底部位置
					//							width: "80%", //新页面宽度，默认为100%
					//							height: "80%", //新页面高度，默认为100%
					//						},
					//						extras: {},
					//						createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					//						show: {
					//							autoShow: true, //页面loaded事件发生后自动显示，默认为true
					//							aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
					//							duration: 100, //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					//						},
					//						waiting: {
					//							autoShow: true, //自动显示等待框，默认为true
					//							title: '正在加载...', //等待对话框上显示的提示内容
					//							options: {
					//								width: "100px", //等待框背景区域宽度，默认根据内容自动计算合适宽度
					//								height: "100px", //等待框背景区域高度，默认根据内容自动计算合适高度
					//							}
					//						},
					//					});
					app.openPage("../rider/list.html", "rider_list", {
						lat: self.par.lat,
						city: self.par.city,
						lng: self.par.lng,
						rideType: el.dataset.type,
					});
				});
				mui('.mui-content').on('tap', '.mem-item', function() {
					self.detail(this);
				});
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					if(e.detail.ref.parentPageID == 'rider_pickcity') {
						self.par.lat = undefined;
						self.par.city = e.detail.ref.city;
						self.par.lng = undefined;
						self.curcity = e.detail.ref.city;
						self.lstatus = '1';
						app.showWaiting(1, 1);
						self.load();
					} else {
						if(self.lstatus == '0') {
							self.locate();
						}
					}
				});
				var oldback = mui.back;
				mui.back = function() {
					var curPage = plus.webview.currentWebview();
					curPage.canBack(function(e) {
						console.log(e.canBack);
					});
					//mui.js 2635 name: 'mui',index: 5,     2666 name: '5+',index: 10,    2590 name: 'browser',index: 100,
					console.log(mui.hooks["backs"][1].name);
					//					for(var i in mui.hooks["backs"][1].handle) {
					//						console.log(i);
					//					}
					//					mui.doAction("backs");
					oldback();
				};
				window.addEventListener('unload', function(e) {
					var curPage = plus.webview.currentWebview();
					curPage.canBack(function(e) {

					});
				});
				self.locate();
				app.pageLoaded();

			});
		}
	});
});