define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var pagePrize;
	var pageGC;
	var pageGS;
	var pageGR;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			editable: false,
			pageData: {
				events: {},
				eventID: '',
			},
			par: {
				eType: '1',
			},
			delPar: {
				projectId: ''
			},
		},
		computed: {

		},
		methods: {
			detail: function(id, t, isP, pN) {
				//项目ID
				var pid = id;
				//t 1参赛名单 2支持奖励 3领取奖励 4公布成绩 5规则
				var type = t;
				//是否有积分
				var ispoint = isP;
				//console.log(type);
				var pName = pN;
				if (type == 2 || type === 3) {
					//				mui.toast(id + ' ' + t);
					if (pagePrize) {
						//触发详情页面的riderid事件
						mui.fire(pagePrize, 'loadData', {
							isZ: type == 2,
							projectId: pid,
							isPoint: ispoint,
							projectName: pName,
						});
						//打开详情页面          
						mui.openWindow({
							id: 'me_prize',
						});
					}
				} else if (type == 1) {
					(mui.fire(pageGC, 'reload', {
						id: pid,
					}), pageGC.show('pop-in'));
				} else if (type == 4) {
					mui.fire(pageGS, 'reload', {
						id: pid,
					}), pageGS.show('pop-in');
				} else if (type == 5) {
					mui.fire(pageGR, 'reload', {
						id: pid,
					}), pageGR.show('pop-in');
				}
			},
			del: function(b, e) {
				var self = this;
				var elem = e.target;
				self.delPar.projectId = elem.value;
				var btnArray = ['确认', '取消'];
				var li = elem.parentNode.parentNode;
				var dContent = b ? '该场赛事奖金未领取成功\n确认删除' : '确认删除该条赛事记录';
				mui.confirm(dContent, '删除赛事', btnArray, function(e) {
					if (e.index == 0) {
						app.post('api/User/RemoveMyProject', self.delPar, function(data) {
							//确定删除
							li.parentNode.removeChild(li);
						});
					} else {
						//取消则取消选中状态
						elem.checked = '';
					}
				});
			},
			eitor: function() {
				var self = this;
				self.editable = !self.editable;
			},
			load: function() {
				var self = this;
				//				var testData;
				//				var Total = 50;
				//				testData = '{"Total":' + Total + ',"Items":[';
				//				for (i = 0; i < Total; i++) {
				//					testData += '{"eventID":"eventID' + i + '","SDate":"2001.12.12 12:12:12","TotalFee":"100' + i + '","Name":"Name 第届' + i + '","PType":' + (i % 2 == 0) + ',"q":' + (i % 3 == 0) + ',"m":' + (i % 2 == 0) + ',"c":' + (i % 2 == 0) + ',"j":' + (i % 2 == 0) + '},';
				//				}
				//				testData = testData.substr(0, testData.length - 1);
				//				var tempd = JSON.parse(testData + ']}');
				//				self.pageData.events = tempd;
				app.showWaiting();
				app.post('api/User/GetMyProject', self.par, function(data) {
					self.pageData.events = data;
					app.closeWaiting();
				}, function() {
					app.closeWaiting();
				});
			},
		},
		ready: function() {
			var self = this;

			//页面第一次绑定完成执行 
			mui.ready(function() {
				mui('.mui-scroll-wrapper').scroll({
					scrollY: true, //是否竖向滚动
					scrollX: false, //是否横向滚动
					startX: 0, //初始化时滚动至x
					startY: 0, //初始化时滚动至y
					indicators: true, //是否显示滚动条
					deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
					bounce: true //是否启用回弹
				});
				pagePrize = mui.preload({
					id: 'me_prize',
					url: 'prize.html',
					styles: {
						popGesture: 'hide'
					}
				});

			});
			mui.plusReady(function() {

				pageGC = plus.webview.getWebviewById('wgame_contestants') || mui.preload({
					url: '../game/contestants.html',
					id: 'wgame_contestants',
					styles: {
						popGesture: 'hide'
					}
				});
				pageGS = plus.webview.getWebviewById('wgame_score') || mui.preload({
					url: '../game/score.html',
					id: 'wgame_score',
					styles: {
						popGesture: 'hide'
					}
				});
				pageGR = plus.webview.getWebviewById('wgame_rule') || mui.preload({
					url: '../game/rule.html',
					id: 'wgame_rule',
					styles: {
						//							popGesture: 'hide'
					}
				});
			});
			self.load();
		}
	});
});