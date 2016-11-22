define(['app', 'mui', 'vue'], function(app, mui, vue) {

	var vm = new vue({
		el: '#pr', //绑定范围
		data: {

			par: {
				isUp: 0,
				newsType: 1
			},
			up: 0,
			lower: 0,
			Pages: 0,
			list: [], 
		},
		methods: {
			load: function() {
				var self = this;
				app.post('api/News/GetNewsPage', self.par, function(data) {
					if(self.par.isUp == 0 && self.lower == 0) {
						self.up = data.UID;
						app.Cache.setObject(app.Cache.key.cnewsData.toKeyName(), data.Items);
						self.list = [];
					}
					self.lower = data.LID;

					self.list = self.list.concat(data.Items);

					mui('#pr').pullRefresh().endPullupToRefresh((self.lower == -1))
				}, function() {
					mui('#pr').pullRefresh().endPullupToRefresh(false)
				}); 
			},

		},
		created: function() {
			var self = this;
			var data = app.Cache.getArray(app.Cache.key.cnewsData.toKeyName());
			self.list = data || [];
			mui.init({
				pullRefresh: {
					container: '#pr',
					up: {
						contentrefresh: '正在加载...',
						contentnomore: '已加载全部',
						callback: function() {
							self.par.idx = self.lower;
							self.load();
						}
					}
				},

			});
			mui.ready(function() {
				if(mui.os.plus) {
					mui.plusReady(function() {
						setTimeout(function() {
							mui('#pr').pullRefresh().pullupLoading();
						}, 1000);
					});
				} else {
					mui.ready(function() {
						mui('#pr').pullRefresh().pullupLoading();
					});
				}
			});
		},
		ready: function() { 
			mui.plusReady(function() { 
				mui('#news').on('tap', 'li', function() {
					var el = this;
					var w = plus.webview.getWebviewById('wnews_detail'); 
					if(w) {
						mui.fire(w, 'reload', {
							ref: {
								id: el.dataset.id,
								title: el.dataset.title,
							}
						}), w.show('slide-in-right');
					} else {
						w = mui.preload({
							url: '../news/detail.html',
							id: 'wnews_detail',
							styles: {
								popGesture: 'hide'
							},
							extras: {
								ref: {
									id: el.dataset.id,
									title: el.dataset.title,
								}
							}
						}); 
						w.show('slide-in-right');
						w.addEventListener('hide', function() {
							mui.fire(w, 'unload', { });
						}); 
					}

				});
			});

		}
	});
});