define(["app","mui","vue"],function(b,a,f){new f({el:"#app",data:{user:b.User.get()},computed:{validJoin:function(){return!!this.user&&!!this.user.ChapterID&&0<this.user.ChapterID.trim().length}},methods:{},ready:function(){var d=this;d.user=b.User.get();a.init();a.plusReady(function(){window.addEventListener("fExpect",function(a){b.fExpect()});var f=a.os.ios?.003:9E-4;a(".mui-scroll-wrapper").scroll({bounce:!1,indicators:!0,deceleration:f});var e=a.preload({url:"../equestrian/add.html",id:"wequestrian_add",styles:{popGesture:"hide"}}),c=plus.webview.getWebviewById("wequestrian_add_sure");c||(c=plus.webview.create("../equestrian/add_sure.html","wequestrian_add_sure"),e.append(c));document.getElementById("addEquestrian").addEventListener("tap",function(){b.User.get().UserID?(d.user=b.User.get(),d.validJoin||(a.fire(e,"reload",{type:"userInfo"}),a.fire(c,"reload",{type:"userInfo"}),c.hide(),e.show("slide-in-right"))):a.openWindow({id:"wlogin",url:"../login/login.html",show:{aniShow:"slide-in-right"},waiting:{autoShow:!0}}).addEventListener("close",function(){d.user=b.User.get();b.User.get().UserID&&(d.user=b.User.get(),d.validJoin||(a.fire(e,"reload",{type:"userInfo"}),a.fire(c,"reload",{type:"userInfo"}),c.hide(),e.show("slide-in-right")))})})})}})});