define(['app', 'mui', 'vue', 'mui.view', 'jquery', 'jquery.qrcode'], function(app, mui, vue, mv, jq, jqqrcode) {
	mui.init({});
	var t;
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			user: app.User.get(),
			user1: app.User.get(),
			par: {
				loginName: '',
				validCode: '',
				password: '',
			},
			validCodeStr: '获取验证码',
			m: 60,
			remember: !0,
			isSendValidCode: !0,
			editPasswordPar: {
				passwordOld: '',
				password: '',
			},
			canEditSex: 1,
			ver: app.appType != 3 ? app.appType + '-' + app.version : app.version,
		},
		computed: {
			valid: function() {
				return {
					loginName: !!this.par.loginName,
					//					password: app.reg.password.test(this.par.password),
					validCode: !!this.par.validCode,
				}
			},
			validCode: function() {
				return {
					isValidCode: !!this.par && !!this.par.loginName && this.isSendValidCode
				}
			},
			validPassword: function() {
				return {
					isPassword: !!this.editPasswordPar && !!this.editPasswordPar.passwordOld && app.reg.password.test(this.editPasswordPar.password)
				}
			},
			isValid: function() {
				var valid = this.valid
				return Object.keys(valid).every(function(key) {
					return valid[key]
				})
			}
		},
		methods: {
			agreeement: function() {
				app.Cache.set(app.Cache.key.cpageUrl.toKeyName(), "http://chorse-sports.com/home_zm/serviceagreement.html");
				app.Cache.set(app.Cache.key.cpageTitle.toKeyName(), "天马用户服务协议");
				mui.openWindow({
					url: "../pub/other.html",
					id: 'wpact',
					createNew: true,
					show: {
						aniShow: 'pop-in',
						duration: 300
					},
					waiting: {
						autoShow: true
					}
				});
			},
			disclaimer: function() {
				app.Cache.set(app.Cache.key.cpageUrl.toKeyName(), "http://chorse-sports.com/home_zm/disclaimer.html");
				app.Cache.set(app.Cache.key.cpageTitle.toKeyName(), "赛事免责声明");
				mui.openWindow({
					url: "../pub/other.html",
					id: 'wpact',
					createNew: true,
					show: {
						aniShow: 'pop-in',
						duration: 300
					},
					waiting: {
						autoShow: true
					}
				});
			},
			editSex: function(el) {
				var self = this;
				if(self.canEditSex == 1) {
					var uubParSex = {
						val: el.detail.isActive ? 1 : 0,
						infoType: 3,
					};
					app.post('api/User/UpdateUserBase', uubParSex, function(data) {
						self.user['Sex'] = uubParSex.val;
						app.User.set(self.user);

						mui.toast('修改成功');
					}, function() {
						self.canEditSex = 0;
						setTimeout(function() {
							mui("#sexSwitch").switch().toggle();
							var sexSwitch = document.getElementById('sexSwitch');
							var handle = document.querySelector('.mui-switch-handle');
							uubParSex.val == "1" ? (handle.style.webkitTransform = "translate(43px, 0)") : (handle.style.webkitTransform = "translate(0, 0)");
							uubParSex.val == "1" ? (sexSwitch.classList.add('mui-active')) : (sexSwitch.classList.remove('mui-active'));
							setTimeout(function() {
								self.canEditSex = 1;
							}, 500);
						}, 500);
						//document.getElementById("sexSwitch").classList.contains("mui-active");
					});
				}
			},
			sendValidCode: function() {
				var self = this;
				self.isSendValidCode = false;
				self.validCodeStr = self.m + 's 后重新获取';
				t = setInterval(function() {
					if(self.m > 1) {
						self.m = self.m - 1;
						self.validCodeStr = self.m + 's 后重新获取';
					} else {
						self.isSendValidCode = true;
						clearTimeout(t);
						self.validCodeStr = '获取验证码';
						self.m = 60;
					}
				}, 1000);
				//				var sspar = {
				//					mobileNum: self.par.loginName,
				//					vcType: 2,
				//				}
				var parValid = {};
				parValid.loginName = self.par.loginName;
				app.post('api/user/GetBindUserVaildCode', parValid, function(data) {
					//					ui.txtPassword.focus();
					mui.toast('验证码发送成功');
				}, function() {
					self.isSendValidCode = true;
					clearTimeout(t);
					self.validCodeStr = '获取验证码';
					self.m = 60;
				});
			},
			bindUser: function() {
				var self = this;
				app.showWaiting();
				//				var uubParMobile = {
				//					val: self.par.loginName,
				//					infoType: 5,
				//					pwd: self.par.password,
				//					validCode: self.par.validCode,
				//				};
				var parBind = {};
				parBind.loginName = self.par.loginName;
				parBind.validCode = self.par.validCode;
				app.post('api/user/BindUser', parBind, function(data) {
					app.User.set(data);
					self.par = null;
					app.closeWaiting();
					mui.toast('绑定成功，系统即将重新启动');
					mui.os.plus && mui.fire(plus.webview.currentWebview().opener(), 'reload', {
						type: 'userInfo'
					});
					setTimeout(function() {
						plus.runtime.restart();
					}, 2000);
				}, function() {
					app.closeWaiting();
				});
			},
			editMobile: function() {
				var self = this;
				app.showWaiting();
				var uubParMobile = {
					val: self.par.loginName,
					infoType: 5,
					pwd: self.par.password,
					validCode: self.par.validCode,
				};
				app.post('api/User/UpdateUserBase', uubParMobile, function(data) {
					self.user['MobileNum'] = uubParMobile.val;
					app.User.set(self.user);
					self.par = null;
					app.closeWaiting();
					mui.toast('修改成功');
					mui.os.plus && mui.fire(plus.webview.currentWebview().opener(), 'reload', {
						type: 'userInfo'
					});
					mui.back();
				}, function() {
					app.closeWaiting();
				});
			},
			editPassword: function() {
				var self = this;
				app.showWaiting();
				app.post('api/User/ChangePwd', self.editPasswordPar, function(data) {
					self.editPasswordPar = null;
					app.closeWaiting();
					mui.toast('修改成功');
					mui.back();
				}, function() {
					app.closeWaiting();
				});
			},
			exit: function() {
				mui.confirm('是否确定退出当前账号', '&nbsp;', ['取消', '确定'], function(e) {
					if(e.index == 1) {
						app.User.clear();

						mui.openWindow({
							id: 'wlogin',
							url: '../login/login.html',
							//						styles: webview_style,
							show: {
								//							aniShow: false,
								aniShow: 'slide-in-right',
							},
							waiting: {
								autoShow: false
							}
						});
						app.Cache.set('gotab', false);
						mui.os.plus && mui.fire(plus.webview.getLaunchWebview(), 'gotab', {
							type: 'userInfo',
							id: 'windex',
						});
						mui.os.plus && plus.webview.hide('wme_info_setting', 'none');
						//							 plus.webview.hide('wme_info_setting');
					} else {

					}
				}, 'div')
			},
			clearCache: function() {
				app.Cache.ideleteAll(function() {
					mui.toast('清理缓存成功')
				});
			},
			getHeadClip: function() {
				var clip = plus.webview.getWebviewById('whead') || mui.preload({
					url: 'head.html',
					id: 'whead',
					styles: {
						popGesture: 'hide'
					}
				});
				return clip;
			},
			galleryImg: function(p) {
				//				var whead = this.getHeadClip();
				plus.gallery.pick(function(e) {
					//					mui.fire(whead, 'reload', {
					//						headUrl: e,
					//						img: p.imageID,
					//						viewID: 'wme_info_meInfo',
					//						sizeParam: p.sizeParam,
					//					});
					//					whead.show('slide-in-right');

					mui.openWindow({
						id: 'whead',
						url: 'head.html',
						extras: {
							headUrl: e,
							img: p.imageID,
							viewID: 'wme_info_meInfo',
							sizeParam: p.sizeParam,
						},
						show: {
							autoShow: true, //页面loaded事件发生后自动显示，默认为true
							aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
						},
						waiting: {
							autoShow: false
						}
					});
				}, function(a) {}, {
					filter: "image"
				})
			},
			getImage: function(p) {
				//				var whead = this.getHeadClip();
				var c = plus.camera.getCamera();
				//				var res = c.supportedVideoResolutions[0];
				//				var fmt = c.supportedVideoFormats[0];
				//				console.log("Resolution: " + res + ", Format: " + fmt);
				c.captureImage(function(e) {
					plus.io.resolveLocalFileSystemURL(e, function(entry) {
						//						mui.fire(whead, 'reload', {
						//							headUrl: entry.toLocalURL(),
						//							img: p.imageID,
						//							viewID: 'wme_info_meInfo',
						//							sizeParam: p.sizeParam,
						//						});
						//						whead.show('slide-in-right');

						mui.openWindow({
							id: 'whead',
							url: 'head.html',
							extras: {
								headUrl: entry.toLocalURL(),
								img: p.imageID,
								viewID: 'wme_info_meInfo',
								sizeParam: p.sizeParam,
							},
							show: {
								autoShow: true, //页面loaded事件发生后自动显示，默认为true
								aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
							},
							waiting: {
								autoShow: false
							}
						});
					}, function(e) {
						//console.log("读取拍照文件错误：" + e.message);
					});
				}, function(s) {
					//console.log("error" + s);
				}, {
					//避免缓存
					//					filename: "_doc/img/head.jpg"
				})
			},
			selImg: function(id) {
				var self = this;
				var ssize = [];
				var osize = [];
				if(id == 'headPhoto') {
					//头像设置比例
					ssize = [260, 260];
					osize = [300, 300];
				} else {
					//按照4:3来显示
					ssize = [260, 195];
					osize = [300, 225];
				}
				var p = {
					imageID: id,
					sizeParam: {
						size: ssize,
						outputSize: osize
					},
				};
				if(mui.os.plus) {
					var a = [{
						title: "拍照"
					}, {
						title: "从手机相册选择"
					}];
					plus.nativeUI.actionSheet({
						title: "修改照片墙",
						cancel: "取消",
						buttons: a
					}, function(b) {
						switch(b.index) {
							case 0:
								break;
							case 1:
								self.getImage(p);
								break;
							case 2:
								self.galleryImg(p);
								break;
							default:
								break
						}
					})
				}
			},
			initImgPreview: function() {
				var self = this;
				var imgs = document.querySelectorAll(".head-img-left img");
				imgs = mui.slice.call(imgs);
				if(imgs && imgs.length > 0) {
					var slider = document.createElement("div");
					slider.setAttribute("id", "__mui-imageview__");
					slider.classList.add("mui-slider");
					slider.classList.add("mui-fullscreen");
					slider.style.display = "none";
					slider.addEventListener("tap", function() {
						slider.style.display = "none";
					});
					slider.addEventListener("touchmove", function(event) {
						event.preventDefault();
					})
					var slider_group = document.createElement("div");
					slider_group.setAttribute("id", "__mui-imageview__group");
					slider_group.classList.add("mui-slider-group");
					imgs.forEach(function(value, index, array) {
						//给图片添加点击事件，触发预览显示；
						value.addEventListener('tap', function() {
							slider.style.display = "block";
							_slider.refresh();
							_slider.gotoItem(index, 0);
						})
						var item = document.createElement("div");
						item.classList.add("mui-slider-item");
						var a = document.createElement("a");
						var img = document.createElement("img");
						img.setAttribute("id", "aHeadImgView");
						img.setAttribute("src", self.user.ImgUrl);
						a.appendChild(img)
						item.appendChild(a);
						slider_group.appendChild(item);
					});
					slider.appendChild(slider_group);
					document.body.appendChild(slider);
					var _slider = mui(slider).slider();
				}
			},
			//			setUserImage: function() {
			//				var self = this;
			//				if(self.user.ImgUrls) {
			//					self.user.ImgUrls.length > 0 && app.setImage({
			//						url: self.user.ImgUrls[0].ImgUrl,
			//						key: app.Cache.key.headPhoto.toKeyName(self.user.UserID),
			//						selector: '#headPhoto',
			//					});
			//					self.user.ImgUrls.length > 1 && app.setImage({
			//						url: self.user.ImgUrls[1].ImgUrl,
			//						key: app.Cache.key.userPhoto1.toKeyName(self.user.UserID),
			//						selector: '#userPhoto1',
			//					});
			//					self.user.ImgUrls.length > 2 && app.setImage({
			//						url: self.user.ImgUrls[2].ImgUrl,
			//						key: app.Cache.key.userPhoto2.toKeyName(self.user.UserID),
			//						selector: '#userPhoto2',
			//					});
			//				}
			//			},

		},
		created: function() {

		},
		ready: function() {
			var self = this;
			mui.ready(function() {
				app.loadImg();
				//页面第一次绑定完成执行
				var cUrl = location.href;
				var index = cUrl.lastIndexOf('#'); //meInfo pageMobileNum
				if(cUrl.substring(index, cUrl.length) == '#pageMeQRcode') {
					jq("#qrWo").qrcode({
						render: "canvas",
						width: 205,
						height: 205,
						background: '#efeff4',
						text: app.toUtf8(self.user.QRCode)
					});
				}
				//meInfo
				var cPage = index == -1 ? "#meInfo" : cUrl.substring(index, cUrl.length);
				//初始化单页view
				var viewApi = mui('#app').view({
					defaultPage: cPage
				});
				mui('.mui-scroll-wrapper').scroll();

				//				mui('.me-head').on('tap', 'i', function() {
				//					var el = this;
				//					self.selImg(el.id);
				//				});
				var view = viewApi.view;
				(function($) {
					//处理view的后退与webview后退
					var oldBack = $.back;
					$.back = function() {
						if(viewApi.canBack()) { //如果view可以后退，则执行view的后退
							self.isSendValidCode = true;
							t && clearTimeout(t);
							self.par = null;
							self.validCodeStr = '获取验证码';
							self.m = 60;
							viewApi.back();
						} else { //执行webview后退 
							//							mui.os.plus ? plus.webview.currentWebview().close() : mui.back();
							oldBack();
						}
					};
					//监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
					//第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
					view.addEventListener('pageBeforeShow', function(e) {
						//				//console.log(e.detail.page.id + ' beforeShow');
					});
					view.addEventListener('pageShow', function(e) {
						//进入手执设定界面时
						if(e.detail.page.id == 'lock') {

						}
						//				//console.log(e.detail.page.id + ' show');
					});
					view.addEventListener('pageBeforeBack', function(e) {
						//				//console.log(e.detail.page.id + ' beforeBack');
					});
					view.addEventListener('pageBack', function(e) {
						//				//console.log(e.detail.page.id + ' back');
					});
				})(mui);
				//				document.getElementById("head-user").addEventListener('tap', function(e) {
				//					e.stopPropagation();
				//				});
				//				setTimeout(function() {
				//					self.initImgPreview();
				//				}, 300);

				//保存操作
				mui('.mui-navbar-inner').on('tap', 'button.save', function() {
					var el = this;
					app.showWaiting();
					var df = el.dataset.form;

					var uubPar = {
						infoType: el.dataset.type,
					};
					var uubPar1 = {};
					var flag = true;
					var selector = "input";
					if(df == "frmPersonSign") {
						selector = "textarea";
					}
					mui("#" + df + " " + selector).each(function(index, ele) {
						uubPar.val = ele.value;
						uubPar1.val = ele.value;
						uubPar1.name = ele.dataset.name;
						if(ele.dataset.reg && !new RegExp(ele.dataset.reg).test(ele.value)) {
							mui.toast(ele.dataset.regError);
							flag = false;
							return false;
						}
					});
					flag || app.closeWaiting();
					flag && app.post('api/User/UpdateUserBase', uubPar, function(data) {
						//						if(uubPar1.name == 'IDCard') {
						//						}
						self.user[uubPar1.name] = uubPar1.val;

						if(uubPar.infoType == "4" && self.user['Sex'] != data) {
							self.canEditSex = 0;
							setTimeout(function() {
								mui("#sexSwitch").switch().toggle();
								var sexSwitch = document.getElementById('sexSwitch');
								var handle = document.querySelector('.mui-switch-handle');
								data == "1" ? (handle.style.webkitTransform = "translate(43px, 0)") : (handle.style.webkitTransform = "translate(0, 0)");
								data == "1" ? (sexSwitch.classList.add('mui-active')) : (sexSwitch.classList.remove('mui-active'));
								setTimeout(function() {
									self.user['Sex'] = data;
									app.User.set(self.user);
									self.canEditSex = 1;
								}, 500);
							}, 500);
						}
						if(uubPar.infoType == '2' || uubPar.infoType == '7') {
							//修改昵称
							self.user['showName'] = app.User.getShowName(self.user);
							//console.log(data + '##################昵称');
						}
						app.User.set(self.user1);
						app.closeWaiting();
						mui.toast('修改成功');
						mui.os.plus && mui.fire(plus.webview.currentWebview().opener(), 'reload', {
							type: 'userInfo'
						});
						mui.back();
					}, function() {
						app.closeWaiting();
					});

				});
				//				mui("#slider").slider({
				//					interval: 5000
				//				});
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					self.ver = app.version;
					self.user = app.User.get();
					app.loadImg();
				});
				//上传头像
				window.addEventListener('uploadHead', function(e) {
					var plce;
					if(e.detail.img == 'headPhoto') {
						plce = 0;
					} else if(e.detail.img == 'userPhoto1') {
						plce = 1;
					} else
					if(e.detail.img == 'userPhoto2') {
						plce = 2;
					}
					app.showWaiting();
					var uubParHead = {
						val: e.detail.headData,
						//						infoType: 1,
						place: plce
					};
					//					document.getElementById(e.detail.img).src = uubParHead.val;
					app.post('api/User/UpdateUserHeader', uubParHead, function(data) {
						console.log('修改头像成功：' + e.detail.img + ' ' + data);
						var el = document.getElementById(e.detail.img);
						if(e.detail.img == 'headPhoto') {
							//回写头像
							self.user.ImgUrl = data;
							self.user.ImgUrls[0].ImgUrl = data;
							//							//console.log(uubParHead.val);
							app.Cache.set(app.Cache.key.headPhoto.toKeyName(self.user.UserID), uubParHead.val);
							el.style.background = 'url(' + uubParHead.val + ')';
						} else if(e.detail.img == 'userPhoto1') {
							self.user.ImgUrls[1].ImgUrl = data;
							//							//console.log(app.Cache.key.userPhoto1.toKeyName(self.user.UserID) + ' ' + uubParHead.val);
							app.Cache.set(app.Cache.key.userPhoto1.toKeyName(self.user.UserID), uubParHead.val);
							//直接读取本地 
							el.src = uubParHead.val;
						} else if(e.detail.img == 'userPhoto2') {
							self.user.ImgUrls[2].ImgUrl = data;
							////console.log(app.Cache.key.userPhoto2.toKeyName(self.user.UserID) + ' ' + uubParHead.val);
							app.Cache.set(app.Cache.key.userPhoto2.toKeyName(self.user.UserID), uubParHead.val);
							//直接读取本地 
							el.src = uubParHead.val;
						}
						//						document.getElementById(e.detail.img).setAttribute('data-img', uubParHead.val);
						//						app.loadImg();
						app.User.set(self.user);
						app.closeWaiting();
						mui.os.plus && mui.fire(plus.webview.currentWebview().opener(), 'reload', {
							type: 'photo'
						});
						//						self.refreshMe();
						//						mui.fire(plus.webview.currentWebview().opener(), 'reload', {
						//							type: 'userInfo'
						//						});
						mui.toast('修改成功');
					}, function() {
						//						mui.toast('修改失败');
						//						return;
						console.log('修改失败，尝试从GetFirstPage获取数据');
						var newsPar = {
							lastDT: ''
						};
						app.post('api/News/GetFirstPage', newsPar, function(newSData) {
							var data = newSData.UserInfo;
							var el = document.getElementById(e.detail.img);
							if(e.detail.img == 'headPhoto') {
								//回写头像
								self.user.ImgUrl = data.ImgUrl;
								self.user.ImgUrls[0].ImgUrl = data.ImgUrls[0].ImgUrl;
								app.Cache.set(app.Cache.key.headPhoto.toKeyName(self.user.UserID), uubParHead.val);
								el.style.background = 'url(' + uubParHead.val + ')';
							} else if(e.detail.img == 'userPhoto1') {
								self.user.ImgUrls[1].ImgUrl = data.ImgUrls[1].ImgUrl;
								app.Cache.set(app.Cache.key.userPhoto1.toKeyName(self.user.UserID), uubParHead.val);
								el.src = uubParHead.val;
							} else if(e.detail.img == 'userPhoto2') {
								self.user.ImgUrls[2].ImgUrl = data.ImgUrls[2].ImgUrl;
								app.Cache.set(app.Cache.key.userPhoto2.toKeyName(self.user.UserID), uubParHead.val);
								el.src = uubParHead.val;
							}
							//							document.getElementById(e.detail.img).setAttribute('data-img', uubParHead.val);
							//							self.user = self.user;
							app.User.set(self.user);
							//							app.loadImg();
							//							self.setUserImage();
							mui.os.plus && mui.fire(plus.webview.currentWebview().opener(), 'reload', {
								type: 'photo'
							});
							mui.toast('修改成功');
						});
						app.closeWaiting();
					});
				});
			});
		}
	});

});