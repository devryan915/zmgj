define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				search: '',
				pageIndex: 0,
				pageSize: 10
			},
			list: []
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
				app.post('api/Posting/GetPageSearch', self.par, function(data) {
					self.pageCount = data.Pages;
					self.list = self.list.concat(data.Items);
					app.loadImg();
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh((self.par.pageIndex >= self.pageCount));
				}, function() {
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh(false)
				});
			}
		},
		ready: function() {
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
			mui.ready(function() {
				setTimeout(function() {
					self.par.pageIndex = 0;
					mui('#pr').pullRefresh().pullupLoading()
				}, 1000)
				document.getElementById("frmSearch").onsubmit = function() {
					self.list = [];
					self.par.pageIndex = 0;
					mui('#pr').pullRefresh().pullupLoading()
					return false
				}
				mui('#pr').on('tap', '.y-attention', function() {
					var el = this;
					var isattention = el.dataset.isattention == 'true';
					var ur = isattention ? 'api/Posting/DeleteFocusUser' : 'api/Posting/AddFocusUser';
					app.post(ur, {
						userID: el.dataset.userid
					}, function(data) {
						el.innerText = isattention ? '+ 关注' : '取消关注';
						el.dataset.isattention = (!isattention).toString()
							//						el.disabled = true;
					});
				});
			});
		}

	});

});