define(['app', 'mui', 'vue', 'mui.previewimage', 'mui.zoom', 'mui.pullToRefresh', 'mui.pullToRefresh.material', 'load'], function(app, mui, vue, mp, mz, mptr, mpm, ld) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			user: app.User.get(),
			ui: {
				tp: document.getElementById("topPopover"),
			},
			parList: [{
				par: {
					postType: 1,
					pageIndex: 0,
					pageSize: 10,
					oldMD5: ''
				},
				list: []
			}, {
				par: {
					postType: 3,
					pageIndex: 0,
					pageSize: 10,
					oldMD5: ''
				},
				list: []
			}, {
				par: {
					postType: 2,
					pageIndex: 0,
					pageSize: 10,
					oldMD5: ''
				},
				list: []
			}],
			isUp: true,
			isInit: false,
			selectTabIndex: 1,
			selectItem: {
				listindex: -1,
				index: 0,
			},
		},
		computed: {

		},
		methods: {
			load: function() {

			}
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.init({
				gestureConfig: {
					//开启长按功能
					longtap: true,
				}
			});
			mui.ready(function() {
				window.addEventListener('fExpect', function(e) {
					app.fExpect();
				});
				window.addEventListener('onTabTap', function(e) {
					if(!self.isInit) {
						self.isInit = true;
						setTimeout(function() {
							var slider = mui(".mui-slider").slider();
							//					slider.refresh();
							//					slider.nextItem();
							slider.gotoItem(1, 0);
							ld.show({
								aniClass: 'fadeIn', //rollIn
								selector: '#sliderGroup',
							});
							//							document.querySelector("#sliderGroup").style.opacity = "1";
							//					mui(".mui-slider-group .mui-scroll").pullToRefresh()[1].pullUpLoading();
						}, 500);
					}
				});
				//mui("header").transparent();
				/* 获得元素的位置信息 */
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});

				var slider = {
					slider1: false
				};
				document.getElementById("slider").addEventListener('slide', function(e) {
					try {
						mui('.mui-popover').popover('hide');
						self.selectTabIndex = e.detail.slideNumber;
						//console.log(self.selectTabIndex);
						if(!slider['slider' + self.selectTabIndex]) {
							slider['slider' + self.selectTabIndex] = true;
							mui(".mui-slider-group .mui-scroll").pullToRefresh()[self.selectTabIndex].pullUpLoading();
							//pullUpLoading
							//pullUpLoading
						}
					} catch(e) {
						//TODO handle the exception
					}
				});

				mui('#app').on('tap', '.y-revoke', function() {
					var el = this;
					var ur = 'api/Posting/DelPost';
					app.post(ur, {
						uid: el.dataset.userid,
						postId: el.dataset.pid,
					}, function(data) {
						el.parentElement.parentElement.parentElement.classList.add("mui-hidden");
						mui.toast('撤回成功');
					});
				});
				mui('#app').on('tap', '.y-attention', function() {
					var el = this;
					var isattention = el.dataset.isattention == 'true';
					var ur = isattention ? 'api/Posting/DeleteFocusUser' : 'api/Posting/AddFocusUser';
					app.post(ur, {
						userID: el.dataset.userid
					}, function(data) {
						el.innerText = isattention ? '+ 关注' : '取消关注';
						el.dataset.isattention = (!isattention).toString()
						self.parList[0].par.pageIndex = 0;
						mui(".mui-slider-group .mui-scroll").pullToRefresh()[0].refresh()
						mui(".mui-slider-group .mui-scroll").pullToRefresh()[0].pullUpLoading();
						//						el.disabled = true;
					});
				});
				mui('#app').on('tap', '.userHead', function(e) {
					var el = this;
					var uid = el.dataset.userid;
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
						//popGesture: 'close' close改为hide,避免页面unload方法未调用
						popGesture: 'hide'
					});
					//					}
				});
				mui('.y-card-list').on('tap', '.mui-card>div[class~=mui-card-content]', function(e) {
					var el = this;
					self.selectItem.listindex = el.dataset.listIndex;
					self.selectItem.index = el.dataset.index;
					//					console.log(self.selectItem.listindex + ' ' + self.selectItem.index);
					e.detail.target.nodeName != 'IMG' && app.openWin('../dynamic/review.html', 'wdynamic_review', {
						id: el.dataset.id,
						pageid: 'wdynamic_list',
					}, function(w) {

					}, {
						//popGesture: 'close' close改为hide,避免页面unload方法未调用
						popGesture: 'hide'
					});
				});
				mui('.y-card-list').on('tap', '.mui-card-footer>a[data-type]', function() {
					var el = this;
					var pNode = el.parentNode;
					var par2 = {
						postId: pNode.dataset.id,
						clickType: el.dataset.type
					};
					var listIndex = pNode.dataset.listIndex;
					var index = pNode.dataset.index;
					switch(parseInt(el.dataset.type)) {
						case 1:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.remove('y-collect-o');
								i.classList.add('y-collect');
								i.classList.add('y-yellow');
								self.parList[listIndex].list[index].CNums++;
								el.dataset.type = 5;
								mui.toast('收藏成功');
							});
							break;
						case 2:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.remove('y-heart-o');
								i.classList.add('y-heart');
								i.classList.add('y-red');
								self.parList[listIndex].list[index].PNums++;
								el.dataset.type = 9;
							});
							break;
						case 5:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.add('y-collect-o');
								i.classList.remove('y-collect');
								i.classList.remove('y-yellow');
								self.parList[listIndex].list[index].CNums--;
								el.dataset.type = 1;
								mui.toast('取消收藏');
							});
							break;
						case 100:
							var data = self.parList[pNode.dataset.listIndex].list[pNode.dataset.index];
							var msg = {
								href: "http://chorse-sports.com/home_zm/app.html",
								title: "要骑马，选天马。",
								content: "我正在使用天马，赶快和我一起来使用吧。",
								thumbs: ["http://chorse-sports.ufile.ucloud.com.cn/sys/logo_100x100.png"],
							};
							app.share(msg);
							break;
						case 101:
							self.selectItem.listindex = listIndex;
							self.selectItem.index = index;
							console.log(self.selectItem.listindex + ' ' + self.selectItem.index);
							app.openWin('../dynamic/review.html', 'wdynamic_review', {
								id: par2.postId,
								pageid: 'wdynamic_list',
							}, function(w) {

							}, {
								//popGesture: 'close' close改为hide,避免页面unload方法未调用
								popGesture: 'hide'
							});
							break;
						default:
							break;
					}
					return false;
				});
				mui.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
					mui(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var se = this;
								self.user = app.User.get();
								self.parList[index].par.pageIndex = 1;
								app.post('api/Posting/GetPosts', self.parList[index].par, function(data) {
									self.user = app.User.get();
									//增量更新
									if(data.Items && data.Items.length > 0) {
										for(var i = 0; i < data.Items.length; i++) {
											var post = data.Items[i];
											var v = post.IssDT;
											var diffValue = 999999;
											if(v) {
												v = v.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
												v.lastIndexOf('.') > 0 && (v = v.substring(0, v.lastIndexOf('.')));
												diffValue = new Date() - new Date(v);
											}
											post.CantRevoke = (self.user.UserID == post.UserID && diffValue <= 1000 * 60 * 10) ? "" : "mui-hidden";
										}
										self.parList[index].list = data.Items;
										self.parList[index].par.oldMD5 = data.Other;
										se.refresh(true);
										se.endPullDownToRefresh();
										se.endPullUpToRefresh(self.parList[index].par.pageIndex >= data.Pages);
										app.loadImg();
										app.ellipsisToggle();
										mui.toast(self.parList[index].par.pageIndex + '/' + data.Pages);
									} else {
										for(var i = 0; i < self.parList[index].list.length; i++) {
											var post = self.parList[index].list[i];
											var v = post.IssDT;
											var diffValue = 999999;
											if(v) {
												v = v.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
												v.lastIndexOf('.') > 0 && (v = v.substring(0, v.lastIndexOf('.')));
												diffValue = new Date() - new Date(v);
											}
											post.CantRevoke = (self.user.UserID == post.UserID && diffValue <= 1000 * 60 * 10) ? "" : "mui-hidden";
										}
										se.endPullDownToRefresh();
										mui.toast('已经是最新数据了');
									}
								}, function() {
									self.parList[index].par.pageIndex--;
									se.endPullDownToRefresh();
								});
							}
						},
						up: {
							//auto: index == 1,
							auto: false,
							callback: function() {
								var se = this;
								if(self.parList[index].list && self.parList[index].list.length < 1) {
									self.parList[index].par.pageIndex = 0;
								}
								self.parList[index].par.pageIndex++;
								app.post('api/Posting/GetPosts', self.parList[index].par, function(data) {
									self.user = app.User.get();
									for(var i = 0; i < data.Items.length; i++) {
										var post = data.Items[i];
										var v = post.IssDT;
										var diffValue = 999999;
										if(v) {
											v = v.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
											v.lastIndexOf('.') > 0 && (v = v.substring(0, v.lastIndexOf('.')));
											diffValue = new Date() - new Date(v);
										}
										post.CantRevoke = (self.user.UserID == post.UserID && diffValue <= 1000 * 60 * 10) ? "" : "mui-hidden";
									}
									if(self.parList[index].par.pageIndex == 1) {
										self.parList[index].list = data.Items;
										self.parList[index].par.oldMD5 = data.Other;
									} else {
										self.parList[index].par.oldMD5 = '';
										self.parList[index].list = self.parList[index].list.concat(data.Items);
									}
									se.endPullUpToRefresh(self.parList[index].par.pageIndex >= data.Pages);
									app.loadImg();
									app.ellipsisToggle();
									mui.toast(self.parList[index].par.pageIndex + '/' + data.Pages);
								}, function() {
									self.parList[index].par.pageIndex--;
									se.endPullUpToRefresh(false);
									//									se.refresh(true);
								});
							}
						}
					});
				});

				//mui(".mui-slider-group .mui-scroll").pullToRefresh()[0].pullDownLoading();
				mui('#topPopover').on('tap', 'a', function() {
					var el = this;
					mui('.mui-popover').popover('hide');
					if(el.dataset.href == '../dynamic/add.html') {
						var user = app.User.get();
						if(!user.UserID) {
							mui.toast("请先登录");
							return;
						}
						if(!(user.ImgUrl && (user.NickName || user.RealName))) {
							mui.toast(user.ImgUrl ? "请先填写真名或昵称" : "请先上传头像");
							return;
						}
					} else if(el.dataset.href == '../dynamic/my_collection.html') {
						var user = app.User.get();
						if(!user.UserID) {
							mui.toast("请先登录");
							return;
						}
					}
					app.openWin(el.dataset.href, el.dataset.id, {}, function(w) {});
				});

				//add by ryan 增加长按保存图片功能
				mui(".mui-slider-group").on('longtap', 'img', function() {
					var el = this;
					plus.nativeUI.actionSheet({
						title: "请选择您的操作",
						cancel: "取消",
						buttons: [{
							title: "保存图片"
						}]
					}, function(e) {
						if(e.index == 1) {
							var imgUrl = el.src;
							var index = imgUrl.lastIndexOf('.');
							var suffix = imgUrl.substring(index);
							/**
							 * 创建下载任务
							 * http://www.html5plus.org/doc/zh_cn/downloader.html#plus.downloader.createDownload
							 */
							var downLoader = plus.downloader.createDownload(imgUrl, {
								method: 'GET',
								filename: '_downloads/image' + suffix
							}, function(download, status) {
								var fileName = download.filename;
								/**
								 * 保存至本地相册
								 * http://www.html5plus.org/doc/zh_cn/gallery.html#plus.gallery.save
								 */
								plus.gallery.save(fileName, function() {
									mui.toast("已保存到您的相册");
									/**
									 * 保存后，弹出对话框是否查看；
									 * http://dev.dcloud.net.cn/mui/ui/#dialog
									 */
									//								mui.confirm("打开相册", "打开相册？", ["打开", "不看"], function(event) {
									//									var gindex = event.index;
									//									if(gindex == 0) {
									//										/**
									//										 * 选择图片
									//										 * http://www.html5plus.org/doc/zh_cn/gallery.html#plus.gallery.pick
									//										 */
									//										plus.gallery.pick(function(file) {
									//											mui.toast("你选择了图片：" + file);
									//										}, function(error) {
									//											console.log(error);
									//										}, {
									//
									//										});
									//									}
									//								});
								});
							});
							/**
							 * 开始下载任务
							 * http://www.html5plus.org/doc/zh_cn/downloader.html#plus.downloader.Download.start
							 */
							downLoader.start();
						}
					});
				});
				app.loadImg();
			});

			mui.plusReady(function() {
				var op = {};
				if(mui.os.plus) {
					var wc = plus.webview.currentWebview();
					op = {
						openCall: function() {
							if(mui.os.ios) {
								wc.parent().setStyle({
									top: '0px',
									bottom: '-50px'
								});
							} else {
								mui.os.plus && wc.setStyle({
									top: '0px',
									bottom: '0px'
								});
							}

						},
						closeCall: function() {
							if(mui.os.ios) {
								wc.parent().setStyle({
									top: '0px',
									bottom: '0px'
								});
							} else {
								mui.os.plus && wc.setStyle({
									top: '0px',
									bottom: '50px'
								});
							}
						}
					}
				}
				mui.previewImage(op);
				window.addEventListener('reload', function(e) {
					setTimeout(function() {
						mui(".mui-slider-group .mui-scroll").pullToRefresh()[0].refresh(true);
						mui(".mui-slider-group .mui-scroll").pullToRefresh()[0].pullDownLoading();
					}, 500);
				});
				window.addEventListener('addData', function(e) {
					if(e.detail.ref.index == 1) {
						self.parList[e.detail.ref.index].list.unshift(e.detail.ref.data);
						app.loadImg();
					}
				});
				window.addEventListener('refreshNum', function(e) {
					if(e.detail.ref.type == 1) {
						//刷新评论
						self.parList[self.selectItem.listindex].list[self.selectItem.index].DNums++;
					}
				});
				var indexpage = plus.webview.getLaunchWebview();
				indexpage && mui.fire(indexpage, 'tabItemLoaded', {
					id: 'wdynamic_list',
				});
			});
		}
	});
});