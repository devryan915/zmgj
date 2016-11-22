define(['app', 'mui', 'vue'], function(app, mui, vue) {

	var vm = new vue({
		el: '#app', //绑定范围 
		data: {
			par: {
				newsID: ''
			},
			o: {},
		},
		methods: {
			load: function() {
				var self = this;
				app.post('api/News/GetNewsDtl', self.par, function(data) {
					self.o = data;
					app.closeWaiting();
				}, function() {
					app.showError(function() {
						app.showWaiting(1);
						self.load();
					});
					app.closeWaiting();
				});
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) { 
						app.showWaiting(1);
						self.par.newsID = e.detail.ref.id;
						self.o.Title = e.detail.ref.title;
						self.load(); 
				}); 
				
				window.addEventListener('unload', function(e) { 
						self.o = {}; 
				}); 
				
				var wc = plus.webview.currentWebview();
				if(wc.ref) {
					app.showWaiting(1);
					self.par.newsID = wc.ref.id;
					self.o.Title = wc.ref.title;
					self.load();
				}
			});
		}
	});
});