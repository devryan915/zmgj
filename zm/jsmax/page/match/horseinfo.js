define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var pageHorseEdit = null;
	//	var mslider = mui('.mui-slider').slider();
	//	var sliderGroup = document.querySelector('.mui-slider-group');
	//	var sliderDuplicateItems = document.querySelectorAll('.mui-slider-item-duplicate');
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				horseId: ''
			},
			urlStr: 'api/User/GetHorseInfo',
			user: app.User.get(),
			pageData: {
				//1.比赛马匹，2我的马匹
				pageType: 1,
				//				totalcount: 10,
				itemdata1: {
					Name: '',
					Sex: 0,
					Age: 0,
					ClubName: '',
				},
				itemdata2: {
					Name: '',
					Sex: 0,
					Age: 0,
					ClubName: '',
				},
				itemdata3: {
					Name: '',
					Sex: 0,
					Age: 0,
					ClubName: '',
				},
				direction: '',
				//				isSlided: false,
			},
		},
		computed: {

		},
		methods: {
			edit: function(d) {
				var data = d;
				if(pageHorseEdit) {
					//触发详情页面的riderid事件
					mui.fire(pageHorseEdit, 'editHorse', {
						pageType: 2,
						horseData: data,
					});
					//打开详情页面          
					mui.openWindow({
						id: 'me_addhorse',
					});
				}
			},
			slide: function(e) {
				var self = this;
				var direction = self.pageData.direction;
				slideNumber = e.detail.slideNumber;
				var page;
				var lastPage;
				var nextPage;
				var type;
				if(slideNumber == 0) {
					lastPage = self.pageData.itemdata3;
					page = self.pageData.itemdata1;
					nextPage = self.pageData.itemdata2;
				} else if(slideNumber == 1) {
					lastPage = self.pageData.itemdata1;
					page = self.pageData.itemdata2;
					nextPage = self.pageData.itemdata3;
				} else if(slideNumber == 2) {
					lastPage = self.pageData.itemdata2;
					page = self.pageData.itemdata3;
					nextPage = self.pageData.itemdata1;
				}
				if(direction === 'right') {
					var str = '';
					self.par.horseId = page.LastID;
					type = (slideNumber - 1) >= 0 ? (slideNumber - 1) : 2;
				} else {
					type = (slideNumber + 1) % 3;
					self.par.horseId = page.NextID;
				}
				app.post(self.urlStr, self.par, function(data) {
					if(type == 0) {
						self.pageData.itemdata1 = data;
					} else if(type == 1) {
						self.pageData.itemdata2 = data;
					} else if(type == 2) {
						self.pageData.itemdata3 = data;
					}
					app.loadImg();
				});
			},
			drag: function(e) {
				var self = this;
				self.pageData.direction = e.detail.direction;
				e.stopPropagation();
			},
			load: function(hid) {
				var horseID = hid;
				var self = this;
				//				mui.toast('horseinfo' + horseID);
				self.par.horseId = horseID;
				//获取详情
				app.post(self.urlStr, self.par, function(data1) {
					self.pageData.itemdata1 = data1;
					self.par.horseId = self.pageData.itemdata1.NextID;
					//console.log(self.par.horseId);
					app.loadImg();
					var gallery = mui('.mui-slider').slider();
					gallery.refresh();
					gallery.gotoItem(0);
					app.post(self.urlStr, self.par, function(data2) {
						self.pageData.itemdata2 = data2;
						app.loadImg();
					});
					self.par.horseId = self.pageData.itemdata1.LastID;
					//console.log(self.par.horseId);
					app.post(self.urlStr, self.par, function(data3) {
						self.pageData.itemdata3 = data3;
						app.loadImg();
					});
				});
			}
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				pageHorseEdit = mui.preload({
					id: 'me_addhorse',
					url: '../me/addhorse.html',
					styles: {
						popGesture: 'hide'
					}
				});
				var slide = document.querySelector('.mui-slider');
				slide.addEventListener('slide', function(event) {
					self.slide(event);
				});
				//				window.addEventListener('reload', function(event) {
				//					//获得事件参数
				//					if (event.detail.horseID) {
				//						//console.log('event horseinfo ' + event.detail.horseID);
				//						self.pageData.pageType = event.detail.pageType;
				//						if (self.pageData.pageType == 2) {
				//							self.urlStr = 'api/User/GetMyHorseInfo';
				//						}
				//						self.load(event.detail.horseID);
				//					}
				//					//mui.currentWebview.show();
				//				});
				//添加newId自定义事件监听
				window.addEventListener('horseID', function(event) {
					//获得事件参数
					if(event.detail.horseID) {
						//console.log('event horseinfo ' + event.detail.horseID);
						self.pageData.pageType = event.detail.pageType;
						if(self.pageData.pageType == 2) {
							self.urlStr = 'api/User/GetMyHorseInfo';
						}
						self.load(event.detail.horseID);
					}
					//mui.currentWebview.show();
				});

			});
			mui.plusReady(function() {
				var selfPage = plus.webview.currentWebview();
				if(selfPage && selfPage.horseID) {
					//console.log('new horseinfo ' + selfPage.horseID);
					self.pageData.pageType = selfPage.pageType;
					if(self.pageData.pageType == 2) {
						self.urlStr = 'api/User/GetMyHorseInfo';
					}
					self.load(selfPage.horseID);
				}
			});
		}
	});
});