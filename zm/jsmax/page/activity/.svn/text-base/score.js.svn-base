define(['app', 'mui', 'vue'], function(app, mui, vue) {
	var fload, ftime;
	var imgHead = document.getElementById('headImage');
	imgHead.onload = function() {
		var scrollWrapper = document.querySelector('.mui-scroll-wrapper');
		scrollWrapper.style.marginTop = (imgHead.offsetHeight + 28) + 'px';
	};
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				projectId: '',
				rType: 0,
				LastDT: '',
			},
			parSupport: {
				projectId: '',
				rid: '',
				rType: 0,
				payPwd: '',
				isPayPwd: ''
			},
			list: [],
			o: {
				title: '',
				first: {
					SelfReward: false
				},
				list: []
			},
			fee: 0,
			index: 0,
		},
		methods: {

			detail: function(el) {
				var self = this;
				var page;
				var ID = el.currentTarget.dataset.id;
				var sum = el.currentTarget.dataset.sum;
				if(mui.plus) {
					page = plus.webview.getWebviewById('match_riderinfo');
				}
				if(page) {
					//触发详情页面的riderid事件
					mui.fire(page, 'riderID', {
						riderID: ID,
						totalSum: sum,
						pid: self.par.projectId,
						rtype: self.par.rType,
						pageType: 3,
						nsn: self.o.NowSupportNum,
						freeNum: self.o.FreeNum,
						feeNum: self.fee,
					});
					//打开详情页面          
					mui.openWindow({
						id: 'match_riderinfo',
					});
				} else {
					mui.openWindow({
						id: 'match_riderinfo',
						url: '../match/riderinfo.html',
						extras: {
							riderID: ID,
							totalSum: sum,
							pid: self.par.projectId,
							rtype: self.par.rType,
							pageType: 3,
							nsn: self.o.NowSupportNum,
							freeNum: self.o.FreeNum,
							feeNum: self.fee,
						},
						show: {
							aniShow: false
						},
						waiting: {
							autoShow: false
						}
					});
				}
			},
			load: function() {
				var self = this;
				app.post('api/Events/GetProjectRoster', self.par, function(data) {
					self.list = data.Items;
					app.closeWaiting();
				}, function() {
					app.showError(function() {
						app.showWaiting(1);
						self.load();
					});
					app.closeWaiting();
				});
			},
		},
		created: function() {
			//			this.load();
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.init();
			mui.ready(function() {

				imgHead.src = "http://chorse-sports.ufile.ucloud.com.cn/sys/b1.png";
				mui('.mui-scroll-wrapper').scroll();
			});
			mui.plusReady(function() {
				window.addEventListener('reload', function(e) {
					self.par.projectId = e.detail.ref.id;
					self.fee = e.detail.ref.fee;
					self.par.rType = e.detail.ref.rtype;
					self.o.FreeNum = parseInt(e.detail.ref.FreeNum);
					self.o.NowSupportNum = parseInt(e.detail.ref.NowSupportNum);
					self.endtime = e.detail.ref.endtime;
					self.o.title = e.detail.ref.title;
					self.load();
				});

				window.addEventListener('unload', function(e) {
					clearInterval(fload);
					clearInterval(ftime);
					self.par.LastDT = '';
					self.o = {
						title: '',
						first: {},
						list: []
					};
					self.list = [];
					self.time = '';
					mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
				});
				var wc = plus.webview.currentWebview();

				if(wc.ref) {
					self.par.projectId = wc.ref.id;
					self.fee = wc.ref.fee;
					self.par.rType = wc.ref.rtype;
					self.o.FreeNum = parseInt(wc.ref.FreeNum);
					self.o.NowSupportNum = parseInt(wc.ref.NowSupportNum);
					self.o.title = wc.ref.title;
					self.endtime = wc.ref.endtime;
					self.load();
				}

				document.getElementById("btnShare").addEventListener('tap', function() {
					app.shareCurrentWebview();
				});
			});
		}
	});
});