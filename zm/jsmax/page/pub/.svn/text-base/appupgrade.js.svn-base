define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			content: '',
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {});
			mui.plusReady(function() {
				var curpage = plus.webview.currentWebview();
				var data = curpage.edata;
				var back = mui.back;
				var canBack;
				mui.back = function() {
					if(canBack) {
						plus.runtime.quit();
						back();
					}
				};
				var reg = new RegExp("<br/>", "g");
				self.content = '更新内容：\r\n' + data.Remark.replace(reg, "\r\n");
				mui('#app').on('tap', '.mui-btn-outlined', function(e) {
					console.log('下载');
					if(plus.os.name == "Android") {
						if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_WIFI) {
							//							mui.alert('当前版本低于最小运行版本，必须更新后使用\r\n', '更新提示', function() {
							app.down(data.ApkPath, app.appFile, function(file) {
								plus.runtime.openFile(file.filename);
							}, true);
							//							});
						} else {
							canBack = true;
							//							var btnArray = ['更新', '取消'];
							//							mui.confirm('当前版本低于最小运行版本，必须更新后使用\r\n', cVer + ' 新版发布', btnArray,
							//								function(e) {
							//									if(e.index == 0) {
							app.down(data.ApkPath, app.appFile, function(file) {
								plus.runtime.openFile(file.filename);
							});
							//									} else {
							plus.runtime.quit();
							//									}
							//							});
						}
					} else if(plus.os.name == "iOS") {
						if(data.AppPath) {
							//							mui.alert('当前版本低于最小运行版本，必须更新后使用\r\n', '更新提示', function() {
							plus.runtime.openURL(data.AppPath);
							//							});
						} else {
							//							mui.alert('当前版本低于最小运行版本，必须更新后使用\r\n', '更新提示', function() {
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
							//							});
						}
					}

				});

			});
		}
	});
});