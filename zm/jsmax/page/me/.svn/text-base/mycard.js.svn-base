define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {},
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
				//				app.openWin("../rider/paybill.html", "rider_paybill", {
				//					type: 'cbill',
				//				}, function(w) {});
				if(!mui.os.plus) {
					mui.toast('muiReady' + app.getQueryString('ref.type'));
				}
				mui('.mui-card-footer').on('tap', 'button', function() {
					var id = this.dataset.id;
					if(id == '1') {
						app.openPage('../me/selcardgoods.html', 'me_selcardgoods', {});
					} else if(id == '2') {
						app.openPage('../pub/paycode.html', 'pub_paycode', {});
					}
				});

			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {});
				window.addEventListener('unload', function(e) {});
				var wc = plus.webview.currentWebview();
			});
		}
	});
});