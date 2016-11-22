define(['app', 'mui', 'vue', 'mui.previewimage', 'mui.zoom', 'mui.pullToRefresh', 'mui.pullToRefresh.material', ], function(app, mui, vue) {

	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			parList: [{
				par: {
					city: '',
					lat: '',
					lng: '',
					rideType: '', //产品类型 1 休闲 2 野外 3 卡 
					orderByType: 0, //价格排序 0 无 1  升序  2 倒序
					SortType: 1,
					pageIndex: 0,
					pageSize: 10,
				},
				list: []
			}, {
				par: {
					city: '',
					lat: '',
					lng: '',
					rideType: '', //产品类型 1 休闲 2 野外 3 卡
					orderByType: 0, //价格排序 0 无 1  升序  2 倒序
					SortType: 2,
					pageIndex: 0,
					pageSize: 10,
				},
				list: []
			}, {
				par: {
					city: '',
					lat: '',
					lng: '',
					rideType: '', //产品类型 1 休闲 2 野外 3 卡
					orderByType: 0, //价格排序 0 无 1  升序  2 倒序
					SortType: 3,
					pageIndex: 0,
					pageSize: 10,
				},
				list: []
			}],
			selectTabIndex: 0,
			city: '',
			slider: {},
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
			},
			initPar: function(ref) {
				var self = this;
				self.city = ref.city;
				self.parList[0].par.city = ref.city;
				self.parList[0].par.lat = ref.lat;
				self.parList[0].par.lng = ref.lng;
				if(ref.rideType) {
					self.parList[0].par.rideType = ref.rideType;
					self.parList[1].par.rideType = ref.rideType;
					self.parList[2].par.rideType = ref.rideType;
				}
				self.parList[1].par.city = ref.city;
				self.parList[1].par.lat = ref.lat;
				self.parList[1].par.lng = ref.lng;

				self.parList[2].par.city = ref.city;
				self.parList[2].par.lat = ref.lat;
				self.parList[2].par.lng = ref.lng;
			},
			pickcity: function() {
				var self = this;
				app.openPage("../rider/pickcity.html", "rider_pickcity", {}, function(w) {});
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
				document.getElementById("slider").addEventListener('slide', function(e) {
					try {
						self.selectTabIndex = e.detail.slideNumber;
						if(!self.slider['slider' + self.selectTabIndex]) {
							self.slider['slider' + self.selectTabIndex] = true;
							mui(".mui-slider-group .mui-scroll").pullToRefresh()[self.selectTabIndex].pullUpLoading();
						}
					} catch(e) {}
				});
				mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
					mui(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var se = this;
								self.parList[index].par.pageIndex = 1;
								app.post('api/Ride/GetItems', self.parList[index].par, function(data) {
									//增量更新
									if(data.Items && data.Items.length > 0) {
										self.parList[index].list = data.Items;
										se.refresh(true);
										se.endPullDownToRefresh();
										se.endPullUpToRefresh(self.parList[index].par.pageIndex >= data.Pages);
										app.loadImg();
										app.ellipsisToggle();
										mui.toast(self.parList[index].par.pageIndex + '/' + data.Pages);
									} else {
										//										se.endPullDownToRefresh();
										//										mui.toast('已经是最新数据了');
									}
								}, function() {
									self.parList[index].par.pageIndex--;
									se.endPullDownToRefresh();
								});
							}
						},
						up: {
							//auto: index == 1,
							auto: false,
							callback: function() {
								var se = this;
								if(self.parList[index].list && self.parList[index].list.length < 1) {
									self.parList[index].par.pageIndex = 0;
								}
								self.parList[index].par.pageIndex++;
								app.post('api/Ride/GetItems', self.parList[index].par, function(data) {
									if(self.parList[index].par.pageIndex == 1) {
										self.parList[index].list = data.Items;
									} else {
										self.parList[index].list = self.parList[index].list.concat(data.Items);
									}
									se.endPullUpToRefresh(self.parList[index].par.pageIndex >= data.Pages);
									app.loadImg();
									app.ellipsisToggle();
									mui.toast(self.parList[index].par.pageIndex + '/' + data.Pages);
								}, function() {
									self.parList[index].par.pageIndex--;
									se.endPullUpToRefresh(false);
									//									se.refresh(true);
								});
							}
						}
					});
				});
				if(!mui.os.plus) {
					mui.toast('muiReady' + app.getQueryString('ref.type'));
				}
				mui('.mui-slider-group').on('tap', '.rider-item', function() {
					var el = this;
					var ref = plus.webview.currentWebview().ref;
					app.openPage("../rider/itemdetail.html", "rideritemdetail", {
						shopID: el.dataset.id,
						city: ref.city,
						lat: ref.lat,
						lng: ref.lng,
					}, function(w) {});
				});
				mui('header').on('tap', '.mui-title', function() {
					self.pickcity();
				});

			});
			mui.plusReady(function() {
				app.pageLoaded();
				var wc = plus.webview.currentWebview();
				self.initPar(wc.ref);
				window.addEventListener('reload', function(e) {
					self.initPar(e.detail.ref);
					mui(".mui-slider-group .mui-scroll").pullToRefresh()[self.selectTabIndex].pullDownLoading();
				});
				window.addEventListener('unload', function(e) {
					//						setTimeout(function() {
					var slider = mui(".mui-slider").slider();
					//					slider.refresh();
					//					slider.nextItem();
					slider.gotoItem(0, 0);
					//						}, 500);
					self.slider['slider0'] = undefined;
					self.slider['slider1'] = undefined;
					self.slider['slider2'] = undefined;
					self.slider['slider' + self.selectTabIndex] = undefined;
					self.parList[0].list = [];
					self.parList[1].list = [];
					self.parList[2].list = [];
				});
				self.slider['slider0'] = true;
				mui(".mui-slider-group .mui-scroll").pullToRefresh()[0].pullDownLoading();
			});
		}
	});
});