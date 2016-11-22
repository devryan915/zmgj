define(['app', 'mui', 'vue', 'mui.pullToRefresh', 'mui.pullToRefresh.material'], function(app, mui, vue, mp, mpm) {

	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			user: app.User.get(),
			pageData: {
				isRider: false,
				isTeam: false,
				isHorse: false,
				holder: "",
				keyword: "",
			},
			isStrokeUp: true,
			serverData: {
				Total: 0,
				Items: []
			},
			reqTeamPar: {
				corpsName: '',
				pageIndex: 1,
				pageSize: 20
			},
			reqRiderPar: {
				nickName: '',
				pageIndex: 1,
				pageSize: 12
			},
			reqHorsePar: {
				horseName: '',
				bloodType: '',
				pageIndex: 1,
				pageSize: 20
			},
		},
		computed: {

		},
		methods: {
			detail: function(v) {
				var self = this;
				var ID = v.dataset.id;
				//				mui.toast(v.dataset.id + ' detail');
				if(self.pageData.isTeam) {
					var page;
					if(mui.plus) {
						page = plus.webview.getWebviewById('match_teaminfo');
					}
					if(page) {
						//触发详情页面的riderid事件
						mui.fire(page, 'teamID', {
							teamID: ID
						});
						//打开详情页面          
						mui.openWindow({
							id: 'match_teaminfo',
						});
					} else {
						mui.openWindow({
							id: 'match_teaminfo',
							url: 'teaminfo.html',
							extras: {
								teamID: ID
							},
							show: {
								aniShow: false
							},
							waiting: {
								autoShow: false
							}
						});
					}
				}
				if(self.pageData.isRider) {
					var page;
					if(mui.plus) {
						page = plus.webview.getWebviewById('match_riderinfo');
					}
					if(page) {
						//触发详情页面的riderid事件
						mui.fire(page, 'riderID', {
							riderID: ID,
							pageType: 1,
						});
						//打开详情页面          
						mui.openWindow({
							id: 'match_riderinfo',
						});
					} else {
						mui.openWindow({
							id: 'match_riderinfo',
							url: 'riderinfo.html',
							extras: {
								riderID: ID,
								pageType: 1,
							},
							show: {
								aniShow: false
							},
							waiting: {
								autoShow: false
							}
						});
					}
				}
				if(self.pageData.isHorse) {
					var page;
					if(mui.plus) {
						page = plus.webview.getWebviewById('match_horseinfo');
					}
					if(page) {
						//触发详情页面的riderid事件
						mui.fire(page, 'horseID', {
							horseID: ID
						});
						//打开详情页面          
						mui.openWindow({
							id: 'match_horseinfo',
						});
					} else {
						mui.openWindow({
							id: 'match_horseinfo',
							url: 'horseinfo.html',
							extras: {
								horseID: ID
							},
							show: {
								aniShow: false
							},
							waiting: {
								autoShow: false
							}
						});
					}
				}
			},
			load: function(pid) {
				var pageID = pid;
				var self = this;
				self.pageData.isRider = false;
				self.pageData.isTeam = false;
				self.pageData.isHorse = false;
				//获得事件参数
				switch(pageID) {
					case 1:
						self.pageData.isRider = false;
						self.pageData.isTeam = true;
						self.pageData.isHorse = false;
						break;
					case 3:
						self.pageData.isRider = true;
						self.pageData.isTeam = false;
						self.pageData.isHorse = false;
						break;
					case 4:
						self.pageData.isRider = false;
						self.pageData.isTeam = false;
						self.pageData.isHorse = true;
						break;
					default:
						return;
				}

				if(self.pageData.isRider) {
					self.pageData.holder = '搜索骑手';
					//初始化预加载详情页面
					mui.init({
						preloadPages: [{
							id: 'match_riderinfo',
							url: 'riderinfo.html'
						}],
						//						preloadLimit: 5 //预加载窗口数量限制(一旦超出,先进先出)默认不限制
					});
				}
				if(self.pageData.isTeam) {
					self.pageData.holder = '搜索战队';
					//初始化预加载详情页面
					mui.init({
						preloadPages: [{
							id: 'match_teaminfo',
							url: 'teaminfo.html'
						}],
						//					preloadLimit: 5 //预加载窗口数量限制(一旦超出,先进先出)默认不限制
					});
				}
				if(self.pageData.isHorse) {
					self.pageData.holder = '搜索马匹';
					//初始化预加载详情页面
					mui.init({
						preloadPages: [{
							id: 'match_horseinfo',
							url: 'horseinfo.html'
						}],
						//					preloadLimit: 5 //预加载窗口数量限制(一旦超出,先进先出)默认不限制
					});
				}
			},
			loadData: function(el) {
				var self = this;
				var par;
				var surl;
				if(self.pageData.isTeam) {
					mui('#teams').on('tap', 'li', function() {
						var parData = this;
						self.detail(parData);
					});
					if(!el) {
						self.reqTeamPar.pageIndex = 1;
						self.serverData.Total = 1;
						self.isStrokeUp = true;
						self.serverData.Items = [];
					}
					self.reqTeamPar.corpsName = self.pageData.keyword;
					surl = 'api/Events/GetCorpsList';
					par = self.reqTeamPar;
				}
				if(self.pageData.isRider) {
					mui('#riders').on('tap', 'li', function() {
						var parData = this;
						self.detail(parData);
					});
					if(!el) {
						self.reqRiderPar.pageIndex = 1;
						self.serverData.Total = 1;
						self.isStrokeUp = true;
						self.serverData.Items = [];
					}
					self.reqRiderPar.nickName = self.pageData.keyword;
					surl = 'api/Events/GetRiderList';
					par = self.reqRiderPar;
				}
				if(self.pageData.isHorse) {
					mui('#horses').on('tap', 'li', function() {
						var parData = this;
						self.detail(parData);
					});
					if(!el) {
						self.reqHorsePar.pageIndex = 1;
						self.serverData.Total = 1;
						self.isStrokeUp = true;
						self.serverData.Items = [];
					}
					self.reqHorsePar.horseName = self.pageData.keyword;
					self.reqHorsePar.bloodType = 'All';
					surl = 'api/Events/GetHorseList';
					par = self.reqHorsePar;
				}
				var mpl = document.querySelector("#prMatch .mui-pull-loading");
				var pageCount = self.pageData.isHorse ? Math.ceil(self.serverData.Total * 1.0 / self.reqHorsePar.pageSize) : self.serverData.Total;
				var noMore = par.pageIndex == pageCount;
				//console.log(par.pageIndex + ' ' + pageCount);
				if(par.pageIndex <= self.serverData.Total) {
					app.post(surl, par, function(data) {
							self.serverData.Total = data.Total;
							pageCount = self.pageData.isHorse ? Math.ceil(self.serverData.Total * 1.0 / self.reqHorsePar.pageSize) : self.serverData.Total;
							noMore = par.pageIndex == pageCount;
							//console.log(par.pageIndex + ' ' + pageCount);
							par.pageIndex++;
							if(self.isStrokeUp) {
								self.serverData.Items = self.serverData.Items.concat(data.Items);
								el && el.endPullUpToRefresh();
							} else {
								self.serverData.Items = data.Items;
								el.endPullDownToRefresh();
								el.refresh(true);
							}
							if(el) {
								el.endPullUpToRefresh(noMore);
							} else {
								if(noMore) {
									mpl.innerHTML = self.serverData.Items && self.serverData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
								}
							}
							app.loadImg();
							app.closeWaiting();
						},
						function() {
							el && (el.endPullDownToRefresh(), el.endPullUpToRefresh());
						});
				} else {
					el && el.endPullUpToRefresh(noMore);
					mpl.innerHTML = self.serverData.Items && self.serverData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
				}
			},
			search: function(v) {
				var self = this;
				if(!self.pageData.isTeam && !self.pageData.isRider && !self.pageData.isHorse) {
					//console.log('页面尚未初始化');
					return;
				}
				if(!v) {
					return;
				}
				self.pageData.keyword = v.target.value;
				self.loadData();
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				/* 获得元素的位置信息 */
				mui('.mui-scroll-wrapper').scroll({
					scrollY: true, //是否竖向滚动
					scrollX: false, //是否横向滚动
					startX: 0, //初始化时滚动至x
					startY: 0, //初始化时滚动至y
					indicators: true, //是否显示滚动条
					deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
					bounce: true //是否启用回弹
				});

				mui('#prMatch').pullToRefresh({
					down: {
						callback: function() {
							if(!self.pageData.isTeam && !self.pageData.isRider && !self.pageData.isHorse) {
								return;
							}
							if(self.pageData.isTeam) {
								self.reqTeamPar.pageIndex = 1;
							}
							if(self.pageData.isRider) {
								self.reqRiderPar.pageIndex = 1;
							}
							if(self.pageData.isHorse) {
								self.reqHorsePar.pageIndex = 1;
							}
							self.serverData.Total = 1;
							self.isStrokeUp = false;
							self.loadData(this);
						}
					},
					up: {
						contentnomore: '已加载全部',
						callback: function() {
							if(!self.pageData.isTeam && !self.pageData.isRider && !self.pageData.isHorse) {
								return;
							}
							self.isStrokeUp = true;
							self.loadData(this);
						}
					}
				});
				//添加newId自定义事件监听
				window.addEventListener('pageID', function(event) {
					//获得事件参数
					//console.log('event team_search ' + event.detail.pageID);
					self.load(event.detail.pageID);
				});

			});
			mui.plusReady(function() {
				var selfPage = plus.webview.currentWebview();
				if(selfPage && selfPage.pageID) {
					//console.log('new team_search ' + selfPage.pageID);
					self.load(selfPage.pageID);
				}
			});
		}
	});
});