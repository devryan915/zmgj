define(['app', 'mui', 'vue', 'mui.picker', 'jockeyClub.data'], function(app, mui, vue, mp) {
	var equestrianPicker = new mui.PopPicker({
		layer: 2
	});
	equestrianPicker.setData(equestrianData);
	var memberList = document.getElementById('memberList');
	var pr = document.getElementById('pr');
	var fins = document.getElementById('fins');
	var members = document.getElementById('members');
	var fins = document.getElementById('fins');
	var buttonUse = document.getElementById('buttonUse');

	var memeinfo = document.getElementById('memeinfo');
	var listHeight;
	(function() {
		listHeight = document.body.scrollHeight - 300;
		memberList.style.height = (listHeight) + 'px';
		pr.style.height = (listHeight - 1) + 'px';
		buttonUse.style.display = 'block';
	})();
	window.onresize = function() {
		//console.log(document.body.scrollHeight);
		listHeight = document.body.scrollHeight - 300;
		memberList.style.height = (listHeight) + 'px';
		pr.style.height = (listHeight - 1) + 'px';
	};
	var slideNumber = 0;
	var curPageType = 0;
	//	var postLock = 0;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			list: [],
			defImg:'http://chorse-sports.ufile.ucloud.com.cn/sys/defaul_bg_16_9.png',
			user: app.User.get(),
			chapter: {
				memberCount: 0,
				totalFin: 0
			},
			par: {
				pageIndex: 0,
				newsType: 1,

			},
			//添加关注
			atPar: {
				userID: ''
			},
			getCSumPar: {

			},
			Pages: 0,
			finlist: [],
			finpar: {
				pageIndex: 0,
				newsType: 1
			},
			finPages: 0,
			detailpar: {
				otherUserID: ''
			},
			pageData: {
				//				totalcount: 10,
				itemdata1: {
					Imgs: [''],
				},
				itemdata2: {
					Imgs: [''],
				},
				itemdata3: {
					Imgs: [''],
				},
				direction: '',
				//				isSlided: false,
			},
		},
		computed: {

		},
		methods: {
			goxch: function() {
				mui.openWindow({
					id: 'wequestrian_about',
					url: '../equestrian/about.html',
					waiting: {
						autoShow: false
					}
				});
			},
			//添加关注
			addAT: function() {
				//				mui.toast('addAT');
			},
			onclickClose: function() {
				//				mui.toast('onclickClose');
				document.querySelector('.mui-backdrop').style.display = 'none';
			},
			slide: function(e) {
				var self = this;
				var direction = self.pageData.direction;
				slideNumber = e.detail.slideNumber;
				//self.pageData.isSlided = true;
				var page;
				var type;
				if(slideNumber == 0) {
					page = self.pageData.itemdata1;
				} else if(slideNumber == 1) {
					page = self.pageData.itemdata2;
				} else if(slideNumber == 2) {
					page = self.pageData.itemdata3;
				}

				//				mui.toast(direction + ' ' + slideNumber + '\r\n ' + page.LastID + ' ' + page.UserID + ' ' + page.NextID);
				if(direction === 'right') {
					var str = '';
					//					var npage;
					self.detailpar.otherUserID = page.NextID;
					//					//console.log(direction+ ' ' + (slideNumber+ 1) % 3 + ' ' + Math.abs(slideNumber - self.pageData.curPageType));
					type = (slideNumber + 1) % 3;
					if(type == 0) {
						self.pageData.itemdata1.Imgs = [self.defImg];
						app.post('api/Chapter/GetMemberDtl', self.detailpar, function(data) {
							self.pageData.itemdata1 = data;
							//如果服务端没有数据，给默认值 
							if(!(data.Imgs && data.Imgs.length > 0)) {
								self.pageData.itemdata1.Imgs = [self.defImg];
							}
							app.loadImg();
						});
						//						npage = self.pageData.itemdata1;
					} else if(type == 1) {
						self.pageData.itemdata2.Imgs = [self.defImg];
						app.post('api/Chapter/GetMemberDtl', self.detailpar, function(data) {
							self.pageData.itemdata2 = data;
							//如果服务端没有数据，给默认值 
							if(!(data.Imgs && data.Imgs.length > 0)) {
								self.pageData.itemdata2.Imgs = [self.defImg];
							}
							app.loadImg();
						});
						//						npage = self.pageData.itemdata2;
					} else if(type == 2) {
						self.pageData.itemdata3.Imgs = [self.defImg];
						app.post('api/Chapter/GetMemberDtl', self.detailpar, function(data) {
							self.pageData.itemdata3 = data;
							//如果服务端没有数据，给默认值 
							if(!(data.Imgs && data.Imgs.length > 0)) {
								self.pageData.itemdata3.Imgs = [self.defImg];
							}
							app.loadImg();
						});
						//						npage = self.pageData.itemdata3;
					}

					//					npage.idx = (page.idx + 1) % self.pageData.totalcount;
					//					npage.name = 'next测试,女' + npage.idx + ' ' + type;
					//					npage.Lineage = 'next齐守祖';
					//					npage.Prize = 'next19999888';
					//					npage.Description = 'next我是描述';

				} else {
					//					var npage;
					type = (slideNumber - 1) >= 0 ? (slideNumber - 1) : 2;
					//					//console.log(direction + ' ' + type);
					self.detailpar.otherUserID = page.LastID;
					//					mui.toast(self.detailpar.otherUserID);
					if(type == 0) {
						self.pageData.itemdata1.Imgs = [self.defImg];
						app.post('api/Chapter/GetMemberDtl', self.detailpar, function(data) {
							self.pageData.itemdata1 = data;
							//如果服务端没有数据，给默认值 
							if(!(data.Imgs && data.Imgs.length > 0)) {
								self.pageData.itemdata1.Imgs = [self.defImg];
							}
							app.loadImg();
						});
						//						npage = self.pageData.itemdata1;
					} else if(type == 1) {
						self.pageData.itemdata2.Imgs = [self.defImg];
						app.post('api/Chapter/GetMemberDtl', self.detailpar, function(data) {
							self.pageData.itemdata2 = data;
							//如果服务端没有数据，给默认值 
							if(!(data.Imgs && data.Imgs.length > 0)) {
								self.pageData.itemdata2.Imgs = [self.defImg];
							}
							app.loadImg();
						});
						//						npage = self.pageData.itemdata2;
					} else if(type == 2) {
						self.pageData.itemdata3.Imgs = [self.defImg];
						app.post('api/Chapter/GetMemberDtl', self.detailpar, function(data) {
							self.pageData.itemdata3 = data;
							//如果服务端没有数据，给默认值 
							if(!(data.Imgs && data.Imgs.length > 0)) {
								self.pageData.itemdata3.Imgs = [self.defImg];
							}
							app.loadImg();
						});
						//						npage = self.pageData.itemdata3;
					}
					if(!page.IsFocus) {
						//						self.atPar.userID = page.UserID;
						//						app.post('api/Chapter/AddFocusUser', self.atPar, function(data) {
						//							page.IsFocus = true;
						//							mui.toast('成功添加好友');
						//							//							postLock = 0;
						//						}, function() {});
					}
					//					npage.idx = (page.idx - 1) >= 0 ? (page.idx - 1) : (self.pageData.totalcount - 1);
					//					npage.name = 'last测试,女' + npage.idx + ' ' + type;
					//					npage.Lineage = 'last齐守祖';
					//					npage.Prize = 'last19999888';
					//					npage.Description = 'last我是描述';
				}
				//				self.pageData.isSlided = false;
			},
			drag: function(e) {
				var self = this;
				self.pageData.direction = e.detail.direction;
			},
			detail: function(id) {
				var self = this;
				if(id === self.user.UserID) {
					//自己不能查看自己的
					return;
				}
				self.detailpar.otherUserID = id;
				//				mui.toast(slideNumber + ' 当前页');
				//								//console.log(self.detailpar.otherUserID);
				//				self.pageData.itemdata1.NickName = '测试,女0';
				//
				//				self.pageData.itemdata2.NickName = '测试,女1';
				//
				//				self.pageData.itemdata3.NickName = '我是描述2';
				//获取个人详情
				app.post('api/Chapter/GetMemberDtl', self.detailpar, function(data1) {
					//					if (sliderItem) {
					//						for (i = 0; i < sliderItem.length; i++) {
					//							sliderItem[i].classList.remove('mui-active');
					//						}
					//						sliderItem[1].classList.add('mui-active');
					//					}
					self.pageData.itemdata1 = data1;
					//如果服务端没有数据，给默认值 
					if(!(data1.Imgs && data1.Imgs.length > 0)) {
						self.pageData.itemdata1.Imgs = [self.defImg];
					}
					//					mui.toast(self.detailpar.otherUserID);
					self.detailpar.otherUserID = self.pageData.itemdata1.NextID;
					//console.log(self.detailpar.otherUserID);
					app.post('api/Chapter/GetMemberDtl', self.detailpar, function(data2) {
						self.pageData.itemdata2 = data2;
						//如果服务端没有数据，给默认值 
						if(!(data2.Imgs && data2.Imgs.length > 0)) {
							self.pageData.itemdata2.Imgs = [self.defImg];
						}
						app.loadImg();
					});
					self.detailpar.otherUserID = self.pageData.itemdata1.LastID;
					//console.log(self.detailpar.otherUserID);
					app.post('api/Chapter/GetMemberDtl', self.detailpar, function(data3) {
						self.pageData.itemdata3 = data3;
						//如果服务端没有数据，给默认值 
						if(!(data3.Imgs && data3.Imgs.length > 0)) {
							self.pageData.itemdata3.Imgs = [self.defImg];
						}
						app.loadImg();
					});
				});
				document.querySelector('.mui-backdrop').style.display = 'block';
				var gallery = mui('#slider').slider();
				gallery.refresh();
				//				gallery.nextItem();
				gallery.gotoItem(0);
				//如果有图片且，图片数量大于1
				mui("#slider0").slider({
					interval: 3000
				});
				mui("#slider1").slider({
					interval: 3000
				});
				mui("#slider2").slider({
					interval: 3000
				});
				mui("#slider3").slider({
					interval: 3000
				});
				mui("#slider4").slider({
					interval: 3000
				});
			},
			load: function() {
				//				mui.toast('load');
				var self = this;
				//				var testData = '[';
				//				for (i = 0; i < 5; i++) {
				//					testData += '{"ImgUrl":"../../img/clubuserheader/head1.png","Name":"testData","UserID":' + i + '}, ';
				//				}
				//				testData.substr(0, testData.length - 1);
				//				var tempd = eval(testData + ']');
				app.post('api/Chapter/GetMemberLst', self.par, function(data) {
					//					mui.toast(JSON.stringify(data));
					self.Pages = Math.ceil(data.Total / 20.0);
					self.chapter.memberCount = data.Total;
					//					for(i = 0; i < data.Items.length; i++) {
					//						data.Items[i].ImgUrl = '../../img/clubuserheader/head1.png';
					//					}
					self.list = self.list.concat(data.Items);
					//					self.list[0].IsRed = false;
					//				mui('#pr').pullRefresh().endPullupToRefresh(true);
					mui('#pr').pullRefresh().endPullupToRefresh((self.par.pageIndex >= self.Pages));
					app.loadImg();
				}, function() {
					mui('#pr').pullRefresh().endPullupToRefresh(false)
				});
			},
			loadFin: function() {
				var self = this;
				//				var testData = '[';
				//				for (i = 0; i < 5; i++) {
				//					testData += '{"ImgUrl":"../../img/clubuserheader/head1.png","Name":"testData"},';
				//				}
				//				testData.substr(0, testData.length - 1);
				//				var tempd = eval(testData + ']');
				app.post('api/Chapter/GetCRA', self.finpar, function(data) {
					self.finPages = Math.ceil(data.Total / 20.0);
					self.finlist = self.finlist.concat(data);
					//					mui.toast((self.finpar.pageIndex >= self.finPages));
					mui('#pr').pullRefresh().endPullupToRefresh((self.finpar.pageIndex >= self.finPages));
				}, function() {
					mui('#pr').pullRefresh().endPullupToRefresh(false);
				});
			},
			showPage: function() {
				//会长权限暂时关闭
				return;
				var self = this;
				//				if (listHeight) {
				//				listHeight = (document.body.scrollHeight - 300);
				//				}
				switch(curPageType) {
					case 0:
						//只有会长才可以看财务
						if(self.isMatser()) {
							//						mui.init({
							//							pullRefresh: {
							//								container: '#pr',
							//								up: {
							//									contentrefresh: '正在加载...',
							//									contentnomore: '已加载全部',
							//									callback: function() {
							//										self.par.pageIndex++;
							//										self.load();
							//									}
							//								}
							//							}
							//						});
							fins.style.display = 'block';
							members.style.display = 'none';
							curPageType = 1;
							//						mui('#fin').pullRefresh().disablePullupToRefresh();
							//						mui('#pr').pullRefresh().enablePullupToRefresh();
							mui('#pr').pullRefresh().refresh(true);
							//						mui('#pr').container = '#members';
							mui('#pr').pullRefresh().pullupLoading();
							memberList.style.height = (listHeight + 62) + 'px';
							pr.style.height = (listHeight + 62) + 'px';
							buttonUse.style.display = 'none';
						} else {
							mui.toast('您不是会长');
						}
						break;
					case 1:

						//						mui.init({
						//							pullRefresh: {
						//								container: '#fin',
						//								up: {
						//									contentrefresh: '正在加载...',
						//									contentnomore: '已加载全部',
						//									callback: function() {
						//										self.finpar.pageIndex++;
						//										self.loadFin();
						//									}
						//								}
						//							},
						//						});
						fins.style.display = 'none';
						members.style.display = 'block';
						//						mui('#pr').pullRefresh().disablePullupToRefresh();
						//						mui('#fin').pullRefresh().enablePullupToRefresh();
						mui('#pr').pullRefresh().refresh(true);
						//						mui('#fin').pullRefresh().pullupLoading();
						curPageType = 0;
						//						mui('#pr').container = '#fins';
						memberList.style.height = (listHeight) + 'px';
						pr.style.height = (listHeight) + 'px';
						buttonUse.style.display = 'block';
						mui('#pr').pullRefresh().pullupLoading();

						break;
					default:
						break;
				}
			},
			reload: function() {
				var self = this;
				self.user = app.User.get();
				self.finpar.pageIndex = 0;
				self.par.pageIndex = 0;
				self.finlist = [];
				self.list = [];
				mui('#pr').pullRefresh().pullupLoading();
				if(self.isMatser()) {
					app.post('api/Chapter/GetCSum', self.getCSumPar, function(data) {
						self.chapter.totalFin = data;
					});
				}
			},
			isMatser: function() {
				var self = this;
				self.user = app.User.get();
				return !!self.user.IsMaster || !!self.user.IsChapterMaster || !!self.user.IsChapterL1Master;
			},
			changeClub: function() {
				var self = this;
				if(!self.isMatser()) {
					var btnArray = ['否', '是'];
					mui.confirm('您确定要转出' + self.user.ChapterName + '，确认？', '提示', btnArray, function(e) {
						if(e.index == 1) {
							equestrianPicker.show(function(items) {
								//console.log(items[0].value + ' ' + items[1].value);
								if(items[1].value) {
									//取二级分会
									var item = items[1];
									var par = {
										chapterId: item.value,
									};
									//console.log(item.value + ' ' + item.text);
									app.post('api/User/ChangeChaper', par, function(data) {
										self.user.ChapterID = item.value;
										self.user.ChapterName = item.text;
										app.User.set(self.user);
										self.reload();
									});
								} else {
									mui.toast('不能加入' + items[0].text);
								}
							});
							//						app.Cache.set(app.Cache.key.chooseFromPage.toKeyName(), '../me/mychapter.html');
							//						app.Cache.set(app.Cache.key.chooseFromPageID.toKeyName(), 'mychapter');
							//						//清掉选择的分会
							//						app.Cache.setObject(app.Cache.key.choosedClub.toKeyName(), '');
							//						mui.openWindow({
							//							id: 'chooseclub',
							//							url: '../pub/chooseclub.html',
							//							extras: {
							//								type: 1
							//							},
							//							show: {
							//								aniShow: false
							//							},
							//							waiting: {
							//								autoShow: false
							//							}
							//						});
						} else {}
					});
				} else {
					mui.toast('会长不能转会');
				}
			}
		},
		ready: function() {
			var self = this;
			var slide = document.querySelector('.mui-slider');
			slide.addEventListener('slide', function(event) {
				self.slide(event);
			});
			window.addEventListener('reload', function(e) {
				try {
					//console.log('reload');
					self.reload();

				} catch(e) {}

			});
			try {
				//页面第一次绑定完成执行 
				mui.ready(function() {
					//					mui.toast(document.body.scrollHeight);

					if(self.isMatser()) {
						app.post('api/Chapter/GetCSum', self.getCSumPar, function(data) {
							self.chapter.totalFin = data;
						});
					}
					mui('.mui-scroll-wrapper').scroll({
						scrollY: true, //是否竖向滚动
						scrollX: false, //是否横向滚动
						startX: 0, //初始化时滚动至x
						startY: 0, //初始化时滚动至y
						indicators: true, //是否显示滚动条
						deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
						bounce: true //是否启用回弹
					});
					/* 获得元素的位置信息 */
					mui.init({
						pullRefresh: {
							container: '#pr',
							up: {
								//							height: 50, //可选.默认50.触发上拉加载拖动距离
								//							auto: true, //可选,默认false.自动上拉加载一次
								contentrefresh: '正在加载...',
								contentnomore: '已加载全部',
								callback: function() {
									if(curPageType == 1) {
										//									mui.toast('loadFin');
										//									setTimeout(function() {
										self.finpar.pageIndex++;
										self.loadFin();
										//									}, 2000);
									} else {
										//									mui.toast('load');
										self.par.pageIndex++;
										self.load();
									}
								}
							}
						}
					});
					setTimeout(function() {
						mui('#pr').pullRefresh().pullupLoading();
					}, 500);
					//					if (mui.os.plus) {
					//						mui.plusReady(function() {
					//							
					//							
					//						});
					//					}
					//					mui(".mui-slider").forEach(function(item) {
					//						item.slider({
					//							interval: 1000
					//						});
					//					});
					mui("#slider0").slider({
						interval: 1000
					});
					mui("#slider1").slider({
						interval: 1000
					});
					mui("#slider2").slider({
						interval: 1000
					});
					mui("#slider3").slider({
						interval: 1000
					});
					mui("#slider4").slider({
						interval: 1000
					});
				});
			} catch(e) {
				//console.log(e);
			}
		}
	});
});