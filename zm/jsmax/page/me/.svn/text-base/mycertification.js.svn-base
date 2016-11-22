define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var sliderGroup = document.querySelector('.mui-slider-group');
	var buttonUse = document.getElementById('buttonUse');
	var selfclubPage = null;
	//当前选中的骑手证
	var curRiderIdx = 0;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			riderNo: '',
			user: app.User.get(),
			list: [],
			par: {
				riderNo: ''
			},
			pageData: {
				idx: 0
			}
		},
		computed: {

		},
		methods: {
			setButton: function(idx) {
				curRiderIdx = idx;
				var cstate = this.list[idx].CState;
				switch (cstate) {
					case 1:
						buttonUse.style.backgroundColor = '#DBB668';
						buttonUse.innerText = '使用';
						break;
					case 2:
						//如果转会中
						if (this.user.IsChangClub) {
							buttonUse.style.backgroundColor = '#6D6D72';
							buttonUse.innerText = '提交申请中....';
						} else {
							buttonUse.style.backgroundColor = '#282828';
							buttonUse.innerText = '我要转俱乐部';
						}
						break;
					case 3:
						buttonUse.style.backgroundColor = '#282828';
						buttonUse.innerText = '已失效';
						break;
					case 4:
						buttonUse.style.backgroundColor = '#282828';
						buttonUse.innerText = '已过期';
						break;
					default:
						buttonUse.style.backgroundColor = '#282828';
						buttonUse.innerText = '已过期';
						break;
				}
			},
			load: function() {
				var self = this;
				app.showWaiting();
				app.post('api/User/GetUserCertificateRider', this.par, function(data) {
					if (!data) {
						return;
					}
					self.list = data;
					var item = document.getElementById('slideritem');
					if (item) {
						sliderGroup.removeChild(item);
					}
					self.setButton(0);
					app.loadImg();
					app.closeWaiting();
					buttonUse.style.display = 'block';
				});
			},
			use: function() {
				var self = this;
				var idx = curRiderIdx;
				var curRider = self.list[idx];
				self.riderNo = curRider.RiderNo;
				//				mui.toast(curRiderIdx);
				switch (curRider.CState) {
					case 1:
						//未使用可以使用骑手证
						//如果有俱乐部则可以直接使用
						if (self.user.ClubID) {
							self.par.riderNo = self.riderNo;
							app.post('api/User/UseCertificateRider', this.par, function(data) {
								mui.toast('使用成功');
								self.list = data;
								self.pageData.idx = idx;
								self.setButton(idx);
								//								if (data) {
								//其他已经使用的变为已失效
								//								for (i = 0; i < self.list.length; i++) {
								//									if (self.list[i].CState === 2) {
								//										self.list[i].CState = 3;
								//									}
								//								}
								//								curRider.CState = 2;
								//								self.setButton(idx);
								//								}
							});
						} else {
							//如果没有选择过俱乐部，则需要选择俱乐部，才能使用
							mui.openWindow({
								id: 'selclub',
								url: 'selclub.html',
								show: {
									aniShow: false
								},
								waiting: {
									autoShow: false
								}
							});
						}
						break;
					case 2:
						//获得详情页面
						//						if (!selfclubPage) {
						//							selfclubPage = plus.webview.getWebviewById('selfclub');
						//						}
						//						if (selfclubPage) {
						//							//触发详情页面的newsId事件
						//							mui.fire(selfclubPage, 'riderID', {
						//								riderID: self.riderNo
						//							});
						//							//打开详情页面          
						//							mui.openWindow({
						//								id: 'selfclub'
						//							});
						//						} else {
						//					this.user.IsApplyClub
						//使用中的等待审核，如果超过三天没有通过则自动审核通过
						//已经使用且未申请转会的才可以转会
						if (!this.user.IsChangClub) {
							mui.openWindow({
								id: 'selclub',
								url: 'selclub.html',
								show: {
									aniShow: false
								},
								waiting: {
									autoShow: false
								}
							});
						}
						//						}

						break;
					default:
						return;
				}

			}
		},
		ready: function() {
			var self = this;
			document.querySelector('.mui-slider').addEventListener('slide', function(event) {
				self.setButton(event.detail.slideNumber);
				//						alert(event.detail.slideNumber);
			});

			//页面第一次绑定完成执行 
			mui.ready(function() {
				window.addEventListener('clubID', function(e) {
					self.user = app.User.get();
					//					if (self.list && self.list.length > 0) {
					//
					//					}

				});
				/* 获得元素的位置信息 */
				window.addEventListener('reload', function(e) {
					self.user = app.User.get();
					self.load();

					//					if (self.list && self.list.length > 0) {
					//
					//					}

				});
			});
		}
	});
	vm.load();
});