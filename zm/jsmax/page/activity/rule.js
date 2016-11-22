define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var ui = {
		app: document.getElementById("app"),
		show: function() {
			ui.app.classList.remove('mui-hidden');
		},
		hide: function() {
			ui.app.classList.add('mui-hidden');
		}
	}
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				projectId: '', // 'A7160687-DB34-49C6-BA95-57805098C658'
			},
			o: {}
		},
		methods: {
			load: function() {
				var self = this;
				app.showWaiting(1);
				app.post('api/Events/GetProjectDes', self.par, function(data) {
					self.o = data;
					ui.show();
					app.closeWaiting();
				}, function() {
					app.showError(function() {
						self.load();
					});
					app.closeWaiting();
				});
			}
		},
		created: function() {
			//						this.load();
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.init({
				beforeback: function() {
					self.o = null;
					ui.hide();
					return true;
				},
				swipeBack: false
			});
			mui.ready(function() {
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});
			});

			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					self.par.projectId = e.detail.ref.id;
					self.load();
				});
				var wc = plus.webview.currentWebview();
				if(wc.ref) {
					self.par.projectId = wc.ref.id;
					self.load();
				}
				wc.addEventListener("popGesture", function(e) {
					if(e.type = "end") {
						ui.hide();
					}
				}, false);
			});
		}
	});
});