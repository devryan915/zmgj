define(['app', 'mui', 'vue', 'mui.previewimage', 'mui.zoom'], function(app, mui, vue, mp, mz) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			user: app.User.get(),
			par: {
				pageIndex: 0,
				pageSize: 5
			},
			isUp: true,
			pageCount: 0,
			list: [],
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
				self.user = app.User.get();
				app.post('api/Posting/GetMyCollection', self.par, function(data) {
					self.pageCount = data.Pages;
					if(self.par.pageIndex == 1) {
						//						self.o.SelfRank = data.SelfRank;
					}
					if(self.isUp) {
						self.list = self.list.concat(data.Items);
					} else {
						self.list = data.Items;
						mui('#pr').pullRefresh().refresh(true);
					}
					app.loadImg();
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh((self.par.pageIndex >= self.pageCount));

					app.ellipsisToggle();

				}, function() {
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh(false)
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
				}
			});
			mui.ready(function() {
				mui.previewImage();
				if(!mui.os.plus) {
					mui('#pr').pullRefresh().pullupLoading();
				}
				mui('.y-card-list').on('tap', '.y-attention', function() {
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
				mui('.y-card-list').on('tap', '.mui-card-footer>a[data-type]', function() {
					var el = this;
					var pNode = el.parentNode;
					var par2 = {
						postId: pNode.dataset.id,
						clickType: el.dataset.type
					};
					switch(parseInt(el.dataset.type)) {
						case 1:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.remove('y-collect-o');
								i.classList.add('y-collect');
								i.classList.add('y-yellow');
								self.list[pNode.dataset.index].CNums++;
								//								el.childNodes[1].nextSibling.nodeValue = parseInt(el.childNodes[1].nextSibling.nodeValue) + 1;
								el.dataset.type = 5;
							});
							break;
						case 2:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.remove('y-heart-o');
								i.classList.add('y-heart');
								i.classList.add('y-red');
								self.list[pNode.dataset.index].PNums++;
								//								el.childNodes[1].nextSibling.nodeValue = parseInt(el.childNodes[1].nextSibling.nodeValue) + 1;
								el.dataset.type = 9;
							});
							break;
						case 5:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.add('y-collect-o');
								i.classList.remove('y-collect');
								i.classList.remove('y-yellow');
								self.list[pNode.dataset.index].CNums--;
								//								el.childNodes[1].nextSibling.nodeValue = parseInt(el.childNodes[1].nextSibling.nodeValue) - 1;
								el.dataset.type = 1;
							});
							break;
						case 100:
							var data = self.parList[pNode.dataset.listIndex].list[pNode.dataset.index];
							var msg = {
								href: "http://chorse-sports.com/home_zm/app.html",
								title: "要骑马，选天马。",
								content: "我正在使用天马，赶快和我一起来使用吧。",
								thumbs: ["http://chorse-sports.ufile.ucloud.com.cn/sys/logo_100x100.png"],
							};
							app.share(msg);
							break;
						case 101:
							app.openWin('../dynamic/review.html', 'wdynamic_review', {
								id: par2.postId
							}, function(w) {

							}, {
								popGesture: 'close'
							});
							break;
						default:
							break;
					}
				});
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					//										app.showWaiting(1); 
					self.par.pageIndex = 0;
					setTimeout(function() {
						mui('#pr').pullRefresh().pullupLoading();
					}, 1000)

				});
				window.addEventListener('unload', function(e) {
					self.list = [];
					mui('#pr').pullRefresh().refresh(true);
					//					mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
				});
				var wc = plus.webview.currentWebview();

				wc.ref && (
					setTimeout(function() {
						mui('#pr').pullRefresh().pullupLoading()
					}, 1000)
				);
			});
		}
	});
});