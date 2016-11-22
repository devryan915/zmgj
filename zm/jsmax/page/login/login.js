define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				loginName: '',
				password: '',
				sn: ''
			},
			auths: [],
			//									auths: [{
			//										"id": "weixin",
			//										"description": "微信",
			//										"authResult": null,
			//										"userInfo": null
			//									} ],
			show: false,

		},
		computed: {
			isValid: function() {
				return !!this.par.loginName && !!this.par.password
			}
		},
		methods: {
			login: function() {
				var self = this;
				app.showWaiting();

				if(mui.os.plus) {
					var pcInfo = plus.push.getClientInfo();
					self.par.other = {
						push: {
							clientid: pcInfo.clientid,
							token: pcInfo.token,
						},
						device: plus.device,
						screen: plus.screen,
						os: plus.os,
					};
					self.par.other = JSON.stringify(self.par.other);
				}
				app.post(app.method.user_login, self.par, function(data) {
					data.loginName = self.par.loginName;
					app.User.set(data);
					app.hideKeyboard();
					var ev = app.Cache.getBoolean('gotab') ? 'gotab' : 'reload';
					mui.fire(plus.webview.getLaunchWebview(), ev, {
						type: 'userInfo'
					});
					mui.fire(plus.webview.getWebviewById('wdynamic_list'), 'reload', {

					});
					app.closeWaiting();
					var w = plus.webview.currentWebview();
					//					w.close('none');
					w.hide('none');
					setTimeout(function() {
						w.close();
					}, 5000);
				}, function() {
					app.closeWaiting();
				});
			},
			register: function() {
				mui.openWindow({
					id: 'wregister',
					url: 'register.html',
					show: {
						aniShow: 'slide-in-right',
					},
					waiting: {
						autoShow: false
					},
					styles: {
						popGesture: 'hide'
					}
				});
			},
			forget_password: function() {
				mui.openWindow({
					id: 'wforget_password',
					url: 'forget_password.html',
					show: {
						aniShow: 'slide-in-right',
					},
					waiting: {
						autoShow: false
					},
					styles: {
						popGesture: 'hide'
					}
				});
			},

		},
		ready: function() {
			var self = this;
			//															self.show = true;
			mui.plusReady(function() {

				var wc = plus.webview.currentWebview();
				wc.addEventListener("popGesture", function(e) {
					if(e.type = "end") {
						app.hideKeyboard();
					}
				}, false);

				plus.oauth.getServices(function(services) {
					var supportAuth = ['weixin', 'qq']
					for(var i in services) {
						var service = services[i];
						if(~supportAuth.indexOf(service.id) && app.isInstalled(service.id)) {
							self.auths.push(service);
						}
					}
					//					self.show = true;
				});
				mui('#divOauth').on('tap', 'a', function() {
					var el = this;
					var auth = self.auths[el.dataset.index];
					auth.logout(function() {
						auth.login(function() {
							auth.getUserInfo(function() {
								mui.toast('登录授权成功');

								app.log("授权信息:::" + JSON.stringify(auth.authResult));
								app.log("用户信息:::" + JSON.stringify(auth.userInfo));

							}, function(e) {
								app.log("获取用户信息失败：" + e.message);
							});
						});
					}, function() {

					});

				});
			});
		}
	});
});