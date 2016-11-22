define(['app', 'mui', 'vue'], function(app, mui, vue) {

	var wlogin;
	var wNewsDetail;
	var pages = {};

	var pr = document.getElementById("pr");
	var id = 'windex';
	var vm = new vue({
		el: '#pr',
		data: {
			par: {
				lastDT: app.User.get().LastDT
			},
			o: null,
			user: app.User.get(),

		},
		methods: {
			load: function() {
				var self = this;
				app.post('api/News/GetFirstPage', self.par, function(data) {
					var d = data;
					if(JSON.stringify(self.o) != JSON.stringify(d)) {
						self.o = data;
						app.Cache.setObject(app.Cache.key.cindexData.toKeyName(), self.o);
						app.loadImg();

					}
					data.UserInfo && app.User.set(data.UserInfo);

					mui("#slider").slider({
						interval: 5000
					});
					app.closeWaiting();
				}, function() {
					app.closeWaiting();
					self.o || app.showError(function() {
						app.showWaiting(1);
						self.load();
					}, 1)
				});
				app.loadImg();
			},

		},
		created: function() {
			var self = this;
			self.o = app.Cache.getObject(app.Cache.key.cindexData.toKeyName());
			self.o || app.showWaiting(1), app.loadImg();
		},
		ready: function() {
			var self = this;

			mui.init();
			mui.ready(function() {
				self.load();
				mui('#pr').on('tap', '[data-id^="w"]', function() {
					var el = this;
					var d = el.dataset.data ? JSON.parse(el.dataset.data) : {};
					//						var w = pages[el.dataset.id];
					if(mui.os.plus) {
						var w = plus.webview.getWebviewById(el.dataset.id);
						if(w) {
							mui.fire(w, 'reload', {
								ref: d
							});
							w.show('slide-in-right');
						} else {
							w = mui.preload({
								id: el.dataset.id,
								url: el.dataset.href,
								styles: {
									popGesture: 'hide',
									//									scrollIndicator: 'none',
									//									bounce: 'vertical',
									//									bounceBackground: '#efeff4'
								},
								extras: {
									ref: d
								}
							});
							w.show('slide-in-right');
							w.addEventListener('hide', function() {
								mui.fire(w, 'unload', {});
							});
						}
					} else {
						var par = '?';
						for(var k in d) {
							par += 'ref.' + k + '=' + d[k] + '&';
						}
						location.href = el.dataset.href + par;
					}
				});
			});

		}
	});

});