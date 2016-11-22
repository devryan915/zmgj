define(['app', 'mui', 'vue', 'mui.indexedlist', 'bank.data'], function(app, mui, vue) {
	var vm = new vue({
		el: '#app', //绑定范围
		data: {
			retViewID: null,
		},
		computed: {

		},
		methods: {
			load: function() {
				var self = this;
			},
		},
		ready: function() {
			var self = this;
			//页面第一次绑定完成执行 
			mui.ready(function() {
				window.addEventListener('choosebank', function(e) {
					self.retViewID = e.detail.viewID;
				});
				//初始化银行检索列表
				var header = document.querySelector('header.mui-bar');
				var list = document.getElementById('list');
				//				var done = document.getElementById('done');
				var bankList = document.getElementById('bankList');
				//				var listInnerHtml = null;
				//calc hieght
				list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
				//create
				//				window.indexedList = new mui.indexlist(list);
				bankData.forEach(function(item) {
					var li = document.createElement('li');
					li.dataset.group = item.indextitle;
					li.classList.add('mui-table-view-divider');
					li.classList.add('mui-indexed-list-group');
					li.innerText = item.indextitle;;
					bankList.appendChild(li);
					//					//console.log(item.indextitle);
					item.children.forEach(function(child) {
						var lichild = document.createElement('li');
						lichild.dataset.value = child.value;
						lichild.dataset.tags = child.tags;
						lichild.dataset.code = child.code;
						lichild.dataset.name = child.name;
						lichild.classList.add('mui-table-view-cell');
						lichild.classList.add('mui-indexed-list-item');
						lichild.classList.add('mui-left');
						lichild.classList.add('selbank');
						//						lichild.innerText = child.name;
						lichild.innerHTML = '<img src="' + child.imgUrl + '"/><div>' + child.name + '</div>';
						bankList.appendChild(lichild);
						//						//console.log(child.name);
					});
				});
				mui('#list').indexedList({

				});
				mui('.mui-indexed-list-inner').on('tap', 'li[data-value]', function(e) {
					if (e.target.parentNode.dataset.code) {
						//console.log(e.target.parentNode.dataset.code + ' ' + self.retViewID);
						var w = plus.webview.getWebviewById(self.retViewID);
						mui.fire(w, 'pubChooseBankRet', {
							bankCode: e.target.parentNode.dataset.code,
							bankName: e.target.parentNode.dataset.name,
						});
						plus.webview.currentWebview().hide();
						//						plus.webview.currentWebview().close();
					}
				});

			});
			mui.plusReady(function() {});
		}
	});
});