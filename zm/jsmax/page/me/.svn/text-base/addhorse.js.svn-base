define(['app', 'mui', 'vue', 'mui.view', 'jquery'], function(app, mui, vue, mv, jq) {
	mui.init({});
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			horseData: {
				Name: '',
				Sex: '',
				Birth: '',
				Blood: '',
				Height: '',
				Color: '',
				HDes: '',
				Father: '',
				Mother: '',
			},
			pageData: {
				hName: '必填',
				hSex: '必填',
				hBir: '必填',
				hBlood: '必填',
				hHeight: '必填',
				hHColor: '必填',
				hFeature: '必填',
				hFather: '选填',
				hMother: '选填',
				//详细页标题
				dTitle: '',
				dVal: '',
				dHint: '',
				hImgUrl: '../../img/horse.png',
				//1添加2修改
				pageType: 1,
			},
			par: {
				horseId: '',
				val: '',
				infoType: 0,
			},
		},
		computed: {
			valid: function() {
				return {
					loginName: !!this.par.loginName,
					password: app.reg.password.test(this.par.password),
					validCode: !!this.par.validCode,
					remember: !!this.remember,
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
			editSex: function(el) {
				var self = this;
				self.par.infoType = 10;
				self.par.val = el.detail.isActive ? 0 : 1;
				if(pageType == 2) {
					app.post('api/User/UpdateHorse', self.par, function(data) {

					}, function() {
						//如果修改失败了，则还原
						self.horseData.Sex = self.horseData.Sex == 0 ? 1 : 0;
					});
				}
			},
			validVal: function() {
				switch(self.par.infoType) {
					case 2:
						self.horseData.Name = self.pageData.dVal;
						break;
					case 3:
						self.horseData.Blood = self.pageData.dVal;
						break;
					case 8:
						self.horseData.HDes = self.pageData.dVal;
						break;
					case 9:
						self.horseData.Age = self.pageData.dVal;
						break;
					case 10:
						self.horseData.Sex = self.pageData.dVal;
						break;
					case 11:
						self.horseData.Color = self.pageData.dVal;
						break;
					case 12:
						self.horseData.Birth = self.pageData.dVal;
						break;
					case 14:
						self.horseData.Height = self.pageData.dVal;
						break;
					case 15:
						self.horseData.Father = self.pageData.dVal;
						break;
					case 16:
						self.horseData.Mother = self.pageData.dVal;
						break;
					default:
						break;
				}
				return false;
			},
			save: function() {
				var self = this;
				if(!self.validVal()) {
					return;
				}
				self.par.val = self.pageData.dVal;
				var urlStr = 'api/User/UpdateHorse';
				if(pageType == 2) {

				}
				app.post(urlStr, self.par, function(data) {
					switch(self.par.infoType) {
						case 2:
							self.horseData.Name = self.pageData.dVal;
							break;
						case 3:
							self.horseData.Blood = self.pageData.dVal;
							break;
						case 8:
							self.horseData.HDes = self.pageData.dVal;
							break;
						case 9:
							self.horseData.Age = self.pageData.dVal;
							break;
						case 10:
							self.horseData.Sex = self.pageData.dVal;
							break;
						case 11:
							self.horseData.Color = self.pageData.dVal;
							break;
						case 12:
							self.horseData.Birth = self.pageData.dVal;
							break;
						case 14:
							self.horseData.Height = self.pageData.dVal;
							break;
						case 15:
							self.horseData.Father = self.pageData.dVal;
							break;
						case 16:
							self.horseData.Mother = self.pageData.dVal;
							break;
						default:
							break;
					}
					self.load();
					mui.back();
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
			detail: function(t) {
				var self = this;
				switch(t) {
					case 1:
						self.pageData.dTitle = '马名';
						self.pageData.dVal = self.horseData.Name;
						self.pageData.dHint = '请输入马名';
						self.par.infoType = 2;
						break;
					case 2:
						self.pageData.dTitle = '性别';
						self.pageData.dVal = self.horseData.Sex;
						self.pageData.dHint = '请输入性别';
						self.par.infoType = 10;
						break;
					case 3:
						self.pageData.dTitle = '出生年';
						self.pageData.dVal = self.horseData.Birth;
						self.pageData.dHint = '请输入出生年';
						self.par.infoType = 12;
						break;
					case 4:
						self.pageData.dTitle = '血统';
						self.pageData.dVal = self.horseData.Blood;
						self.pageData.dHint = '请输入血统';
						self.par.infoType = 3;
						break;
					case 5:
						self.pageData.dTitle = '体高';
						self.pageData.dVal = self.horseData.Height;
						self.pageData.dHint = '请输入体高';
						self.par.infoType = 14;
						break;
					case 6:
						self.pageData.dTitle = '毛色';
						self.pageData.dVal = self.horseData.Color;
						self.pageData.dHint = '请输入毛色';
						self.par.infoType = 11;
						break;
					case 7:
						self.pageData.dTitle = '特征描述';
						self.pageData.dVal = self.horseData.HDes;
						self.pageData.dHint = '请输入特征描述';
						self.par.infoType = 8;
						break;
					case 8:
						self.pageData.dTitle = '父系';
						self.pageData.dVal = self.horseData.Father;
						self.pageData.dHint = '请输入父系';
						self.par.infoType = 15;
						break;
					case 9:
						self.pageData.dTitle = '母系';
						self.pageData.dVal = self.horseData.Mother;
						self.pageData.dHint = '请输入母系';
						self.par.infoType = 16;
						break;
					default:
						break;
				}
			},
			load: function() {
				var self = this;
				if(self.horseData) {
					if(self.horseData.Name) {
						self.pageData.hName = self.horseData.Name;
					}
					if(self.horseData.Sex) {
						self.pageData.hSex = self.horseData.Sex;
					}
					if(self.horseData.ImgUrl) {
						self.pageData.hImgUrl = self.horseData.ImgUrl;
					}
					if(self.horseData.Birth) {
						self.pageData.hBir = self.horseData.Birth;
					}
					if(self.horseData.Blood) {
						self.pageData.hBlood = self.horseData.Blood;
					}
					if(self.horseData.Height) {
						self.pageData.hHeight = self.horseData.Height;
					}
					if(self.horseData.Color) {
						self.pageData.hHColor = self.horseData.Color;
					}
					if(self.horseData.HDes) {
						self.pageData.hFeature = self.horseData.HDes;
					}
					if(self.horseData.Father) {
						self.pageData.hFather = self.horseData.Father;
					}
					if(self.horseData.Mother) {
						self.pageData.hMother = self.horseData.Mother;
					}
				} else {

				}
				app.loadImg();
			},
			changeHead: function(id) {
				var self = this;
				var elem = id;
				if(mui.os.plus) {
					var a = [{
						title: "拍照"
					}, {
						title: "从手机相册选择"
					}];
					plus.nativeUI.actionSheet({
						title: "修改头像",
						cancel: "取消",
						buttons: a
					}, function(b) {
						switch(b.index) {
							case 0:
								break;
							case 1:
								self.getImage(elem);
								break;
							case 2:
								self.galleryImg(elem);
								break;
							default:
								break
						}
					})
				}
			},
			initImgPreview: function() {
				var imgs = document.querySelectorAll("img.mui-action-preview");
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
						//取消预览
						//						value.addEventListener('tap', function(e) {
						//							e.stopPropagation();
						//							slider.style.display = "block";
						//							_slider.refresh();
						//							_slider.gotoItem(index, 0);
						//						})
						var item = document.createElement("div");
						item.classList.add("mui-slider-item");
						var a = document.createElement("a");
						var img = document.createElement("img");
						//console.log(value.src);
						img.setAttribute("src", value.src);
						a.appendChild(img)
						item.appendChild(a);
						slider_group.appendChild(item);
					});
					slider.appendChild(slider_group);
					document.body.appendChild(slider);
					var _slider = mui(slider).slider();
				}
			},
			galleryImg: function(elem) {
				//				var whead = this.getHeadClip();
				plus.gallery.pick(function(e) {

					//					mui.fire(whead, 'reload', {
					//						headUrl: e,
					//						img: elem,
					//						viewID: 'me_addhorse',
					//					});
					//					whead.show('slide-in-right');

					mui.openWindow({
						id: 'whead',
						url: 'head.html',
						extras: {
							headUrl: e,
							img: elem,
							viewID: 'me_addhorse',
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
			getImage: function(elem) {
				//				var whead = this.getHeadClip();
				var c = plus.camera.getCamera();
				c.captureImage(function(e) {
					plus.io.resolveLocalFileSystemURL(e, function(entry) {
						//						mui.fire(whead, 'reload', {
						//							headUrl: entry.toLocalURL(),
						//							img: elem,
						//							viewID: 'me_addhorse',
						//						});
						//						whead.show('slide-in-right');

						mui.openWindow({
							id: 'whead',
							url: 'head.html',
							extras: {
								headUrl: entry.toLocalURL(),
								img: elem,
								viewID: 'me_addhorse',
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
			defaultImg: function() {
				if(mui.os.plus) {
					plus.io.resolveLocalFileSystemURL("_doc/head.jpg", function(entry) {
						var s = entry.fullPath + "?version=" + new Date().getTime();
						document.getElementById("head-img").src = s;
					}, function(e) {
						document.getElementById("head-img").src = '../../img/horse.png';
					})
				} else {
					document.getElementById("head-img").src = '../../img/horse.png';
				}
			},
		},

		created: function() {

		},
		ready: function() {
			var self = this;
			window.addEventListener('editHorse', function(e) {
				self.horseData = e.detail.horseData;
				self.par.horseId = self.horseData && self.horseData.HID;
				self.pageData.pageType = e.detail.pageType;
				self.load();
			});
			//页面第一次绑定完成执行 
			var cUrl = location.href;
			var index = cUrl.lastIndexOf('#'); //meInfo pageMobileNum

			var cPage = index == -1 ? "#horseInfo" : cUrl.substring(index, cUrl.length);
			//初始化单页view
			var viewApi = mui('#app').view({
				defaultPage: cPage
			});
			mui('.mui-scroll-wrapper').scroll();

			mui.ready(function() {
				var view = viewApi.view;
				(function($) {
					//处理view的后退与webview后退
					var oldBack = $.back;
					$.back = function() {
						if(viewApi.canBack()) { //如果view可以后退，则执行view的后退
							viewApi.back();
						} else { //执行webview后退 
							//mui.os.plus ? plus.webview.currentWebview().close() : mui.back();
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
						//						if (e.detail.page.id == 'lock') {
						//							var settings = app.getSettings();
						//							/*if (!settings.autoLogin) {
						//								plus.nativeUI.toast('当前没有启用 “自动登录”，需要在登录时启用 "自动登录"，设定的手势锁屏才会升效。');
						//							}*/
						//							var lockStateButton = document.getElementById("lockState");
						//							var locker = document.querySelector('.mui-locker');
						//							lockStateButton.classList[settings.gestures ? 'add' : 'remove']('mui-active')
						//							locker.style.display = settings.gestures ? 'block' : 'none';
						//						}
						//				//console.log(e.detail.page.id + ' show');
					});
					view.addEventListener('pageBeforeBack', function(e) {
						//				//console.log(e.detail.page.id + ' beforeBack');
					});
					view.addEventListener('pageBack', function(e) {
						//				//console.log(e.detail.page.id + ' back');
					});
				})(mui);
				//				document.getElementById("head-img").addEventListener('tap', function(e) {
				//					e.stopPropagation();
				//				});
				//				self.load();
				mui.plusReady(function() {
					//上传头像
					window.addEventListener('uploadHead', function(e) {
						app.showWaiting();
						var uubParHead = {
							horseId: self.horseData.horseId,
							val: e.detail.headData,
							infoType: '0'
						};
						app.post('api/User/UpdateHorse', uubParHead, function(data) {
							//console.log(e.detail.img);
							document.getElementById(e.detail.img).src = e.detail.headData;
							app.closeWaiting();
							mui.toast('修改成功');
						}, function() {
							app.closeWaiting();
						});
					});
					//					setTimeout(function() {
					//						self.defaultImg();
					//						setTimeout(function() {
					//							self.initImgPreview();
					//						}, 300);
					//					}, 500);
				});
			});
		}
	});
});