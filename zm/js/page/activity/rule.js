define(["app","mui","vue"],function(b,c,e){var d={app:document.getElementById("app"),show:function(){d.app.classList.remove("mui-hidden")},hide:function(){d.app.classList.add("mui-hidden")}};new e({el:"#app",data:{par:{projectId:""},o:{}},methods:{load:function(){var a=this;b.showWaiting(1);b.post("api/Events/GetProjectDes",a.par,function(f){a.o=f;d.show();b.closeWaiting()},function(){b.showError(function(){a.load()});b.closeWaiting()})}},created:function(){},ready:function(){var a=this;c.init({beforeback:function(){a.o=null;d.hide();return!0},swipeBack:!1});c.ready(function(){var a=c.os.ios?.003:9E-4;c(".mui-scroll-wrapper").scroll({bounce:!1,indicators:!0,deceleration:a})});c.plusReady(function(){window.addEventListener("reload",function(b){a.par.projectId=b.detail.id;a.load()});plus.webview.currentWebview().addEventListener("popGesture",function(a){a.type="end";d.hide()},!1)})}})});