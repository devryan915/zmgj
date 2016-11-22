define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {},
		computed: {

		},
		methods: {

		},
		created: function() {

		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.plusReady(function() {

			}); 
		}
	});
});