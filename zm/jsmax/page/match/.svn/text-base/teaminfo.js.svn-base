define(['app', 'mui', 'vue', 'load'], function(app, mui, vue, ld) {
	//	var bannerImg = document.getElementById('banner');
	//	var corpsflagImg = document.getElementById('corpsflag');
	var vm = new vue({
		el: 'body', //绑定范围
		data: {
			user: app.User.get(),
			TitleName: '',
			pageData: {
				BannerUrl: '',
				ImgUrl: '',
				Memcount: 0,

			},
			par: {
				corpsId: ''
			},
		},
		computed: {

		},
		methods: {
			//跳转成员详情
			goRider: function(v) {
				var self = this;
				var riderID = v;
				//获得详情页面
				var page;
				page = plus.webview.getWebviewById('match_riderinfo');
				if(page) {
					//触发详情页面的riderid事件
					mui.fire(page, 'riderID', {
						riderID: riderID,
						corpsID: self.par.corpsId,
						pageType: 2,
					});
					//打开详情页面          
					mui.openWindow({
						id: 'match_riderinfo',
					});
				} else {
					mui.openWindow({
						id: 'match_riderinfo',
						url: 'riderinfo.html',
						extras: {
							riderID: riderID,
							corpsID: self.par.corpsId,
							pageType: 2,
						},
						show: {
							aniShow: false
						},
						waiting: {
							autoShow: false
						}
					});
				}
			},
			detail: function(v) {
				var self = this;
				self.goRider(v);
			},
			load: function(teamID) {
				//				mui.toast(teamID);
				var self = this;
				//				self.pageData.memcount = 10;
				//				var testData = '[';
				//				for (i = 0; i < 50; i++) {
				//					testData += '{"UserID":"id' + i + '","ImgUrl":"../../img/me/me_userhead_default.png","NickName":"Name' + i + '"},';
				//				}
				//				testData = testData.substr(0, testData.length - 1);
				//				var tempd = JSON.parse(testData + ']');
				//				self.pageData.memlist = tempd;
				self.par.corpsId = teamID;
				app.showWaiting(1);
				app.post('api/Events/GetCorpsInfo', self.par, function(data) {
					self.pageData = data;
					app.loadImg();
					self.pageData.Memcount = self.pageData.Members.length;
					ld.show();
					//						for (i = 0; i < self.pageData.Members.length; i++) {
					//							self.pageData.Members[i].ImgUrl = '../../img/clubuserheader/head1.png';
					//						}
					app.closeWaiting();
				}, function() {
					app.showError(function() {
						app.showWaiting(1);
						self.load(self.par.corpsId);
					});
					app.closeWaiting();
				});
				//				var selfPage = plus.webview.currentWebview();
				//				var teamid = selfPage.teamid;
				//				mui.toast(teamid);
			}
		},
		ready: function() {
			var self = this;
			//添加newId自定义事件监听
			window.addEventListener('teamID', function(event) {
				//获得事件参数
				if(event.detail.teamID) {
					//					console.log('event ' + event.detail.teamID + ' ' + event.detail.name);
					self.TitleName = event.detail.name;
					self.load(event.detail.teamID);
				}
				//mui.currentWebview.show();
			});
			//页面第一次绑定完成执行 
			mui.ready(function() {
				//				setTimeout(function() {
				//					var array = plus.webview.all();
				//					if (array) {
				//						for (var i = 0, len = array.length; i < len; i++) {
				//							//console.log(array[i].id + ' ' + array[i].getURL());
				//						}
				//					}
				//				}, 5000);
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
				var selfPage = plus.webview.currentWebview();
				if(selfPage && selfPage.teamID) {
					//					console.log('new ' + selfPage.teamID + ' ' + selfPage.name);
					self.TitleName = selfPage.name;
					self.load(selfPage.teamID);
				}
			});
		}
	});

});