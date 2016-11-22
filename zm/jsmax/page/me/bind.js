define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			data: {

			},
			par: {
				loginName: '',
				validCode: '',
			},
			validCodeStr: '获取验证码',
			m: 60,
			isSendValidCode: !0,
		},
		computed: {
			valid: function() {
				return {
					loginName: !!this.par.loginName,
					validCode: !!this.par.validCode,
				}
			},
			validCode: function() {
				return {
					isValidCode: !!this.par && !!this.par.loginName && this.isSendValidCode
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
			load: function() {
				var self = this;
			},
			initpage: function(ref) {
				var self = this;
				self.data = ref;
			},
			sendValidCode: function() {
				var self = this;
				self.isSendValidCode = false;
				self.validCodeStr = self.m + 's 后重新获取';
				t = setInterval(function() {
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
				var parValid = {};
				parValid.loginName = self.par.loginName;
				app.post('api/user/GetBindUserVaildCode', parValid, function(data) {
					mui.toast('验证码发送成功');
				}, function() {
					self.isSendValidCode = true;
					clearTimeout(t);
					self.validCodeStr = '获取验证码';
					self.m = 60;
				});
			},
			bindUser: function() {
				var self = this;
				app.showWaiting();
				var parBind = {};
				parBind.loginName = self.par.loginName;
				parBind.validCode = self.par.validCode;
				app.post('api/user/BindUser', parBind, function(data) {
					app.User.set(data);
					self.par = null;
					app.closeWaiting();
					mui.toast('绑定成功，系统即将重新启动');
					app.showWaiting(undefined,1);
					mui.os.plus && mui.fire(plus.webview.currentWebview().opener(), 'reload', {
						type: 'userInfo'
					});
					setTimeout(function() {
						plus.runtime.restart();
					}, 2000);
				}, function() {
					app.closeWaiting();
				});
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
			});
			mui.plusReady(function() {});
		}
	});
});