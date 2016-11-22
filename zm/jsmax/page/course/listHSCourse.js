define(['app', 'mui', 'vue', 'mui.pullToRefresh', 'mui.pullToRefresh.material', 'load'], function(app, mui, vue, mp, mpm, ld) {
	app.showWaiting(1);
	var headImage = document.getElementById('headImage');
	headImage.onload = function() {
		var content = document.querySelector('.mui-content');
		content.style.marginTop = (headImage.offsetHeight + 5) + 'px';
	};
	headImage.src = "http://chorse-sports.ufile.ucloud.com.cn/sys/indexlist/listhorseskill_banner.png";
	var page;
	var vm = new vue({
		el: 'body', //绑定范围
		data: {
			serverData: {
				Count: 0,
				NewItem: null,
				UID: 1,
				LID: -1,
				Items: [],
			},
			reqPar: {
				idx: -1,
				newsType: 10,
				isNeedNew: 'true',
				search: '',
				pageSize: 5
			},
			ptr: null,
			urlStr: 'api/News/GetNewsPageV2',
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
			goSearch: function() {
				page = plus.webview.getWebviewById('index_listsearch') || mui.preload({
					url: '../index/listsearch.html',
					id: 'index_listsearch',
					styles: {
						popGesture: 'hide'
					}
				});
				mui.fire(page, 'pageType', {
					pageType: 3,
				});
			},
			pullupRefresh: function() {
				var self = this;
				var hasMore = self.serverData.LID > -1;
				//				mui('#pullrefresh').pullRefresh().endPullupToRefresh(hasMore);
				//如果有数据或者重新加载
				//				app.showWaiting(1);
				app.post(self.urlStr, self.reqPar, function(data) {
						self.serverData.Count = data.Count;
						if(self.reqPar.isNeedNew == 'true') {
							self.serverData.NewItem = data.NewItem;
							self.reqPar.isNeedNew = 'false';
							ld.show({
								aniClass: 'fadeIn', //rollIn
								selector: '.mui-content',
							});
						}
						self.serverData.UID = data.UID;
						self.serverData.LID = data.LID;
						hasMore = self.serverData.LID > -1;
						self.serverData.Items = self.serverData.Items.concat(data.Items);
						//						mui('#pullrefresh').pullRefresh().endPullupToRefresh(hasMore);
						self.ptr.endPullUpToRefresh(!hasMore);
						app.loadImg();
						app.closeWaiting();
					},
					function() {
						self.ptr.endPullUpToRefresh(!hasMore);
						app.showError(function() {
							app.showWaiting(1);
							self.pullupRefresh();
						});
						app.closeWaiting();
					});
			},
			loadData: function(up) {
				var self = this;
				var hasMore = self.serverData.LID > -1;
				//如果有数据或者重新加载
				if(hasMore || (!hasMore && !up)) {
					//					app.showWaiting();
					app.post(self.urlStr, self.reqPar, function(data) {
							self.serverData.Count = data.Count;
							self.reqPar.isNeedNew == 'true' && (self.serverData.NewItem = data.NewItem);
							self.serverData.UID = data.UID;
							self.serverData.LID = data.LID;
							hasMore = self.serverData.LID > -1;
							if(up) {
								self.serverData.Items = self.serverData.Items.concat(data.Items);
								self.ptr.endPullUpToRefresh(!hasMore);
								app.log('上拉加载成功');
							} else {
								self.serverData.Items = data.Items;
								self.ptr.endPullDownToRefresh();
								self.ptr.refresh(true);
								app.log('下拉刷新成功');
							}
							app.loadImg();
							//							app.closeWaiting();
						},
						function() {
							up ? (self.ptr.endPullUpToRefresh(!hasMore) || app.log('上拉发生异常')) : (self.ptr.endPullDownToRefresh() || app.log('下拉发生异常'));
							//							app.closeWaiting();
						});
				} else {
					//					up ? self.ptr.endPullUpToRefresh(hasMore) : self.ptr.endPullDownToRefresh();
					self.ptr.endPullUpToRefresh(!hasMore)
					app.log('没有数据了');
				}
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				page = mui.preload({
					url: '../index/listsearch.html',
					id: 'index_listsearch',
					styles: {
						popGesture: 'hide'
					}
				});

				//阻尼系数
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: true,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});
				self.ptr = mui('.mui-scroll').pullToRefresh({
					//					down: {
					//						height: 75,
					//						callback: function() {
					//							self.reqPar.idx = -1;
					//							self.reqPar.isNeedNew = 'true';
					//							self.loadData(false);
					//						}
					//					},
					up: {
						auto: true,
						offset: 100, //距离底部高度(到达该高度即触发)
						show: true,
						contentdown: '上拉显示更多',
						contentrefresh: '正在加载...',
						contentnomore: '没有更多数据了',
						callback: function() {
							self.reqPar.idx = self.serverData.LID;
							//							self.reqPar.isNeedNew = 'false';
							//							self.loadData(true);
							self.pullupRefresh();
						}
					}
				});
				//				self.ptr.pullDownLoading();
				//				ld.show();
				mui('.mui-scroll').on('tap', '.mem-star', function() {
					self.detail(this);
				});
				mui('.mui-scroll').on('tap', '.mem-item', function() {
					self.detail(this);
				});
			});
			mui.plusReady(function() {});
		}
	});
});