define(['app', 'mui', 'vue', 'load'], function(app, mui, vue, ld) {
	app.showWaiting(1);
	var slideNumber = 0;
	var slider;
	var sliderImgsCanSlider = true;
	var canSliderInterval = true;
	var pkg1 = document.getElementById('pkg1');
	pkg1 && pkg1.classList.remove('mui-hidden');
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			urlStr: '',
			pageID: '',
			defImg: 'http://chorse-sports.ufile.ucloud.com.cn/sys/defaul_bg_16_9.png',
			//播放支持动画
			spAni: null,
			//1比赛骑手列表过来，2战队战队成员过来，3参赛名单过来,4领取奖励
			pageType: 3,
			corpsID: '',
			user: app.User.get(),
			repar: {
				projectId: '',
				rosterId: '',
				//				payPwd: '',
				//				receiveType: 1,
				//				realName: '',
				//				bankCard: '',
				//				bankName: ''
			},
			//添加关注
			atPar: {
				userID: ''
			},
			o: {},
			parSupport: {
				projectId: '',
				rid: '',
				rType: 0,
				payPwd: '',
				isPayPwd: ''
			},
			pageData: {
				//领取奖励
				recevieMB: 0,
				totalcount: 10,
				itemdata1: {
					idx: 0,
					NickName: "",
					groupName: "",
					personSign: "",
					Imgs: [''],
					points: 300,
					SNum: 0,
					ChapterName: '',
					RealName: '',
					FeeNum: 0,
					SelfReward: 0,
				},
				itemdata2: {
					idx: 0,
					NickName: "",
					groupName: "",
					personSign: "",
					Imgs: [''],
					points: 300,
					SNum: 0,
					ChapterName: '',
					RealName: '',
					FeeNum: 0,
					SelfReward: 0,
				},
				itemdata3: {
					idx: 0,
					NickName: "",
					groupName: "",
					personSign: "",
					Imgs: [''],
					points: 300,
					SNum: 0,
					ChapterName: '',
					RealName: '',
					FeeNum: 0,
					SelfReward: 0,
				},
				direction: '',
				//				isSlided: false,

			},
		},
		computed: {

		},
		methods: {
			//			testData: function(item) {
			//				if (!item.BannerUrl) {
			//					item.BannerUrl = '../../img/index_1.png';
			//				}
			//				if (!item.ImgUrl) {
			//					item.ImgUrl = '../../img/head.png';
			//				}
			//			},
			slide: function(e) {
				var self = this;
				var direction = self.pageData.direction;
				slideNumber = e.detail.slideNumber;
				//self.pageData.isSlided = true;
				var page;
				var lastPage;
				var nextPage;
				var type;
				canSliderInterval = false;
				if(slideNumber == 0) {
					lastPage = self.pageData.itemdata3;
					page = self.pageData.itemdata1;
					nextPage = self.pageData.itemdata2;
					slider = mui("#slider1").slider();
					slider.refresh();
					//					slider.gotoItem(0);
				} else if(slideNumber == 1) {
					lastPage = self.pageData.itemdata1;
					page = self.pageData.itemdata2;
					nextPage = self.pageData.itemdata3;
					slider = mui("#slider2").slider();
					slider.refresh();
					//					slider.gotoItem(0);
				} else if(slideNumber == 2) {
					lastPage = self.pageData.itemdata2;
					page = self.pageData.itemdata3;
					nextPage = self.pageData.itemdata1;
					slider = mui("#slider3").slider();
					slider.refresh();
					//					slider.gotoItem(0);
				}
				sliderImgsCanSlider = page.hasMoreImg;
				//				(!sliderImgsCanSlider) && (slider.gotoItem(0));

				var par;
				if(direction === 'right') {
					lastPage.Imgs = [self.defImg];
					var str = '';
					//					if(self.pageType == 3) {
					//						if(!page.UserID)
					//							return;
					//						par = self.getReqPar(page.UserID);
					//					} else {
					if(!page.LastID)
						return;
					par = self.getReqPar(page.LastID);
					//						}
					type = (slideNumber - 1) >= 0 ? (slideNumber - 1) : 2;
					if(!nextPage.IsFocus) {
						//						self.atPar.userID = nextPage.UserID;
						//						console.log('添加关注：' + nextPage.NickName);
						//						app.post('api/Chapter/AddFocusUser', self.atPar, function(data) {
						//							nextPage.IsFocus = true;
						//							mui.toast('成功添加好友');
						//						}, function() {});
					}
				} else {
					nextPage.Imgs = [self.defImg];
					type = (slideNumber + 1) % 3;
					//					if(self.pageType == 3) {
					//						if(!page.UserID)
					//							return;
					//						par = self.getReqPar(page.UserID);
					//					} else {
					if(!page.NextID)
						return;
					par = self.getReqPar(page.NextID);
					//					}
				}
				if(page.Imgs && page.Imgs.length > 0) {
					document.querySelector('.blur').dataset.img = page.Imgs[0];
				} else {
					document.querySelector('.blur').dataset.img = self.defImg;
				}
				//				console.log('跟换背景：' + document.querySelector('.blur').dataset.img);
				app.loadImg();
				//				mui.toast(par.userID);
				app.post(self.urlStr, par, function(data) {
					//					self.testData(data);
					if(type == 0) {
						self.pageData.itemdata1 = data;
						self.pageData.itemdata1.hasMoreImg = self.pageData.itemdata1.Imgs && self.pageData.itemdata1.Imgs.length > 1;
						(!(self.pageData.itemdata1.Imgs && self.pageData.itemdata1.Imgs.length > 0)) && (self.pageData.itemdata1.Imgs = [self.defImg]);
						var s = mui("#slider1").slider();
						s.refresh();
						(!self.pageData.itemdata1.hasMoreImg) && (s.gotoItem(0));
						self.pageData.itemdata1.groupName = self.pageData.itemdata1.ChapterName;
					} else if(type == 1) {
						self.pageData.itemdata2 = data;
						self.pageData.itemdata2.hasMoreImg = self.pageData.itemdata2.Imgs && self.pageData.itemdata2.Imgs.length > 1;
						(!(self.pageData.itemdata2.Imgs && self.pageData.itemdata2.Imgs.length > 0)) && (self.pageData.itemdata2.Imgs = [self.defImg]);
						var s = mui("#slider2").slider();
						s.refresh();
						(!self.pageData.itemdata2.hasMoreImg) && (s.gotoItem(0));
						self.pageData.itemdata2.groupName = self.pageData.itemdata2.ChapterName;
					} else if(type == 2) {
						self.pageData.itemdata3 = data;
						self.pageData.itemdata3.hasMoreImg = self.pageData.itemdata3.Imgs && self.pageData.itemdata3.Imgs.length > 1;
						(!(self.pageData.itemdata3.Imgs && self.pageData.itemdata3.Imgs.length > 0)) && (self.pageData.itemdata3.Imgs = [self.defImg]);
						var s = mui("#slider3").slider();
						s.refresh();
						(!self.pageData.itemdata3.hasMoreImg) && (s.gotoItem(0));
						self.pageData.itemdata3.groupName = self.pageData.itemdata3.ChapterName;
					}

					app.loadImg();
					//					self.autoSlide();
				});
			},
			drag: function(e) {
				var self = this;
				self.pageData.direction = e.detail.direction;
			},
			getReqPar: function(id) {
				var self = this;
				var par;
				if(self.pageType == 2) {
					par = {
						userID: id,
						corpsId: self.corpsID
					};
				} else if(self.pageType == 1) {
					par = {
						userID: id,
					};
				} else if(self.pageType == 3) {
					par = {
						rosterId: id,
						projectId: self.parSupport.projectId,
						rType: self.parSupport.rType,
						isDown: 1,
					};
				}
				return par;
			},
			autoSlide: function() {
				var self = this;
				setInterval(function() {
					if(slider && sliderImgsCanSlider) {
						if(canSliderInterval) {
							//							console.log('自动轮询' + slideNumber + ' ');
							//							slider.refresh();
							slider.nextItem();
						} else {
							setTimeout(function() {
								canSliderInterval = true;
							}, 1000);
						}
					} else {
						//						console.log('当前不能自动轮询' + slideNumber + ' ');
					}
				}, 3000);
			},
			playAnimationed: function() {
				var self = this;
				//				pulse
				var aniEl = document.querySelectorAll('.support-animated');
				if(aniEl) {
					for(var i = 0; i < aniEl.length; i++) {
						var elem = aniEl[i];
						if(elem.dataset.id == self.parSupport.rid) {
							(function(item) {
								item.classList.add('pulse');
								setTimeout(function() {
									item.classList.remove('pulse');
								}, 500);
							})(elem);
						}
					}
					//					aniEl.forEach(function(item) {
					//						var elem = item;
					//						elem.classList.add('pulse');
					//						setTimeout(function() {
					//							elem.classList.remove('pulse');
					//						}, 500);
					//					});
				}
			},
			load: function(id) {
				var riderID = id;
				var self = this;
				//				setTimeout(function() {
				//					app.closeWaiting();
				//				}, 1000);
				var par = self.getReqPar(riderID);
				self.autoSlide();
				par.isDown = '0';
				//获取个人详情
				app.post(self.urlStr, par, function(data1) {
					//					self.testData(data1);
					self.pageData.itemdata1 = data1;
					self.pageData.itemdata1.hasMoreImg = self.pageData.itemdata1.Imgs && self.pageData.itemdata1.Imgs.length > 1;
					(!(self.pageData.itemdata1.Imgs && self.pageData.itemdata1.Imgs.length > 0)) && (self.pageData.itemdata1.Imgs = [self.defImg]);
					sliderImgsCanSlider = self.pageData.itemdata1.hasMoreImg;
					app.loadImg();
					ld.show();
					var gallery = mui('#slider').slider();
					gallery.refresh();
					gallery.gotoItem(0);
					slider = mui("#slider1").slider();
					slider.refresh();
					slider.gotoItem(0);
					app.closeWaiting();
					//					self.autoSlide();
					//					if(self.pageType == 3) {
					//						self.pageData.itemdata1.groupName = self.pageData.itemdata1.ChapterName;
					//						app.post(self.urlStr, self.getReqPar(self.pageData.itemdata1.UserID), function(data2) {
					//							self.pageData.itemdata2 = data2;
					//							self.pageData.itemdata2.hasMoreImg = self.pageData.itemdata2.Imgs && self.pageData.itemdata2.Imgs.length > 1;
					//							self.pageData.itemdata2.groupName = self.pageData.itemdata2.ChapterName;
					//							app.loadImg();
					//							self.autoSlide();
					//							app.post(self.urlStr, self.getReqPar(self.pageData.itemdata2.UserID), function(data3) {
					//								self.pageData.itemdata3 = data3;
					//								self.pageData.itemdata3.hasMoreImg = self.pageData.itemdata3.Imgs && self.pageData.itemdata3.Imgs.length > 1;
					//								app.loadImg();
					//								self.autoSlide();
					//								self.pageData.itemdata3.groupName = self.pageData.itemdata3.ChapterName;
					//							});
					//						});
					//					} else {
					app.post(self.urlStr, self.getReqPar(self.pageData.itemdata1.NextID), function(data2) {
						self.pageData.itemdata2 = data2;
						self.pageData.itemdata2.hasMoreImg = self.pageData.itemdata2.Imgs && self.pageData.itemdata2.Imgs.length > 1;
						(!(self.pageData.itemdata2.Imgs && self.pageData.itemdata2.Imgs.length > 0)) && (self.pageData.itemdata2.Imgs = [self.defImg]);
						//						self.autoSlide();
						app.loadImg();
					});
					app.post(self.urlStr, self.getReqPar(self.pageData.itemdata1.LastID), function(data3) {
						self.pageData.itemdata3 = data3;
						self.pageData.itemdata3.hasMoreImg = self.pageData.itemdata3.Imgs && self.pageData.itemdata3.Imgs.length > 1;
						(!(self.pageData.itemdata3.Imgs && self.pageData.itemdata3.Imgs.length > 0)) && (self.pageData.itemdata3.Imgs = [self.defImg]);
						//						self.autoSlide();
						app.loadImg();
					});
					//					}
				}, function() {
					app.showError(function() {
						app.showWaiting(1);
						self.load(riderID);
					});
					app.closeWaiting();
				});
			},
			created: function() {
				//				console.log('created');
			},
			close: function() {
				document.querySelector('.riderinfo-backdrop').style.display = 'none';
			},
			reReward: function() {
				var self = this;
				app.showWaiting();
				app.post('api/User/ReceiveReward', self.repar, function(data) {
					switch(self.pageID) {
						case '1':
							self.pageData.itemdata1.SelfReward = 0;
							break;
						case '2':
							self.pageData.itemdata2.SelfReward = 0;
							break;
						case '3':
							self.pageData.itemdata3.SelfReward = 0;
							break;
						default:
							break;
					}
					var user = app.User.get();
					user.MB += data;
					app.User.set(user);
					//刷新马币
					mui.os.plus && mui.fire(plus.webview.getWebviewById('windex2'), 'reload', {
						type: 'mb'
					});
					//					var ref = {
					//						ref: {
					//							id: el.dataset.id,
					//							fee: el.dataset.fee,
					//							rtype: el.dataset.rtype,
					//							FreeNum: el.dataset.freeNum,
					//							NowSupportNum: el.dataset.nowSupportNum,
					//							endtime: el.dataset.time,
					//						}
					//					}
					//					var w = plus.webview.getWebviewById('wactivity_contestants');
					//					if(w) {
					//						mui.fire(w, 'reload', ref), w.show('slide-in-right');
					//					} else {
					//						w = mui.preload({
					//							url: '../activity/contestants.html',
					//							id: 'wactivity_contestants',
					//							styles: {
					//								popGesture: 'hide'
					//							},
					//							extras: ref,
					//						});
					//						w.show('slide-in-right');
					//						w.addEventListener('hide', function() {
					//							mui.fire(w, 'unload', {});
					//						});
					//					}
					self.pageData.recevieMB = data;
					document.querySelector('.riderinfo-backdrop').style.display = 'block';
					app.closeWaiting();
				}, function() {
					app.closeWaiting();
				});
			},
			support: function() {
				var self = this;
				app.showWaiting();
				app.post('api/Events/Support', self.parSupport, function(data) {
					//					console.log('当前页面：' + self.pageID);
					switch(self.pageID) {
						case '1':
							//							console.log(self.pageData.itemdata1.SNum + ' ' + self.pageData.itemdata1.NowSupportNum);
							self.pageData.itemdata1.SNum++;
							self.pageData.itemdata1.NowSupportNum++;
							self.pageData.itemdata1.SupportNum++;
							//							console.log(self.pageData.itemdata1.SNum + ' ' + self.pageData.itemdata1.NowSupportNum);
							break;
						case '2':
							//							console.log(self.pageData.itemdata2.SNum + ' ' + self.pageData.itemdata2.NowSupportNum);
							self.pageData.itemdata2.SNum++;
							self.pageData.itemdata2.NowSupportNum++;
							self.pageData.itemdata2.SupportNum++;
							//							console.log(self.pageData.itemdata2.SNum + ' ' + self.pageData.itemdata2.NowSupportNum);
							break;
						case '3':
							//							console.log(self.pageData.itemdata3.SNum + ' ' + self.pageData.itemdata3.NowSupportNum);
							self.pageData.itemdata3.SNum++;
							self.pageData.itemdata3.NowSupportNum++;
							self.pageData.itemdata3.SupportNum++;
							//							console.log(self.pageData.itemdata3.SNum + ' ' + self.pageData.itemdata3.NowSupportNum);
							break;
						default:
							break;
					}
					if(self.o.nsn >= self.o.freeNum) {
						var user = app.User.get();
						user.MB = user.MB - self.o.feeNum;
						if(self.parSupport.isPayPwd.toString() != '') {
							user.IsPayPwd = self.parSupport.isPayPwd;
						}
						app.User.set(user);
						mui.os.plus && mui.fire(plus.webview.getLaunchWebview(), 'reload', {
							type: 'userInfo'
						});
					}
					self.o.nsn++;
					app.closeWaiting();
					self.playAnimationed();
				}, function() {
					//如果支持失败则使用密码

					app.closeWaiting();
				});
			}
		},
		ready: function() {
			var self = this;
			//			mui('.rider-receive').each(function() {
			//				mui.toast('mui-hidden');
			//				this.classList.remove('mui-hidden');
			//			});

			var slide = document.querySelector('.mui-slider');
			slide.addEventListener('slide', function(event) {
				self.slide(event);
			});
			//第一次进入页面需要支付密码
			var user = app.User.get();
			user.IsPayPwd = true;
			app.User.set(user);
			//页面第一次绑定完成执行 
			mui.ready(function() {
				//				var hiddens = document.querySelectorAll('.mui-hidden');
				//				mui.toast(hiddens.length);
				//				hiddens && mui.each(hiddens, function(index, item) {
				//					item.classList.remove('mui-hidden');
				//				});
				mui('.rider-title').on('tap', '.rider-receive', function() {
					var el = this;
					//					console.log(el.dataset.id);
					self.pageID = el.dataset.pageid;
					self.repar.rosterId = el.dataset.id;
					//领取奖励
					self.reReward();
				});
				mui('.rider-title').on('tap', '.rider-handsp', function() {
					var el = this;

					self.parSupport.rid = el.dataset.id;
					self.pageID = el.dataset.pageid;
					self.o.feeNum = el.dataset.feenum;
					self.o.freeNum = el.dataset.freenum;
					self.o.nsn = el.dataset.nsn;

					//					console.log('当前页面：' + (self.pageID==1)+' '+typeof(self.pageID));
					if(self.o.nsn >= self.o.freeNum && app.User.get().IsPayPwd) {
						var content = '	<div>' + '<input type="password" id="payPwd" placeholder="请输入登录密码" class="mui-input-password" />' + '<label for="isPayPwd"><input id="isPayPwd" checked="checked" type="checkbox" />不再提醒</label>' + '</div>';
						mui.confirm(content, '需支付 ' + self.o.feeNum + ' 马币', ['取消', '确认支付'], function(e) {
							if(e.index == 1) {
								self.parSupport.payPwd = document.getElementById("payPwd").value;
								self.parSupport.isPayPwd = !document.getElementById("isPayPwd").checked;
								self.support();
							}
						}, 'div');
					} else {
						self.support();
					}

				});
				//添加newId自定义事件监听
				window.addEventListener('riderID', function(event) {
					//获得事件参数
					if(event.detail.riderID) {
						//						console.log('event riderinfo ' + event.detail.riderID);
						self.pageType = selfPage.pageType;
						self.corpsID = event.detail.corpsID;
						if(self.pageType == 1) {
							self.urlStr = 'api/Events/GetRiderDtl';
						} else if(self.pageType == 2) {
							self.urlStr = 'api/Events/GetCorpsRiderDtl';
						} else if(self.pageType == 3) {
							self.urlStr = 'api/Events/GetRosterInfo';
							self.parSupport.projectId = event.detail.pid;
							self.parSupport.rType = event.detail.rtype;
							self.o.nsn = event.detail.nsn;
							self.o.freeNum = event.detail.freeNum;
							self.o.feeNum = event.detail.feeNum;
							self.repar.projectId = event.detail.pid;
						}
						self.load(event.detail.riderID);
					}
					//mui.currentWebview.show();
				});

			});
			mui.plusReady(function() {
				var selfPage = plus.webview.currentWebview();
				if(selfPage && selfPage.riderID) {
					//					console.log('new riderinfo ' + selfPage.riderID);
					self.pageType = selfPage.pageType;
					self.corpsID = selfPage.corpsID;
					if(self.pageType == 1) {
						self.urlStr = 'api/Events/GetRiderDtl';
					} else if(self.pageType == 2) {
						self.urlStr = 'api/Events/GetCorpsRiderDtl';
					} else if(self.pageType == 3) {
						self.urlStr = 'api/Events/GetRosterInfo';
						self.parSupport.projectId = selfPage.pid;
						self.parSupport.rType = selfPage.rtype;
						self.o.nsn = selfPage.nsn;
						self.o.freeNum = selfPage.freeNum;
						self.o.feeNum = selfPage.feeNum;
						self.repar.projectId = selfPage.pid;
					}
					self.load(selfPage.riderID);
				}
			});
		}
	});
});