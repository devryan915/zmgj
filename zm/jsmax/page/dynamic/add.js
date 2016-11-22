define(['app', 'mui', 'vue', 'mui.previewimage', 'mui.zoom'], function(app, mui, vue, mp, mz) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				content: '',
				address: '',
				guid: '',
			},
			ref: {
				addr: '',
			},
			imgList: [],
			imgTempList: [],
			imgUpList: [],
		},
		computed: {

		},
		methods: {
			addImg: function(successCall) {
				var self = this;
				var path = self.imgTempList.pop();
				var dst = "_doc/img/temp/" + new Date().getTime() + '.jpg';
				self.imgUpList.push(dst);
				var op = {
					src: path,
					dst: dst,
					width: "600px",
					height: "auto",
					format: "jpg",
					quality: 70,
					overwrite: true,
					rotate: 0
				}
				if(plus.android) {
					//var ExifInterface = plus.android.importClass("android.media.ExifInterface")
					var src = op.src.replace("file://", "")
					var e = plus.android.newObject("android.media.ExifInterface", src);
					var o = plus.android.invoke(e, "getAttributeInt", "Orientation", 1)
					switch(o) {
						case 3:
							op.rotate = 180;
							break;
						case 8:
							op.rotate = 270;
							break;
						case 6:
							op.rotate = 90;
							break;
					}
				}
				plus.zip.compressImage(op, function(ev) {
					self.imgList.push({
						img: ev.target,
						width: ev.width,
						height: ev.height,
					});
					if(self.imgTempList.length > 0) {
						self.addImg(successCall)
					} else {
						successCall && successCall();
					}
				})

			},
			add: function() {
				var self = this;
				self.par.address = self.ref.addr;
				app.post('api/Posting/AddPost', self.par, function(data) {
					app.closeWaiting();
					mui.fire(plus.webview.getWebviewById('wdynamic_list'), 'addData', {
						ref: {
							index: 1,
							data: data
						}
					})
					mui.toast('发布成功');
					mui.os.plus && plus.webview.currentWebview().close();
				}, function() {
					app.closeWaiting();
				}, false, 10000);
			}
		},
		ready: function() {
			var self = this;
			mui.init({
				swipeBack: false,
			})
			mui.ready(function() {
				mui.previewImage({
					deleteCall: function(index) {
						self.imgList.splice(index, 1);
						self.imgUpList.splice(index, 1);
					}
				});
				//				var oldBack = mui.back;
				//				var btnArray = ['取消', '退出'];
				//				mui.back = function() {
				//					mui.confirm('退出此次编辑吗？', '&nbsp;', btnArray, function(e) {
				//						if(e.index == 1) {
				//							console.log("333::" + e.index);
				//							oldBack();
				//						}
				//					}, 'div')
				//				}
				document.getElementById("btnLocation").addEventListener('tap', function() {
					app.openWin('../pub/select_address.html', 'wpub_select_address', self.ref, function(w) {

					}, {
						popGesture: 'close'
					});
				});
			});

			mui.plusReady(function() {

				document.getElementById("btnSave").addEventListener('tap', function() {
					app.showWaiting();
					var parAPP = {
						guid: app.createNonceStr(),
						index: -1,
					};
					self.par.guid = parAPP.guid;
					var list = [];
					if(!self.imgList.length) {
						self.add();
						return;
					}
					var task = plus.uploader.createUpload(app.getUrl("api/Posting/AddPostPicNew"), {
							method: "POST",
							blocksize: 0,
							priority: 10,
							timeout: 30,
							retry: 1,
							retryInterval: 5
						},
						function(t, status) {
							// 上传完成
							if(status == 200) {
								self.add();
								console.log("上传成功: " + t.url);
							} else {
								console.log("上传失败: " + status);
								app.closeWaiting();
								mui.toast('发布失败，请重新发布');
							}
						}
					);
					for(var i = 0; i < self.imgUpList.length; i++) {
						task.addFile(self.imgUpList[i], {
							key: i.toString()
						});
						task.addData("guid", self.par.guid);
						task.addData("uid", app.User.getUserID());
					}
					task.start();
					//					plus.uploader.startAll();
					//					var imgList = self.imgList.slice();
					//					var u = imgList.shift();
					//task.addEventListener( "statechanged", onStateChanged, false );
					//					task.start();

				});

				//				document.getElementById("btnSave").addEventListener('tap', function() {
				//					app.showWaiting();
				//					var parAPP = {
				//						guid: app.createNonceStr(),
				//						index: -1,
				//					};
				//					self.par.guid = parAPP.guid;
				//					var list = [];
				//					if(!self.imgList.length) {
				//						self.add();
				//						return;
				//					}
				//					var task = plus.uploader.createUpload("http://192.168.1.108:31724/api/Posting/AddPostPicNew", {
				//							method: "POST",
				//							blocksize: 204800,
				//							priority: 100
				//						},
				//						function(t, status) {
				//							// 上传完成
				//							if(status == 200) {
				//								alert("Upload success: " + t.url);
				//							} else {
				//								alert("Upload failed: " + status);
				//							}
				//						}
				//					);
				//					var imgList = self.imgList.slice();
				//					var u = imgList.shift();
				//					console.log("111:::" + JSON.stringify(self.imgList));
				//					task.addFile(u.img, {
				//						key: "testdoc"
				//					});
				//					task.addData("111", "22222");
				//					//task.addEventListener( "statechanged", onStateChanged, false );
				//					task.start();
				//					return;
				//					var setImgs = function() {
				//						var img = imgList.shift();
				//						var im = new Image();
				//						im.src = img.img;
				//						im.onload = function() {
				//							var canvas = document.createElement("canvas");
				//							canvas.width = img.width;
				//							canvas.height = img.height - 1;
				//							canvas.getContext("2d").drawImage(im, 0, 0);
				//							var b64 = canvas.toDataURL("image/jpeg")
				//							parAPP.img = b64;
				//							im = null;
				//							canvas = null;
				//							parAPP.index++;
				//							app.post('api/Posting/AddPostPic', parAPP, function(data) {
				//								if(imgList.length > 0) {
				//									setImgs(imgList);
				//								} else {
				//									self.add();
				//								}
				//							}, function() {
				//								mui.toast('发布失败，请重新发布');
				//								app.closeWaiting();
				//							}, 30000);
				//
				//						};
				//
				//					}
				//					var imgList = self.imgList.slice();
				//					setImgs();
				//
				//				});

				document.getElementById("btnSelectImg").addEventListener('tap', function() {
					plus.nativeUI.actionSheet({
						title: '',
						cancel: '取消',
						buttons: [{
							title: '拍照',
						}, {
							title: '从相册选择',
						}]
					}, function(e) {
						switch(e.index) {
							case 1:
								var cmr = plus.camera.getCamera();
								app.showWaiting();
								cmr.captureImage(function(filePath) {
									self.imgTempList = [filePath];
									self.addImg(function() {
										app.closeWaiting();
									});
								}, function(e) {
									app.closeWaiting();
								}, {
									filename: "_doc/img/temp/temp.jpg",
									format: cmr.supportedImageFormats[0],
									resolution: cmr.supportedImageResolutions[0]
								});
								break;
							case 2:
								var n = 9 - self.imgList.length;
								plus.gallery.pick(function(p) {
									app.showWaiting();
									self.imgTempList = p.files.reverse().slice();
									self.addImg(function() {
										app.closeWaiting();
									});
								}, function() {

								}, {
									filename: '_doc/img/temp/',
									filter: 'filter',
									maximum: n,
									multiple: true,
									system: false,
									onmaxed: function() {
										plus.nativeUI.toast('您最多只能选择' + n + '张图片')
									}
								})
								break;
							default:
								break;
						}
					})
				});
				window.addEventListener('unload', function(e) {
					self.imgList = [];
					self.imgUpList = [];
					self.ref.addr = '所在位置';
					app.closeWaiting();
				});
				window.addEventListener('reAddr', function(e) {
					self.ref = e.detail.ref;
				});

			});
		}
	});
});