define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var popNotice = document.querySelector('.pop-backdrop');
	var popNoticeCont = document.querySelector('.pop-backdrop div');
	var vm = new vue({
		el: 'body',
		data: {

			par: {
				eType: 2,
				pageSize: 5,
				lastDate: '',
				lastEId: ''
			},
			o: {
				Banners: [],
			},
			isUp: true,
			list: []
		},
		methods: {
			close: function() {
				popNotice && popNotice.classList.add('mui-hidden');
			},
			load: function() {
				var self = this;
				app.post('api/Events/GetEvents', self.par, function(data) {
					if(self.par.lastEId == '') {
						self.up = data.UID;
						self.o.Banners = data.Banners;
					}
					self.par.lastEId = data.lastEId;
					self.par.lastDate = data.lastDate;

					self.list = self.list.concat(data.Items);

					mui('#pr').pullRefresh().endPullupToRefresh((self.par.lastEId == -1));
					app.closeWaiting();
					app.loadImg();
				}, function() {
					app.showError(function() {
						app.showWaiting(1);
						self.load();
					});
					app.closeWaiting();
					//					mui('#pr').pullRefresh().endPullupToRefresh(false)
					//					app.closeWaiting();
				});
			},

		},
		created: function() {

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
							self.par.idx = self.lower;
							self.load();
						}
					}
				},
			});
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
			//页面第一次绑定完成执行 
			mui.ready(function() {
				var h = document.getElementById("img1").offsetHeight;
				document.getElementById("sliderBanner").style.height = h + 'px'
					//			document.getElementById("slider").style.height = 'calc(100% - ' + h + 'px)';
				setTimeout(function() {
					self.o.Banners.length > 1 && mui("#sliderBanner").slider({
						interval: 5000
					});
				}, 2000);

				mui('#ulList').on('tap', 'li', function() {
					var self = this;
					var par = {
						eventId: self.dataset.id
					};
					switch(self.dataset.clicktype) {
						case '1':
							var ref = {
								ref: {
									id: self.dataset.id,
									index: 0,
									title: self.dataset.title,
								}
							};
							var w = plus.webview.getWebviewById('wactivity_detail');
							if(w) {
								mui.fire(w, 'reload', ref), w.show('slide-in-right');
							} else {
								w = mui.preload({
									url: '../activity/detail.html',
									id: 'wactivity_detail',
									styles: {
										popGesture: 'hide'
									},
									extras: ref,
								});
								w.show('slide-in-right');
								w.addEventListener('hide', function() {
									mui.fire(w, 'unload', {});
								});
							}
							//							mui.os.plus && (mui.fire(page, 'reload', {
							//								ref: {
							//									id: self.dataset.id,
							//									index: 0,
							//									title: self.dataset.title,
							//								}
							//							}), page.show('pop-in'));
							break;
						case '2':
							app.post('api/Events/GetEventDes', par, function(data) {
								popNoticeCont.innerHTML = data.Content;
								popNotice && popNotice.classList.remove('mui-hidden');
							});
							break;
						default:
							break;
					}

				});
			});
		}
	});
});