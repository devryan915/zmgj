define(["app","mui","vue","iscroll"],function(c,b,e,f){new e({el:"#app",data:{mainScroll:void 0,detailScroll:void 0,innerwrapperel:void 0,par:{shopID:"",city:"",lat:"",lng:"",pageIndex:1,pageSize:10},ui:{Remark:document.getElementById("Remark"),Notice:document.getElementById("Notice")},data:void 0,footerheight:50,upHeight:0,clientHeight:0},computed:{},methods:{load:function(){var a=this;c.showWaiting();c.post("api/Ride/GetRideItemDtl",a.par,function(d){a.data=d;c.loadImg();c.ellipsisToggle();a.refreshScroll();c.closeWaiting()},function(){a.data||c.showError(function(){c.showWaiting(1);a.load()},1)})},refreshScroll:function(){var a=this;setTimeout(function(){a.mainScroll.scroller.style.height=a.detailel.offsetTop+a.item.offsetHeight+90+"px";a.mainScroll.refresh()},500)},initScroll:function(){this.detailel=document.getElementById("goodsDetail");this.item1=document.getElementById("item1");this.item2=document.getElementById("item2");this.item3=document.getElementById("item3");this.item=this.item1;this.headerStyle=document.getElementById("header").style;this.mainScroll=new f("#app",{probeType:3,scrollX:!1,scrollY:!0,momentum:!0,bounce:!0});this.mainScroll.on("scroll",function(){})},initEvents:function(){var a=this;b("#segmentedControl").on("tap","a",function(d){switch(this.dataset.idx){case "1":a.item=a.item1;break;case "2":a.item=a.item2;break;case "3":a.item=a.item3}a.refreshScroll()});b("body").on("shown",".mui-popover",function(a){});b("body").on("hidden",".mui-popover",function(a){});b(".g-service").on("tap","ul",function(){b("#services").popover("toggle")});b("#services").on("tap","button",function(){b("#services").popover("toggle")});b(".item-footer").on("tap","button",function(){a.resetpage();c.openWin("../rider/cbill.html","rider_cbill",{Prc:a.data.RPrice.Prc,NImgUrl:a.data.NImgUrl,ClubName:a.data.ClubName,ShopName:a.data.ShopName,ShopID:a.data.ShopID},function(a){})})},commentsMore:function(){this.resetpage();c.openWin("../rider/comments.html","rider_comments",{type:"comments"},function(a){})},resetpage:function(){this.mainScroll.scrollTo(0,0);window.scrollTo(0,0)}},ready:function(){var a=this;b.ready(function(){a.initScroll();a.initEvents()});b.plusReady(function(){c.pageLoaded();window.addEventListener("reload",function(b){a.data=void 0;a.par.shopID=b.detail.ref.shopID;a.par.city=b.detail.ref.city;a.par.lat=b.detail.ref.lat;a.par.lng=b.detail.ref.lng;a.load()});window.addEventListener("unload",function(b){a.resetpage()});var b=plus.webview.currentWebview();b.ref&&(a.par.shopID=b.ref.shopID,a.par.city=b.ref.city,a.par.lat=b.ref.lat,a.par.lng=b.ref.lng,a.load())})}})});