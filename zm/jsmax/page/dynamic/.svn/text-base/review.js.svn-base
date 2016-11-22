define(['app', 'mui', 'vue', 'mui.previewimage', 'mui.zoom'], function(app, mui, vue, mp, mz) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				postId: '',
				pageIndex: 0,
				pageSize: 15
			},
			isIOS: mui.os.ios ? 'ios' : '',
			pageid: '',
			isUp: true,
			pageCount: 0,
			list: [],
			o: null,
			parReview: {
				postId: '',
				content: '',
				discussType: 1
			},
			ui: {
				h: document.getElementById("h"),
				txtAsk: document.getElementById("txtAsk"),
				footer: document.getElementById("footer"),
				content: document.querySelector(".mui-content"),
				btnSave: document.getElementById("btnSave"),
				txtFocus: function() {
					var self = this;
					self.txtAsk.focus();
					setTimeout(function() {
						self.txtAsk.focus();
					}, 150);
					self.h.style.width = self.txtAsk.offsetWidth + 'px';
				},

			},
			selectIndex: 0,
			user: app.User.get(),

		},
		computed: {
			isValid: function() {
				return !!this.parReview.content
			}
		},
		methods: {
			load: function() {
				var self = this;
				app.post('api/Posting/GetPDiscuss', self.par, function(data) {
					self.pageCount = data.Pages;
					if(self.par.pageIndex == 1) {
						self.o = data.Other;

					}
					if(self.isUp) {
						self.list = self.list.concat(data.Items);
					} else {
						self.list = data.Items;
						mui('#pr').pullRefresh().refresh(true);
					}

					app.loadImg();
					app.ellipsisToggle();
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh((self.par.pageIndex >= self.pageCount));
				}, function() {
					self.par.pageIndex--;
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh(false)
				});
			},
			review: function() {
				var self = this;
				var user = app.User.get();
				if(user.ImgUrl && (user.NickName || user.RealName)) {
					app.showWaiting();
					//				self.parReview.postId = self.par.postId;
					app.post('api/Posting/PDiscuss', self.parReview, function(data) {
						if(self.parReview.discussType == 1) {
							self.list.unshift({
								PDiscuss: {
									Name: user.NickName,
									ImgUrl: user.ImgUrl,
									IssDT: new Date().toString().Format('yyyy-MM-dd hh:mm.ss'),
									Content: self.parReview.content,
									DisId: data,
									DNums: 0,
									PNums: 0,
								},
								Replys: []
							});
							mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
						} else {
							self.list[self.selectIndex].PDiscuss.DNums++;
							self.list[self.selectIndex].Replys.unshift({
								Name: user.NickName,
								ImgUrl: user.ImgUrl,
								IssDT: new Date().toString().Format('yyyy-MM-dd hh:mm.ss'),
								Content: self.parReview.content,
								rplId: data,
								DisId: self.par.postId,
								DNums: 0,
								PNums: 0,
							});
						}
						mui.fire(plus.webview.getWebviewById(self.pageid), 'refreshNum', {
							ref: {
								type: 1,
							}
						});
						self.o.DNums++;
						self.parReview.content = '';
						self.ui.txtAsk.value = '';
						mui.trigger(self.ui.txtAsk, 'input', null);
						//										mui.scrollTo(0, 100);
						self.parReview.discussType = 1;
						self.parReview.postId = self.par.postId;

						self.ui.txtAsk.blur();
						//					app.ellipsisToggle();
						app.loadImg();
						app.closeWaiting();
					}, function() {
						app.closeWaiting()
					});
				} else {
					mui.toast(user.ImgUrl ? "请先填写真名或昵称" : "请先上传头像");
				}
			},
			initEvent: function() {
				var self = this;
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
				//				self.par.postId = 'cba09aadddd94be685b4611e20988619';
				//				mui('#pr').pullRefresh().pullupLoading();
				mui('#app').on('tap', '.y-attention', function() {
					var el = this;
					var isattention = el.dataset.isattention == 'true';
					var ur = isattention ? 'api/Posting/DeleteFocusUser' : 'api/Posting/AddFocusUser';
					app.post(ur, {
						userID: el.dataset.userid
					}, function(data) {
						el.innerText = isattention ? '+ 关注' : '取消关注';
						el.dataset.isattention = (!isattention).toString()
					});
				});
				mui('.y-card-list').on('tap', 'a[data-type]', function() {
					var el = this;
					var pNode = el.parentNode;
					var par2 = {
						postId: pNode.dataset.id,
						clickType: el.dataset.type
					};
					var listIndex = pNode.dataset.listIndex;
					switch(parseInt(el.dataset.type)) {
						case 1:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.remove('y-collect-o');
								i.classList.add('y-collect');
								i.classList.add('y-yellow');
								self.o.CNums++;
								//								el.childNodes[1].nextSibling.nodeValue = parseInt(el.childNodes[1].nextSibling.nodeValue) + 1;
								el.dataset.type = 5;
								mui.toast('收藏成功');
							});
							break;
						case 2:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.remove('y-heart-o');
								i.classList.add('y-heart');
								i.classList.add('y-red');
								self.o.PNums++;
								el.dataset.type = 9;
							});
							break;
						case 3:
							app.post('api/Posting/ClickLike', par2, function(data) {
								listIndex = pNode.dataset.index;;
								el.classList.remove('y-heart-o');
								el.classList.add('y-heart');
								el.classList.add('y-red');
								self.list[listIndex].PDiscuss.PNums++;
								el.dataset.type = 1000;
							});
							break;
						case 4:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var index = pNode.dataset.index;
								el.classList.remove('y-heart-o');
								el.classList.add('y-heart');
								el.classList.add('y-red');
								self.list[listIndex].Replys[index].PNums++;
								el.dataset.type = 1000;
							});
							break;
						case 5:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.add('y-collect-o');
								i.classList.remove('y-collect');
								i.classList.remove('y-yellow');
								self.o.CNums--;
								el.dataset.type = 1;
								mui.toast('取消收藏');
							});
							break;
						case 102:
							self.selectIndex = pNode.dataset.index;
							self.ui.txtAsk.placeholder = '回复:' + self.list[self.selectIndex].PDiscuss.Name;
							self.ui.txtFocus();
							self.parReview.discussType = 2;
							self.parReview.postId = pNode.dataset.id;
							break;
						default:
							break;
					}
					return false;
				});
				document.getElementById("pr").addEventListener('tap', function() {
					self.ui.txtAsk.placeholder = '发表评论';
					self.parReview.discussType = 1;
					self.parReview.postId = self.par.postId;
					self.ui.txtAsk.blur();
				});
				self.ui.btnSave.addEventListener('tap', function(e) {
					e.preventDefault();
					self.review();
					return false;
				});
			},
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
				self.initEvent();
				if(!mui.os.plus) {
					self.par.postId = app.getQueryString('ref.id');
					self.pageid = app.getQueryString('ref.pageid');
					self.parReview.postId = self.par.postId;
					mui('#pr').pullRefresh().pullupLoading();
				}
				mui.previewImage();
				self.ui.h.style.width = self.ui.txtAsk.offsetWidth + 'px';
				//				window.addEventListener('tap', function() {
				//					self.ui.txtAsk.placeholder = '发表评论';
				//					self.ui.txtAsk.blur();
				//				});

			});
			//页面第一次绑定完成执行 
			mui.plusReady(function() {
				plus.webview.currentWebview().setStyle({
					softinputMode: "adjustResize"
				});
				window.addEventListener('reload', function(e) {
					//										app.showWaiting(1);
					self.user = app.User.get();
					self.par.postId = e.detail.ref.id;
					self.pageid = e.detail.ref.pageid;
					self.par.pageIndex = 0;
					self.parReview.postId = self.par.postId;
					setTimeout(function() {
						mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
					}, 500);
					setTimeout(function() {
						mui('#pr').pullRefresh().pullupLoading();
					}, 1000)

				});
				window.addEventListener('unload', function(e) {
					self.list = [];
					self.o = null;
					mui('#pr').pullRefresh().refresh(true);
					self.parReview.content = '';
					setTimeout(function() {
						mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
					}, 500);
					self.ui.txtAsk.value = '';
					mui.trigger(self.ui.txtAsk, 'input', null);
					//					mui('.mui-scroll-wrapper').scroll().scrollTo(0, 5, 100);
					//					mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
				});
				var wc = plus.webview.currentWebview();

				wc.ref && (self.par.postId = wc.ref.id, self.parReview.postId = self.par.postId, self.list = [],
					setTimeout(function() {
						//						mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
						mui('#pr').pullRefresh().refresh(true);
						mui('#pr').pullRefresh().pullupLoading()
					}, 1000)
				);
			});

		}
	});
});