define(['app', 'mui', 'vue'], function(app, mui, vue) {
	
 	 
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			user: app.User.get(),
		},
		computed: {
			validJoin: function() {
				var self = this;

				return !!self.user && !!self.user.ChapterID && self.user.ChapterID.trim().length > 0;
			},
		},
		methods: {},
		ready: function() {
			var self = this;
			self.user = app.User.get();
			mui.init();
			//页面第一次绑定完成执行 
			mui.plusReady(function() {
				window.addEventListener('fExpect',function(e){
					app.fExpect();
				});
				//document.querySelector('.mui-slider-group').style.height=(document.body.scrollHeight-20)+'px';
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});

				var wequestrian_add = mui.preload({
					url: '../equestrian/add.html',
					id: 'wequestrian_add',
					styles: {
						popGesture: 'hide',
					}
				});
				var wequestrian_add_sure = plus.webview.getWebviewById('wequestrian_add_sure');
				if(!wequestrian_add_sure) {
					wequestrian_add_sure = plus.webview.create('../equestrian/add_sure.html', 'wequestrian_add_sure')
					wequestrian_add.append(wequestrian_add_sure);
				}

				document.getElementById("addEquestrian").addEventListener('tap', function() {
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
							self.user = app.User.get();
							if(app.User.get().UserID) {
								self.user = app.User.get();
								if(self.validJoin) {
									return;
								}
								mui.fire(wequestrian_add, 'reload', {
									type: 'userInfo'
								});
								mui.fire(wequestrian_add_sure, 'reload', {
									type: 'userInfo'
								});
								wequestrian_add_sure.hide();
								wequestrian_add.show('slide-in-right');
							}
						});
					} else {
						self.user = app.User.get();
						if(self.validJoin) {
							return;
						}
						mui.fire(wequestrian_add, 'reload', {
							type: 'userInfo'
						});
						mui.fire(wequestrian_add_sure, 'reload', {
							type: 'userInfo'
						});
						wequestrian_add_sure.hide();
						wequestrian_add.show('slide-in-right');
					}
				});
			});
		}
	});
});