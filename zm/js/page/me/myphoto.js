define("app mui vue mui.previewimage mui.zoom load".split(" "),function(f,e,k,m,n,l){new k({el:"#app",data:{user:f.User.get(),oUser:{UserID:"",Name:" ",Img:"",ImgUrls:[],PersonSign:"",Other:""},list:[],par:{userID:"",pageIndex:0,pageSize:10,oldMD5:""},ui:{personSign:document.getElementById("personSign"),showMore:document.getElementById("showMore")},selectItem:{index:0}},computed:{},methods:{load:function(){},initellipsis:function(){this.ui.personSign.classList.remove("p-sign-single");60<this.ui.personSign.scrollHeight?(this.ui.personSign.setAttribute("data-status","down"),this.ui.personSign.classList.add("me-ellipsis"),this.ui.showMore.classList.remove("mui-hidden"),this.ui.showMore.innerHTML="\u5c55\u5f00",this.ui.showMore.classList.remove("mui-icon-arrowup")):(31>=this.ui.personSign.scrollHeight?this.ui.personSign.classList.add("p-sign-single"):this.ui.personSign.classList.remove("p-sign-single"),this.ui.showMore.classList.add("mui-hidden"))},ellipsisToggle:function(){"up"==this.ui.personSign.dataset.status?(this.ui.personSign.setAttribute("data-status","down"),this.ui.showMore.innerHTML="\u5c55\u5f00",this.ui.personSign.classList.add("me-ellipsis")):"down"==this.ui.personSign.dataset.status&&(this.ui.personSign.setAttribute("data-status","up"),this.ui.showMore.innerHTML="\u6536\u8d77",this.ui.personSign.classList.remove("me-ellipsis"))}},ready:function(){var a=this;e.ready(function(){e.init({gestureConfig:{longtap:!0},pullRefresh:{container:"#app",down:{callback:function(){a.user=f.User.get();a.par.pageIndex=1;f.post("api/Posting/GetSpecailPosts",a.par,function(c){a.par.oldMD5=c.Other.Other;a.oUser=c.Other;if(c.Items&&0<c.Items.length){for(var b=0;b<c.Items.length;b++){var g=c.Items[b],d=g.IssDT,h=999999;d&&(d=d.replace("T"," ").replace("+08:00","").replace(/-/g,"/"),0<d.lastIndexOf(".")&&(d=d.substring(0,d.lastIndexOf("."))),h=new Date-new Date(d));g.CantRevoke=a.user.UserID==g.UserID&&6E5>=h?"":"mui-hidden"}a.list=c.Items;e("#app").pullRefresh().refresh(!0);e("#app").pullRefresh().endPulldownToRefresh();e.os.ios&&1==c.Pages&&e("#app").pullRefresh().enablePullupToRefresh();e("#app").pullRefresh().endPullupToRefresh(a.par.pageIndex>=c.Pages);f.ellipsisToggle();e.toast(a.par.pageIndex+"/"+c.Pages)}else{for(b=0;b<a.list.length;b++)g=a.list[b],d=g.IssDT,h=999999,d&&(d=d.replace("T"," ").replace("+08:00","").replace(/-/g,"/"),0<d.lastIndexOf(".")&&(d=d.substring(0,d.lastIndexOf("."))),h=new Date-new Date(d)),g.CantRevoke=a.user.UserID==g.UserID&&6E5>=h?"":"mui-hidden";e("#app").pullRefresh().endPulldownToRefresh();e.toast("\u5df2\u7ecf\u662f\u6700\u65b0\u6570\u636e\u4e86")}f.loadImg()},function(){a.par.pageIndex--;e("#app").pullRefresh().endPulldownToRefresh()})}},up:{contentrefresh:"\u6b63\u5728\u52a0\u8f7d...",callback:function(){a.list&&1>a.list.length&&(a.par.pageIndex=0);a.par.pageIndex++;f.post("api/Posting/GetSpecailPosts",a.par,function(c){for(var b=0;b<c.Items.length;b++){var g=c.Items[b],d=g.IssDT,h=999999;d&&(d=d.replace("T"," ").replace("+08:00","").replace(/-/g,"/"),0<d.lastIndexOf(".")&&(d=d.substring(0,d.lastIndexOf("."))),h=new Date-new Date(d));g.CantRevoke=a.user.UserID==g.UserID&&6E5>=h?"":"mui-hidden"}1==a.par.pageIndex?(a.list=c.Items,a.par.oldMD5=c.Other.Other,a.oUser=c.Other):(a.par.oldMD5="",a.list=a.list.concat(c.Items));e("#app").pullRefresh().endPullupToRefresh(a.par.pageIndex>=c.Pages);f.loadImg();f.ellipsisToggle();e.toast(a.par.pageIndex+"/"+c.Pages)},function(){a.par.pageIndex--;e("#app").pullRefresh().endPullupToRefresh(!1)})}}}});f.loadImg();setTimeout(function(){a.initellipsis()},500);l.show({aniClass:"fadeIn",selector:"#app"});e(".p-sign").on("tap","a",function(){a.ellipsisToggle()});a.$watch("oUser.PersonSign",function(c){setTimeout(function(){a.initellipsis()},500)});e(".y-card-list").on("tap",".mui-card\x3ediv[class~\x3dmui-card-content]",function(c){a.selectItem.index=this.dataset.index;"IMG"!=c.detail.target.nodeName&&f.openWin("../dynamic/review.html","wdynamic_review",{id:this.dataset.id,pageid:"me_myphoto"},function(a){},{popGesture:"hide"})});e(".y-card-list").on("tap",".mui-card-footer\x3ea[data-type]",function(){var c=this,b=c.parentNode,g={postId:b.dataset.id,clickType:c.dataset.type},d=b.dataset.index;switch(parseInt(c.dataset.type)){case 1:f.post("api/Posting/ClickLike",g,function(b){b=c.querySelector("i");b.classList.remove("y-collect-o");b.classList.add("y-collect");b.classList.add("y-yellow");a.list[d].CNums++;c.dataset.type=5;e.toast("\u6536\u85cf\u6210\u529f")});break;case 2:f.post("api/Posting/ClickLike",g,function(b){b=c.querySelector("i");b.classList.remove("y-heart-o");b.classList.add("y-heart");b.classList.add("y-red");a.list[d].PNums++;c.dataset.type=9});break;case 5:f.post("api/Posting/ClickLike",g,function(b){b=c.querySelector("i");b.classList.add("y-collect-o");b.classList.remove("y-collect");b.classList.remove("y-yellow");a.list[d].CNums--;c.dataset.type=1;e.toast("\u53d6\u6d88\u6536\u85cf")});break;case 100:f.share({href:"http://chorse-sports.com/home_zm/app.html",title:"\u8981\u9a91\u9a6c\uff0c\u9009\u5929\u9a6c\u3002",content:"\u6211\u6b63\u5728\u4f7f\u7528\u5929\u9a6c\uff0c\u8d76\u5feb\u548c\u6211\u4e00\u8d77\u6765\u4f7f\u7528\u5427\u3002",thumbs:["http://chorse-sports.ufile.ucloud.com.cn/sys/logo_100x100.png"]});break;case 101:a.selectItem.index=d,f.openWin("../dynamic/review.html","wdynamic_review",{id:g.postId,pageid:"me_myphoto"},function(a){},{popGesture:"hide"})}return!1});e.previewImage();e(".mui-slider-group").on("longtap","img",function(){var a=this;plus.nativeUI.actionSheet({title:"\u8bf7\u9009\u62e9\u60a8\u7684\u64cd\u4f5c",cancel:"\u53d6\u6d88",buttons:[{title:"\u4fdd\u5b58\u56fe\u7247"}]},function(b){if(1==b.index){b=a.src;var c=b.lastIndexOf("."),c=b.substring(c);plus.downloader.createDownload(b,{method:"GET",filename:"_downloads/image"+c},function(a,b){plus.gallery.save(a.filename,function(){e.toast("\u5df2\u4fdd\u5b58\u5230\u60a8\u7684\u76f8\u518c")})}).start()}})});e("#slider").slider({interval:5E3})});e.plusReady(function(){window.addEventListener("reload",function(b){a.user=f.User.get();a.list=[];a.par.userID=b.detail.ref.userid;a.par.pageIndex=0;a.par.oldMD5="";e("#app").pullRefresh().pulldownLoading()});window.addEventListener("unload",function(b){a.list=[];a.par.userID="";a.par.pageIndex=0;a.par.oldMD5="";a.oUser={};document.getElementById("userPhoto1").src="../../img/me-head-bg.png";document.getElementById("userPhoto2").src="../../img/me-head-bg.png";e("#app").pullRefresh().refresh(!0)});window.addEventListener("addData",function(b){1==b.detail.ref.index&&(a.list.unshift(b.detail.ref.data),f.loadImg())});window.addEventListener("refreshNum",function(b){1==b.detail.ref.type&&a.list[a.selectItem.index].DNums++});var c=plus.webview.currentWebview();c.ref&&(a.par.userID=c.ref.userid,a.par.pageIndex=0,a.par.oldMD5="",a.list=[],setTimeout(function(){e("#app").pullRefresh().pulldownLoading()},1E3));(c=plus.webview.getWebviewById("myphoto_main"))&&e.fire(c,"PageLoaded",function(){})})}})});