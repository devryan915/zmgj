define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				loginName: '',
				password: '',
				validCode: '',
			},
			validCodeStr: '获取验证码',
			m: 60,
			remember: !0,
			isSendValidCode: !0,
			tokenImg: '',
			tokenImgCode: '',
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
					isValidCode: !!this.par.loginName && !!this.tokenImgCode && this.isSendValidCode
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
			pact: function() {
				app.Cache.set(app.Cache.key.cpageUrl.toKeyName(), "http://chorse-sports.com/home_zm/userAgreement.html");
				app.Cache.set(app.Cache.key.cpageTitle.toKeyName(), "服务协议");
				mui.openWindow({
					url: "../pub/other.html",
					id: 'wpact',
					createNew: true,
					show: {
						aniShow: 'pop-in',
						duration: 300
					},
					waiting: {
						autoShow: true
					},
					styles: {
						popGesture: 'hide'
					}
				});
			},
			register: function() {
				var self = this;
				app.showWaiting();
				if(mui.os.plus) {
					var pcInfo = plus.push.getClientInfo();
					//					self.par.other = {
					//						push: {
					//							clientid: pcInfo.clientid,
					//							token: pcInfo.token,
					//						},
					//						device: plus.device,
					//						screen: plus.screen,
					//						os: plus.os,
					//					};
					//					self.par.other = JSON.stringify(self.par.other);
				}

				app.post('api/user/regist', self.par, function(data) {
					app.hideKeyboard();
					app.User.set(data);
					app.closeWaiting();

					mui.alert('恭喜您获得 ' + data.MB + '马币', '注册成功', '确定', function(e) {
						mui.os.plus && mui.fire(plus.webview.getLaunchWebview(), 'gotab', {
							type: 'userInfo'
						});
						plus.webview.hide('wlogin', 'none');
						plus.webview.hide('wregister', 'zoom-fade-in', 500)
						setTimeout(function() {
							plus.webview.close('wlogin', 'none'), plus.webview.currentWebview().close('none', 300)
						}, 1000);
					}, 'div')

				}, function() {
					app.closeWaiting();
				});

			},
			getVerfyImg: function() {
				var self = this;
				var device = plus.device;
				//				var pcInfo = plus.push.getClientInfo();
				//				console.log(JSON.stringify(device));
				//				console.log(JSON.stringify(pcInfo));
				var cid;
				if(mui.os.ios) {
					cid = device.uuid;
				} else {
					cid = device.imei;
				}
				app.post('api/user/GetVerifyImg', {
					cID: cid,
				}, function(data) {
					self.tokenImg = data;
				}, function() {

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
				var device = plus.device;
				var cid;
				if(mui.os.ios) {
					cid = device.uuid;
				} else {
					cid = device.imei;
				}
				var sspar = {
					mobileNum: this.par.loginName,
					//					vcType: 1,
					cID: cid,
					verifyCodeText: this.tokenImgCode,
				}
				app.post('api/user/GetRegisterVerifyCodeV2', sspar, function(data) {
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
			var self = this;
			mui.plusReady(function() {
				self.getVerfyImg();
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