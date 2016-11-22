//此页面预加载
define(['app', 'mui', 'vue', 'mui.pullToRefresh', 'mui.pullToRefresh.material'], function(app, mui, vue, mp, mpm) {
	var inputSearch = document.querySelector("input[type=search]");
	var openSoftKeyboard;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			pageData: {
				//				holder: ["会员名称", "俱乐部名称", "新闻", "马术讲堂"],
				type: -1,
			},
			serverData: {
				Count: 0,
				NewItem: null,
				UID: 1,
				LID: -1,
				Items: [],
			},
			reqPar: {
				idx: -1,
				newsType: -1,
				isNeedNew: 'false',
				search: '',
				pageSize: 5
			},
			ptr: null,
			urlStr: 'api/News/GetNewsPageV2',
		},
		computed: {

		},
		methods: {
			detail: function(el) {
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
						mui.fire(w, 'unload', {});
					});
				}
			},
			search: function() {
				var self = this;
				self.serverData.LID = -1;
				self.reqPar.idx = -1;
				self.serverData.Items = [];
				self.ptr && self.ptr.refresh(true);

				//				self.ptr.pullDownLoading();
				self.pullupRefresh();
			},
			resetData: function() {
				var self = this;
				self.serverData.LID = -1;
				self.reqPar.idx = -1;
				self.reqPar.search = '';
				self.serverData.Items = [];
				self.ptr && self.ptr.refresh(true);
			},
			pullupRefresh: function() {
				var self = this;
				if(!(self.reqPar.search && self.reqPar.search.trim().length > 0 && self.pageData.type >= 0)) {
					//					console.log('参数不全');
					return;
				}
				var hasMore = self.serverData.LID > -1;
				//				mui('#pullrefresh').pullRefresh().endPullupToRefresh(hasMore);
				//如果有数据或者重新加载
				app.showWaiting(1);
				app.post(self.urlStr, self.reqPar, function(data) {
						self.serverData.Count = data.Count;
						self.reqPar.isNeedNew == 'true' && ((self.serverData.NewItem = data.NewItem) || (self.reqPar.isNeedNew = 'false'));
						self.serverData.UID = data.UID;
						self.serverData.LID = data.LID;
						hasMore = self.serverData.LID > -1;
						self.serverData.Items = self.serverData.Items.concat(data.Items);
						//						mui('#pullrefresh').pullRefresh().endPullupToRefresh(hasMore);
						self.ptr.endPullUpToRefresh(!hasMore);
						app.loadImg();
						app.closeWaiting();
					},
					function() {
						self.ptr.endPullUpToRefresh(!hasMore);
						app.closeWaiting();
					});
			},
			loadData: function(up) {
				var self = this;
				var hasMore = self.serverData.LID > -1;
				//如果有数据或者重新加载
				if(hasMore || (!hasMore && !up)) {
					//					app.showWaiting();
					app.post(self.urlStr, self.reqPar, function(data) {
							self.serverData.Count = data.Count;
							self.reqPar.isNeedNew == 'true' && (self.serverData.NewItem = data.NewItem);
							self.serverData.UID = data.UID;
							self.serverData.LID = data.LID;
							hasMore = self.serverData.LID > -1;
							if(up) {
								self.serverData.Items = self.serverData.Items.concat(data.Items);
								self.ptr.endPullUpToRefresh(!hasMore);
								//								console.log('上拉加载成功');
							} else {
								self.serverData.Items = data.Items;
								self.ptr.endPullDownToRefresh();
								self.ptr.refresh(true);
								//								console.log('下拉刷新成功');
							}
							app.loadImg();
							//							app.closeWaiting();
						},
						function() {
							up ? (self.ptr.endPullUpToRefresh(!hasMore) || app.log('上拉发生异常')) : (self.ptr.endPullDownToRefresh() || app.log('下拉发生异常'));
							//							app.closeWaiting();
						});
				} else {
					//up ? self.ptr.endPullUpToRefresh(hasMore) : self.ptr.endPullDownToRefresh();
					self.ptr.endPullUpToRefresh(!hasMore);
					//					console.log('没有数据了');
				}
			},
			init: function(t) {
				var self = this;
				//获得事件参数
				self.pageData.type = t;
				self.ptr.endPullUpToRefresh(true);
				//				 public enum NewsType
				//  {
				//      /// <summary>
				//      /// 天马新闻
				//      /// </summary>
				//      TiannmaNews = 1,
				//      /// <summary>
				//      /// 西部马术
				//      /// </summary>
				//      West = 2,
				//      /// <summary>
				//      /// 西部赛事
				//      /// </summary>
				//      WestMatch = 3,
				//      /// <summary>
				//      /// 西部活动
				//      /// </summary>
				//      WestActive = 4,
				//      /// <summary>
				//      /// 职业培训
				//      /// </summary>
				//      JobTraining = 5,
				//      /// <summary>
				//      /// 青少年培训
				//      /// </summary>
				//      YouthTraining = 6,
				//      /// <summary>
				//      /// 行业动态
				//      /// </summary>
				//      NewsIndustry = 7,
				//      /// <summary>
				//      /// 俱乐部新闻
				//      /// </summary>
				//      ClubShow = 8,
				//      /// <summary>
				//      /// 会员风采
				//      /// </summary>
				//      MemberShow = 9,
				//      /// <summary>
				//      /// 马术讲堂
				//      /// </summary>
				//      HorseClass = 10
				//  }

				var placeHolder = document.querySelector('.header-search .mui-placeholder span:last-child');
				switch(self.pageData.type) {
					case 0:
						document.getElementById('mem').classList.remove('mui-hidden');
						self.reqPar.newsType = 9;
						mui('.mem-main-mem').on('tap', '.mem-item-mem', function() {
							self.detail(this);
						});
						placeHolder && (placeHolder.innerHTML = '会员名称');
						//						mui.later(function() {
						//							inputSearch && inputSearch.setAttribute('placeholder', '会员名称');
						//						}, 500);
						//						inputSearch && inputSearch.setAttribute('placeholder', '会员名称');
						break;
					case 1:
						document.getElementById('club').classList.remove('mui-hidden');
						self.reqPar.newsType = 8;
						mui('.mui-scroll').on('tap', '.mem-item-club', function() {
							self.detail(this);
						});
						placeHolder && (placeHolder.innerHTML = '俱乐部名称');
						//						inputSearch && inputSearch.setAttribute('placeholder', '俱乐部名称');
						break;
					case 2:
						document.getElementById('news').classList.remove('mui-hidden');
						self.reqPar.newsType = 1;
						mui('.mui-scroll').on('tap', '.mem-item-news', function() {
							self.detail(this);
						});
						placeHolder && (placeHolder.innerHTML = '新闻');
						//						inputSearch && inputSearch.setAttribute('placeholder', '新闻');
						break;
					case 3:
						document.getElementById('hs').classList.remove('mui-hidden');
						self.reqPar.newsType = 10;
						mui('.mui-scroll').on('tap', '.mem-item-hs', function() {
							self.detail(this);
						});
						placeHolder && (placeHolder.innerHTML = '马术讲堂');
						//						inputSearch && inputSearch.setAttribute('placeholder', '马术讲堂');
						break;
					default:
						break;
				}
			},
		},
		ready: function() {
			var self = this;
			//添加newId自定义事件监听
			window.addEventListener('pageType', function(event) {
				self.init(event.detail.pageType);
				mui.os.plus && plus.webview.currentWebview().show("slide-in-right");
			});
			//页面第一次绑定完成执行 
			mui.ready(function() {
				//				mui('[data-autoshow]').each(function() {
				//					this.classList.remove('mui-hidden');
				//					console.log('移除hidden');
				//				});

				var oldBack = mui.back;
				mui.back = function() {
					self.resetData();
					switch(self.pageData.type) {
						case 0:
							document.getElementById('mem').classList.add('mui-hidden');
							break;
						case 1:
							document.getElementById('club').classList.add('mui-hidden');
							break;
						case 2:
							document.getElementById('news').classList.add('mui-hidden');
							break;
						case 3:
							document.getElementById('hs').classList.add('mui-hidden');
							break;
						default:
							break;
					}
					//					plus.webview.currentWebview().close();
					oldBack();
				};
				inputSearch && inputSearch.focus();
				//阻尼系数
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: true,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});
				self.ptr = mui('.mui-scroll').pullToRefresh({
					//					down: {
					//						height: 75,
					//						callback: function() {
					//							self.reqPar.idx = -1;
					//							self.loadData(false);
					//						}
					//					},
					up: {
						auto: false,
						offset: 100, //距离底部高度(到达该高度即触发)
						show: true,
						contentdown: '上拉显示更多',
						contentrefresh: '正在加载...',
						contentnomore: '没有更多数据了',
						callback: function() {
							self.reqPar.idx = self.serverData.LID;
							self.pullupRefresh();
							//							self.loadData(true);
						}
					}
				});
			});
			mui.plusReady(function() {
				//				var selfPage = plus.webview.currentWebview();
				//				if(selfPage && selfPage.pageType) {
				//					self.init(selfPage.pageType);
				//				}
				openSoftKeyboard = function() {
					if(mui.os.ios) {
						var webView = plus.webview.currentWebview().nativeInstanceObject();
						webView.plusCallMethod({
							"setKeyboardDisplayRequiresUserAction": false
						});
					} else {
						var webview = plus.android.currentWebview();
						plus.android.importClass(webview);
						webview.requestFocus();
						var Context = plus.android.importClass("android.content.Context");
						var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
						var main = plus.android.runtimeMainActivity();
						var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
						imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
					}
				}

				//页面隐藏事件
				plus.webview.currentWebview().addEventListener("hide", function(e) {
					inputSearch.value = "";
					inputSearch.blur(); //搜索框取消焦点，关闭软键盘
				});
				//页面显示事件
				plus.webview.currentWebview().addEventListener("show", function(e) {
					setTimeout(function() { //自动打开软键盘，搜索框获取焦点
						inputSearch.focus();
						openSoftKeyboard();
					}, 300);
				});
			});
		}
	});
});