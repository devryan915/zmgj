define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var fload, ftime;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				projectId: '',
				rType: 0,
				LastDT: '',
			},
			parSupport: {
				projectId: '',
				rid: '',
				rType: 0,
				payPwd: '',
				isPayPwd: ''
			},
			list: [],
			o: {
				title: '',
				first: {
					SelfReward: false
				},
				list: []
			},
			fee: 0,
			index: 0,
			num: 0,
			time: '',
			endtime: '',
			laveSecond: 0,
		},
		methods: {
			detail: function(el) {
				var self = this;
				var page;
				var ID = el.currentTarget.dataset.id;
				var sum = el.currentTarget.dataset.sum;
				if(self.par.rType == 2) {
					if(mui.plus) {
						page = plus.webview.getWebviewById('match_teaminfo');
					}
					if(page) {
						//触发详情页面的riderid事件
						mui.fire(page, 'teamID', {
							teamID: ID,
							totalSum: sum,
							pid: self.par.projectId,
							rtype: self.par.rType,
							pageType: 3,
							nsn: self.o.NowSupportNum,
							freeNum: self.o.FreeNum,
							feeNum: self.fee,
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
								totalSum: sum,
								pid: self.par.projectId,
								rtype: self.par.rType,
								pageType: 3,
								nsn: self.o.NowSupportNum,
								freeNum: self.o.FreeNum,
								feeNum: self.fee,
							},
							show: {
								aniShow: false
							},
							waiting: {
								autoShow: false
							}
						});
					}
				} else {
					if(mui.plus) {
						page = plus.webview.getWebviewById('match_riderinfo');
					}
					if(page) {
						//触发详情页面的riderid事件
						mui.fire(page, 'riderID', {
							riderID: ID,
							totalSum: sum,
							pid: self.par.projectId,
							rtype: self.par.rType,
							pageType: 3,
							nsn: self.o.NowSupportNum,
							freeNum: self.o.FreeNum,
							feeNum: self.fee,
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
								totalSum: sum,
								pid: self.par.projectId,
								rtype: self.par.rType,
								pageType: 3,
								nsn: self.o.NowSupportNum,
								freeNum: self.o.FreeNum,
								feeNum: self.fee,
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
			load: function() {
				var self = this;
				app.post('api/Events/GetProjectRosterDT', self.par, function(data) {
					data.Items.length && (self.setList(data.Items), self.num = data.Items.length, self.par.LastDT = data.LastDT);
					fload = setInterval(function() {
						app.post('api/Events/GetProjectRosterDT', self.par, function(data1) {
							data1.Items.length && (self.setList(data1.Items), self.num = data1.Items.length, self.par.LastDT = data1.LastDT);
						});
					}, 3000);
					ftime = setInterval(function() {
						self.time = self.settime(new Date(self.endtime.Format('yyyy-MM-dd hh:mm')));
					}, 1000);
					app.closeWaiting();
				}, function() {
					app.showError(function() {
						app.showWaiting(1);
						self.load();
					});
					app.closeWaiting();
				});
			},
			settime: function(endDate) {
				var self = this;
				var now = new Date();
				var endDate = endDate;
				var leftTime = endDate.getTime() - now.getTime();
				var leftsecond = parseInt(leftTime / 1000);
				self.laveSecond = leftsecond;

				//var day1=parseInt(leftsecond/(24*60*60*6)); 
				var day1 = 0; // Math.floor(leftsecond / (60 * 60 * 24));
				var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
				var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
				var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
				var v = '投票倒计时：' + hour + ":" + app.zeros(minute, 2) + ":" + app.zeros(second, 2);
				if(leftsecond < 0) {
					v = '';
					clearInterval(ftime);
				}
				return v;
			},
			setList: function(data) {
				var self = this;
				var d = {};
				var list1 = [];
				for(var i = 0; i < data.length; i++) {
					data[i].index = i;
					if(i == 0) {
						self.o.first = data[i];
					} else if(i % 2 == 1) {
						d.o1 = data[i];
					} else {
						d.o2 = data[i];
						list1.push(d);
						d = {};
					}
				}
				if(d.o1) {
					list1.push(d);
				}
				self.o.list = [];
				self.o.list = list1;
			}
		},
		created: function() {
			//			this.load();
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.init();
			mui.ready(function() {
				mui('.mui-scroll-wrapper').scroll();

			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					self.par.projectId = e.detail.ref.id;
					self.fee = e.detail.ref.fee;
					self.par.rType = e.detail.ref.rtype;
					self.o.FreeNum = parseInt(e.detail.ref.FreeNum);
					self.o.NowSupportNum = parseInt(e.detail.ref.NowSupportNum);
					self.endtime = e.detail.ref.endtime;
					self.o.title = e.detail.ref.title;
					self.load();
				});

				window.addEventListener('unload', function(e) {
					clearInterval(fload);
					clearInterval(ftime);
					self.par.LastDT = '';
					self.o = {
						title: '',
						first: {},
						list: []
					};
					self.list = [];
					self.time = '';
					self.num = 0;
					mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
				});
				var wc = plus.webview.currentWebview();

				if(wc.ref) {
					self.par.projectId = wc.ref.id;
					self.fee = wc.ref.fee;
					self.par.rType = wc.ref.rtype;
					self.o.FreeNum = parseInt(wc.ref.FreeNum);
					self.o.NowSupportNum = parseInt(wc.ref.NowSupportNum);
					self.o.title = wc.ref.title;
					self.endtime = wc.ref.endtime;
					self.load();
				}
				document.getElementById("btnShare").addEventListener('tap', function() {
					app.shareCurrentWebview();
				});
			});
		}
	});
});