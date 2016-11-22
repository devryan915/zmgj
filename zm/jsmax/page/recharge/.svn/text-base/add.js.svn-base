define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			amount: '',
			par: {
				tradeNo: '',
				payType: ''
			},
			payChannel: {},
			orderInfo: {},
			m: 5,
			isAlert: false,
		},
		computed: {
			isValid: function() {
				return !!this.amount && !!this.par.payType;
			}
		},
		methods: {
			createOrder: function() {

				var self = this;

				//				mui.fire(plus.webview.getLaunchWebview(), 'reload', {
				//					type: 'userInfo'
				//				})
				//				self.isAlert || (self.isAlert = true, mui.alert('<i class="y y-finish y-green y-lg"></i>' + '<p>支付成功</p>', '&nbsp;', '关闭', function() {
				//					plus.webview.hide('wrecharge_add', 'none');
				//					plus.webview.close('wrecharge_add');
				//				}, 'div'));
				//				return false;
				app.showWaiting();
				//				if(self.par.tradeNo) {
				//
				//				} else {
				app.post('api/Shop/CreateMBOrder', {
					amount: self.amount
				}, function(data) {
					self.par.tradeNo = data;
					self.pay();
				}, function() {
					app.closeWaiting();
				});
				//				}

			},
			pay: function() {
				var self = this;

				var pc = self.payChannel[self.par.payType];
				if(pc.serviceReady) {
					app.post('api/Shop/GetTradeSignInfo', self.par, function(data) {

						plus.payment.request(pc, data.RequestPara, function() {
							var gtrpar = {
								tradeNo: self.par.tradeNo
							};
							var t = setInterval(function() {
								if(self.m > 1) {
									self.m = self.m - 1;
									app.post('api/Shop/GetTradeResult', gtrpar, function(data) {
										if(data.IsSuccess) {
											app.closeWaiting();
											clearTimeout(t);
											var user = app.User.get();
											user.MB = parseFloat(user.MB) + parseFloat(self.amount);
											app.User.set(user);
											mui.fire(plus.webview.getLaunchWebview(), 'reload', {
												type: 'userInfo'
											})
											self.isAlert || (self.isAlert = true, mui.alert('<i class="y y-finish y-green y-lg"></i>' + '<p>支付成功</p>', '&nbsp;', '关闭', function() {
												plus.webview.hide('wrecharge_add', 'none');
												plus.webview.close('wrecharge_add');
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
					app.closeWaiting();
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
						app.post('api/Shop/GetTradeResult', gtrpar, function(data) {
							app.closeWaiting();
							if(data.IsSuccess) {

								var user = app.User.get();
								user.MB = parseFloat(user.MB) + parseFloat(self.amount);
								app.User.set(user);
								mui.fire(plus.webview.getLaunchWebview(), 'reload', {
									type: 'userInfo'
								})

								self.isAlert || (self.isAlert = true, mui.alert('<i class="y y-finish y-green y-lg"></i>' + '<p>支付成功</p>', '&nbsp;', '关闭', function() {
									plus.webview.hide('wrecharge_add', 'none');
									plus.webview.close('wrecharge_add');
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
			//页面第一次绑定完成执行 
			var self = this;
			mui.init(); 
			mui.plusReady(function() {

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