define(['app', 'mui', 'vue'], function(app, mui, vue) {

	var wlogin;
	var wNewsDetail;

	var pages = {};

	var sid = 'windex';
	var vm = new vue({
		el: '#app',
		data: {

			menus: {
				windex: {
					href: '../home/home.html',
					header: '',
				},
				wme_me: {
					href: '../me/me.html',
				},
				wequestrian_list: {
					href: '../friend/list.html',
				},
				wclub_list: {
					href: '../equestrian/about.html',
				}
			},
			user: app.User.get(),

		},
		methods: {

			initIndex: function() {
				plus.screen.lockOrientation("portrait")
				plus.navigator.closeSplashscreen();
				plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackOpaque');
				plus.navigator.setStatusBarBackground("#282828");
			},

			loadMenu: function() {
				var self = this;

				var dw = null;
				var main = plus.webview.currentWebview();
				for(var k in self.menus) {
					var styles = {
						top: '0px',
						bottom: '50px',
						render: 'always',
						scrollIndicator: 'none',
						//						bounce: 'vertical',
						//						bounceBackground: '#efeff4'
					}
					var menu = self.menus[k];
					var child;
					//					menu.header.length && (styles.top = '44px');
					child = plus.webview.create(menu.href, k, styles);
					k == 'windex' ? child.show() : child.hide();
					main.append(child);
				}
				if(!self.user.UserID) {
					wlogin = mui.preload({
						url: '../login/login.html',
						id: 'wlogin', //默认使用当前页面的url作为id 
						styles: {
							popGesture: 'hide'
						}
					});
				}
				var tabShow = {};

				mui("#nav").on("touchend", "a", function(el) {
					el.preventDefault();
					var selfA = this;
					var cid = selfA.dataset.id;
					var m = self.menus[cid];
					if(cid && cid != sid) {
						if(cid == 'wfriend_list') {

						} else if((cid == 'wme_me') && !self.user.UserID) {
							app.showLogin();
							app.Cache.set('gotab', true);
						} else {
							var w = plus.webview.getWebviewById(cid);
							var t = 200;
							var an = 'fade-in';
							if(mui.os.ios || tabShow[cid]) {
								t = 0;
								an = 'none';
							}
							tabShow[cid] = true;
							w.show(an, t);
							plus.webview.hide(sid);
							sid = cid;

							var olda = document.querySelector("#nav a.mui-active");
							var a = document.querySelector("#nav a[data-id='" + cid + "']");
							a !== olda && (olda.classList.remove("mui-active"), a.classList.add("mui-active"));

						}
					}
					return !1;

				});
				window.addEventListener('gotab', function(e) {
					self.user = e.detail.type == 'userInfo' && app.User.get();
					mui.fire(plus.webview.getWebviewById('wme_me'), 'reload', {
						type: 'userInfo'
					});
					cid = e.detail.id != undefined && e.detail.id;
					var m = self.menus[cid];

					var w = plus.webview.getWebviewById(cid);

					w.show('fade-in', 200);
					plus.webview.hide(id);
					sid = cid;
					var olda = document.querySelector("#nav a.mui-active");
					var a = document.querySelector("#nav a[data-id='" + cid + "']");
					a !== olda && (olda && olda.classList.remove("mui-active"), a.classList.add("mui-active"));

					//					}

				});
				setTimeout(function() {
					self.initIndex();
				}, 200);
				var backButtonPress = 0;
				mui.back = function(event) {
					backButtonPress++;
					if(backButtonPress > 1) {
						plus.runtime.quit();
					} else {
						plus.nativeUI.toast('再按一次退出应用');
					}
					setTimeout(function() {
						backButtonPress = 0;
					}, 1000);
					return false;
				};
			},
			getVersionNum: function(v) {
				if(v == null || v == '') {
					return 0;
				}
				var arr = v.split('.');
				return arr[0] * 100000 + arr[1] * 1000 + arr[2] * 1;
			},
			pushMsg: function(msg) {
				if(!msg.payload) {
					return;
				}
				var payload = msg.payload;
				if(typeof(msg.payload) == "string") {
					payload = JSON.parse(msg.payload);
				}

				var data = payload.data;
				//				if(typeof(msg.payload) == "string") {
				//					payload = JSON.parse(payload.data);
				//				}
				switch(data.type) {
					case 'openWindow':
						var w = plus.webview.getWebviewById(data.id);
						if(w) {
							mui.fire(w, 'reload', {
								ref: data.ref
							});
							w.show('slide-in-right');
						} else {
							w = mui.preload({
								id: data.id,
								url: data.href,
								styles: {
									popGesture: 'hide'
								},
								extras: {
									ref: data.ref
								}
							});
							w.show('slide-in-right');
							w.addEventListener('hide', function() {
								mui.fire(w, 'unload', {});
							});
						}
						break;
					case 'reloadWindow':
						var w = plus.webview.getWebviewById(data.id);
						if(w) {
							//							alert('刷新：：' + data.id);
							mui.fire(w, 'reload', {
								ref: data.ref
							});
						}
						break;
					default:
						break;
				}
			},
			getVer: function() {
				var self = this;
				var par = {
					verType: app.appType,
				};
				app.post('api/Common/GetSUI', par, function(data) {
					var cVer = self.getVersionNum(app.version);
					var minVer = self.getVersionNum(data.MinVer);
					var sVer = self.getVersionNum(data.MaxVer);
					if(sVer == 0) {
						return;
					}
					var reg = new RegExp("<br/>", "g");
					var c = '更新内容：\r\n' + data.Remark.replace(reg, "\r\n");
					if(sVer > cVer) {
						if(cVer >= minVer) { //下载增量文件 
							app.down(data.AddPath, app.upFile, function(file) {
								app.Cache.set(app.Cache.key.isUpFile.toKeyName(), true);
								app.appType == 3 || mui.toast(data.MaxVer + ' 更新下载成功，重启app后安装更新')
							});
						} else {
							if(plus.os.name == "Android") {
								if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_WIFI) {
									mui.alert('当前版本低于最小运行版本，必须更新后使用\r\n', '更新提示', function() {
										app.down(data.ApkPath, app.appFile, function(file) {
											plus.runtime.openFile(file.filename);
										}, true);
									});
								} else {
									var btnArray = ['更新', '取消'];
									mui.confirm('当前版本低于最小运行版本，必须更新后使用\r\n', cVer + ' 新版发布', btnArray,
										function(e) {
											if(e.index == 0) {
												app.down(data.ApkPath, app.appFile, function(file) {
													plus.runtime.openFile(file.filename);
												});
											} else {
												plus.runtime.quit();
											}
										});
								}
							} else if(plus.os.name == "iOS") {
								if(data.AppPath) {
									mui.alert('当前版本低于最小运行版本，必须更新后使用\r\n', '更新提示', function() {
										plus.runtime.openURL(data.AppPath);
									});
								} else {
									mui.alert('当前版本低于最小运行版本，必须更新后使用\r\n', '更新提示', function() {
										app.down(data.AddPath, app.upFile, function(file) {
											plus.runtime.install(app.upFile, {
												force: true
											}, function() {
												app.version = data.MaxVer;

												app.Cache.set(app.Cache.key.upFileVer.toKeyName(), data.MaxVer);
												app.Cache.set(app.Cache.key.isUpFile.toKeyName(), false);

												app.Cache.set(app.Cache.key.isRestartOpen.toKeyName(), true)
												mui.fire(plus.webview.getWebviewById('wme_info_setting'), 'reload', {});
												app.log('安装更新成功')
												plus.runtime.restart();
											}, function(e) {
												app.log('安装更新失败')

											});
										}, true);
									});

								}
							}
						}
					}
				});

			},

		},
		ready: function() {
			var self = this;

			//				var selectWelcome = app.Cache.getBoolean(app.Cache.key.selectWelcome.toKeyName(app.welcomeVer));
			//				if (!selectWelcome) {
			//					mui.openWindow({
			//						id: 'wWelcome',
			//						url: '../login/welcome.html',
			//						show: {
			//							aniShow: 'zoom-fade-out'
			//						},
			//						waiting: {
			//							autoShow: false
			//						}
			//					});
			//				}

			mui.init();
			mui.ready(function() {
				window.addEventListener('reload', function(e) {
					if(e.detail.type == 'userInfo') {
						self.user = app.User.get();
						mui.fire(plus.webview.getWebviewById('wme_me'), 'reload', {
							type: 'userInfo'
						})
					}

				});

				setTimeout(function() {
					app.Cache.iclearExpired();
				}, 30000)
			});
			mui.plusReady(function() {

				app.log('检查是否有更新：' + app.version + '|' + app.Cache.getBoolean(app.Cache.key.isUpFile.toKeyName()) + '|' + app.Cache.getBoolean(app.Cache.key.isRestartOpen.toKeyName()))
				if(app.Cache.getBoolean(app.Cache.key.isUpFile.toKeyName())) {
					plus.runtime.install(app.upFile, {
						force: false
					}, function() {
						app.version = app.Cache.getString(app.Cache.key.upFileVer.toKeyName());
						app.Cache.set(app.Cache.key.isUpFile.toKeyName(), false);

						app.Cache.set(app.Cache.key.isRestartOpen.toKeyName(), true)
						app.log('安装更新成功')
						plus.runtime.restart();
					}, function(e) {

						app.log('安装更新失败')

					})
				} else {

					self.loadMenu();
					//					self.load();

					var isUse = true;
					//推送
					plus.push.addEventListener("click", function(msg) {
						// 判断是从本地创建还是离线推送的消息
						//						alert("click:::接收消息:::" + JSON.stringify(msg));

						//						switch(msg.payload) {
						//							case "LocalMSG":
						//								//								alert("点击本地创建消息启动：");
						//								break;
						//							default:
						//								//								$.Msg(msg);
						//								//								alert("点击离线推送消息启动：" + JSON.stringify(msg));
						//								break;
						//						}
						plus.runtime.setBadgeNumber(0);
						self.pushMsg(msg);
						// 处理其它数据
						//						alert('11:::' + JSON.stringify(msg));

					}, false);

					// 监听在线消息事件
					plus.push.addEventListener("receive", function(msg) {
						if(msg.aps) { // Apple APNS message
							//							alert("11接收到在线APNS消息:::" + JSON.stringify(msg));
							var n = isUse ? 0 : 1;
							plus.runtime.setBadgeNumber(n);
							msg.payload.LocalMSG = true;
							plus.push.createMessage(msg.content, JSON.stringify(msg.payload), {
								title: msg.title,
								cover: false,
							});
						} else {
							var payload = msg.payload;
							if(typeof(msg.payload) == "string") {
								payload = JSON.parse(msg.payload);
							}
							//							alert("22接收到在线透传消息:::" + (!payload.LocalMSG) + '|' + JSON.stringify(msg));
							if(!payload.LocalMSG) {
								//								alert("11接收到在线透传消息:::" + JSON.stringify(msg));
								self.pushMsg(msg);
							}
						}

					}, false);
					document.addEventListener("pause", function() {
						isUse = false;
					}, false);
					document.addEventListener("resume", function() {
						isUse = true;
					}, false);
					if(!app.Cache.getBoolean(app.Cache.key.isRestartOpen.toKeyName())) {
						setTimeout(function() {
							self.getVer();
						}, 2000);

					} else {
						app.Cache.set(app.Cache.key.isRestartOpen.toKeyName(), false)
					}

				}

			});

		}
	});

});