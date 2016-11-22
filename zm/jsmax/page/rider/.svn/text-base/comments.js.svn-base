define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
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
					pullRefresh: {
						container: '#app',
						up: {
							contentrefresh: '正在加载...',
							callback: function() {
								var se = this;
								if(self.list && self.list.length < 1) {
									self.par.pageIndex = 0;
								}
								self.par.pageIndex++;
								app.post('api/Posting/GetSpecailPosts', self.par, function(data) {
									if(self.par.pageIndex == 1) {
										self.list = data.Items;
										self.par.oldMD5 = data.Other.Other;
										self.oUser = data.Other;
									} else {
										self.par.oldMD5 = '';
										self.list = self.list.concat(data.Items);
									}
									mui('#app').pullRefresh().endPullupToRefresh(self.par.pageIndex >= data.Pages);
									app.loadImg();
									app.ellipsisToggle();
									mui.toast(self.par.pageIndex + '/' + data.Pages);
								}, function() {
									self.par.pageIndex--;
									mui('#app').pullRefresh().endPullupToRefresh(false);
								});
							}
						}
					}
				});
				if(!mui.os.plus) {
					mui.toast('muiReady' + app.getQueryString('ref.type'));
				}
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {});
				window.addEventListener('unload', function(e) {});
				var wc = plus.webview.currentWebview();
				mui.toast('plusReady' + wc.ref.type);
			});
		}
	});
});