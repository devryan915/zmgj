define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			user: app.User.get(),
		},
		computed: {
			isValid: function() {
				return !!this.user.RealName && !!this.user.IDCard && !!this.user.MobileNum;
			}
		},
		methods: {

			editSex: function(el) {
				var self = this;
				var uubParSex = {
					val: el.detail.isActive ? 0 : 1,
					infoType: 3,
				};
				app.post('api/User/UpdateUserBase', uubParSex, function(data) {
					self.user['Sex'] = uubParSex.val;
					app.User.set(self.user);
				});
			},
			selectAddr: function() {
				mui.confirm('请确保姓名、性别、身份证真实有效，一旦确认将不可再更改！', '&nbsp;', ['取消', '确定'], function(e) {

					if (e.index == 1) {
						var wequestrian_add_sure = plus.webview.getWebviewById('wequestrian_add_sure');
						wequestrian_add_sure.show('slide-in-right');
					}
				}, 'div');
			}
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行  
			mui.ready(function() {
				mui('#ulUserInfo').on('tap', 'a', function() {
					mui.openWindow('../me/me_info.html#' + this.dataset.href, 'wme_info');
				});

				window.addEventListener('reload', function(e) {
					self.user = e.detail.type == 'userInfo' && app.User.get();

				});
			});
			mui.plusReady(function() {

			});

		}
	});
});