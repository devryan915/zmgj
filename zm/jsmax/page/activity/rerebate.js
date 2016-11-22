define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var timeInterval;
	var refreshInterval;
	//此页面需要登录之后才可以访问
	app.checkLogin(function() {
		var rebateLevelLine;
		var rebateLevel;
		var vm = new vue({
			el: '#app', //绑定范围
			data: {
				par: {
					idx: 'G1602',
					stage: 0,
				},
				rpar: {
					idx: 'G1602',
					stage: 0,
				},
				pageData: {
					imgLevel: [{
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/rrb_1.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/rrb_2.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/rrb_3.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/rrb_4.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/rrb_5.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/rrb_6.png'
					}, ],
					reimgLevel: [{
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/aab_1.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/aab_2.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/aab_3.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/aab_4.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/aab_5.png'
					}, {
						imgUrl: 'http://chorse-sports.ufile.ucloud.com.cn/sys/aab_6.png'
					}, ],
					//显示活动开始时间
					sBTime: '',
					//显示活动结束时间
					sETime: '',
					beginTime: null,
					endTime: null,
					curGoal: '',
					nGoal: '',
					nGoalText: '下轮目标',
					per: 0,
					curStage: 0,
					timeTitle: '活动倒计时',
					MyAct: [],
					//可领取的阶段
					reState: 0,
					Confs: [],
					//				rebate: '',
				},
				time: {
					h: '00',
					m: '00',
					s: '00',
				}
			},
			computed: {
				canReceive: function() {
					var self = this;
					return self.pageData.reState >= 1 && self.pageData.reState <= 6;
				},
			},
			methods: {
				close: function() {
					document.querySelector('.mui-backdrop').style.display = 'none';
				},
				receive: function() {
					var self = this;
					app.showWaiting();
					self.rpar.stage = this.pageData.reState;
					document.querySelector('.receive-bg').querySelector('img').src = 'http://chorse-sports.ufile.ucloud.com.cn/sys/rrb_mb.png';
					app.post('api/Lucky/LuckyActive', self.rpar, function(data) {
							self.pageData.MyAct.push(self.pageData.reState);
							document.querySelector('.receive-down').innerText = '恭喜您获得 ' + data.LukeyItem.Qty + ' 马币';
							self.getNextReStage();
							setTimeout(function() {
								document.querySelector('.mui-backdrop').style.display = 'block';
							}, 500);
							var user = app.User.get();
							user.MB += data.LukeyItem.Qty;
							app.User.set(user);
							//刷新马币
							mui.os.plus && mui.fire(plus.webview.getWebviewById('windex2'), 'reload', {
								type: 'mb'
							});
							app.closeWaiting();
						},
						function() {
							document.querySelector('.receive-down').innerText = '很遗憾，领取失败';
							document.querySelector('.receive-bg').querySelector('img').src = 'http://chorse-sports.ufile.ucloud.com.cn/sys/rrb_kulian.png';
							setTimeout(function() {
								document.querySelector('.mui-backdrop').style.display = 'block';
							}, 500);
							app.closeWaiting();
						});
				},
				clearInval: function() {
					timeInterval && clearInterval(timeInterval);
					refreshInterval && clearInterval(refreshInterval);
				},
				load: function() {
					var self = this;
					app.showWaiting();
					app.post('api/Lucky/GetMyLuckyActive', self.par, function(data) {
						self.pageData.sBTime = data.LckyItem.BeginDT.Format('yyyy.MM.dd');
						self.pageData.sETime = data.LckyItem.EndDT.Format('yyyy.MM.dd');
						self.pageData.beginTime = new Date(data.LckyItem && Date.parse(data.LckyItem.BeginDT));
						self.pageData.endTime = new Date(data.LckyItem && Date.parse(data.LckyItem.EndDT));
						self.pageData.MyAct = data.MyAct;
						self.pageData.Confs = data.Confs;
						self.pageData.curGoal = data.Finish.CurVal;
						self.getNextGoal(data.Finish.FStage);
						//计算可领取的阶段
						self.getNextReStage();
						self.pageData.per = data.Finish.Per;
						rebateLevel = document.getElementById('rebateLevel');
						rebateLevelLine = document.getElementById('rebateLevelLine');
						//						if(self.pageData.reState > 0) {
						//							//如果可领取则显示领取页面
						//							rebateLevel.querySelector('img').src = self.pageData.reimgLevel[self.pageData.reState - 1 < 0 ? 0 : (self.pageData.reState - 1 > 5 ? 5 : self.pageData.reState - 1)].imgUrl;
						//						} else {
						//							rebateLevel.querySelector('img').src = self.pageData.imgLevel[self.pageData.curStage < 0 ? 0 : (self.pageData.curStage > 5 ? 5 : self.pageData.curStage)].imgUrl;
						//						}
						self.showState();
						var rebateLevelContent = document.getElementById('rebateLevelContent');
						var rebateRules = document.querySelector('.activity_rules');
						rebateLevel.style.marginTop = -(rebateLevel.offsetTop - rebateBg.offsetTop) + 'px';
						rebateLevel.style.paddingTop = '0';
						rebateLevelLine.style.marginTop = -(rebateLevelLine.offsetTop - rebateLevel.offsetTop) + 'px';
						rebateLevelLine.style.paddingTop = '0';
						var dif = (rebateLevelContent.offsetTop - rebateLevelLine.offsetTop) * 0.5;
						rebateLevelContent.style.marginTop = -(dif + 55) + 'px';
						rebateRules.style.marginTop = -(150 - dif) + 'px';
						self.rotateNext();
						//开始刷新数据
						self.refresh();
						app.closeWaiting();
					}, function() {
						app.closeWaiting();
					});
				},
				refreshLoad: function() {
					var self = this;
					app.showWaiting();
					app.post('api/Lucky/GetMyLuckyActive', self.par, function(data) {
						self.pageData.sBTime = data.LckyItem.BeginDT.Format('yyyy.MM.dd');
						self.pageData.sETime = data.LckyItem.EndDT.Format('yyyy.MM.dd');
						self.pageData.beginTime = new Date(data.LckyItem && Date.parse(data.LckyItem.BeginDT));
						self.pageData.endTime = new Date(data.LckyItem && Date.parse(data.LckyItem.EndDT));
						self.pageData.MyAct = data.MyAct;
						self.pageData.Confs = data.Confs;
						self.pageData.curGoal = data.Finish.CurVal;
						self.getNextGoal(data.Finish.FStage);
						//计算可领取的阶段
						self.getNextReStage();
						self.pageData.per = data.Finish.Per;
						self.rotateNext();
						self.refresh();
						app.closeWaiting();
					}, function() {
						app.closeWaiting();
					});
				},
				showState: function() {
					var self = this;
					if(self.pageData.reState > 0) {
						//如果可领取则显示领取页面
						rebateLevel.querySelector('img').src = self.pageData.reimgLevel[self.pageData.reState - 1 < 0 ? 0 : (self.pageData.reState - 1 > 5 ? 5 : self.pageData.reState - 1)].imgUrl;
					} else {
						rebateLevel.querySelector('img').src = self.pageData.imgLevel[self.pageData.curStage < 0 ? 0 : (self.pageData.curStage > 5 ? 5 : self.pageData.curStage)].imgUrl;
					}
				},
				refresh: function() {
					var self = this;
					timeInterval = setInterval(function() {
						if(self.pageData.beginTime || self.pageData.endTime) {
							var now = new Date();
							var difTime;
							if(self.pageData.beginTime.getTime() > now.getTime()) {
								difTime = self.pageData.beginTime.getTime() - now.getTime();
								self.pageData.timeTitle = '活动开始倒计时';
							} else if(self.pageData.beginTime.getTime() <= now.getTime() && self.pageData.endTime.getTime() >= now.getTime()) {
								difTime = self.pageData.endTime.getTime() - now.getTime();
								self.pageData.timeTitle = '活动结束倒计时';
							} else {
								difTime = 0;
								self.pageData.timeTitle = '活动已结束';
								self.clearInval();
							}
							//计算出相差天数
							var day = Math.floor(difTime / (24 * 3600 * 1000));
							var hms = difTime % (24 * 3600 * 1000);
							self.time.h = Math.floor(hms / (3600 * 1000)) + day * 24;
							self.time.h = self.time.h.toString().length == 1 ? ('0' + self.time.h) : self.time.h;
							var mms = hms % (3600 * 1000);
							self.time.m = Math.floor(mms / (60 * 1000));
							self.time.m = self.time.m.toString().length == 1 ? ('0' + self.time.m) : self.time.m;
							var sms = mms % (60 * 1000);
							self.time.s = Math.round(sms / 1000);
							self.time.s = self.time.s.toString().length == 1 ? ('0' + self.time.s) : self.time.s;
						}
					}, 1000);
					refreshInterval = setInterval(function() {
						self.par.stage = self.pageData.curStage;
						//刷新当前充值进度
						app.post('api/Lucky/GetLuckyFinish', self.par, function(data) {
							self.pageData.curGoal = data.CurVal;
							self.getNextGoal(data.FStage);
							self.getNextReStage();
							self.pageData.per = data.Per;
							//							if(self.pageData.reState > 0) {
							//								//如果可领取则显示领取页面
							//								rebateLevel.querySelector('img').src = self.pageData.reimgLevel[self.pageData.reState - 1 < 0 ? 0 : (self.pageData.reState - 1 > 5 ? 5 : self.pageData.reState - 1)].imgUrl;
							//							} else {
							//								rebateLevel.querySelector('img').src = self.pageData.imgLevel[self.pageData.curStage < 0 ? 0 : (self.pageData.curStage > 5 ? 5 : self.pageData.curStage)].imgUrl;
							//							}
							self.showState();
							self.rotateNext();
						});
					}, 3000);
				},
				getNextReStage: function() {
					var self = this;
					//计算可领取的阶段
					if(self.pageData.MyAct) {
						var reState = 0;
						var has = 0;
						//遍历可领取的奖励
						for(j = 0; j < self.pageData.MyAct.length; j++) {
							if(self.pageData.MyAct[j] == self.pageData.curStage) {
								has = 1;
								break;
							}
						}
						if(has === 0) {
							//找到了没有被领取的阶段
							reState = self.pageData.curStage;
						}
						if(self.pageData.reState != reState) {
							self.pageData.reState = reState;
						}
					}
				},
				getNextGoal: function(s) {
					var self = this;
					var nG = '';
					if(self.pageData.curStage + 1 >= 6) {
						self.pageData.nGoalText = '所有目标已达成';
					}
					//获取奖励
					if(s) {
						self.pageData.curStage = s;
						for(i = 0; i < self.pageData.Confs.length; i++) {
							if(self.pageData.Confs[i].Stage == (self.pageData.curStage + 1)) {
								nG = self.pageData.Confs[i].EndValue;
								break;
							}
						}
					} else {
						self.pageData.curStage = 0;
						for(i = 0; i < self.pageData.Confs.length; i++) {
							if(self.pageData.Confs[i].Stage == 1) {
								nG = self.pageData.Confs[i].EndValue;
								break;
							}
						}
					}
					if(nG != self.pageData.nGoal) {
						self.pageData.nGoal = nG;
					}
				},
				rotateNext: function() {
					var self = this;
					var cur = (self.pageData.curStage < 0 ? 0 : (self.pageData.curStage > 5 ? 5 : self.pageData.curStage));
					rebateLevelLine.style.transform = 'rotate(' + (0.6 * self.pageData.per + 60 * cur) + 'deg)';
					rebateLevelLine.style.webkitTransform = 'rotate(' + (0.6 * self.pageData.per + 60 * cur) + 'deg)';
				},
			},
			ready: function() {
				var self = this;
				var head = document.getElementsByTagName('head')[0];
				var prefetch;
				//预加载
				for(var i = 0; i < self.pageData.imgLevel.length; i++) {
					prefetch = document.createElement('link');
					prefetch.setAttribute('rel', 'prefetch');
					prefetch.setAttribute('href', self.pageData.imgLevel[i].imgUrl);
					head.appendChild(prefetch);
				}
				for(var i = 0; i < self.pageData.reimgLevel.length; i++) {
					prefetch = document.createElement('link');
					prefetch.setAttribute('rel', 'prefetch');
					prefetch.setAttribute('href', self.pageData.reimgLevel[i].imgUrl);
					head.appendChild(prefetch);
				}
				var rebateBg = document.getElementById('rebateBg');
				rebateBg.onload = function() {
					self.load();
				}
				rebateBg.src = 'http://chorse-sports.ufile.ucloud.com.cn/sys/rrb_bg.png';

				//页面第一次绑定完成执行 
				mui.ready(function() {
					mui('.mui-scroll-wrapper').scroll({
						scrollY: true, //是否竖向滚动
						scrollX: false, //是否横向滚动
						startX: 0, //初始化时滚动至x
						startY: 0, //初始化时滚动至y
						indicators: true, //是否显示滚动条
						deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
						bounce: true //是否启用回弹
					});
				});
				mui.plusReady(function() {
					window.addEventListener('reload', function(e) {
						self.refreshLoad();
					});
					window.addEventListener('unload', function(e) {
						self.clearInval();
					});
				});
			}
		});
	});
});