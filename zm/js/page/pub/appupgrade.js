define(["app","mui","vue"],function(a,c,d){new d({el:"#app",data:{content:""},computed:{},methods:{load:function(){}},ready:function(){var d=this;c.ready(function(){});c.plusReady(function(){var b=plus.webview.currentWebview().edata,f=c.back,e;c.back=function(){e&&(plus.runtime.quit(),f())};d.content="\u66f4\u65b0\u5185\u5bb9\uff1a\r\n"+b.Remark.replace(RegExp("\x3cbr/\x3e","g"),"\r\n");c("#app").on("tap",".mui-btn-outlined",function(d){console.log("\u4e0b\u8f7d");"Android"==plus.os.name?plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_WIFI?a.down(b.ApkPath,a.appFile,function(a){plus.runtime.openFile(a.filename)},!0):(e=!0,a.down(b.ApkPath,a.appFile,function(a){plus.runtime.openFile(a.filename)}),plus.runtime.quit()):"iOS"==plus.os.name&&(b.AppPath?plus.runtime.openURL(b.AppPath):a.down(b.AddPath,a.upFile,function(d){plus.runtime.install(a.upFile,{force:!0},function(){a.version=b.MaxVer;a.Cache.set(a.Cache.key.upFileVer.toKeyName(),b.MaxVer);a.Cache.set(a.Cache.key.isUpFile.toKeyName(),!1);a.Cache.set(a.Cache.key.isRestartOpen.toKeyName(),!0);c.fire(plus.webview.getWebviewById("wme_info_setting"),"reload",{});a.log("\u5b89\u88c5\u66f4\u65b0\u6210\u529f");plus.runtime.restart()},function(b){a.log("\u5b89\u88c5\u66f4\u65b0\u5931\u8d25")})},!0))})})}})});