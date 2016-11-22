define(['app', 'mui', 'vue', 'mui.pullToRefresh', 'mui.pullToRefresh.material'], function(app, mui, vue, mp, mpm) {
	//	app.showWaiting(1);

	var classList = mui('#search')[0].classList;
	var popNotice = document.querySelector('.pop-backdrop');
	var popNoticeCont = document.querySelector('.pop-backdrop div');
	//上一次搜索按钮
	var lastSKBtn;
	var timer;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				eType: 1,
				pageSize: 5,
				lastDate: '',
				lastEId: '',
			},
			strokeList: [],
			Banners: [],
			isStrokeUp: true,
			rank: {
				par: {},
				list: [],
			},
			curpageType: 0,
			searchFilterData: [{
				id: "id1",
				value: "id1",
				name: "夸特"
			}, {
				id: "id2",
				value: "id2",
				name: "阿拉伯"
			}, {
				id: "id3",
				value: "id3",
				name: "汗血"
			}, {
				id: "id4",
				value: "",
				name: "全部"
			}],
			teamData: {
				Total: 1,
				Items: [],
			},
			riderData: {
				Total: 1,
				Items: [],
			},
			horseData: {
				HorseTotal: 0,
				Total: 1,
				Items: [],
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
			close: function() {
				popNotice && popNotice.classList.add('mui-hidden');
			},
			//赛程
			loadStroke: function(el) {
				var self = this;
				var mpl = document.querySelector("#prStroke .mui-pull-loading");
				if(self.par.lastEId != -1) {
					app.post('api/Events/GetEvents', self.par, function(data) {
						if(self.par.lastEId == '') {
							self.strokeList = [];
							self.Banners = data.Banners;
						}
						self.par.lastEId = data.lastEId;
						self.par.lastDate = data.lastDate;

						if(self.isStrokeUp) {
							self.strokeList = self.strokeList.concat(data.Items);
							el && el.endPullUpToRefresh();
						} else {
							self.strokeList = data.Items;
							el.endPullDownToRefresh();
							el.refresh(true);
						}

						if(el) {
							el.endPullUpToRefresh((self.par.lastEId == -1));

						} else {
							if(self.par.lastEId == -1) {
								mpl.innerHTML = self.strokeList && self.strokeList.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
							}
						}
						app.loadImg();
						app.closeWaiting();

					}, function() {
						app.showError(function() {
							app.showWaiting(1);
							self.loadStroke();
						});
						app.closeWaiting();
						//						el && (el.endPullDownToRefresh(), el.endPullUpToRefresh());
					});
				} else {
					el && el.endPullUpToRefresh((self.par.lastEId == -1));
					mpl.innerHTML = self.strokeList && self.strokeList.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
				}
			},
			//战绩
			rankTab: function(el) {
				var self = this;
				app.post('api/Events/GetEventsAndRuleFatherList', self.par, function(data) {
					self.rank.list = data;
				});

			},

			loadTeam: function(el) {
				//				var self = this;
				//				app.post('api/Events/GetCorpsList', self.reqTeamPar, function(data) {
				//					self.horseData = data;
				//				});
				var self = this;
				var mpl = document.querySelector("#prTeam .mui-pull-loading");
				if(!el) {
					self.reqTeamPar.pageIndex = 1;
					self.teamData.Total = 1;
				}
				var noMore = self.reqTeamPar.pageIndex == self.teamData.Total;
				//				console.log(self.reqTeamPar.pageIndex + ' ' + self.teamData.Total);
				if(self.reqTeamPar.pageIndex <= self.teamData.Total) {
					app.post('api/Events/GetCorpsList', self.reqTeamPar, function(data) {
							self.teamData.Total = data.Total;
							noMore = self.reqTeamPar.pageIndex == self.teamData.Total;
							self.reqTeamPar.pageIndex++;
							//							console.log(self.reqTeamPar.pageIndex + ' ' + self.teamData.Total);
							if(self.isStrokeUp) {
								self.teamData.Items = self.teamData.Items.concat(data.Items);
								el && el.endPullUpToRefresh();
							} else {
								self.teamData.Items = data.Items;
								el.endPullDownToRefresh();
								el.refresh(true);
							}
							if(el) {
								el.endPullUpToRefresh(noMore);
							} else {
								if(noMore) {
									mpl.innerHTML = self.teamData.Items && self.teamData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
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
					mpl.innerHTML = self.teamData.Items && self.teamData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
				}

			},
			loadRider: function(el) {
				var self = this;
				var mpl = document.querySelector("#prRiders .mui-pull-loading");
				if(!el) {
					self.reqRiderPar.pageIndex = 1;
					self.riderData.Total = 1;
				}
				var noMore = self.reqRiderPar.pageIndex == self.riderData.Total;
				//				console.log(self.reqRiderPar.pageIndex + ' ' + self.riderData.Total);
				if(self.reqRiderPar.pageIndex <= self.riderData.Total) {
					app.post('api/Events/GetRiderList', self.reqRiderPar, function(data) {
							self.riderData.Total = data.Total;
							noMore = self.reqRiderPar.pageIndex == self.riderData.Total;
							self.reqRiderPar.pageIndex++;
							//							console.log(self.reqRiderPar.pageIndex + ' ' + self.riderData.Total);
							if(self.isStrokeUp) {
								self.riderData.Items = self.riderData.Items.concat(data.Items);
								el && el.endPullUpToRefresh();
							} else {
								self.riderData.Items = data.Items;
								el.endPullDownToRefresh();
								el.refresh(true);
							}
							if(el) {
								el.endPullUpToRefresh(noMore);
							} else {
								if(noMore) {
									mpl.innerHTML = self.riderData.Items && self.riderData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
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
					mpl.innerHTML = self.riderData.Items && self.riderData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
				}

				//				self.reqRiderPar.nickName = '';
				//				self.reqRiderPar.pageIndex = '1';
				//				self.reqRiderPar.pageSize = '50';
				//				app.post('api/Events/GetRiderList', self.reqRiderPar, function(data) {
				//					self.riderData = data;
				//				});
			},
			loadHorse: function(el) {
				//				var self = this;
				//				self.reqHorsePar.nickName = '';
				//				self.reqHorsePar.bloodType = '';
				//				self.reqHorsePar.pageIndex = '1';
				//				self.reqHorsePar.pageSize = '50';
				//				app.post('api/Events/GetHorseList', self.reqHorsePar, function(data) {
				//					self.horseData = data;
				//				});

				var self = this;
				var mpl = document.querySelector("#prHorses .mui-pull-loading");
				if(!el) {
					self.reqHorsePar.pageIndex = 1;
					self.horseData.Total = 1;
				}
				var pageCount = Math.ceil(self.horseData.Total * 1.0 / self.reqHorsePar.pageSize);
				var noMore = self.reqHorsePar.pageIndex == pageCount;
				//				console.log(self.reqHorsePar.pageIndex + ' ' + pageCount);
				if(self.reqHorsePar.pageIndex <= pageCount) {
					app.post('api/Events/GetHorseList', self.reqHorsePar, function(data) {
							self.horseData.Total = data.Total;
							self.horseData.HorseTotal = data.Total;
							pageCount = Math.ceil(self.horseData.Total * 1.0 / self.reqHorsePar.pageSize);
							noMore = self.reqHorsePar.pageIndex == pageCount;
							self.reqHorsePar.pageIndex++;
							//							console.log(self.reqHorsePar.pageIndex + ' ' + pageCount);
							if(self.isStrokeUp) {
								self.horseData.Items = self.horseData.Items.concat(data.Items);
								el && el.endPullUpToRefresh();
							} else {
								self.horseData.Items = data.Items;
								el.endPullDownToRefresh();
								el.refresh(true);
							}
							if(el) {
								el.endPullUpToRefresh(noMore);
							} else {
								if(noMore) {
									mpl.innerHTML = self.horseData.Items && self.horseData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
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
					mpl.innerHTML = self.horseData.Items && self.horseData.Items.length > 0 ? '已加载全部' : '<i class="y y-jilu"></i><span>暂无数据</span>';
				}
			},
			load: function() {
				var self = this;
				//				self.loadStroke();
				//				self.loadTeam();
				//				self.loadRider();
				//				self.loadHorse();
			},
			detail: function(t, v) {
				var page;
				var ID = v.dataset.id;
				//				var pageID;
				//				var pageURL;
				//				var pageEventID:
				switch(t) {
					case 1:
						page = plus.webview.getWebviewById('match_teaminfo');
						if(page) {
							//触发详情页面的事件
							mui.fire(page, 'teamID', {
								teamID: ID,
								name: v.dataset.name,
							});
							//打开详情页面          
							mui.openWindow({
								id: 'match_teaminfo',
							});
						} else {
							mui.openWindow({
								id: 'match_teaminfo',
								url: '../match/teaminfo.html',
								extras: {
									teamID: ID,
									name: v.dataset.name,
								},
								show: {
									aniShow: false
								},
								waiting: {
									autoShow: false
								}
							});
						}
						break;
					case 2:
						page = plus.webview.getWebviewById('match_riderinfo');
						if(page) {
							//触发详情页面的事件
							mui.fire(page, 'riderID', {
								riderID: ID,
								pageType: 1
							});
							//打开详情页面          
							mui.openWindow({
								id: 'match_riderinfo',
							});
						} else {
							mui.openWindow({
								id: 'match_riderinfo',
								url: '../match/riderinfo.html',
								extras: {
									riderID: ID,
									pageType: 1
								},
								show: {
									aniShow: false
								},
								waiting: {
									autoShow: false
								}
							});
						}
						break;
					case 3:
						page = plus.webview.getWebviewById('match_horseinfo');
						if(page) {
							//触发详情页面的事件
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
								url: '../match/horseinfo.html',
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
						break;
					default:
						return;
				}

			},
			searchH: function(id, v) {
				var self = this;
				if(lastSKBtn) {
					lastSKBtn.classList.remove('btn-active');
					lastSKBtn.classList.add('btn-default');
				}
				lastSKBtn = mui('#' + id)[0];
				lastSKBtn.classList.remove('btn-default');
				lastSKBtn.classList.add('btn-active');
				self.reqHorsePar.pageIndex = 1;
				self.reqHorsePar.bloodType = v;
				self.horseData.Total = 1;
				self.horseData.HorseTotal = 0;
				self.horseData.Items = [];
				self.isStrokeUp = true;
				self.loadHorse();
				self.closeOffCanvas();
				//				console.log(lastSKBtn.classList + ' ' + v);
			},
			search: function() {
				var self = this;
				if(self.curpageType == 1 || self.curpageType == 3 || self.curpageType == 4) {
					//					mui.toast(self.curpageType);
					var page;
					page = plus.webview.getWebviewById('match_team_search');
					if(page) {
						//触发详情页面的事件
						mui.fire(page, 'pageID', {
							pageID: self.curpageType
						});
						//打开详情页面          
						mui.openWindow({
							id: 'match_team_search',
						});
					} else {
						mui.openWindow({
							id: 'match_team_search',
							url: '../match/team_search.html',
							extras: {
								pageID: self.curpageType
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
			//			slide: function(e) {
			//				var self = this;
			//				self.curpageType = e.detail.slideNumber;
			//				if (e.detail.slideNumber === 0) {
			//					classList.add('mui-hidden');
			//				} else if (e.detail.slideNumber === 1) {
			//					classList.remove('mui-hidden');
			//				} else if (e.detail.slideNumber === 2) {
			//					classList.add('mui-hidden');
			//				} else if (e.detail.slideNumber === 3) {
			//					classList.remove('mui-hidden');
			//				} else if (e.detail.slideNumber === 4) {
			//					classList.remove('mui-hidden');
			//				}
			//			},
			showOffCanvas: function() {
				var offCanvasWrapper = mui('#offCanvasWrapper');
				offCanvasWrapper.offCanvas('show');
			},
			closeOffCanvas: function() {
				var offCanvasWrapper = mui('#offCanvasWrapper');
				offCanvasWrapper.offCanvas('close');
			},
			showLive: function() {
				var liveDate = new Date('2016-11-19 09:00:00');
//				liveDate = new Date('2016-11-18 17:30:00');
				var nowDate = new Date();
				var latertime = liveDate.getTime() - nowDate.getTime();
				console.log(latertime);
				var showYYLive = function() {
					var yyliveELs = document.querySelectorAll('.yylive');
					if(yyliveELs) {
						console.log(yyliveELs.length);
						for(var i = 0; i < yyliveELs.length; i++) {
							yyliveELs[i].classList.remove('mui-hidden');
						}
					}
				};
				if(latertime < 1000) {
					showYYLive();
				} else {
					timer = setTimeout(function() {
						showYYLive();
					}, latertime);
				}
				mui('#sliderBanner').on('tap', '.mui-slider-item', function() {
					var el = this;
					if(mui.os.ios) {
						plus && plus.runtime.openURL("http://act.3g.yy.com/outEmbed/mashu?src=18");
					} else {
						mui.openWindow({
							url: '../pub/yylive.html',
							id: 'pub_yylive'
						});
					}

					//					app.openPage("../pub/yylive.html", "pub_yylive", {}, function(w) {});
				});
			},
		},
		ready: function() {
			var self = this;

			mui.init({
				preloadPages: [{
					id: 'team_search',
					url: '../match/team_search.html'
				}],
				//					preloadLimit: 5 //预加载窗口数量限制(一旦超出,先进先出)默认不限制
			});

			var wgame_rank_detail;
			//页面第一次绑定完成执行 
			mui.ready(function() {

				var h = document.getElementById("img1").offsetHeight;
				document.getElementById("sliderBanner").style.height = h + 'px'
				document.getElementById("slider").style.height = 'calc(100% - ' + h + 'px)';
				//				setTimeout(function  () {
				//					
				//				document.querySelector(".mui-pull-top-tips").style.top=(h+50)+'px';
				//				},3000);
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});

				mui('#prStroke').pullToRefresh({
					down: {
						callback: function() {
							self.isStrokeUp = false;
							self.par.lastEId = "";
							self.par.lastDate = '';
							self.loadStroke(this);
						}
					},
					up: {
						contentnomore: '已加载全部',
						callback: function() {
							self.isStrokeUp = true;
							self.loadStroke(this);
						}
					}
				});
				self.loadStroke();
				mui('#prTeam').pullToRefresh({
					down: {
						callback: function() {
							self.reqTeamPar.pageIndex = 1;
							self.teamData.Total = 1;
							self.isStrokeUp = false;
							self.loadTeam(this);
						}
					},
					up: {
						contentnomore: '已加载全部',
						callback: function() {
							self.isStrokeUp = true;
							self.loadTeam(this);
						}
					}
				});
				mui('#prRiders').pullToRefresh({
					down: {
						callback: function() {
							self.reqRiderPar.pageIndex = 1;
							self.riderData.Total = 1;
							self.isStrokeUp = false;
							self.loadRider(this);
						}
					},
					up: {
						contentnomore: '已加载全部',
						callback: function() {
							self.isStrokeUp = true;
							self.loadRider(this);
						}
					}
				});
				mui('#prHorses').pullToRefresh({
					down: {
						callback: function() {
							self.reqHorsePar.pageIndex = 1;
							self.horseData.Total = 1;
							self.isStrokeUp = false;
							self.loadHorse(this);
						}
					},
					up: {
						contentnomore: '已加载全部',
						callback: function() {
							self.isStrokeUp = true;
							self.loadHorse(this);
						}
					}
				});
				var slider = {};
				document.getElementById("slider").addEventListener('slide', function(e) {
					self.curpageType = e.detail.slideNumber;
					if(e.detail.slideNumber === 0) {
						classList.add('mui-hidden');
					} else if(e.detail.slideNumber === 1) {
						classList.remove('mui-hidden');
					} else if(e.detail.slideNumber === 2) {
						classList.add('mui-hidden');
					} else if(e.detail.slideNumber === 3) {
						classList.remove('mui-hidden');
					} else if(e.detail.slideNumber === 4) {
						classList.remove('mui-hidden');
					}
					var num = e.detail.slideNumber + 1;
					if(num != 1 && !slider['slider' + num]) {
						num == 2 && self.loadTeam(), slider['slider' + num] = true;
						num == 3 && (self.rankTab(), slider['slider' + num] = true);
						num == 4 && self.loadRider(), slider['slider' + num] = true;
						num == 5 && self.loadHorse(), slider['slider' + num] = true;
					}
				});
				setTimeout(function() {
					self.Banners.length > 1 && mui("#sliderBanner").slider({
						interval: 5000
					});
					self.showLive();
					//					mui('#rankScrol1').scroll({
					//						indicators: true //是否显示滚动条
					//					});
				}, 3000)

				mui('#teams').on('tap', 'li', function() {
					var parData = this;
					self.detail(1, parData);
				});
				mui('#riders').on('tap', 'li', function() {
					var parData = this;
					self.detail(2, parData);
				});
				mui('#horses').on('tap', 'li', function() {
					var parData = this;
					self.detail(3, parData);
				});
				//				document.getElementById('slider').addEventListener('slide', function(e) {
				//					self.slide(e);
				//				});
				//				self.load();

				//				var page = mui.preload({
				//					url: '../game/detail.html',
				//					id: 'wgame_detail',
				//					styles: {
				//						popGesture: 'hide'
				//					}
				//				});
				//				mui('#sliderBanner').on('tap', '.mui-slider-item', function() {
				//					var el = this;
				//					//mui.toast(el.dataset.url);
				//					app.openPage("../pub/yylive.html", "pub_yylive", {}, function(w) {});
				//				});
				mui('#prStroke').on('tap', 'li', function() {
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
								}
							};
							var w = plus.webview.getWebviewById('wgame_detail');
							if(w) {
								mui.fire(w, 'reload', ref), w.show('slide-in-right');
							} else {
								w = mui.preload({
									url: '../game/detail.html',
									id: 'wgame_detail',
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

			mui.plusReady(function() {

				mui('#prRank').on('tap', 'li', function() {
					var el = this;
					var ref = {
						ref: {
							id: el.dataset.id
						}
					};
					var w = plus.webview.getWebviewById('wgame_rank_detail');
					if(w) {
						mui.fire(w, 'reload', ref), w.show('slide-in-right');
					} else {
						w = mui.preload({
							url: '../game/rank_detail.html',
							id: 'wgame_rank_detail',
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

					//					, wgame_rank_detail = mui.preload({
					//							url: 'rank_detail.html',
					//							id: 'wgame_rank_detail',
					//							styles: {
					//								popGesture: 'hide'
					//							}
					//						})
					//					mui.os.plus && (mui.fire(wgame_rank_detail, 'reload', {
					//						id: el.dataset.id,
					//						//						title: self.dataset.title,
					//					}), wgame_rank_detail.show('pop-in'));
				});
			});

		}
	});
});