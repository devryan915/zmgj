define(['app', 'mui', 'vue', 'iscroll'], function(app, mui, vue, IScroll) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			mainScroll: undefined,
			detailScroll: undefined,
			innerwrapperel: undefined,
			par: {
				shopID: '',
				city: '',
				lat: '',
				lng: '',
				pageIndex: 1,
				pageSize: 10,
			},
			ui: {
				Remark: document.getElementById('Remark'),
				Notice: document.getElementById('Notice'),
			},
			data: undefined,
			footerheight: 50,
			upHeight: 0,
			clientHeight: 0,
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
				app.showWaiting();
				app.post('api/Ride/GetRideItemDtl', self.par, function(data) {
					self.data = data;
					//					self.ui.Remark.innerHTML = data.Remark;
					//					self.ui.Notice.innerHTML = data.Notice;
					app.loadImg();
					app.ellipsisToggle();
					self.refreshScroll();
					//					self.refreshItemScroll();
					app.closeWaiting();
				}, function() {
					self.data || app.showError(function() {
						app.showWaiting(1);
						self.load();
					}, 1)
				});
			},
			refreshScroll: function() {
				var self = this;
				setTimeout(function() {
					//					console.log(self.item.id + ' ' + self.detailel.offsetTop + ' ' + self.item.offsetHeight);
					self.mainScroll.scroller.style.height = (self.detailel.offsetTop + self.item.offsetHeight + 90) + 'px';
					self.mainScroll.refresh();
				}, 500);
			},
			initScroll: function() {
				var self = this;
				self.detailel = document.getElementById('goodsDetail');
				self.item1 = document.getElementById('item1');
				self.item2 = document.getElementById('item2');
				self.item3 = document.getElementById('item3');
				self.item = self.item1;
				self.headerStyle = document.getElementById('header').style;
				self.mainScroll = new IScroll('#app', {
					probeType: 3,
					scrollX: false,
					scrollY: true,
					momentum: true,
					//					moveBackCall: moveBackCall,
					bounce: true,
				});
				self.mainScroll.on('scroll', function() {
					//					self.headerStyle.background = 'rgba(0,0,0,' + -this.y * 0.01 + ')';
				});
			},
			initEvents: function() {
				var self = this;
				mui('#segmentedControl').on('tap', 'a', function(e) {
					var idx = this.dataset.idx;
					switch(idx) {
						case '1':
							self.item = self.item1;
							break;
						case '2':
							self.item = self.item2;
							break;
						case '3':
							self.item = self.item3;
							break;
						default:
							break;
					}
					self.refreshScroll();
				});
				mui('body').on('shown', '.mui-popover', function(e) {
					//console.log('shown', e.detail.id);//detail为当前popover元素
				});
				mui('body').on('hidden', '.mui-popover', function(e) {
					//console.log('hidden', e.detail.id);//detail为当前popover元素
				});
				mui('.g-service').on('tap', 'ul', function() {
					mui('#services').popover('toggle');
				});
				mui('#services').on('tap', 'button', function() {
					mui('#services').popover('toggle');
				});
				mui('.item-footer').on('tap', 'button', function() {
					self.resetpage();
					app.openWin("../rider/cbill.html", "rider_cbill", {
						Prc: self.data.RPrice.Prc,
						NImgUrl: self.data.NImgUrl,
						ClubName: self.data.ClubName,
						ShopName: self.data.ShopName,
						ShopID: self.data.ShopID,
					}, function(w) {});
				});
			},
			commentsMore: function() {
				var self = this;
				self.resetpage();
				app.openWin("../rider/comments.html", "rider_comments", {
					type: 'comments',
				}, function(w) {});
			},
			resetpage: function() {
				var self = this;

				self.mainScroll.scrollTo(0, 0);
				window.scrollTo(0, 0);
			}
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				self.initScroll();
				self.initEvents();
			});
			mui.plusReady(function() {
				app.pageLoaded();
				window.addEventListener('reload', function(e) {
					self.data = undefined;
					self.par.shopID = e.detail.ref.shopID;
					self.par.city = e.detail.ref.city;
					self.par.lat = e.detail.ref.lat;
					self.par.lng = e.detail.ref.lng;
					self.load();
				});
				//				var back = mui.back;
				//				mui.back = function() {
				//					console.log('back');
				//					back();
				//				};
				window.addEventListener('unload', function(e) {
					self.resetpage();
				});

				var cpage = plus.webview.currentWebview();
				if(cpage.ref) {
					self.par.shopID = cpage.ref.shopID;
					self.par.city = cpage.ref.city;
					self.par.lat = cpage.ref.lat;
					self.par.lng = cpage.ref.lng;
					self.load();
				}
			});
		}
	});
});