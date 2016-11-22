define(['app', 'mui'], function(app, mui) {
	var ur = app.Cache.getString(app.Cache.key.cpageUrl.toKeyName());

	document.querySelector("header.mui-bar.mui-bar-nav>.mui-title").innerText = app.Cache.getString(app.Cache.key.cpageTitle.toKeyName());
	mui.init({
		subpages: [{
			url: ur, //子页面HTML地址，支持本地地址和网络地址
			id: ur, //子页面标志
			styles: {
				top: '44px', //子页面顶部位置
				bottom: '0px', //子页面底部位置 
			}
		}] 
	});

});