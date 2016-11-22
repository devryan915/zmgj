define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#pr', //绑定范围
		data: {
			par: {
				erId: '', //   '721638FDE7CE48368999BA3BB7FFDF6B',
				pageIndex: 0,
				pageSize: 8
			},
			isUp: true,
			pageCount: 0,
			list: [],
			o: {
				SelfRank: 0
			},

		},
		methods: {
			load: function() {
				var self = this;
				app.post('api/Events/GetRankInfo', self.par, function(data) {
					self.pageCount = data.Total;
					if(self.par.pageIndex == 1) {
						self.o.SelfRank = data.SelfRank || 0;
					}
					if(self.isUp) {
						self.list = self.list.concat(data.Items);
					} else {
						self.list = data.Items;
						mui('#pr').pullRefresh().refresh(true);
					}
					mui('#pr').pullRefresh().endPullupToRefresh((self.par.pageIndex >= self.pageCount));
					app.closeWaiting();
				}, function() {
					mui('#pr').pullRefresh().endPullupToRefresh(false)
					app.closeWaiting();
				});
			}
		},
		created: function() {
			var self = this;
			mui.init({
				pullRefresh: {
					container: '#pr',
					up: {
						contentrefresh: '正在加载...',
						contentnomore: '已加载全部',
						callback: function() {
							self.par.pageIndex++;
							self.load();
						}
					}
				}
			});
		},
		ready: function() {
			var self = this;
			//			mui.ready(function() {
			//				self.par.pageIndex = 0;
			//				mui('#pr').pullRefresh().pullupLoading();
			//			});
			//页面第一次绑定完成执行 
			mui.plusReady(function() {

				window.addEventListener('reload', function(e) {
					self.par.erId = e.detail.ref.id;
					//					self.o.Title = e.detail.title;
					self.par.pageIndex = 0;
					//					self.load(); 
					mui('#pr').pullRefresh().pullupLoading();

				});
				window.addEventListener('unload', function(e) {
					self.list = [];
					mui('#pr').pullRefresh().refresh(true);
//					app.showWaiting(1);
				});
				var wc = plus.webview.currentWebview();
				if(wc.ref) {
					self.par.erId = wc.ref.id;
					self.par.pageIndex = 0;
					setTimeout(function() {
						mui('#pr').pullRefresh().pullupLoading();
					}, 1000)
				}
			});
		}
	});
});