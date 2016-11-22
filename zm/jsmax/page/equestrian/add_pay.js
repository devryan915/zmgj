define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var alert = null;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				tradeNo: '',
				payType: '',
			},
			payChannel: {},
			orderInfo: {
				totalMoney: 0
			},
			m: 5,
			ref: {
				equestrianId: 0,
				equestrianName: ''
			},
			isAlert: false,
		},
		computed: {
			isValid: function() {
				return !!this.par.payType;
			}
		},
		methods: {
			pay: function() {
				var self = this;

				var pc = self.payChannel[self.par.payType];
				if(pc.serviceReady) {
					app.showWaiting();
					app.post('api/User/GetTradeSignInfo', self.par, function(data) {

						plus.payment.request(pc, data.RequestPara, function() {
							var gtrpar = {
								tradeNo: self.par.tradeNo
							};
							var t = setInterval(function() {
								if(self.m > 1) {
									self.m = self.m - 1;
									app.post('api/User/GetTradeResult', gtrpar, function(data) {
										if(data.IsSuccess) {
											app.closeWaiting();
											clearTimeout(t);
											var user = app.User.get();
											user.ChapterID = self.ref.equestrianId,
												user.ChapterName = self.ref.equestrianName;
											app.User.set(user);
											mui.fire(plus.webview.getLaunchWebview(), 'reload', {
												type: 'userInfo'
											})

											self.isAlert || (self.isAlert = true, mui.alert('<i class="y y-finish y-green y-lg"></i>' + '<p>支付成功</p>', '&nbsp;', '返回首页', function() {
												plus.webview.hide('wequestrian_about', 'none');
												plus.webview.hide('wequestrian_add', 'none');
												plus.webview.hide('wequestrian_add_sure', 'none');
												plus.webview.hide('wequestrian_add_pay', 'zoom-fade-in');
												plus.webview.close('wequestrian_about');
												plus.webview.close('wequestrian_add');
												plus.webview.close('wequestrian_add_sure');
												plus.webview.close('wequestrian_add_pay');
											}, 'div'));
										}

									});
								} else {
									clearTimeout(t);
									self.m = 5;
									app.closeWaiting();
									self.payStatusRetry();
								}
							}, 2000);

						}, function(e) {
							app.closeWaiting();
							app.log('支付失败::' + JSON.stringify(e));
						});

					}, function() {
						app.closeWaiting();
					});
				} else {
					(plus.nativeUI.confirm('系统没有安装“' + pc.description + '”服务，是否立即安装', function(e) {

						e.index || pc.installService();

					}, pc.description));
				}

			},
			payStatusRetry: function() {
				var self = this;
				mui.confirm('支付未完成，支付遇到问题', '&nbsp;', ['重新支付', '支付完成'], function(e) {
					if(e.index == 1) {
						app.showWaiting();
						var gtrpar = {
							tradeNo: self.par.tradeNo
						};
						app.post('api/User/GetTradeResult', gtrpar, function(data) {
							//												data.IsSuccess = true;
							app.closeWaiting();
							if(data.IsSuccess) {

								var user = app.User.get();
								user.ChapterID = self.ref.equestrianId,
									user.ChapterName = self.ref.equestrianName;
								app.User.set(user);
								mui.fire(plus.webview.getLaunchWebview(), 'reload', {
									type: 'userInfo'
								})

								self.isAlert || (self.isAlert = true, mui.alert('<i class="y y-finish y-green y-lg"></i>' + '<p>支付成功</p>', '&nbsp;', '返回首页', function() {
									plus.webview.hide('wequestrian_about', 'none');
									plus.webview.hide('wequestrian_add', 'none');
									plus.webview.hide('wequestrian_add_sure', 'none');
									plus.webview.hide('wequestrian_add_pay', 'zoom-fade-in');
									plus.webview.close('wequestrian_about');
									plus.webview.close('wequestrian_add');
									plus.webview.close('wequestrian_add_sure');
									plus.webview.close('wequestrian_add_pay');
								}, 'div'));
							} else {
								self.payStatusRetry();
							}

						}, function() {
							app.closeWaiting();
						});
					}
				}, 'div');

			}

		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					self.par.tradeNo = e.detail.orderNo;
					self.orderInfo.totalMoney = parseFloat(e.detail.totalMoney);
					self.ref.equestrianName = e.detail.equestrianName;
					self.ref.equestrianId = e.detail.equestrianId;
				});
				plus.payment.getChannels(function(channels) {
					for(var i in channels) {
						self.payChannel[channels[i].id] = channels[i];
					}
				}, function() {
					app.log('获取支付通道失败');
				});
			});
		}
	});
});