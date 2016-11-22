define(['app', 'mui', 'vue'], function(app, mui, vue) {

	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			Sex: '',
			BirthDT: '',
			user: app.User.get(),
			//			chapterName: '',
			par: {

			}
		},
		computed: {

		},
		methods: {
			parseIDCard: function() {
				var self = this;
				var card = self.user.IDCard.toUpperCase();
				//console.log(card);
				//				card = '321322871234627';
				var len = card.length;
				//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
				if(len == '15') {
					var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
					var arr_data = card.match(re_fifteen);
					var year = arr_data[2];
					var month = arr_data[3];
					var day = arr_data[4];
					//					var birthday = new Date('19' + year + '/' + month + '/' + day);
					//console.log(card.substr(14, 1));
					self.Sex = card.substr(14, 1) % 2 == 0 ? '女' : '男';
					self.BirthDT = year + '.' + month;
				}
				//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
				if(len == '18') {
					var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
					var arr_data = card.match(re_eighteen);
					var year = arr_data[2];
					var month = arr_data[3];
					var day = arr_data[4];
					//					var birthday = new Date(year + '/' + month + '/' + day);
					//console.log(card.substr(16, 1));
					self.Sex = card.substr(16, 1) % 2 == 0 ? '女' : '男';
					self.BirthDT = year + '.' + month;
				}
			},
			pay: function() {
				//				app.fExpect();
			}
		},
		ready: function() {
			var self = this;
			self.user = app.User.get();
			self.parseIDCard();
			//			self.chapterName = self.user.ChapterName;
			//			document.getElementById('chapterName').innerHTML = self.user.ChapterName;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				app.loadImg();
				//				if (!self.user.ImgUrl) {
				//					self.user.ImgUrl = '../../img/me/me_userhead_default.png';
				//				}
				/* 获得元素的位置信息 */
				window.addEventListener('reload', function(e) {
					self.user = app.User.get();
					//					self.chapterName = self.user.ChapterName;
					//					document.getElementById('chapterName').innerHTML = self.user.ChapterName;
					self.parseIDCard();
					app.loadImg();
					//					if (!self.user.ImgUrl) {
					//						self.user.ImgUrl = '../../img/me/me_userhead_default.png';
					//					}
				});
			});
		}
	});
});