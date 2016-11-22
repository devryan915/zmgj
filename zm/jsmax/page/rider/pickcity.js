define(['app', 'mui', 'vue', 'mui.indexedlist'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				search: '',
			},
			curcity: '正在定位',
			idxlist: undefined,
			citylistel: undefined,
			datalist: undefined,
			hotList: [],
		},
		computed: {

		},
		methods: {
			//			search: function() {
			//				var self = this;
			//				console.log('search' + self.par.search);
			//				self.idxlist.search(self.par.search);
			//			},
			load: function() {
				var self = this;
				app.showWaiting(1);
				app.post('api/Common/GetStaticCity', {}, function(data) {
					self.datalist = data;
					self.hotList = self.datalist.HotItems;
					self.datalist.Items.forEach(function(item) {
						var li = document.createElement('li');
						li.dataset.group = item.indextitle;
						li.classList.add('mui-table-view-divider');
						li.classList.add('mui-indexed-list-group');
						li.innerText = item.indextitle;;
						citylist.appendChild(li);
						item.children.forEach(function(child) {
							var lichild = document.createElement('li');
							lichild.dataset.value = child.value;
							//							lichild.dataset.tags = child.tags;
							lichild.dataset.tags = child.value;
							lichild.dataset.code = child.code;
							lichild.dataset.name = child.name;
							lichild.classList.add('mui-table-view-cell');
							lichild.classList.add('mui-indexed-list-item');
							lichild.innerText = child.name;
							citylist.appendChild(lichild);
						});
					});
					//必须在数据填充之后再初始化索引列表
					self.idxlist = mui('#list').indexedList({

					});

					app.closeWaiting();
				}, function() {
					app.closeWaiting();
					self.datalist || app.showError(function() {
						app.showWaiting(1);
						self.load();
					}, 1)
				});
			},
			locate: function() {
				var self = this;
				self.curProvince = '正在定位...';
				plus.geolocation.getCurrentPosition(function(addr) {
					self.curcity = addr.address.city;
					console.log(addr.address);
					for(var a in addr.address) {
						console.log(a + ' ');
					}
					console.log(addr.coordsType + ' ' + addr.address.province + ' ' + addr.coords.longitude + ' ' + addr.coords.accuracy + ' ' + addr.timestamp);
					//					var point = new plus.maps.Point(addr.coords.longitude, addr.coords.latitude);
					//					plus.maps.Map.reverseGeocode(point, {
					//						coordType: 'bd09ll',
					//					}, function(event) {
					//						var address = event.address; // 转换后的地理位置
					//						var point = event.coord; // 转换后的坐标信息
					//						var coordType = event.coordType; //
					//						console.log(address + ' ' + point + ' ' + coordType);
					//					});
					//					plus.webview.currentWebview().ref.isFirstLoad = 1;
					app.pageLoaded();
				}, function(e) {
					self.curProvince = '定位失败(' + e.message + ')';
				}, {
					provider: 'baidu'
				});
			},
		},
		ready: function() {
			var self = this;
			self.load();
			//页面第一次绑定完成执行 
			mui.ready(function() {

				self.citylistel = document.getElementById('citylist');
				//mui ready begin###########
				//初始化银行检索列表
				//				var header = document.querySelector('header.mui-bar');
				var list = document.getElementById('list');
				//calc hieght
				list.style.height = (document.body.offsetHeight - list.offsetTop) + 'px';
				document.getElementById('cityinput').addEventListener('input', function() {
					var keyword = this.value;
					self.idxlist.search(keyword);
				}, false);
				mui('#frmSearch').on('tap', '.mui-icon-clear', function() {
					self.idxlist.search('');
				}, false);
				//				document.getElementById("frmSearch").onsubmit = function() {
				//					self.list = [];
				//					self.par.pageIndex = 0;
				//					self.idxlist.search(self.par.search);
				//					return false;
				//				};
				mui('#hotcity').on('tap', 'li', function(e) {
					var el = this;
					var cpage = plus.webview.currentWebview();
					app.openPage(cpage.ref.parentPageURL, cpage.ref.parentPageID, {
						city: el.dataset.id,
					});
				});
				mui('.mui-content').on('tap', '#curcity', function(e) {
					var el = this;
					var cpage = plus.webview.currentWebview();
					app.openPage(cpage.ref.parentPageURL, cpage.ref.parentPageID, {
						city: el.dataset.id,
					});
				});
				mui('#hotcity').on('tap', 'li', function(e) {
					var el = this;
					var cpage = plus.webview.currentWebview();
					app.openPage(cpage.ref.parentPageURL, cpage.ref.parentPageID, {
						city: el.dataset.id,
					});
				});

				mui('.mui-indexed-list-inner').on('tap', 'li[data-value]', function(e) {
					var el = this;
					var cpage = plus.webview.currentWebview();
					app.openPage(cpage.ref.parentPageURL, cpage.ref.parentPageID, {
						city: el.dataset.code,
					});
				});

				//mui ready end###########
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					if(!self.idxlist) {
						self.load();
					}
					self.locate();
				});
				self.locate();
			});
		}
	});
});