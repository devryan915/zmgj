define(["app","mui","vue","mui.pullToRefresh","mui.pullToRefresh.material"],function(e,c,g,h,k){new g({el:"#app",data:{pageData:{},serverData:{Total:0,Items:[]},reqPar:{pageIndex:0,pageSize:12}},computed:{},methods:{detail:function(a){a=a.dataset.id;var b;c.plus&&(b=plus.webview.getWebviewById("horseinfo"));b?(c.fire(b,"horseID",{horseID:a,pageType:2}),c.openWindow({id:"horseinfo"})):c.openWindow({id:"horseinfo",url:"../match/horseinfo.html",extras:{horseID:a,pageType:2},show:{aniShow:!1},waiting:{autoShow:!1}})},add:function(){},refreshData:function(a){var b=this,c=document.querySelector("#prHorses .mui-pull-loading");a||(b.reqPar.pageIndex=1,b.serverData.Total=1);var d=b.reqPar.pageIndex==b.serverData.Total;b.reqPar.pageIndex<=b.serverData.Total?e.post("api/User/GetMyHorse",b.reqPar,function(f){b.serverData.Total=f.Total;d=b.reqPar.pageIndex==b.serverData.Total;b.reqPar.pageIndex++;b.isStrokeUp?(b.serverData.Items=b.serverData.Items.concat(f.Items),a&&a.endPullUpToRefresh()):(b.serverData.Items=f.Items,a.endPullDownToRefresh(),a.refresh(!0));a?a.endPullUpToRefresh(d):d&&(c.innerHTML=b.serverData.Items&&0<b.serverData.Items.length?"\u5df2\u52a0\u8f7d\u5168\u90e8":'\x3ci class\x3d"y y-jilu"\x3e\x3c/i\x3e\x3cspan\x3e\u6682\u65e0\u6570\u636e\x3c/span\x3e');e.loadImg();e.closeWaiting()},function(){a&&(a.endPullDownToRefresh(),a.endPullUpToRefresh())}):(a&&a.endPullUpToRefresh(d),c.innerHTML=b.serverData.Items&&0<b.serverData.Items.length?"\u5df2\u52a0\u8f7d\u5168\u90e8":'\x3ci class\x3d"y y-jilu"\x3e\x3c/i\x3e\x3cspan\x3e\u6682\u65e0\u6570\u636e\x3c/span\x3e')},load:function(){this.reqPar.pageIndex=1;this.serverData.Total=1;this.serverData.Items=[];this.isStrokeUp=!0;this.refreshData()}},ready:function(){var a=this;a.load();c("#myhorses").on("tap","li[data-id]",function(){a.detail(this)});c.ready(function(){c.preload({id:"me_addhorse",url:"addhorse.html",styles:{popGesture:"hide"}});c(".mui-scroll-wrapper").scroll({scrollY:!0,scrollX:!1,startX:0,startY:0,indicators:!0,deceleration:6E-4,bounce:!0});c("#prHorses").pullToRefresh({down:{callback:function(){a.reqPar.pageIndex=1;a.serverData.Total=1;a.isStrokeUp=!1;a.refreshData(this)}},up:{contentnomore:"\u5df2\u52a0\u8f7d\u5168\u90e8",callback:function(){a.isStrokeUp=!0;a.refreshData(this)}}})});c.plusReady(function(){})}})});