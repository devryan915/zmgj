define(['app', 'mui', 'vue'], function(app, mui, vue) {

	var vm = new vue({
		el: '#pr',
		data: {
			par: {
				pageIndex: 0,
				gPSLo: '',
				gPSLa: ''
			},
			list: [],
			ref: {
				addr: ''
			}
		},
		methods: {
			load: function() {
				var self = this;

				app.post('api/Common/GetAddrRangeMore', self.par, function(data) {
					for(var i = 0; i < data.Items.length; i++) {
						self.list.push({
							txt: data.Items[i]
						});
					}
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh((self.par.pageIndex >= data.Pages));
				}, function() {
					app.closeWaiting();
					mui('#pr').pullRefresh().endPullupToRefresh(false);
				});
			},
		},
		ready: function() {
			var self = this;
			mui.init({
				pullRefresh: {
					container: '#pr',
					up: {
						contentrefresh: '正在加载...',
						contentnomore: '已加载全部',
						callback: function() {
							self.par.pageIndex++;
							self.load();
						}
					}
				}
			});
			//页面第一次绑定完成执行 
			mui.ready(function() {

			});

			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					self.ref = e.detail.ref;
					app.showWaiting();
					plus.geolocation.getCurrentPosition(function(addr) {
						self.list = [];
						self.list.push({
							txt: addr.address.city
						});
						self.par.gPSLo = addr.coords.latitude.toString();
						self.par.gPSLa = addr.coords.longitude.toString();
						mui('#pr').pullRefresh().pullupLoading()
					}, {
						provider: 'baidu'
					});

					//					self.load();
				});
				window.addEventListener('unload', function(e) {
					self.ref = {};
					self.par.pageIndex = 0;
					mui('#pr').pullRefresh().refresh(true);
					self.list = [];
				});
				var wc = plus.webview.currentWebview();
				if(wc.ref) {
					app.showWaiting();
					self.ref = wc.ref;
					plus.geolocation.getCurrentPosition(function(addr) {
						self.list = [];
						self.list.push({
							txt: addr.address.city
						});
						self.par.gPSLo = addr.coords.latitude.toString();
						self.par.gPSLa = addr.coords.longitude.toString();
						mui('#pr').pullRefresh().pullupLoading()
					}, {
						provider: 'baidu'
					});
					//					self.load();
				}
				mui('#ulAddr').on('tap', 'li', function() {
					self.ref.addr = this.querySelector('input').value;
					mui.fire(wc.opener(), 'reAddr', {
						ref: self.ref
					});
					wc.hide('pop-out');

				});
			});
		}
	});
});