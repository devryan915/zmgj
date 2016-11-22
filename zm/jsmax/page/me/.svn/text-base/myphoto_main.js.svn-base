define(['app', 'mui'], function(app, mui) {

	//页面第一次绑定完成执行 
	mui.ready(function() {
		mui.init({
			subpages: [{
				url: '../me/myphoto.html',
				id: 'me_myphoto',
				styles: {
					top: '0px',
					bottom: '0px',
				}
			}]
		});

	});
	mui.plusReady(function() {
		var wc = plus.webview.currentWebview();
		var w = plus.webview.getWebviewById('me_myphoto');
		window.addEventListener('PageLoaded', function(e) {
			wc.ref && w && mui.fire(w, 'reload', {
				ref: wc.ref
			});
		});
		window.addEventListener('reload', function(e) {
			if(w) {
				mui.fire(w, 'reload', {
					ref: e.detail.ref
				});
			}
		});
		window.addEventListener('unload', function(e) {
			mui.fire(w, 'unload', {});
		});
		window.addEventListener('addData', function(e) {
			if(w) {
				mui.fire(w, 'addData', {
					ref: e.detail.ref
				});
			}
		});
		window.addEventListener('refreshNum', function(e) {
			if(w) {
				mui.fire(w, 'refreshNum', {
					ref: e.detail.ref
				});
			}
		});

	});
});