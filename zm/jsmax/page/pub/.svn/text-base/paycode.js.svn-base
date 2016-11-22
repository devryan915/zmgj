define(['app', 'mui', 'vue', 'jquery', 'jquery.qrcode'], function(app, mui, vue, jq, jqqrcode) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			scan: undefined,
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
			},
			initPar: function(ref) {
				var self = this;
			},
			scanQRCode: function() {
				var scan = new plus.barcode.Barcode('bcid', [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13], {
					frameColor: '#00FF00',
					scanbarColor: '#00FF00'
				});
				scan.onmarked = function(type, result, file) {
					switch(type) {
						case plus.barcode.QR:
							type = "QR";
							break;
						case plus.barcode.EAN13:
							type = "EAN13";
							break;
						case plus.barcode.EAN8:
							type = "EAN8";
							break;
						default:
							type = "其它" + type;
							break;
					}
					result = result.replace(/\n/g, '');
					console.log("type:" + type + "\nresult:" + result + "\nfile:" + file + "");
					plus.nativeUI.confirm(result, function() {
						scan.start();
					});
					//					scan.close();
				};
				scan.onerror = function(error) {
					console.log('条形码识别错误：' + error);
				};

				scan.setFlash(false); //是否开启闪光灯
				scan.start({
					conserve: false, //如果设置为true则在成功扫描到条码数据时将图片保存，并通过onmarked回调函数的file参数返回保存文件的路径。默认值为false，不保存图片。
					filename: "_doc/barcode/", //保存成功扫描到的条码数据时的图片路径,可通过此参数设置保存截图的路径或名称，如果设置图片文件名称则必须指定文件的后缀名（必须是.png），否则认为是指定目录，文件名称则自动生成。
					vibrate: true, //成功扫描到条码数据时是否需要震动提醒
					sound: 'none', //成功扫描到条码数据时播放的提示音类型,可取值： "none" - 不播放提示音； "default" - 播放默认提示音（5+引擎内置）。 默认值为"default"。
				});
				//				scan.start({conserve:true,filename:"_doc/barcode/"});
				//				scan.cancel();
				this.scan = scan;
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});
				mui.init({
					gestureConfig: {
						//开启长按功能
					},
				});
				//app.openPage("../rider/pickcity.html", "rider_pickcity", {}, function(w) {});
				if(!mui.os.plus) {
					mui.toast('muiReady' + app.getQueryString('ref.type'));
				}
				//				jq("#qrWo").qrcode({
				//					render: "canvas",
				//					width: 205,
				//					height: 205,
				//					background: '#efeff4',
				//					text: app.toUtf8('我是付款码')
				//				});
			});
			mui.plusReady(function() {
				app.pageLoaded();
				var curpage = plus.webview.currentWebview();
				self.initPar(curpage.ref);
				window.addEventListener('reload', function(e) {
					self.initPar(e.detail.ref);
					//					self.scan.start({
					//						conserve: true,
					//						filename: "_doc/barcode/"
					//					});
				});
				window.addEventListener('unload', function(e) {});
				//				self.scanQRCode();
			});
		}
	});
});