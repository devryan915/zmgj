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
			mui.toast('dfsf');
			var jrollmain = new JRoll("#wrapper");
			var jroll1 = new JRoll("#up", {
				id: "demo5"
			});
			var jroll2 = new JRoll("#down");
			//页面第一次绑定完成执行 
			mui.ready(function() {});
			mui.plusReady(function() {});
		}
	});
});