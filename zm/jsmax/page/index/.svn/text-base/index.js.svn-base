define(['app', 'mui', 'vue'], function(app, mui, vue) {
	//	app.showWaiting(undefined, 1);
	var wlogin;
	var wNewsDetail;
	var header = document.getElementById("header");
	var pages = {};

	var pr = document.getElementById("pr");
	var id = 'windex';
	var wexinlogin = document.querySelector('.wexin-login');
	//	var mainPage = document.getElementById('mainPage');
	var broad = document.querySelector('.broad');
	var weixinBtn = document.getElementById('weixinBtn');
	var vm = new vue({
		el: '#pr',
		data: {
			ui: {
				content: document.getElementById("pr"),
				show: function() {
					this.content.classList.remove('mui-hidden');
				},
				hide: function() {
					this.content.classList.add('mui-hidden');
				}
			},
			par: {
				lastDT: app.User.get().LastDT
			},
			menus: {
				windex: {
					href: '',
					header: '',
					isloaded: '1',
				},
				wme_me: {
					href: '../me/me.html',
					header: '',
					isloaded: '0',
				},
				wfriend_list: {
					href: '../friend/list.html',
					header: '<h1 class="mui-title">好友</h1>',
					isloaded: '1',
				},
				wdynamic_list: {
					href: '../dynamic/list.html',
					header: '',
					isloaded: '0',
				},
				wclub_list: {
					href: '../equestrian/about.html',
					header: '',
					isloaded: '1',
				}
			},
			o: null,
			user: app.User.get(),

		},
		methods: {
			loginWexinCall: function(code) {
				var self=this;
				switch(code) {
					case 1:
						//登录成功
						wexinlogin.classList.add('mui-hidden');
						self.refreshUser();
						break;
					case 2:
						//授权成功
						wexinlogin.classList.add('mui-hidden');
						break;
					case 3:
						mui(weixinBtn).button('reset');
						break;
					default:
						break;
				}
			},
			refreshUser: function() {
				var self = this;
				self.user = app.User.get();
				mui.fire(plus.webview.getLaunchWebview(), "reload", {
					type: 'userInfo'
				});
				mui.fire(plus.webview.getWebviewById('wdynamic_list'), 'reload', {});

			},
			loginWexin: function() {
				var self = this;
				mui(weixinBtn).button('reset');
				mui(weixinBtn).button('loading');
				app.reloginWexin(self.loginWexinCall);
			},
			load: function() {
				var self = this;
				app.post('api/News/GetFirstPage', self.par, function(data) {
					//var d = data;
					//if(JSON.stringify(self.o) != JSON.stringify(d)) {
					//self.o = data;
					//app.Cache.setObject(app.Cache.key.cindexData.toKeyName(), self.o);
					//}
					if(data) {
						self.o = data;
						app.Cache.setObject(app.Cache.key.cindexData.toKeyName(), self.o);
						app.loadImg();
					}
					//data.UserInfo && app.User.set(data.UserInfo);
					mui("#slider").slider({
						interval: 5000
					});

					self.ui.show();

					app.closeWaiting();
				}, function() {
					app.closeWaiting();
					self.o || app.showError(function() {
						self.ui.hide();
						app.showWaiting(1);
						self.load();
					}, 1)
				});
				app.loadImg();
			},
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
				//				app.showWaiting();
				//				var totalMenu = 4;
				for(var k in self.menus) {
					var styles = {
						top: '0px',
						bottom: '50px',
						render: 'always',
						scrollIndicator: 'none',
					}
					var menu = self.menus[k];
					var child;
					menu.header.length && (styles.top = '44px');
					if(k != 'windex') {
						child = plus.webview.create(menu.href, k, styles);
						child.hide();
						main.append(child);
						//						(function(c) {
						//							c.addEventListener("loaded", function() { //注册新webview的载入完成事件
						//								totalMenu--;
						//								if(totalMenu == 0) {
						//									setTimeout(function() {
						//										app.closeWaiting();
						//									}, 500);
						//								}
						//							}, false);
						//						})(child);
					}
				}
				//				if(!self.user.UserID) {
				//					wlogin = mui.preload({
				//						url: '../login/login.html',
				//						id: 'wlogin', //默认使用当前页面的url作为id 
				//						styles: {
				//							popGesture: 'hide'
				//						}
				//					});
				//				}
				var tabShow = {};
				mui("#nav").on("touchend", "a", function(el) {
					el.preventDefault();
					var selfA = this;
					var cid = selfA.dataset.id;
					var m = self.menus[cid];
					if(m.isloaded == '0') {
						el.stopPropagation();
						return;
					}
					if(cid == 'wfriend_list') {
						if(id == 'windex') {
							app.fExpect();
						} else {
							var lp = plus.webview.getWebviewById(id);
							mui.fire(lp, "fExpect", {});
						}
						el.stopPropagation();
						return;
					}
					if(cid && cid != id) {
						if(cid == 'wfriend_list') {

						}
						//						else if((cid == 'wme_me') && !self.user.UserID) {
						//							app.showLogin();
						//							header.dataset.id = cid;
						//							app.Cache.set('gotab', true);
						//						} 
						else {

							var w = plus.webview.getWebviewById(cid);
							mui.fire(w, "onTabTap", {});
							var t = 200;
							var an = 'fade-in';
							if(mui.os.ios || tabShow[cid]) {
								t = 0;
								an = 'none';
							}
							if(cid == 'windex') {
								header.classList.add('mui-hidden');
								pr.classList.remove('mui-hidden');
								plus.webview.hide(id);
							} else {
								tabShow[cid] = true;
								//去掉标题
								//								header.classList.remove('mui-hidden');
								pr.classList.add('mui-hidden');
								w.show(an, t, function() {
									//去掉标题
									//									header.innerHTML = m.header;
								});
								id && plus.webview.hide(id);
							}
							id = cid;
							//							header.dataset.id = cid;
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
					var cid = e.detail.id != undefined ? e.detail.id : header.dataset.id;
					header.dataset.id = cid;
					var m = self.menus[cid];
					//					if (e.detail.index != undefined && index != 0) {

					var w = plus.webview.getWebviewById(cid);
					if(cid == 'windex') {
						header.classList.add('mui-hidden');
						pr.classList.remove('mui-hidden');
						plus.webview.hide(id);
					} else {
						//						header.classList.remove('mui-hidden');
						pr.classList.add('mui-hidden');
						mui.fire(w, "onTabTap", {});
						w.show('fade-in', 200, function() {
							//							header.innerHTML = m.header;
						});
						plus.webview.hide(id);
					}
					id = cid;
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

					if(sVer > cVer) {
						if(cVer >= minVer) { //下载增量文件 
							app.down(data.AddPath, app.upFile, function(file) {
								app.Cache.set(app.Cache.key.isUpFile.toKeyName(), true);
								app.appType == 3 || mui.toast(data.MaxVer + ' 更新下载成功，重启app后安装更新')
							});
						} else {
							mui.openWindow({
								url: '../pub/appupgrade.html',
								id: 'pub_appupgrade',
								extras: {
									edata: data,
								}
							});
						}
					}
				});

			},

		},
		created: function() {
			var self = this;
			self.o = app.Cache.getObject(app.Cache.key.cindexData.toKeyName());
			self.o || app.loadImg(), self.ui.show();
			//self.o && app.showWaiting();
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
				self.load();
				if(app.Cache.getBoolean('isShowBroad' + '999')) {
					broad.classList.add('mui-hidden');
				}

				window.addEventListener('tabItemLoaded', function(e) {
					//mui.toast(e.detail.id + ' loaded');
					if(e.detail.id) {
						self.menus[e.detail.id].isloaded = '1';
					}
				});

				mui('.mui-scroll-wrapper').scroll({
					indicators: false
				});

				window.addEventListener('reload', function(e) {
					if(e.detail.type == 'userInfo') {
						self.user = app.User.get();
						mui.fire(plus.webview.getWebviewById('wme_me'), 'reload', {
							type: 'userInfo'
						})
					}

				});
				mui('.broad-bottom').on('tap', 'button', function() {
					var el = this;
					broad.classList.add('mui-hidden');
					if(el.dataset.id == "1") {

					} else if(el.dataset.id == "2") {
						app.Cache.set('isShowBroad' + '999', true);
					}
				});
				mui('.wexin-content').on('tap', 'button', function() {
					self.loginWexin();
				});
				mui('#app').on('tap', '[data-id^="w"]', function() {
					var el = this;
					var elid=el.dataset.id;
					if(elid == 'wstore_list' || elid == 'wclass_list'||elid=='wrider_list') {
						app.fExpect();
						return;
					}

					var d = el.dataset.data ? JSON.parse(el.dataset.data) : {};
					if(elid == 'wrider_list') {
						app.openPage(el.dataset.href, elid, d, function(w) {});
					} else {
						//						var w = pages[el.dataset.id];
						if(mui.os.plus) {
							var w = plus.webview.getWebviewById(elid);
							if(w) {
								mui.fire(w, 'reload', {
									ref: d
								});
								w.show('pop-in');
							} else {
								w = mui.preload({
									id: elid,
									url: el.dataset.href,
									styles: {
										popGesture: 'hide',
										scrollIndicator: 'none',
									},
									extras: {
										ref: d
									}
								});
								w.show('pop-in');
								w.addEventListener('hide', function() {
									mui.fire(w, 'unload', {});
								});
							}
						} else {
							var par = '?';
							for(var k in d) {
								par += 'ref.' + k + '=' + d[k] + '&';
							}
							location.href = el.dataset.href + par;
						}
					}
				});
				setTimeout(function() {
					app.Cache.iclearExpired();
				}, 30000);

			});
			mui.plusReady(function() {
				mui(weixinBtn).button('loading');
				//				setTimeout(function() {
				//					mui(weixinBtn).button('reset');
				//				}.bind(weixinBtn), 1500);
				//				setTimeout(self.loginWexin, 1500);
				app.AutologinWexin(self.loginWexinCall);
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
							//alert("11接收到在线APNS消息:::" + JSON.stringify(msg));
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