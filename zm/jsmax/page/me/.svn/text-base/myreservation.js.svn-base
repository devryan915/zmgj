define(['app', 'mui', 'vue', 'mui.pullToRefresh', 'mui.pullToRefresh.material'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			parList: [{
				par: {
					postType: 1,
					pageIndex: 0,
					pageSize: 10,
					oldMD5: ''
				},
				list: []
			}, {
				par: {
					postType: 3,
					pageIndex: 0,
					pageSize: 10,
					oldMD5: ''
				},
				list: []
			}, {
				par: {
					postType: 2,
					pageIndex: 0,
					pageSize: 10,
					oldMD5: ''
				},
				list: []
			}],
			selectTabIndex: 1,
			selectItem: {
				listindex: -1,
				index: 0,
			},
		},
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
				});
				var slider = {
					slider1: false
				};
				document.getElementById("slider").addEventListener('slide', function(e) {
					try {
						self.selectTabIndex = e.detail.slideNumber;
						//console.log(self.selectTabIndex);
						if(!slider['slider' + self.selectTabIndex]) {
							slider['slider' + self.selectTabIndex] = true;
							mui(".mui-slider-group .mui-scroll").pullToRefresh()[self.selectTabIndex].pullUpLoading();
						}
					} catch(e) {}
				});
				mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
					mui(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var se = this;
								self.user = app.User.get();
								self.parList[index].par.pageIndex = 1;
								app.post('api/Posting/GetPosts', self.parList[index].par, function(data) {
									self.user = app.User.get();
									//增量更新
									if(data.Items && data.Items.length > 0) {
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
										self.parList[index].list = data.Items;
										self.parList[index].par.oldMD5 = data.Other;
										se.refresh(true);
										se.endPullDownToRefresh();
										se.endPullUpToRefresh(self.parList[index].par.pageIndex >= data.Pages);
										app.loadImg();
										app.ellipsisToggle();
										mui.toast(self.parList[index].par.pageIndex + '/' + data.Pages);
									} else {
										for(var i = 0; i < self.parList[index].list.length; i++) {
											var post = self.parList[index].list[i];
											var v = post.IssDT;
											var diffValue = 999999;
											if(v) {
												v = v.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
												v.lastIndexOf('.') > 0 && (v = v.substring(0, v.lastIndexOf('.')));
												diffValue = new Date() - new Date(v);
											}
											post.CantRevoke = (self.user.UserID == post.UserID && diffValue <= 1000 * 60 * 10) ? "" : "mui-hidden";
										}
										se.endPullDownToRefresh();
										mui.toast('已经是最新数据了');
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
								app.post('api/Posting/GetPosts', self.parList[index].par, function(data) {
									self.user = app.User.get();
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
									if(self.parList[index].par.pageIndex == 1) {
										self.parList[index].list = data.Items;
										self.parList[index].par.oldMD5 = data.Other;
									} else {
										self.parList[index].par.oldMD5 = '';
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
				//				app.openWin("../rider/paybill.html", "rider_paybill", {
				//					type: 'cbill',
				//				}, function(w) {});
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