define("app mui vue mui.view jquery jquery.qrcode".split(" "),function(a,e,m,p,n,q){e.init({});var h;new m({el:"#app",data:{user:a.User.get(),user1:a.User.get(),par:{loginName:"",validCode:"",password:""},validCodeStr:"\u83b7\u53d6\u9a8c\u8bc1\u7801",m:60,remember:!0,isSendValidCode:!0,editPasswordPar:{passwordOld:"",password:""},canEditSex:1,ver:3!=a.appType?a.appType+"-"+a.version:a.version},computed:{valid:function(){return{loginName:!!this.par.loginName,validCode:!!this.par.validCode}},validCode:function(){return{isValidCode:!!this.par&&!!this.par.loginName&&this.isSendValidCode}},validPassword:function(){return{isPassword:!!this.editPasswordPar&&!!this.editPasswordPar.passwordOld&&a.reg.password.test(this.editPasswordPar.password)}},isValid:function(){var b=this.valid;return Object.keys(b).every(function(a){return b[a]})}},methods:{agreeement:function(){a.Cache.set(a.Cache.key.cpageUrl.toKeyName(),"http://chorse-sports.com/home_zm/serviceagreement.html");a.Cache.set(a.Cache.key.cpageTitle.toKeyName(),"\u5929\u9a6c\u7528\u6237\u670d\u52a1\u534f\u8bae");e.openWindow({url:"../pub/other.html",id:"wpact",createNew:!0,show:{aniShow:"pop-in",duration:300},waiting:{autoShow:!0}})},disclaimer:function(){a.Cache.set(a.Cache.key.cpageUrl.toKeyName(),"http://chorse-sports.com/home_zm/disclaimer.html");a.Cache.set(a.Cache.key.cpageTitle.toKeyName(),"\u8d5b\u4e8b\u514d\u8d23\u58f0\u660e");e.openWindow({url:"../pub/other.html",id:"wpact",createNew:!0,show:{aniShow:"pop-in",duration:300},waiting:{autoShow:!0}})},editSex:function(b){var c=this;if(1==c.canEditSex){var d={val:b.detail.isActive?1:0,infoType:3};a.post("api/User/UpdateUserBase",d,function(b){c.user.Sex=d.val;a.User.set(c.user);e.toast("\u4fee\u6539\u6210\u529f")},function(){c.canEditSex=0;setTimeout(function(){e("#sexSwitch")["switch"]().toggle();var b=document.getElementById("sexSwitch"),a=document.querySelector(".mui-switch-handle");"1"==d.val?a.style.webkitTransform="translate(43px, 0)":a.style.webkitTransform="translate(0, 0)";"1"==d.val?b.classList.add("mui-active"):b.classList.remove("mui-active");setTimeout(function(){c.canEditSex=1},500)},500)})}},sendValidCode:function(){var b=this;b.isSendValidCode=!1;b.validCodeStr=b.m+"s \u540e\u91cd\u65b0\u83b7\u53d6";h=setInterval(function(){1<b.m?(--b.m,b.validCodeStr=b.m+"s \u540e\u91cd\u65b0\u83b7\u53d6"):(b.isSendValidCode=!0,clearTimeout(h),b.validCodeStr="\u83b7\u53d6\u9a8c\u8bc1\u7801",b.m=60)},1E3);var c={};c.loginName=b.par.loginName;a.post("api/user/GetBindUserVaildCode",c,function(b){e.toast("\u9a8c\u8bc1\u7801\u53d1\u9001\u6210\u529f")},function(){b.isSendValidCode=!0;clearTimeout(h);b.validCodeStr="\u83b7\u53d6\u9a8c\u8bc1\u7801";b.m=60})},bindUser:function(){var b=this;a.showWaiting();var c={};c.loginName=b.par.loginName;c.validCode=b.par.validCode;a.post("api/user/BindUser",c,function(c){a.User.set(c);b.par=null;a.closeWaiting();e.toast("\u7ed1\u5b9a\u6210\u529f\uff0c\u7cfb\u7edf\u5373\u5c06\u91cd\u65b0\u542f\u52a8");e.os.plus&&e.fire(plus.webview.currentWebview().opener(),"reload",{type:"userInfo"});setTimeout(function(){plus.runtime.restart()},2E3)},function(){a.closeWaiting()})},editMobile:function(){var b=this;a.showWaiting();var c={val:b.par.loginName,infoType:5,pwd:b.par.password,validCode:b.par.validCode};a.post("api/User/UpdateUserBase",c,function(d){b.user.MobileNum=c.val;a.User.set(b.user);b.par=null;a.closeWaiting();e.toast("\u4fee\u6539\u6210\u529f");e.os.plus&&e.fire(plus.webview.currentWebview().opener(),"reload",{type:"userInfo"});e.back()},function(){a.closeWaiting()})},editPassword:function(){var b=this;a.showWaiting();a.post("api/User/ChangePwd",b.editPasswordPar,function(c){b.editPasswordPar=null;a.closeWaiting();e.toast("\u4fee\u6539\u6210\u529f");e.back()},function(){a.closeWaiting()})},exit:function(){e.confirm("\u662f\u5426\u786e\u5b9a\u9000\u51fa\u5f53\u524d\u8d26\u53f7","\x26nbsp;",["\u53d6\u6d88","\u786e\u5b9a"],function(b){1==b.index&&(a.User.clear(),e.openWindow({id:"wlogin",url:"../login/login.html",show:{aniShow:"slide-in-right"},waiting:{autoShow:!1}}),a.Cache.set("gotab",!1),e.os.plus&&e.fire(plus.webview.getLaunchWebview(),"gotab",{type:"userInfo",id:"windex"}),e.os.plus&&plus.webview.hide("wme_info_setting","none"))},"div")},clearCache:function(){a.Cache.ideleteAll(function(){e.toast("\u6e05\u7406\u7f13\u5b58\u6210\u529f")})},getHeadClip:function(){return plus.webview.getWebviewById("whead")||e.preload({url:"head.html",id:"whead",styles:{popGesture:"hide"}})},galleryImg:function(b){plus.gallery.pick(function(a){e.openWindow({id:"whead",url:"head.html",extras:{headUrl:a,img:b.imageID,viewID:"wme_info_meInfo",sizeParam:b.sizeParam},show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!1}})},function(b){},{filter:"image"})},getImage:function(b){plus.camera.getCamera().captureImage(function(a){plus.io.resolveLocalFileSystemURL(a,function(a){e.openWindow({id:"whead",url:"head.html",extras:{headUrl:a.toLocalURL(),img:b.imageID,viewID:"wme_info_meInfo",sizeParam:b.sizeParam},show:{autoShow:!0,aniShow:"slide-in-right"},waiting:{autoShow:!1}})},function(b){})},function(b){},{})},selImg:function(b){var a=this,d=[],f=[];"headPhoto"==b?(d=[260,260],f=[300,300]):(d=[260,195],f=[300,225]);var g={imageID:b,sizeParam:{size:d,outputSize:f}};e.os.plus&&plus.nativeUI.actionSheet({title:"\u4fee\u6539\u7167\u7247\u5899",cancel:"\u53d6\u6d88",buttons:[{title:"\u62cd\u7167"},{title:"\u4ece\u624b\u673a\u76f8\u518c\u9009\u62e9"}]},function(b){switch(b.index){case 1:a.getImage(g);break;case 2:a.galleryImg(g)}})},initImgPreview:function(){var b=this,a=document.querySelectorAll(".head-img-left img");if((a=e.slice.call(a))&&0<a.length){var d=document.createElement("div");d.setAttribute("id","__mui-imageview__");d.classList.add("mui-slider");d.classList.add("mui-fullscreen");d.style.display="none";d.addEventListener("tap",function(){d.style.display="none"});d.addEventListener("touchmove",function(b){b.preventDefault()});var f=document.createElement("div");f.setAttribute("id","__mui-imageview__group");f.classList.add("mui-slider-group");a.forEach(function(a,e,c){a.addEventListener("tap",function(){d.style.display="block";g.refresh();g.gotoItem(e,0)});a=document.createElement("div");a.classList.add("mui-slider-item");c=document.createElement("a");var k=document.createElement("img");k.setAttribute("id","aHeadImgView");k.setAttribute("src",b.user.ImgUrl);c.appendChild(k);a.appendChild(c);f.appendChild(a)});d.appendChild(f);document.body.appendChild(d);var g=e(d).slider()}}},created:function(){},ready:function(){var b=this;e.ready(function(){a.loadImg();var c=location.href,d=c.lastIndexOf("#");"#pageMeQRcode"==c.substring(d,c.length)&&n("#qrWo").qrcode({render:"canvas",width:205,height:205,background:"#efeff4",text:a.toUtf8(b.user.QRCode)});var c=-1==d?"#meInfo":c.substring(d,c.length),f=e("#app").view({defaultPage:c});e(".mui-scroll-wrapper").scroll();var g=f.view;(function(a){var e=a.back;a.back=function(){f.canBack()?(b.isSendValidCode=!0,h&&clearTimeout(h),b.par=null,b.validCodeStr="\u83b7\u53d6\u9a8c\u8bc1\u7801",b.m=60,f.back()):e()};g.addEventListener("pageBeforeShow",function(a){});g.addEventListener("pageShow",function(a){});g.addEventListener("pageBeforeBack",function(a){});g.addEventListener("pageBack",function(a){})})(e);e(".mui-navbar-inner").on("tap","button.save",function(){a.showWaiting();var c=this.dataset.form,d={infoType:this.dataset.type},f,g,h=!0,l="input";"frmPersonSign"==c&&(l="textarea");e("#"+c+" "+l).each(function(a,b){f=d.val=b.value;g=b.dataset.name;if(b.dataset.reg&&!(new RegExp(b.dataset.reg)).test(b.value))return e.toast(b.dataset.regError),h=!1});h||a.closeWaiting();h&&a.post("api/User/UpdateUserBase",d,function(c){b.user[g]=f;"4"==d.infoType&&b.user.Sex!=c&&(b.canEditSex=0,setTimeout(function(){e("#sexSwitch")["switch"]().toggle();var d=document.getElementById("sexSwitch"),f=document.querySelector(".mui-switch-handle");"1"==c?f.style.webkitTransform="translate(43px, 0)":f.style.webkitTransform="translate(0, 0)";"1"==c?d.classList.add("mui-active"):d.classList.remove("mui-active");setTimeout(function(){b.user.Sex=c;a.User.set(b.user);b.canEditSex=1},500)},500));if("2"==d.infoType||"7"==d.infoType)b.user.showName=a.User.getShowName(b.user);a.User.set(b.user1);a.closeWaiting();e.toast("\u4fee\u6539\u6210\u529f");e.os.plus&&e.fire(plus.webview.currentWebview().opener(),"reload",{type:"userInfo"});e.back()},function(){a.closeWaiting()})})});e.plusReady(function(){window.addEventListener("reload",function(c){b.ver=a.version;b.user=a.User.get();a.loadImg()});window.addEventListener("uploadHead",function(c){var d;"headPhoto"==c.detail.img?d=0:"userPhoto1"==c.detail.img?d=1:"userPhoto2"==c.detail.img&&(d=2);a.showWaiting();var f={val:c.detail.headData,place:d};a.post("api/User/UpdateUserHeader",f,function(d){console.log("\u4fee\u6539\u5934\u50cf\u6210\u529f\uff1a"+c.detail.img+" "+d);var g=document.getElementById(c.detail.img);"headPhoto"==c.detail.img?(b.user.ImgUrl=d,b.user.ImgUrls[0].ImgUrl=d,a.Cache.set(a.Cache.key.headPhoto.toKeyName(b.user.UserID),f.val),g.style.background="url("+f.val+")"):"userPhoto1"==c.detail.img?(b.user.ImgUrls[1].ImgUrl=d,a.Cache.set(a.Cache.key.userPhoto1.toKeyName(b.user.UserID),f.val),g.src=f.val):"userPhoto2"==c.detail.img&&(b.user.ImgUrls[2].ImgUrl=d,a.Cache.set(a.Cache.key.userPhoto2.toKeyName(b.user.UserID),f.val),g.src=f.val);a.User.set(b.user);a.closeWaiting();e.os.plus&&e.fire(plus.webview.currentWebview().opener(),"reload",{type:"photo"});e.toast("\u4fee\u6539\u6210\u529f")},function(){console.log("\u4fee\u6539\u5931\u8d25\uff0c\u5c1d\u8bd5\u4eceGetFirstPage\u83b7\u53d6\u6570\u636e");a.post("api/News/GetFirstPage",{lastDT:""},function(d){d=d.UserInfo;var g=document.getElementById(c.detail.img);"headPhoto"==c.detail.img?(b.user.ImgUrl=d.ImgUrl,b.user.ImgUrls[0].ImgUrl=d.ImgUrls[0].ImgUrl,a.Cache.set(a.Cache.key.headPhoto.toKeyName(b.user.UserID),f.val),g.style.background="url("+f.val+")"):"userPhoto1"==c.detail.img?(b.user.ImgUrls[1].ImgUrl=d.ImgUrls[1].ImgUrl,a.Cache.set(a.Cache.key.userPhoto1.toKeyName(b.user.UserID),f.val),g.src=f.val):"userPhoto2"==c.detail.img&&(b.user.ImgUrls[2].ImgUrl=d.ImgUrls[2].ImgUrl,a.Cache.set(a.Cache.key.userPhoto2.toKeyName(b.user.UserID),f.val),g.src=f.val);a.User.set(b.user);e.os.plus&&e.fire(plus.webview.currentWebview().opener(),"reload",{type:"photo"});e.toast("\u4fee\u6539\u6210\u529f")});a.closeWaiting()})})})}})});