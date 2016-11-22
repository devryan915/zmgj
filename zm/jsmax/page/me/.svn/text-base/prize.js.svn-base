define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var pageApply;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				projectId: ''
			},
			pageData: {
				user: app.User.get(),
				pointStr: '',
				//是否是积分奖励
				isPoint: false,
				//是否是支持奖金页面，否则是马主或骑手奖金页面
				isZ: false,
				projectName: '',
				serverData: {
					MyRewards: [],
					Ranks: [],
				}
			}
		},
		computed: {

		},
		methods: {
			getApplyPage: function() {
				pageApply = plus && plus.webview.getWebviewById('me_apply') || (mui.preload({
					id: 'me_apply',
					url: 'apply.html',
					styles: {
						popGesture: 'hide'
					}
				}));
			},
			apply: function(id, rNum, mNum) {
				var self = this;
				//console.log(self.pageData.projectName + ' ' + self.par.projectId);
				var rid = id;
				if (pageApply) {
					//触发详情页面的riderid事件
					mui.fire(pageApply, 'loadData', {
						projectId: self.par.projectId,
						rosterId: rid,
						rmbNum: rNum,
						mbNum: mNum,
						receiveType: null,
						projectName: self.pageData.projectName,
						subViewID: null,
					});
					setTimeout(function() {
						mui.openWindow({
							id: 'me_apply',
						});
					}, 500);
				}
			},
			applyMB: function(id, rNum, mNum) {
				var self = this;
				var rid = id;

				if (pageApply) {
					//console.log(self.pageData.projectName + ' ' + self.par.projectId + ' ' + rNum + ' ' + mNum);
					//触发详情页面的riderid事件
					mui.fire(pageApply, 'loadData', {
						projectId: self.par.projectId,
						rosterId: rid,
						rmbNum: 0,
						mbNum: mNum,
						receiveType: 1,
						projectName: self.pageData.projectName,
						subViewID: 'mbaccount',
					});
					setTimeout(function() {
						mui.openWindow({
							id: 'me_apply',
						});
					}, 500);

				}
			},
			load: function() {
				var self = this;
				//				self.pageData.isPoint = true;
				//				var testData;
				//				var Total = 50;
				//				testData = '{"Total":' + Total + ',"Items":[';
				//				for (i = 0; i < Total; i++) {
				//					testData += '{"itemID":"itemID' + i + '","ClubName":"我的我的俱乐部我的俱乐部我的俱乐部我我的我的俱乐部我的俱乐部我的俱乐部我的俱乐部我的俱乐部很长很长俱乐部我的我的俱乐部我的俱乐部我的俱乐部我的俱乐部我的俱乐部很长很长俱乐部我的我的俱乐部我的俱乐部我的俱乐部我的俱乐部我的俱乐部很长很长俱乐部的俱乐部我的俱乐部很长很长俱乐部","isQ":"' + (i == 0 ? true : false) + '","Rank":"' + (i == 0 ? 22 : i) + '","Point":"100' + i + '","Name":"Name大圣' + i + '","Score":"100"},';
				//				}
				//				testData = testData.substr(0, testData.length - 1);
				//				var tempd = JSON.parse(testData + ']}');
				//				self.pageData.serverData = tempd;

				app.post('api/User/GetMyProjectRank', self.par, function(data) {
					self.pageData.serverData = data;
				});
			},
		},
		ready: function() {
			var self = this;
			window.addEventListener('loadData', function(e) {
				self.par.projectId = e.detail.projectId;
				self.pageData.isZ = e.detail.isZ;
				self.pageData.isPoint = e.detail.isPoint;
				self.pageData.projectName = e.detail.projectName;
				self.pageData.user = app.User.get();
				self.getApplyPage();
				self.load();
			});
			window.addEventListener('reload', function(e) {
				self.pageData.user = app.User.get();
				self.load();
			});

			self.$watch('pageData.isPoint', function(val) {
				self.pageData.pointStr = val ? '积分' : '';
			});
			//页面第一次绑定完成执行 
			mui.ready(function() {});
			mui.plusReady(function() {});
		}
	});

});