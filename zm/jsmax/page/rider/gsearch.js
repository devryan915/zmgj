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
						//						down: {
						//							callback: pulldownRefresh
						//						},
						up: {
							contentrefresh: '正在加载...',
							callback: function() {
								setTimeout(function() {
									mui.toast('上拉刷新');
									mui('#app').pullRefresh().endPullupToRefresh(false);
								}, 1000);

								var se = this;
								if(self.list && self.list.length < 1) {
									self.par.pageIndex = 0;
								}
								self.par.pageIndex++;
								app.post('api/Posting/GetSpecailPosts', self.par, function(data) {
									for(var i = 0; i < data.Items.length; i++) {
										var post = data.Items[i];
										var v = post.IssDT;
										var diffValue = 999999;
										if(v) {
											v = v.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
											v.lastIndexOf('.') > 0 && (v = v.substring(0, v.lastIndexOf('.')));
											diffValue = new Date() - new Date(v);
										}
										post.CantRevoke = (self.user.UserID == post.UserID && diffValue <= 1000 * 60 * 10) ? "" : "mui-hidden";
									}
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
							},
						}
					},
				});
				//				app.openWin("../rider/paybill.html", "rider_paybill", {
				//					type: 'cbill',
				//				}, function(w) {});
				if(!mui.os.plus) {
					mui.toast('muiReady' + app.getQueryString('ref.type'));
				}
				mui('#frmSearch').on('tap', '.mui-icon-clear', function() {
					mui.toast('clear data');
				}, false);
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					mui.toast('plusReady' + e.detail.ref.type);
				});
				window.addEventListener('unload', function(e) {});
				var wc = plus.webview.currentWebview();
				mui.toast('plusReady' + wc.ref.type);
			});
		}
	});
});