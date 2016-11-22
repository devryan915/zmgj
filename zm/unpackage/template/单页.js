define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			 
		},
		computed: {
			 
		},
		methods: {
			 
		},
		ready: function() {
			//页面第一次绑定完成执行 
			mui.ready(function() {
				/* 获得元素的位置信息 */
				app.os.mobile && app.autoScroll();

			});
		}
	});
});