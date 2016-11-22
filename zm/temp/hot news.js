define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var vm = new vue({
			el: '#pr',
			data: {
				par: {
					isUp: 0,
					newsType: 8
				},
				up: 0,
				lower: 0,
				Pages: 0,
				list: [],
			},
			methods: {
				load: function() {

				}
			})
	})
})