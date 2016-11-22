define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				eventId: '',
				pageIndex: 0,
				pageSize: 15
			},
			isUp: true,
			pageCount: 0,
			list: [],
			parReview: {
				eventId: '',
				content: ''
			},
			ui: {
				h: document.getElementById("h"),
				txtAsk: document.getElementById("txtAsk"),
				footer: document.getElementById("footer"),
				content: document.querySelector(".mui-content"),
				txtFocus: function() {
					var self = this;
					self.txtAsk.focus();
					setTimeout(function() {
						self.txtAsk.focus();
					}, 150);
					self.h.style.width = self.txtAsk.offsetWidth + 'px';
				},

			}
		},
		computed: {
			isValid: function() {
				return !!this.parReview.content
			}
		},
		methods: {
			load: function() {
				var self = this;
				app.post('api/Events/GetDiscussInfo', self.par, function(data) {
					self.pageCount = data.Total;
					if(self.par.pageIndex == 1) {
						//						self.o.SelfRank = data.SelfRank;
					}
					if(self.isUp) {
						self.list = self.list.concat(data.Items);
					} else {
						self.list = data.Items;
						mui('#pr').pullRefresh().refresh(true);
					} 
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh((self.par.pageIndex >= self.pageCount));
				}, function() {
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh(false)
				});
			},
			review: function() {
				var self = this;
				app.showWaiting();
				self.parReview.eventId = self.par.eventId;
				app.post('api/Events/Discuss', self.parReview, function(data) {
					var user = app.User.get();
					self.list.unshift({
						Name: user.NickName,
						ImgUrl: user.ImgUrl,
						Date: new Date().toString().Format('yyyy-MM-dd hh:mm.ss'),
						Content: self.parReview.content,
					});
					self.parReview.content = '';
					self.ui.txtAsk.value = '';
					mui.trigger(self.ui.txtAsk, 'input', null);
					//										mui.scrollTo(0, 100);
					mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);

					self.ui.txtAsk.blur();
					app.closeWaiting();
				}, function() {
					app.closeWaiting()
				});
			}
		},
		created: function() {
			var self = this;

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
				},
				gestureConfig: {
					tap: true, //默认为true
					doubletap: true, //默认为false
					longtap: true, //默认为false
					swipe: true, //默认为true
					drag: true, //默认为true
					hold: true, //默认为false，不监听
					release: true //默认为false，不监听
				}
			});
			mui.ready(function() {
				self.ui.h.style.width = self.ui.txtAsk.offsetWidth + 'px';
				window.addEventListener('tap', function() {
					self.ui.txtAsk.placeholder = '发表评论';
					self.ui.txtAsk.blur();
				});
				//
				self.ui.footer.addEventListener('tap', function(e) {
					e.preventDefault();
				});

				self.ui.txtAsk.addEventListener('tap', function(event) {
					self.ui.txtFocus();
				}, false);
				self.ui.txtAsk.addEventListener('input', function() {
					var el = this;
					self.ui.h.innerText = el.value.replace(new RegExp('\n', 'gm'), '\n-') || '-';

					self.ui.footer.style.height = (self.ui.h.offsetHeight + self.ui.footer.offsetHeight - el.offsetHeight) + 'px';
				});
			});
			//页面第一次绑定完成执行 
			mui.plusReady(function() {

				plus.webview.currentWebview().setStyle({
					softinputMode: "adjustResize"
				});
				window.addEventListener('reload', function(e) {
					//										app.showWaiting(1);
					self.par.eventId = e.detail.ref.id;
					self.par.pageIndex = 0;
					setTimeout(function() {
						mui('#pr').pullRefresh().pullupLoading();
					}, 1000)

				});
				window.addEventListener('unload', function(e) {
					self.list = [];
					mui('#pr').pullRefresh().refresh(true);
					self.parReview.content = '';
					self.ui.txtAsk.value = '';
					mui.trigger(self.ui.txtAsk, 'input', null);
//					mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
				});
				var wc = plus.webview.currentWebview();

				wc.ref && (self.par.eventId = wc.ref.id,
					setTimeout(function() {
						mui('#pr').pullRefresh().pullupLoading()
					}, 1000)
				);
			});

		}
	});
});