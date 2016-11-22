define(['app', 'mui', 'vue', 'mui.previewimage', 'mui.zoom'], function(app, mui, vue, mp, mz) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			data: {
				ShopID: undefined,
				Prc: undefined,
				NImgUrl: undefined,
				ClubName: undefined,
				ShopName: undefined,
				Qty: 0,
				Tprice: '',
				Oid: '',
			},
			par: {
				oid: '',
			},
			user: app.User.get(),
			imgList: [],
			imgTempList: [],
			imgUpList: [],
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
			},
			initpage: function(ref) {
				var self = this;
				self.data = ref;
				self.par.oid = self.data.Oid;
				app.loadImg();
			},
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
				//				app.post('api/Ride/AddPost', self.par, function(data) {
				app.closeWaiting();
				mui.toast('评价成功');
				//					mui.os.plus && plus.webview.currentWebview().close();
				//				}, function() {
				//					app.closeWaiting();
				//				}, false, 10000);
			}
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				mui.previewImage({
					deleteCall: function(index) {
						self.imgList.splice(index, 1);
						self.imgUpList.splice(index, 1);
					}
				});
				if(!mui.os.plus) {
					mui.toast('muiReady' + app.getQueryString('ref.type'));
				}
				mui('.data-star').on('tap', 'i', function() {
					var index = parseInt(this.dataset.index); //获取当前元素的索引值
					var parent = this.parentNode; //获取当前元素的父节点
					var children = parent.children; //获取父节点下所有子元素
					for(var i = 0; i < 5; i++) { //亮星
						if(index >= (i + 1)) {
							children[i].classList.remove('y-star-n');
							children[i].classList.add('y-star-y');
						} else {
							children[i].classList.remove('y-star-y');
							children[i].classList.add('y-star-n');
						}
					}
					console.log(index);
				});

			});
			mui.plusReady(function() {
				mui('.footer').on('tap', 'button', function() {
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
								mui.toast('发表失败，请重新发表');
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
				});
				document.getElementById("btnSelectImg").addEventListener('tap', function() {
					plus.nativeUI.actionSheet({
						title: '选择图片',
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
									console.log(e);
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
				window.addEventListener('reload', function(e) {
					self.initpage(e.detail.ref);
				});
				window.addEventListener('unload', function(e) {
					app.closeWaiting();
				});
				var wc = plus.webview.currentWebview();
				self.initpage(wc.ref);
				//				mui.toast('plusReady' + wc.ref.type);
				app.pageLoaded();
			});
		}
	});
});