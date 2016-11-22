define(['app', 'mui', 'vue', 'mui.previewimage', 'mui.zoom', 'load'], function(app, mui, vue, mp, mz, ld) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			user: app.User.get(),
			oUser: {
				UserID: "",
				Name: " ",
				Img: "",
				ImgUrls: [],
				PersonSign: "",
				Other: "",
			},
			list: [],
			par: {
				userID: '',
				pageIndex: 0,
				pageSize: 10,
				oldMD5: ''
			},
			ui: {
				personSign: document.getElementById('personSign'),
				showMore: document.getElementById('showMore'),
			},
			selectItem: {
				index: 0,
			},
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
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
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				//				var pullupTip;
				mui.init({
					gestureConfig: {
						//开启长按功能
						longtap: true,
					},
					pullRefresh: {
						container: '#app',
						down: {
							callback: function() {
								var se = this;
								self.user = app.User.get();
								self.par.pageIndex = 1;
								app.post('api/Posting/GetSpecailPosts', self.par, function(data) {
									self.par.oldMD5 = data.Other.Other;
									self.oUser = data.Other;
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
										self.list = data.Items;
										mui('#app').pullRefresh().refresh(true);
										mui('#app').pullRefresh().endPulldownToRefresh();
										if(mui.os.ios && data.Pages == 1) {
											//解决ios第一次加载刚好只有一页的时候没有显示更多数据
											mui('#app').pullRefresh().enablePullupToRefresh();
											//																					console.log('没有更多数据了');
											//																					se.pullCaption.innerText = '没有更多数据了';
										}
										mui('#app').pullRefresh().endPullupToRefresh(self.par.pageIndex >= data.Pages);
										app.ellipsisToggle();
										mui.toast(self.par.pageIndex + '/' + data.Pages);
									} else {
										for(var i = 0; i < self.list.length; i++) {
											var post = self.list[i];
											var v = post.IssDT;
											var diffValue = 999999;
											if(v) {
												v = v.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
												v.lastIndexOf('.') > 0 && (v = v.substring(0, v.lastIndexOf('.')));
												diffValue = new Date() - new Date(v);
											}
											post.CantRevoke = (self.user.UserID == post.UserID && diffValue <= 1000 * 60 * 10) ? "" : "mui-hidden";
										}
										mui('#app').pullRefresh().endPulldownToRefresh();
										mui.toast('已经是最新数据了');
									}
									app.loadImg();
								}, function() {
									self.par.pageIndex--;
									mui('#app').pullRefresh().endPulldownToRefresh();
								});
							}
						},
						up: {
							contentrefresh: '正在加载...',
							callback: function() {
								var se = this;
								if(self.list && self.list.length < 1) {
									self.par.pageIndex = 0;
								}
								self.par.pageIndex++;
								app.post('api/Posting/GetSpecailPosts', self.par, function(data) {
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
									if(self.par.pageIndex == 1) {
										self.list = data.Items;
										self.par.oldMD5 = data.Other.Other;
										self.oUser = data.Other;
									} else {
										self.par.oldMD5 = '';
										self.list = self.list.concat(data.Items);
									}
									mui('#app').pullRefresh().endPullupToRefresh(self.par.pageIndex >= data.Pages);
									app.loadImg();
									app.ellipsisToggle();
									mui.toast(self.par.pageIndex + '/' + data.Pages);
								}, function() {
									self.par.pageIndex--;
									mui('#app').pullRefresh().endPullupToRefresh(false);
								});
							}
						}
					}
				});
				//				pullupTip = document.querySelector('.mui-pull-bottom-pocket').querySelector('.mui-pull-caption');
				app.loadImg();
				setTimeout(function() {
					self.initellipsis();
				}, 500);
				ld.show({
					aniClass: 'fadeIn', //rollIn
					selector: '#app',
				});
				mui('.p-sign').on('tap', 'a', function() {
					self.ellipsisToggle();
				});
				//				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				//				mui('.mui-scroll-wrapper').scroll({
				//					bounce: true,
				//					indicators: false, //是否显示滚动条
				//					deceleration: deceleration
				//				});
				self.$watch('oUser.PersonSign', function(val) {
					setTimeout(function() {
						self.initellipsis();
					}, 500);
				});
				mui('.y-card-list').on('tap', '.mui-card>div[class~=mui-card-content]', function(e) {
					var el = this;
					self.selectItem.index = el.dataset.index;
					//					console.log(self.selectItem.listindex + ' ' + self.selectItem.index);
					e.detail.target.nodeName != 'IMG' && app.openWin('../dynamic/review.html', 'wdynamic_review', {
						id: el.dataset.id,
						pageid: 'me_myphoto',
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
					var index = pNode.dataset.index;
					switch(parseInt(el.dataset.type)) {
						case 1:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.remove('y-collect-o');
								i.classList.add('y-collect');
								i.classList.add('y-yellow');
								self.list[index].CNums++;
								//								el.childNodes[1].nextSibling.nodeValue = parseInt(el.childNodes[1].nextSibling.nodeValue) + 1;
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
								self.list[index].PNums++;
								el.dataset.type = 9;
							});
							break;
						case 5:
							app.post('api/Posting/ClickLike', par2, function(data) {
								var i = el.querySelector('i');
								i.classList.add('y-collect-o');
								i.classList.remove('y-collect');
								i.classList.remove('y-yellow');
								self.list[index].CNums--;
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
							self.selectItem.index = index;
							app.openWin('../dynamic/review.html', 'wdynamic_review', {
								id: par2.postId,
								pageid: 'me_myphoto',
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

				//				if(!mui.os.plus) {
				//					self.par.userID = app.getQueryString('ref.userid');
				//					self.par.pageIndex = 0;
				//					self.par.oldMD5 = '';
				//					console.log('ready ' + self.par.userID);
				//					mui('#app').pullRefresh().pulldownLoading();
				//				}
				//var op = {};
				//				if(mui.os.plus) {
				//					var wc = plus.webview.currentWebview();
				//					op = {
				//						openCall: function() {
				//							if(mui.os.ios) {
				//								wc.parent().setStyle({
				//									top: '0px',
				//									bottom: '-50px'
				//								});
				//							} else {
				//								mui.os.plus && wc.setStyle({
				//									top: '0px',
				//									bottom: '0px'
				//								});
				//							}
				//						},
				//						closeCall: function() {
				//							if(mui.os.ios) {
				//								wc.parent().setStyle({
				//									top: '0px',
				//									bottom: '0px'
				//								});
				//							} else {
				//								mui.os.plus && wc.setStyle({
				//									top: '0px',
				//									bottom: '50px'
				//								});
				//							}
				//						}
				//					}
				//				}
				mui.previewImage();

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
				mui("#slider").slider({
					interval: 5000
				});
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					//										app.showWaiting(1);
					self.user = app.User.get();
					self.list = [];
					self.par.userID = e.detail.ref.userid;
					self.par.pageIndex = 0;
					self.par.oldMD5 = '';
					//					setTimeout(function() {
					//						mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
					//					}, 500);
					//					console.log('reload ' + self.par.userID);
					//					mui('#app').pullRefresh().refresh(true);
					mui('#app').pullRefresh().pulldownLoading();
				});
				window.addEventListener('unload', function(e) {
					self.list = [];
					self.par.userID = '';
					self.par.pageIndex = 0;
					self.par.oldMD5 = '';
					self.oUser = {};
					document.getElementById('userPhoto1').src = '../../img/me-head-bg.png';
					document.getElementById('userPhoto2').src = '../../img/me-head-bg.png';
					mui('#app').pullRefresh().refresh(true);
				});
				window.addEventListener('addData', function(e) {
					if(e.detail.ref.index == 1) {
						self.list.unshift(e.detail.ref.data);
						app.loadImg();
					}
				});
				window.addEventListener('refreshNum', function(e) {
					if(e.detail.ref.type == 1) {
						//刷新评论
						self.list[self.selectItem.index].DNums++;
					}
				});
				var wc = plus.webview.currentWebview();
				wc.ref && (self.par.userID = wc.ref.userid,
					self.par.pageIndex = 0,
					self.par.oldMD5 = '', self.list = [],
					setTimeout(function() {
						//						mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
						//						console.log('plus ' + self.par.userID);
						//						mui('#app').pullRefresh().refresh(true);
						mui('#app').pullRefresh().pulldownLoading();
					}, 1000)
				);
				var parent = plus.webview.getWebviewById('myphoto_main');
				parent && mui.fire(parent, 'PageLoaded', function() {});
			});
		}
	});
});