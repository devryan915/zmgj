define(['app', 'mui', 'vue', 'mui.pullToRefresh', 'mui.pullToRefresh.material'], function(app, mui, vue, mp, mpm) {
	var pageHorseEdit = null;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			pageData: {

			},
			serverData: {
				Total: 0,
				Items: [],
			},
			reqPar: {
				pageIndex: 0,
				pageSize: 12
			},
		},
		computed: {

		},
		methods: {
			detail: function(v) {
				var self = this;
				var ID = v.dataset.id;
				var page;
				if (mui.plus) {
					page = plus.webview.getWebviewById('horseinfo');
				}
				if (page) {
					//触发详情页面的riderid事件
					mui.fire(page, 'horseID', {
						horseID: ID,
						pageType: 2
					});
					//打开详情页面          
					mui.openWindow({
						id: 'horseinfo',
					});
				} else {
					mui.openWindow({
						id: 'horseinfo',
						url: '../match/horseinfo.html',
						extras: {
							horseID: ID,
							pageType: 2
						},
						show: {
							aniShow: false
						},
						waiting: {
							autoShow: false
						}
					});
				}
			},
			add: function() {
				if (pageHorseEdit) {
					//暂不提供新增功能 
					return;
					//触发详情页面的riderid事件
					mui.fire(pageHorseEdit, 'editHorse', {
						pageType: 1,
						horseData: null,
					});
					//打开详情页面          
					mui.openWindow({
						id: 'me_addhorse',
					});
				}
				//				mui.openWindow({
				//					id: 'addhorse',
				//					url: 'addhorse.html',
				//					show: {
				//						aniShow: false
				//					},
				//					waiting: {
				//						autoShow: false
				//					}
				//				});
			},
			refreshData: function(el) {
				var self = this;
				var mpl = document.querySelector("#prHorses .mui-pull-loading");
				if (!el) {
					self.reqPar.pageIndex = 1;
					self.serverData.Total = 1;
				}
				var noMore = self.reqPar.pageIndex == self.serverData.Total;
				//console.log(self.reqPar.pageIndex + ' ' + self.serverData.Total);
				if (self.reqPar.pageIndex <= self.serverData.Total) {
					app.post('api/User/GetMyHorse', self.reqPar, function(data) {
							self.serverData.Total = data.Total;
							noMore = self.reqPar.pageIndex == self.serverData.Total;
							self.reqPar.pageIndex++;
							//console.log(self.reqPar.pageIndex + ' ' + self.serverData.Total);
							if (self.isStrokeUp) {
								self.serverData.Items = self.serverData.Items.concat(data.Items);
								el && el.endPullUpToRefresh();
							} else {
								self.serverData.Items = data.Items;
								el.endPullDownToRefresh();
								el.refresh(true);
							}
							if (el) {
								el.endPullUpToRefresh(noMore);
							} else {
								if (noMore) {
									mpl.innerHTML = self.serverData.Items && self.serverData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
								}
							}
							app.loadImg();
							app.closeWaiting();
						},
						function() {
							el && (el.endPullDownToRefresh(), el.endPullUpToRefresh());
						});
				} else {
					el && el.endPullUpToRefresh(noMore);
					mpl.innerHTML = self.serverData.Items && self.serverData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
				}
			},
			load: function() {
				var self = this;

				//				var testData;
				//				var Total = 3;
				//				testData = '{"Total":' + Total + ',"Items":[';
				//				for (i = 0; i < Total; i++) {
				//					testData += '{"HorseID":"HorseID' + i + '","ImgUrl":"../../img/me/me_userhead.jpg","Name":"Name' + i + '","Sex":"雌性","Blood":"Blood' + i + '"},';
				//				}
				//				testData = testData.substr(0, testData.length - 1);
				//				var tempd = JSON.parse(testData + ']}');
				//				self.serverData = tempd;

				self.reqPar.pageIndex = 1;
				self.serverData.Total = 1;
				self.serverData.Items = [];
				self.isStrokeUp = true;
				self.refreshData();
			},
		},
		ready: function() {
			var self = this;
			self.load();
			mui('#myhorses').on('tap', 'li[data-id]', function() {
				var parData = this;
				self.detail(parData);
			});

			//页面第一次绑定完成执行 
			mui.ready(function() {
				pageHorseEdit = mui.preload({
					id: 'me_addhorse',
					url: 'addhorse.html',
					styles: {
						popGesture: 'hide'
					}
				});

				/* 获得元素的位置信息 */
				mui('.mui-scroll-wrapper').scroll({
					scrollY: true, //是否竖向滚动
					scrollX: false, //是否横向滚动
					startX: 0, //初始化时滚动至x
					startY: 0, //初始化时滚动至y
					indicators: true, //是否显示滚动条
					deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
					bounce: true //是否启用回弹
				});
				mui('#prHorses').pullToRefresh({
					down: {
						callback: function() {
							self.reqPar.pageIndex = 1;
							self.serverData.Total = 1;
							self.isStrokeUp = false;
							self.refreshData(this);
						}
					},
					up: {
						contentnomore: '已加载全部',
						callback: function() {
							self.isStrokeUp = true;
							self.refreshData(this);
						}
					}
				});

			});
			mui.plusReady(function() {});
		}
	});
});