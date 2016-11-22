define(['app', 'mui', 'vue'], function(app, mui, vue) {

	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				eventId: '', //Y0001
			},
			o: {},
			parSignUp: {
				projectId: '',
				payPwd: ''
			}
		},
		methods: {
			load: function() {
				var self = this;

				app.post('api/Events/GetEventsTrip', self.par, function(data) {
					self.o = data;
					app.loadImg();
					app.closeWaiting();
				}, function() {
					app.showError(function() {
						self.load();
					});
					app.closeWaiting();
				});
			},
			like: function() {
				var self = this;
				if(self.o.IsPNum) {
					return false
				};
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
					wlogin.addEventListener('close', function() {
						if(app.User.get().UserID) {
							mui.fire(plus.webview.getLaunchWebview(), 'reload', {
								type: 'userInfo'
							});
							self.load();
						}
					});
				} else {
					app.post('api/Events/ClickLike', self.par, function(data) {
						self.o.PNum++;
						self.o.IsPNum = true;
					});
				}
			},
			review: function() {
				var self = this;
				var wreview = plus.webview.getWebviewById('wreview');
				var ref = {
					ref: {
						id: self.par.eventId
					}
				}
				if(wreview) {
					mui.fire(wreview, 'reload', ref);
					wreview.show('slide-in-right');
				} else {

					wreview = mui.preload({
						url: 'review.html',
						id: 'wreview',
						styles: {
							popGesture: 'hide'
						},
						extras: ref
					});
					wreview.show('slide-in-right');
				}

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
				mui('.mui-content').on('tap', '.yylive', function() {
					var el = this;
					if(mui.os.ios) {
						plus && plus.runtime.openURL("http://act.3g.yy.com/outEmbed/mashu?src=18");
					} else {
						mui.openWindow({
							url: '../pub/yylive.html',
							id: 'pub_yylive'
						});
					}
				});
			},
		},
		created: function() {
			//									this.load();
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.ready(function() {
				self.showLive();
				var h = document.getElementById("img1").offsetHeight;
				//				console.log('hhhh:::'+h)
				document.getElementById("slider").style.height = 'calc(100% - ' + h + 'px)';
				document.querySelector(".mui-slider-group").style.height = 'calc(100% - ' + 90 + 'px)';
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});
				//报名
				mui('#prContestants').on('tap', '.y-signup', function() {
					var el = this;
					self.parSignUp.projectId = el.dataset.id;
					if(el.dataset.signUpFee > 0) {
						var content = '	<div>' + '<input type="password" id="payPwd" placeholder="请输入登录密码" class="mui-input-password" /></div>';
						mui.confirm(content, '需支付 ' + el.dataset.signUpFee + ' 马币', ['取消', '确认支付'], function(e) {
							if(e.index == 1) {
								var txtPayPwd = document.getElementById("payPwd")
								self.parSignUp.payPwd = txtPayPwd.value;
								txtPayPwd.blur();
								app.showWaiting();

								app.post('api/Events/SignUp', self.parSignUp, function(data) {

									var user = app.User.get();
									user.MB = user.MB - el.dataset.signUpFee;

									app.User.set(user);
									mui.os.plus && mui.fire(plus.webview.getLaunchWebview(), 'reload', {
										type: 'userInfo'
									});
									app.closeWaiting();
									mui.toast('报名成功');
									self.o.Projects[el.parentElement.parentElement.dataset.index].SelfState = data.SelfState;
									mui(el).off("tap");
								}, function() {
									app.closeWaiting();
								});
							}
						}, 'div')
					} else {
						app.showWaiting();
						app.post('api/Events/SignUp', self.parSignUp, function(data) {
							self.o.Projects[el.parentElement.parentElement.dataset.index].SelfState = data.SelfState;
							app.closeWaiting();
							mui.toast('报名成功');
							mui(el).off("tap");
						}, function() {
							app.closeWaiting();
						});
					}
				});

			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					//					app.showWaiting(2);
					self.par.eventId = e.detail.ref.id;
					mui('#slider').slider().gotoItem(e.detail.ref.index);
					self.load();
				});
				window.addEventListener('unload', function(e) {
					self.o = {};
					app.closeError();
					app.showWaiting(2);
				});
				var wc = plus.webview.currentWebview();
				if(wc.ref) {
					self.par.eventId = wc.ref.id;
					mui('#slider').slider().gotoItem(wc.ref.index);
					self.load();
				}

				//参赛名单
				mui('#prContestants').on('tap', '.y-contestants', function() {
					var el = this;
					var ref = {
						ref: {
							id: el.dataset.id,
							fee: el.dataset.fee,
							rtype: el.dataset.rtype,
							FreeNum: el.dataset.freeNum,
							NowSupportNum: el.dataset.nowSupportNum,
							endtime: el.dataset.time,
							title: el.dataset.title,
						}
					}
					var w = plus.webview.getWebviewById('wgame_contestants');
					if(w) {
						mui.fire(w, 'reload', ref), w.show('slide-in-right');
					} else {
						w = mui.preload({
							url: 'contestants.html',
							id: 'wgame_contestants',
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
				});

				//介绍
				mui('#prContestants').on('tap', '.y-score', function() {
					var el = this;
					var ref = {
						ref: {
							id: el.dataset.id,
							fee: el.dataset.fee,
							rtype: el.dataset.rtype,
							FreeNum: el.dataset.freeNum,
							NowSupportNum: el.dataset.nowSupportNum,
							endtime: el.dataset.time,
							title: el.dataset.title,
						}
					}
					var w = plus.webview.getWebviewById('wgame_score');
					if(w) {
						mui.fire(w, 'reload', ref), w.show('slide-in-right');
					} else {
						w = mui.preload({
							url: '../game/score.html',
							id: 'wgame_score',
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
				});

				mui('#prContestants').on('tap', '.y-rule', function() {
					var el = this;
					var ref = {
						ref: {
							id: el.dataset.id,
						}
					}
					var w = plus.webview.getWebviewById('wgame_rule');
					if(w) {
						mui.fire(w, 'reload', ref), w.show('slide-in-right');
					} else {
						w = mui.preload({
							url: '../game/rule.html',
							id: 'wgame_rule',
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

				});

			});

		}
	});
});