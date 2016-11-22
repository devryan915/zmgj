define(['app', 'mui', 'vue', 'mui.picker', 'jockeyClub.data'], function(app, mui, vue, mp) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			par: {
				chapterId: '', // '4f45e18c9d79430ba4b396e702233197',
				ynum: 1
			},
			remember: !0,
			equestrianName: '选择分会',
		},
		computed: {
			isValid: function() {
				return !!this.remember && this.par.chapterId;
			},
			totalMoney: function() {
				return(this.par.ynum * 388).toFixed(2);
			},
		},
		methods: {
			pact: function() {
				app.Cache.set(app.Cache.key.cpageUrl.toKeyName(), "http://lyr.yigemed.com/userAgreement.html");
				app.Cache.set(app.Cache.key.cpageTitle.toKeyName(), "牛仔约定");
				mui.openWindow({
					url: "agreement.html",
					id: 'wpact',
					createNew: true,
					show: {
						aniShow: 'pop-in',
						duration: 300
					},
					waiting: {
						autoShow: true
					}
				});
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				var equestrianPicker = new mui.PopPicker({
					layer: 2
				});
				equestrianPicker.setData(equestrianData);
				document.getElementById("aSelectEquestrian").addEventListener('tap', function() {
					equestrianPicker.show(function(items) {
						self.par.chapterId = items[1].value;
						self.equestrianName = items[1].text;
					});
				});
				window.addEventListener('reload', function(e) {
					self.par.chapterId = '';
					self.par.ynum = 1;
					self.equestrianName = '选择分会';
					self.remember = !0;
					equestrianPicker.pickers[0].setSelectedIndex(0);
					equestrianPicker.pickers[1].setSelectedIndex(0);
				});

			});
			mui.plusReady(function() {
				var wequestrian_add_pay = mui.preload({
					url: '../equestrian/add_pay.html',
					id: 'wequestrian_add_pay',
					styles: {
						popGesture: 'hide',
					}
				});
				document.getElementById("btnAddOrder").addEventListener('tap', function() {
					app.showWaiting();
					app.post('api/User/GetChapterTradeNo', self.par, function(data) { 
						mui.fire(wequestrian_add_pay, 'reload', {
							orderNo: data.TradeNo,
							totalMoney: self.totalMoney,

							equestrianName: self.equestrianName,
							equestrianId: self.par.chapterId,
						})
						wequestrian_add_pay.show('slide-in-right');
						app.closeWaiting();
					}, function() {
						app.closeWaiting();
					});
				});
			});
		}
	});
});