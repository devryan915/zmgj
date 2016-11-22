define(['app', 'mui', 'vue'], function(app, mui, vue) {

	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				projectId: '',
			},
			o: {}
		},
		methods: {
			load: function() {
				var self = this;
				app.showWaiting(1);
				app.post('api/Events/GetProjectDes', self.par, function(data) {
					self.o = data;
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
			mui.init();
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
				window.addEventListener('unload', function(e) {
					self.o = {};
				});

				var wc = plus.webview.currentWebview();
				if(wc.ref) {
					app.showWaiting(1);
					self.par.projectId = wc.ref.id;
					self.load();
				} 
			});
		}
	});
});