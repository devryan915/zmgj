﻿define(["app","mui","vue","jquery","jquery.qrcode"],function(d,b,e,f,g){new e({el:"#app",data:{scan:void 0},computed:{},methods:{load:function(){},initPar:function(c){},scanQRCode:function(){var c=new plus.barcode.Barcode("bcid",[plus.barcode.QR,plus.barcode.EAN8,plus.barcode.EAN13],{frameColor:"#00FF00",scanbarColor:"#00FF00"});c.onmarked=function(a,b,d){switch(a){case plus.barcode.QR:a="QR";break;case plus.barcode.EAN13:a="EAN13";break;case plus.barcode.EAN8:a="EAN8";break;default:a="\u5176\u5b83"+a}b=b.replace(/\n/g,"");console.log("type:"+a+"\nresult:"+b+"\nfile:"+d+"");plus.nativeUI.confirm(b,function(){c.start()})};c.onerror=function(a){console.log("\u6761\u5f62\u7801\u8bc6\u522b\u9519\u8bef\uff1a"+a)};c.setFlash(!1);c.start({conserve:!1,filename:"_doc/barcode/",vibrate:!0,sound:"none"});this.scan=c}},ready:function(){var c=this;b.ready(function(){var a=b.os.ios?.003:9E-4;b(".mui-scroll-wrapper").scroll({bounce:!1,indicators:!0,deceleration:a});b.init({gestureConfig:{}});b.os.plus||b.toast("muiReady"+d.getQueryString("ref.type"))});b.plusReady(function(){d.pageLoaded();var a=plus.webview.currentWebview();c.initPar(a.ref);window.addEventListener("reload",function(a){c.initPar(a.detail.ref)});window.addEventListener("unload",function(a){})})}})});