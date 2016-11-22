define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var searchDiv = document.getElementById('searchDiv');
	var inputSearch = document.querySelector('.mui-input-clear');
	var search = document.getElementById('search');
	search.onclick = function() {
		if (searchDiv) {
			inputSearch.value = '';
			searchDiv.style.display = 'block';
		}
	};
	mui.init({
		swipeBack: false

	});
	var curSortFun;
	//默认选中第一个页签
	var curpageType = 0;
	(function($) {
		//		$('mui-slider-group').height = '500px';
		var group = document.querySelector('.mui-slider-group');
		group.style.height = (document.body.scrollHeight - 145) + 'px';
		$('.mui-scroll-wrapper').scroll({
			indicators: true //是否显示滚动条
		});
		//		var html2 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第二个选项卡子项-1</li><li class="mui-table-view-cell">第二个选项卡子项-2</li><li class="mui-table-view-cell">第二个选项卡子项-3</li><li class="mui-table-view-cell">第二个选项卡子项-4</li><li class="mui-table-view-cell">第二个选项卡子项-5</li></ul>';
		//		var html3 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第三个选项卡子项-1</li><li class="mui-table-view-cell">第三个选项卡子项-2</li><li class="mui-table-view-cell">第三个选项卡子项-3</li><li class="mui-table-view-cell">第三个选项卡子项-4</li><li class="mui-table-view-cell">第三个选项卡子项-5</li></ul>';
		//		var html4 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第四个选项卡子项-1</li><li class="mui-table-view-cell">第三个选项卡子项-2</li><li class="mui-table-view-cell">第三个选项卡子项-3</li><li class="mui-table-view-cell">第三个选项卡子项-4</li><li class="mui-table-view-cell">第三个选项卡子项-5</li></ul>';
		//		var item2 = document.getElementById('item2mobile');
		//		var item3 = document.getElementById('item3mobile');
		//		var item4 = document.getElementById('item4mobile');
		document.getElementById('slider').addEventListener('slide', function(e) {
			//			alert(e.detail.slideNumber);
			curpageType = e.detail.slideNumber;
			if (e.detail.slideNumber === 1) {
				//				if (item2.queryselfector('.mui-loading')) {
				//					setTimeout(function() {
				//						item2.queryselfector('.mui-scroll').innerHTML = html2;
				//					}, 500);
				//				mui.toast('queryList Strength');
				vm.queryList.sort(vm.sortStrength);
				curSortFun = vm.sortStrength;
				//				vm.queryList=vm.queryList;
				//				}
			} else if (e.detail.slideNumber === 2) {
				//				if (item3.queryselfector('.mui-loading')) {
				//					setTimeout(function() {
				//						item3.queryselfector('.mui-scroll').innerHTML = html3;
				//					}, 500);
				//				}
				vm.queryList.sort(vm.sortReviews);
				curSortFun = vm.sortReviews;
			} else if (e.detail.slideNumber === 3) {
				//				if (item4.queryselfector('.mui-loading')) {
				//					setTimeout(function() {
				//						item4.queryselfector('.mui-scroll').innerHTML = html4;
				//					}, 500);
				//				}
				vm.queryList.sort(vm.sortDistance);
				curSortFun = vm.sortDistance;
			}
		});
		var sliderSegmentedControl = document.getElementById('sliderSegmentedControl');
		$('.mui-input-group').on('change', 'input', function() {
			if (this.checked) {
				sliderSegmentedControl.className = 'mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-segmented-control-' + this.value;
				//force repaint
				sliderProgressBar.setAttribute('style', sliderProgressBar.getAttribute('style'));
			}
		});
	})(mui);
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			list: [],
			user: app.User.get(),
			allList: [],
			queryList: [],
			pagePar: {
				clubID: '',
				zClubID: '',
				rClubID: '',
				dClubID: ''
			},
			par: {
				chapterId: 0
			},
			addClubpar: {
				clubID: ''
			},
			chClubpar: {
				toClubID: ''
			},
			clubpar: {
				gt: '',
				lastDT: ''
			},
		},
		computed: {

		},
		methods: {
			copyList: function() {
				var self = this;
				return JSON.parse(JSON.stringify(self.list));
			},
			sortStrength: function(a, b) {
				return a.Strength > b.Strength ? 1 : -1;
			},
			sortReviews: function(a, b) {
				return a.Reviews > b.Reviews ? 1 : -1;
			},
			sortDistance: function(a, b) {
				return a.Reviews > b.Reviews ? 1 : -1;
			},
			loadData: function(data) {
				var self = this;
				//					var tempd = eval('[{"UnitID":"club1","Name":"clubname1","ParentID":"","UnitType":2,"UnitLevlel":1,"ImgUrl":"../../img/clubuserheader/head1.png","Strength":1,"Reviews":2,"GPSLo":"ds1211","GPSLa":"dsfsf"},{"UnitID":"club2","Name":"clubname2","ParentID":"","UnitType":2,"UnitLevlel":1,"ImgUrl":"../../img/clubuserheader/head1.png","Strength":3,"Reviews":1,"GPSLo":"ds1211","GPSLa":"dsfsf"},{"UnitID":"club3","Name":"clubname3","ParentID":"","UnitType":2,"UnitLevlel":1,"ImgUrl":"../../img/clubuserheader/head1.png","Strength":2,"Reviews":3,"GPSLo":"ds1211","GPSLa":"dsfsf"},{"UnitID":"chapter1","Name":"东北会","ParentID":"","UnitType":1,"UnitLevlel":1,"ImgUrl":"../../img/map/dongbei.png","Strength":2,"Reviews":3,"GPSLo":"ds1211","GPSLa":"dsfsf"},{"UnitID":"chapter2","Name":"河北会","ParentID":"","UnitType":1,"UnitLevlel":1,"ImgUrl":"../../img/map/hebei.png","Strength":2,"Reviews":3,"GPSLo":"ds1211","GPSLa":"dsfsf"},{"UnitID":"chapter3","Name":"唐山会","ParentID":"chapter2","UnitType":1,"UnitLevlel":1,"ImgUrl":"../../img/map/hebei.png","Strength":2,"Reviews":3,"GPSLo":"ds1211","GPSLa":"dsfsf"}]');
				//					self.list = tempd;
				//					//console.log(JSON.stringify(data));
				if (data && data.Units) {
					self.list = [];
					for (i = 0, j = 0; i < data.Units.length; i++) {
						//1分会，2俱乐部,并排除自己已经选择的俱乐部
						if (data.Units[i].UnitType === 2 && self.user.ClubID != data.Units[i].UnitID) {
							self.list[j] = data.Units[i];
							j++;
						}
					}
					//					self.list[self.list.length] = JSON.parse('{"UnitID":"be7d8dd1cc55403f8b3a56f144c35b96","Name":"俱乐部2","ParentID":"4f45e18c9d79430ba4b396e702233197","UnitType":2,"UnitLevlel":3,"ImgUrl":null,"Strength":0,"Reviews":0,"GPSLo":null,"GPSLa":null}');
					app.Cache.sset(app.Cache.key.clubData.toKeyName(), data);
					//根据定位初始化距离
					for (i = 0; i < self.list.length; i++) {
						self.list[i].distance = 12;
						self.list[i].content = i + 'cobnteatd';
					}
					self.allList = self.copyList();
					self.queryList = self.copyList();
					app.loadImg();
				} else {
					mui.toast('无俱乐部信息');
				}
			},
			load: function() {
				var self = this;
				self.clubpar.gt = '1';
				self.clubpar.lastDT = '2001-1-1';
				//先取缓存，判断是否过期，更新数据
				//				app.Cache.sset(app.Cache.key.clubData.toKeyName(), '{"id":123,"name":"江苏分会"}');
				var clubData = app.Cache.sget(app.Cache.key.clubData.toKeyName());
				if (!clubData) {
					app.post('api/Static/GetUnitChapters', self.clubpar, function(data) {
						self.loadData(data);
					});
				} else {
					self.loadData(clubData);
				}
			},
			onclickCloseBackDrop: function() {
				if (searchDiv) {
					searchDiv.style.display = 'none';
				}
			},
			onclickSearchComplete: function() {
				var self = this;
				if (inputSearch) {
					var searchVal = inputSearch.value;
					if (searchVal && searchVal.length > 0) {
						self.allList = [];
						self.queryList = [];
						var j = 0;
						for (i = 0; i < self.list.length; i++) {
							if (self.list[i].Name.indexOf(searchVal) >= 0) {
								self.allList[j] = self.list[i];
								self.queryList[j] = self.list[i];
								j++;
							}
						}
					} else {
						self.allList = self.copyList();
						self.queryList = self.copyList();
					}
					self.queryList.sort(curSortFun);
				}
				this.onclickCloseBackDrop();
			},
			ok: function() {
				var selfPage = plus.webview.currentWebview();
				var riderID = selfPage.riderID;
				//				mui.toast(this.pagePar.clubId);
				var clid;
				switch (curpageType) {
					case 0:
						clid = this.pagePar.clubID;
						break;
					case 1:
						clid = this.pagePar.zClubID;
						break;
					case 2:
						clid = this.pagePar.rClubID;
						break;
					case 3:
						clid = this.pagePar.dClubID;
						break;
					default:
						break;
				}
				//				if (clid) {
				//					mui.toast(clid);
				//				}
				if (clid) {
					var self = this;

					//如果未申请入会则加入俱乐部
					if (!self.user.IsChangClub) {
						//console.log('加入俱乐部' + clid);
						//						mui.toast('加入俱乐部');
						//加入俱乐部
						self.addClubpar.clubID = clid;
						app.post('api/User/InClub', this.addClubpar, function(data) {

							//回写数据
							self.user.ClubID = self.addClubpar.clubID;
							for (i = 0; i < self.list.length; i++) {
								if (self.list[i].UnitID === self.addClubpar.clubID) {
									self.user.ClubName = self.list[i].Name;
									break;
								}
							}
							app.User.set(self.user);
							mui.toast('加入俱乐部' + self.user.ClubName + '成功');
							var page = plus.webview.getWebviewById('mycertification');
							if (page) {
								//触发详情页面的riderid事件
								mui.fire(page, 'clubID', {
									clubID: self.user.ClubID
								});
								//打开详情页面          
								mui.openWindow({
									id: 'mycertification',
								});
							} else {
								mui.openWindow({
									id: 'mycertification',
									url: 'mycertification.html',
									show: {
										aniShow: false
									},
									waiting: {
										autoShow: false
									}
								});
							}

						});
					} else {
						//console.log('转入俱乐部' + clid);
						//						mui.toast('转入俱乐部');
						//转俱乐部
						this.chClubpar.toClubID = clid;
						//回写数据
						self.user.ClubID = self.chClubpar.clubID;
						for (i = 0; i < self.list.length; i++) {
							if (self.list[i].UnitID === self.chClubpar.clubID) {
								self.user.ClubName = self.list[i].Name;
								break;
							}
						}
						//转俱乐部
						app.post('api/User/ApplyChangeClub', this.chClubpar, function(data) {
							app.User.set(self.user);
							mui.toast('转入俱乐部' + self.user.ClubName + '成功');
							var page = plus.webview.getWebviewById('mycertification');
							if (page) {
								//触发详情页面的riderid事件
								mui.fire(page, 'clubID', {
									clubID: self.user.ClubID
								});
								//打开详情页面          
								mui.openWindow({
									id: 'mycertification',
								});
							} else {
								mui.openWindow({
									id: 'mycertification',
									url: 'mycertification.html',
									show: {
										aniShow: false
									},
									waiting: {
										autoShow: false
									}
								});

							}
						});
					}
				}
			}
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				self.load();
				/* 获得元素的位置信息 */
				//添加newId自定义事件监听
				window.addEventListener('riderID', function(event) {
					//获得事件参数
					var id = event.detail.riderID;
					//					mui.toast(id);
				});
			});
		}
	});
	//	vm.load();
});