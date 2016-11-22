define(['app', 'mui', 'vue'], function(app, mui, vue) {

	if(!mui.os.plus) {
		mui('#nav').on('tap', '[data-id^="w"]', function() {
			var el = this;
			el.dataset.href && (location.href = el.dataset.href);
		});
	}

	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			user: app.User.get(),
			ui: {
				personSign: document.getElementById('personSign'),
				showMore: document.getElementById('showMore'),
			},
			photo: [],
			par: {

			},
			showMobile: '',
		},
		computed: {

		},
		methods: {
			myevents: function() {
				mui.openWindow({
					id: 'me_myevents',
					url: 'myevents.html',
					show: {
						aniShow: false
					},
					waiting: {
						autoShow: false
					}
				});
			},
			myhorse: function() {
				mui.openWindow({
					id: 'myhorse',
					url: 'myhorse.html',
					show: {
						aniShow: false
					},
					waiting: {
						autoShow: false
					}
				});
			},
			team: function() {
				//				mui.openWindow({
				//					id: 'team_search',
				//					url: '../match/team_search.html',
				//					show: {
				//						aniShow: false
				//					},
				//					waiting: {
				//						autoShow: false
				//					}
				//				});
			},
			onclickSettings: function() {
				mui.openWindow({
					id: 'settings',
					url: 'settings.html',
					show: {
						aniShow: false
					},
					waiting: {
						autoShow: false
					}
				});
			},
			onclickCertification: function() {
				//this.user.RiderNum = '1';
				if(this.user.RiderNum && this.user.RiderNum > 0) {
					//mui.toast(this.user.RiderNum);
					mui.openWindow({
						id: 'mycertification',
						url: 'mycertification.html',
						show: {
							aniShow: false
						},
						waiting: {
							autoShow: false
						}
					});
				} else {
					mui.toast('请先加入西促会');
				}
			},
			passport: function() {
				//this.user.IsMember = true;
				if(this.user.ChapterID) {
					mui.openWindow({
						id: 'mycowboypassport',
						url: 'mycowboypassport.html',
						show: {
							aniShow: false
						},
						waiting: {
							autoShow: false
						}
					});
				} else {
					mui.toast('请先加入西促会');
				}
			},
			club: function() {
				if(this.user.ChapterID) {
					mui.openWindow({
						id: 'mychapter',
						url: 'mychapter.html',
						show: {
							aniShow: false
						},
						waiting: {
							autoShow: false
						}
					});
				} else {
					mui.toast('您还不是会员');
				}
			},
			meNick: function() {
				mui.openWindow('me_info.html#pageNick', 'wme_info_pageNick');
			},
			mePersonSign: function() {
				mui.openWindow('me_info.html#pagePersonSign', 'wme_info_pagePersonSign');
			},
			meInfo: function() {
				mui.openWindow('me_info.html#meInfo', 'wme_info_meInfo');
			},
			meQRcode: function() {
				mui.openWindow('me_info.html#pageMeQRcode', 'wme_info_pageMeQRcode');
			},
			setting: function() {
				mui.openWindow('me_info.html#setting', 'wme_info_setting');
			},
			purse: function() {
				mui.openWindow({
					id: 'wrecharge_add',
					url: '../recharge/add.html',
					waiting: {
						autoShow: false
					},
					styles: {
						popGesture: 'hide'
					}
				});
			},
			initellipsis: function() {
				var self = this;
				//先移除单行，否则会影响scrollHeight高度计算
				self.ui.personSign.classList.remove('p-sign-single');
				if(self.ui.personSign.scrollHeight > 60) {
					self.ui.personSign.setAttribute('data-status', 'down');
					self.ui.personSign.classList.add('me-ellipsis');
					self.ui.showMore.classList.remove('mui-hidden');
					//					self.ui.showMore.classList.add('mui-icon-arrowdown');
					self.ui.showMore.innerHTML = "展开";
					self.ui.showMore.classList.remove('mui-icon-arrowup');
				} else {
					if(self.ui.personSign.scrollHeight <= 31) {
						self.ui.personSign.classList.add('p-sign-single');
					} else {
						self.ui.personSign.classList.remove('p-sign-single');
					}
					self.ui.showMore.classList.add('mui-hidden');
				}
			},
			ellipsisToggle: function() {
				var self = this;
				if(self.ui.personSign.dataset.status == 'up') {
					self.ui.personSign.setAttribute('data-status', 'down');
					//					self.ui.showMore.classList.remove('mui-icon-arrowup');
					//					self.ui.showMore.classList.add('mui-icon-arrowdown');
					self.ui.showMore.innerHTML = "展开";
					self.ui.personSign.classList.add('me-ellipsis');
				} else if(self.ui.personSign.dataset.status == 'down') {
					self.ui.personSign.setAttribute('data-status', 'up');
					//					self.ui.showMore.classList.remove('mui-icon-arrowdown');
					//					self.ui.showMore.classList.add('mui-icon-arrowup');
					self.ui.showMore.innerHTML = "收起";
					self.ui.personSign.classList.remove('me-ellipsis');
				}
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
							viewID: 'wme_me',
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
								viewID: 'wme_me',
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
						title: "修改头像",
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
			setShowMobile: function() {
				var self = this;
				if(self.user && self.user.MobileNum) {
					self.showMobile = self.user.MobileNum.substr(0, 3) + '****' + self.user.MobileNum.substr(8, 12);
				}
			},
			//			setUserImage: function(r) {
			//				var self = this;
			//				var rel = r || false;
			//				if(self.user && self.user.ImgUrls) {
			//					self.user.ImgUrls.length > 0 && app.setImage({
			//						url: self.user.ImgUrls[0].ImgUrl,
			//						key: app.Cache.key.headPhoto.toKeyName(self.user.UserID),
			//						selector: '#headPhoto',
			//						reload: rel,
			//					});
			//					self.user.ImgUrls.length > 1 && app.setImage({
			//						url: self.user.ImgUrls[1].ImgUrl,
			//						key: app.Cache.key.userPhoto1.toKeyName(self.user.UserID),
			//						selector: '#userPhoto1',
			//						reload: rel,
			//					});
			//				}
			//			},
		},
		ready: function() {
			var self = this;
			self.user = app.User.get();
			//			var t="13045659626";
			//			self.showMobile=t.substr(0,3)+'****'+t.substr(8,12);
			self.setShowMobile();
			//			self.setUserImage();
			app.loadImg();
			self.initellipsis();
			mui.ready(function() {
				mui('.me-head').on('tap', 'i', function() {
					var el = this;
					self.selImg(el.id);
				});
				mui('.p-sign').on('tap', 'a', function() {
					self.ellipsisToggle();
				});

				mui('#bind').on('tap', 'li', function() {
					var user = app.User.get();
					if(!user.MobileNum) {
						mui.openWindow({
							url: '../me/bind.html',
							id: 'me_bind'
						});
					}
				});
				mui('#myphoto').on('tap', 'li', function() {
					var uid = self.user.UserID;
					//					if(mui.os.ios) {
					//						app.openWin('../me/myphoto.html', 'myphoto', {
					//							userid: uid,
					//						}, function(w) {
					//
					//						}, {
					//							popGesture: 'hide'
					//						});
					//					} else {
					app.openWin('../me/myphoto_main.html', 'myphoto_main', {
						userid: uid,
					}, function(w) {

					}, {
						popGesture: 'hide'
					});
					//					}
				});

				mui('#menuItem').on('tap', 'a', function() {
					var el = this;
					switch(el.dataset.id) {
						case '1':
							self.purse();
							break;
						case '2':
							self.meQRcode();
							break;
						case '3':
							self.passport();
							break;
						case '4':
							self.club();
							break;
						case '5':
							app.fExpect();
							return;
							app.openWin("../me/mycard.html", "me_mycard", {
								type: 'me_mycard',
							}, function(w) {});
							break;
						case '6':
							app.fExpect();
							return;
							app.openWin("../me/myorder.html", "me_myorder", {
								type: 'me_myorder',
							}, function(w) {});
							break;
						case '7':
							app.fExpect();
							return;
							app.openWin("../me/myreservation.html", "me_myreservation", {
								type: 'me_myreservation',
							}, function(w) {});
							break;
						case '8':
							self.setting();
							break;
						default:
							break;
					}
				});
				window.addEventListener('fExpect', function(e) {
					app.fExpect();
				});
				window.addEventListener('onTabTap', function(e) {
					self.user = app.User.get();
					//延迟500ms给页面计算签名高度的时间
					//					setTimeout(function() {
					self.initellipsis();
					//					}, 100);
					app.post('api/Posting/GetPostingImg', {}, function(data) {
						self.photo = data;
						app.loadImg();
					});
				});
				/* 获得元素的位置信息 */
				window.addEventListener('reload', function(e) {
					self.user = app.User.get();
					self.setShowMobile();
					//										document.getElementById("userPhoto1").setAttribute('data-img', self.user );
					//					self.setUserImage();
					var head = app.Cache.get(app.Cache.key.headPhoto.toKeyName(self.user.UserID));
					var up1 = app.Cache.get(app.Cache.key.userPhoto1.toKeyName(self.user.UserID));
					//					if(head && head.length > 0) {
					//						document.getElementById("headPhoto").style.background = 'url(' + head + ')';
					//					}
					if(up1 && up1.length > 0) {
						document.getElementById("userPhoto1").src = up1;
					}
					app.loadImg();
					app.post('api/Posting/GetPostingImg', {}, function(data) {
						self.photo = data;
						app.loadImg();
					});
					setTimeout(function() {
						self.initellipsis();
					}, 100);
				});

				//				document.getElementById("btnShare").addEventListener('tap', function() {
				//					var msg = {
				//						href: "http://chorse-sports.com/home_zm/app.html",
				//						title: "要骑马，选天马。",
				//						content: "我正在使用天马，赶快和我一起来使用吧。",
				//						thumbs: ["http://chorse-sports.ufile.ucloud.com.cn/sys/logo_100x100.png"],
				//					};
				//					app.share(msg);
				//				});

			});
			mui.plusReady(function() {
				var indexpage = plus.webview.getLaunchWebview();
				indexpage && mui.fire(indexpage, 'tabItemLoaded', {
					id: 'wme_me',
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
							//							app.Cache.set(app.Cache.key.headPhoto.toKeyName(self.user.UserID), uubParHead.val);
							//							el.style.background = 'url(' + uubParHead.val + ')';
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
						app.User.set(self.user);
						app.loadImg();
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