define(['app', 'mui', 'vue'], function(app, mui, vue) {

	//	app.os.weixin && document.querySelector("header").classList.add('mui-hidden');
	var vm = new vue({
		el: '#app', //绑定范围 
		data: {
			par: {
				newsID: ''
			},
			o: {
				Title: ''
			},
			img: '',
			navClass: mui.os.plus ? 'y-share' : 'y-down',
		},
		methods: {
			load: function() {
				var self = this;
				app.Cache.igetObject(app.Cache.key.cnewsData.toKeyName(self.par.newsID), function(val) {
					val ? (self.o = val, app.closeWaiting(), app.closeError()) : app.post('api/News/GetNewsDtl', self.par, function(data) {
						self.o = data;
						app.closeWaiting();

						app.Cache.iset(app.Cache.key.cnewsData.toKeyName(self.par.newsID), data);
					}, function() {
						app.showError(function() {
							app.showWaiting(1);
							self.load();
						});

					});
				});
			}
		},
		ready: function() {
			var self = this;
			mui.init();
			mui.ready(function() {
				//todo 未完成
				if(!mui.os.plus) {
					self.par.newsID = app.getQueryString('ref.id');
					app.Cache.iHasKey(app.Cache.key.cnewsData.toKeyName(self.par.newsID)) || app.showWaiting(1);
					self.load();
				}
				document.getElementById("btnShare").addEventListener('tap', function() {
					var el = this;
					if(el.classList.contains('y-share')) {
						var msg = {
							href: app.webHost + 'page/news/detail.html?ref.id=' + self.par.newsID,
							title: self.o.Title || document.querySelector("header>.mui-title").innerText,
							content: "要骑马，选天马。",
							thumbs: [self.img + '?iopcmd=thumbnail&type=8&width=100&height=100'],
						};
						app.share(msg);
					} else {
						location.href = 'http://chorse-sports.com/home_zm/app.html';
					}

				});
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					self.par.newsID = e.detail.ref.id;
					app.Cache.iHasKey(app.Cache.key.cnewsData.toKeyName(self.par.newsID)) || app.showWaiting(1);
					self.o.Title = e.detail.ref.title;
					self.img = e.detail.ref.img;
					self.load();
				});
				window.addEventListener('unload', function(e) {
					self.o = {};
				});
				var wc = plus.webview.currentWebview();
				if(wc.ref) {
					self.par.newsID = wc.ref.id;
					app.Cache.iHasKey(app.Cache.key.cnewsData.toKeyName(self.par.newsID)) || app.showWaiting(1);
					self.o.Title = wc.ref.title;
					self.img = wc.ref.img;
					self.load();
				}

			});
		}
	});
});