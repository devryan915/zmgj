define(["app","mui","vue"],function(b,c,f){new f({el:"#app",data:{par:{loginName:"",password:"",validCode:""},validCodeStr:"\u83b7\u53d6\u9a8c\u8bc1\u7801",m:60,remember:!0,isSendValidCode:!0,tokenImg:"",tokenImgCode:""},computed:{valid:function(){return{loginName:!!this.par.loginName,password:b.reg.password.test(this.par.password),validCode:!!this.par.validCode,remember:!!this.remember}},validCode:function(){return{isValidCode:!!this.par.loginName&&!!this.tokenImgCode&&this.isSendValidCode}},isValid:function(){var a=this.valid;return Object.keys(a).every(function(b){return a[b]})}},methods:{pact:function(){b.Cache.set(b.Cache.key.cpageUrl.toKeyName(),"http://chorse-sports.com/home_zm/userAgreement.html");b.Cache.set(b.Cache.key.cpageTitle.toKeyName(),"\u670d\u52a1\u534f\u8bae");c.openWindow({url:"../pub/other.html",id:"wpact",createNew:!0,show:{aniShow:"pop-in",duration:300},waiting:{autoShow:!0},styles:{popGesture:"hide"}})},register:function(){b.showWaiting();c.os.plus&&plus.push.getClientInfo();b.post("api/user/regist",this.par,function(a){b.hideKeyboard();b.User.set(a);b.closeWaiting();c.alert("\u606d\u559c\u60a8\u83b7\u5f97 "+a.MB+"\u9a6c\u5e01","\u6ce8\u518c\u6210\u529f","\u786e\u5b9a",function(a){c.os.plus&&c.fire(plus.webview.getLaunchWebview(),"gotab",{type:"userInfo"});plus.webview.hide("wlogin","none");plus.webview.hide("wregister","zoom-fade-in",500);setTimeout(function(){plus.webview.close("wlogin","none");plus.webview.currentWebview().close("none",300)},1E3)},"div")},function(){b.closeWaiting()})},getVerfyImg:function(){var a=this,d=plus.device;b.post("api/user/GetVerifyImg",{cID:c.os.ios?d.uuid:d.imei},function(b){a.tokenImg=b},function(){})},sendValidCode:function(){var a=this;a.isSendValidCode=!1;a.validCodeStr=a.m+"s \u540e\u91cd\u65b0\u83b7\u53d6";var d=setInterval(function(){1<a.m?(--a.m,a.validCodeStr=a.m+"s \u540e\u91cd\u65b0\u83b7\u53d6"):(a.isSendValidCode=!0,clearTimeout(d),a.validCodeStr="\u83b7\u53d6\u9a8c\u8bc1\u7801",a.m=60)},1E3),e=plus.device;b.post("api/user/GetRegisterVerifyCodeV2",{mobileNum:this.par.loginName,cID:c.os.ios?e.uuid:e.imei,verifyCodeText:this.tokenImgCode},function(a){c.toast("\u9a8c\u8bc1\u7801\u53d1\u9001\u6210\u529f")},function(){a.isSendValidCode=!0;clearTimeout(d);a.validCodeStr="\u83b7\u53d6\u9a8c\u8bc1\u7801";a.m=60})}},ready:function(){var a=this;c.plusReady(function(){a.getVerfyImg();plus.webview.currentWebview().addEventListener("popGesture",function(a){a.type="end";b.hideKeyboard()},!1)})}})});