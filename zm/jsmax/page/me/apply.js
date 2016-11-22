define(['app', 'mui', 'vue', 'mui.view'], function(app, mui, vue, mv) {
	mui.init({});
	var bankPage;
	//	//console.log(bankData)
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			canBack: true,
			reqBpar: {

			},
			user: app.User.get(),
			//			bkd: null,
			viewApi: null,
			pageData: {
				rmbNum: 0,
				mbNum: 0,
				projectName: '比赛',
				bank: {
					RealName: '',
					BankCard: '',
					BankCode: '',
					BankName: '',
				},
				confirmBtn: null,
				canReceive: true,
			},
			par: {
				projectId: '',
				rosterId: '',
				payPwd: '',
				receiveType: null,
				realName: '',
				bankCard: '',
				bankName: ''
			},
			serverData: {
				banks: [],
			},
		},
		computed: {
			isValid: function() {
				var self = this;
				return self.pageData.bank.RealName && self.pageData.bank.RealName.trim().length > 0 && self.pageData.bank.BankCard && self.pageData.bank.BankCard.trim().length > 0 && self.pageData.bank.BankName && self.pageData.bank.BankName.trim().length > 0;
			},
		},
		methods: {
			clear: function() {
				var self = this;
				self.canBack = true;
				//				self.reqBpar = {};
				self.pageData = {
					rmbNum: 0,
					mbNum: 0,
					projectName: '比赛',
					bank: {
						RealName: '',
						BankCard: '',
						BankCode: '',
						BankName: '',
					},
					confirmBtn: null,
					canReceive: true,
				};
				self.par = {
					projectId: '',
					rosterId: '',
					payPwd: '',
					receiveType: null,
					realName: '',
					bankCard: '',
					bankName: ''
				};
			},
			back: function() {
				mui.back();
			},
			chooseBank: function() {

				if (bankPage) {
					mui.fire(bankPage, 'choosebank', {
						viewID: 'me_apply',
					});
					//打开详情页面          
					mui.openWindow({
						id: 'pub_choosebank',
					});
				}
			},
			confrim: function(e) {
				var self = this;
				self.pageData.confirmBtn = e.target;
			},
			account: function(t, v, tg) {
				var self = this;
				var type = t;
				var val = v;
				var target = tg;
				//1转到马币账户，2转到银行账户
				self.par.receiveType = (((type == 1 && val == 2) || type == 2) ? 2 : 1);
				//通过最近银行卡转账
				if (t == 2 && v == 2) {
					var bank = target.$event.currentTarget.dataset;
					self.pageData.bank.RealName = bank.name;
					self.pageData.bank.BankCard = bank.card;
					self.pageData.bank.BankName = bank.cname;
				}
				if (t == 1 && v == 2) {
					self.pageData.bank.RealName = null;
					self.pageData.bank.BankCard = null;
					self.pageData.bank.BankName = null;
				}
			},
			reReward: function() {
				var self = this;
				if (self.par.receiveType == 1) {
					self.par.realName = self.user.RealName;
					self.par.bankCard = '';
					self.par.bankName = '';
				} else if (self.par.receiveType == 2) {
					self.par.realName = self.pageData.bank.RealName;
					self.par.bankCard = self.pageData.bank.BankCard;
					self.par.bankName = self.pageData.bank.BankName;
				}
				app.post('api/User/ReceiveReward', this.par, function(data) {
					//mui-btn-grey  mui-btn-yellow
					if (self.pageData.confirmBtn) {
						//						self.pageData.confirmBtn.classList.remove('mui-btn-yellow');
						//						self.pageData.confirmBtn.classList.add('mui-btn-grey');
						self.pageData.confirmBtn.innerText = "转出进行中";
						self.pageData.canReceive = false;
						self.par.payPwd = '';
						mui.back();
						var page = plus.webview.getWebviewById('me_prize');
						page && mui.fire(page, 'reload', {});
					}
				});
			},
			load: function() {
				var self = this;
				//获取最近银行卡
				app.post('api/User/GetMyBank', self.reqBpar, function(data) {
					data.forEach(function(item) {
						item.sbCard = item.BankCard.substr(item.BankCard.length - 4);
					});
					self.serverData.banks = data;
				});
			},
		},
		created: function() {

		},
		ready: function() {
			var self = this;
			var defaultPage = 'cpayType';
			window.addEventListener('loadData', function(e) {
				self.clear();
				self.par.projectId = e.detail.projectId;
				self.par.rosterId = e.detail.rosterId;
				self.par.receiveType = e.detail.receiveType;
				self.pageData.projectName = e.detail.projectName;
				self.pageData.rmbNum = e.detail.rmbNum;
				self.pageData.mbNum = e.detail.mbNum;
				//console.log('loadData' + JSON.stringify(self.pageData) + ' viewID:' + e.detail.subViewID);
				if (e.detail.subViewID) {
					//					(self.viewApi.pages.firstElementChild && self.viewApi.pages.firstElementChild.id != e.detail.subViewID) &&
					if (e.detail.subViewID == 'mbaccount') {
						self.canBack = false;
					}
					self.viewApi.go('#' + e.detail.subViewID);
				}
				//				else {
				//					//console.log((self.viewApi.pages.firstElementChild && self.viewApi.pages.firstElementChild.id != defaultPage));
				//					(self.viewApi.pages.firstElementChild && self.viewApi.pages.firstElementChild.id != defaultPage) && self.viewApi.go('#' + defaultPage);
				//				}
				self.load();
			});
			window.addEventListener('pubChooseBankRet', function(e) {
				self.pageData.bank.BankCode = e.detail.bankCode;
				self.pageData.bank.BankName = e.detail.bankName;
				//console.log('选择了 ' + self.pageData.bank.BankCode + ' ' + self.pageData.bank.BankName);
			});
			//页面第一次绑定完成执行 
			var cUrl = location.href;
			var index = cUrl.lastIndexOf('#'); //meInfo pageMobileNum
			//selectBank cpayType
			var cPage = index == -1 ? ('#' + defaultPage) : cUrl.substring(index, cUrl.length);
			//初始化单页view
			self.viewApi = mui('#app').view({
				defaultPage: cPage
			});
			mui('.mui-scroll-wrapper').scroll();
			//页面第一次绑定完成执行 
			mui.ready(function() {
				(function($) {
					var view = self.viewApi.view;
					//处理view的后退与webview后退
					var oldBack = $.back;
					$.back = function() {
						if (self.viewApi.canBack() && self.canBack) { //如果view可以后退，则执行view的后退
							self.viewApi.back();
						} else { //执行webview后退 
							if (self.viewApi.canBack()) {
								self.viewApi.back();
							}
							oldBack();
							//							self.viewApi.go('#' + defaultPage);
							plus.webview.currentWebview().hide();
							//							plus.webview.currentWebview().close();
						}
					};
					//监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
					//第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
					view.addEventListener('pageBeforeShow', function(e) {});
					view.addEventListener('pageShow', function(e) {
						//如果是支持奖励则只能是领取马币
						//						if (e.detail.page.id == 'mbaccount' && self.par.receiveType == 1) {
						//							self.canBack = false;
						//						}
					});
					view.addEventListener('pageBeforeBack', function(e) {
						if (e.detail.page.id == 'inputPWD') {
							self.par.payPwd = '';
						}
					});
					view.addEventListener('pageBack', function(e) {});
				})(mui);
				bankPage = mui.preload({
					id: 'pub_choosebank',
					url: '../pub/choosebank.html',
					styles: {
						popGesture: 'hide'
					}
				});
			});

			mui.plusReady(function() {});
		}
	});
});