define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				loginName: '',
				validCode: '',
				password: '',
			},
			validCodeStr: '获取验证码',
			m: 60,
			remember: !0,
			isSendValidCode: !0,
		},
		computed: {
			valid: function() {
				return {
					loginName: !!this.par.loginName,
					password: app.reg.password.test(this.par.password),
					validCode: !!this.par.validCode,
					remember: !!this.remember,
				}
			},
			validCode: function() {
				return {
					isValidCode: !!this.par.loginName && this.isSendValidCode
				}
			},
			isValid: function() {
				var valid = this.valid
				return Object.keys(valid).every(function(key) {
					return valid[key]
				})
			}
		},
		methods: {
			editPassword: function() {
				app.showWaiting();
				app.post('api/User/ForgetPwd', this.par, function(data) {
					app.hideKeyboard();
					app.User.set(data);
					var w = plus.webview.getLaunchWebview();
					var ev = app.Cache.getBoolean('gotab') ? 'gotab' : 'reload';
					mui.fire(w, ev, {
						type: 'userInfo'
					});
					var wlogin = plus.webview.getWebviewById('wlogin');
					var w = plus.webview.currentWebview();
					app.closeWaiting();
					wlogin.hide('none'), wlogin.close(), w.hide('none'), w.close();
				}, function() {
					app.closeWaiting();
				});

			},
			sendValidCode: function() {
				var self = this;
				self.isSendValidCode = false;
				self.validCodeStr = self.m + 's 后重新获取';
				var t = setInterval(function() {
					if(self.m > 1) {
						self.m = self.m - 1;
						self.validCodeStr = self.m + 's 后重新获取';
					} else {
						self.isSendValidCode = true;
						clearTimeout(t);
						self.validCodeStr = '获取验证码';
						self.m = 60;
					}
				}, 1000);
				var sspar = {
					mobileNum: this.par.loginName,
					vcType: 3,
				}
				app.post('api/user/GetVerifyCode', sspar, function(data) {
					//					ui.txtPassword.focus();
					mui.toast('验证码发送成功');
				}, function() {
					self.isSendValidCode = true;
					clearTimeout(t);
					self.validCodeStr = '获取验证码';
					self.m = 60;
				});
			},
		},
		ready: function() {
			mui.plusReady(function() {
				var wc = plus.webview.currentWebview();
				wc.addEventListener("popGesture", function(e) {
					if(e.type = "end") {
						app.hideKeyboard();
					}
				}, false);
			});
		}
	});
});