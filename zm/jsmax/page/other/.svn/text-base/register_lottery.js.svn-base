define(['app', 'mui', 'vue', "scroller"], function(app, mui, vue, scroller) {

	var sc, frefresh, fawards;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			o: {
				num: 0,

			},
			par: {
				idx: 'G1601',
				stage: 0
			},
			parAwards: {
				idx: 'G1601',
				dDix: -1
			},
			show1: true,
			show2: false,
			listAwards: [],
			State: 0,
			userId: 0,
			isPrize: false,
			LukeyItem: {}

		},
		computed: {
			isValid: function() {
				var self = this;
				var n = self.o && self.o.MyAct.length > 0 ? self.o.MyAct[self.o.MyAct.length - 1] : 0;
				return self.State == 1 && self.o.Finish.FStage > n && n < 6;
			},
			cNum: function() {
				var self = this;
				if(!self.o.Finish) {
					return 0;
				}
				var n = self.o && self.o.MyAct.length > 0 ? self.o.MyAct[self.o.MyAct.length - 1] : 0;
				var m = 0;
				if(self.o.Finish.FStage > n) {
					m = n + 1;
				} else if(self.o.Finish.FStage = n) {
					m = n;
				}
				return m;
			}
		},
		methods: {
			lottery: function() {
				var self = this;
				self.isPrize = true;
				app.showWaiting();
				app.post('api/Lucky/LuckyActive', {
					idx: self.par.idx,
					stage: self.cNum
				}, function(data) {
					var n = self.o.MyAct.length > 0 ? self.o.MyAct[self.o.MyAct.length - 1] + 1 : 1;
					self.o.MyAct.push(n);
					var n1 = self.o.MyAct.length > 0 ? self.o.MyAct[self.o.MyAct.length - 1] : 1;
					n1 = self.o.Finish.FStage == n1 ? n1 + 1 : self.cNum;
					self.par.stage = n1;
					if(data.IsLukey) {
						self.show1 = false;
						self.show2 = true;
						document.querySelector("#divPrize img").src = 'http://chorse-sports.ufile.ucloud.com.cn/sys/' + data.LukeyItem.ImgUrl + '.png';
						if(data.LukeyItem.ImgUrl == 'MB') {
							var user = app.User.get();
							user.MB = parseFloat(user.MB) + data.LukeyItem.Qty;
							app.User.set(user);
							mui.os.plus && mui.fire(plus.webview.getLaunchWebview(), 'reload', {
								type: 'userInfo'
							})
						}

						setTimeout(function() {
							var mask = mui.createMask(function() {
								self.show1 = true;
								self.show2 = false;
								self.isPrize = false;
							});
							mask.show();
						}, 1000);

					} else {
						mui.alert('您未中奖！', '&nbsp;', '确定', function(e) {
							self.show1 = true;
							self.isPrize = false;
						}, 'div');
					}
					self.refresh();
					app.closeWaiting();

				}, function() {
					app.closeWaiting();
				});
			},
			load: function() {
				var self = this;
				app.post('api/Lucky/GetMyLuckyActive', self.par, function(data) {
					self.o = data;
					sc.scrollFromTo("000000", self.o.Finish.CurVal);
					self.par.stage = self.cNum;
					self.refresh();
					frefresh = setInterval(function() {
						self.refresh();
					}, 3000);
					self.awards();
					fawards = setInterval(function() {
						self.awards();
					}, 20000);
				});
			},
			refresh: function() {
				var self = this;
				var n = self.o.MyAct.length > 0 ? self.o.MyAct[self.o.MyAct.length - 1] : 1;
				n = self.o.Finish.FStage == n ? (n + 1) : self.cNum;
				self.par.stage = n;
				self.isPrize || app.post('api/Lucky/GetLuckyFinish', self.par, function(data) {
					self.o.Finish.CurVal != data.CurVal && sc.scrollFromTo(app.zeros(self.o.Finish.CurVal, 6), data.CurVal);
					self.o.Finish = data;
					self.State = data.State;
					self.LukeyItem = data.LukeyItem
						//					self.o.Finish.FStage = 1;
						//					self.o.MyAct = []

				});
			},
			awards: function() {
				var self = this;
				app.post('api/Lucky/GetLuckyUser', self.parAwards, function(data) {
					self.parAwards.dDix = data.DDIX;
					if(self.listAwards.length > 100) {
						self.listAwards = [];
					}
					self.listAwards = self.listAwards.concat(data.Items);
				});
			},

		},
		created: function() {
			var self = this;
			self.cNum = 0;
			self.o.Finish = {
				FStage: 0,
				CurVal: 0,
				State: 0
			};
		},
		ready: function() {
			var self = this;
			//			self.o = {
			//				Finish: {
			//					FStage: 4
			//				},
			//				MyAct: []
			//			}
			//			self.State = 1;
			mui.init();
			mui.ready(function() {
				sc = scroller.getNewInstance({
					direction: scroller.DIRECTION.UP,
					interval: 400,
					width: 250,
					amount: 50,
					separatorType: scroller.SEPARATOR.NONE,
					separator: "",
					forceFallback: true
				});
				sc.appendTo(document.getElementById("txtNum")).setStyle({
					backgroundColor: "transparent"
				});
				sc.start("000000");
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					if(!app.User.get().UserID) {
						var wlogin = mui.openWindow({
							id: 'wlogin',
							url: '../login/login.html',
							show: {
								aniShow: 'slide-in-right',
							},
							waiting: {
								autoShow: true
							}
						});
						wlogin.addEventListener('hide', function() {
							if(app.User.get().UserID) {
								self.userId = app.User.get().UserID;
								self.load();
							} else {
								plus.webview.currentWebview().hide();
							}
						});
					} else {
						self.load();
					}
				});
				window.addEventListener('unload', function(e) {
					clearInterval(frefresh);
					clearInterval(fawards);
				});
				var wc = plus.webview.currentWebview();
				if(!app.User.get().UserID) {
					var wlogin = mui.openWindow({
						id: 'wlogin',
						url: '../login/login.html',
						show: {
							aniShow: 'slide-in-right',
						},
						waiting: {
							autoShow: true
						}
					});
					wlogin.addEventListener('hide', function() {
						if(app.User.get().UserID) {

							self.userId = app.User.get().UserID;
							self.load();
						} else {
							plus.webview.currentWebview().hide();
						}
					});
				} else {
					self.load();
				}

			})

		}
	});
});