define(["app","mui","vue"],function(a,c,d){new d({el:"#app",data:{data:{ShopID:void 0,Prc:void 0,NImgUrl:void 0,ClubName:void 0,ShopName:void 0,Qty:0,Tprice:"",Oid:""},par:{oid:""},user:a.User.get()},computed:{},methods:{load:function(){},initpage:function(b){this.data=b;this.par.oid=this.data.Oid;a.loadImg()}},ready:function(){var b=this;c.ready(function(){b.paytipel=document.querySelector(".mui-backdrop");c(".footer").on("tap","button",function(){a.showWaiting();a.post("api/Ride/PayOrder",b.par,function(c){b.paytipel.classList.remove("mui-hidden");a.closeWaiting()},function(){a.closeWaiting()})});c(".mui-backdrop").on("tap","button",function(){"0"==this.dataset.type?(a.openWin("../rider/index.html","wrider_list",{type:"cbill"},function(a){}),b.paytipel.classList.add("mui-hidden")):"1"==this.dataset.type&&(a.openPage("../rider/reservation.html","rider_reservation",b.data,function(a){}),b.paytipel.classList.add("mui-hidden"))});c.os.plus||c.toast("muiReady"+a.getQueryString("ref.type"))});c.plusReady(function(){window.addEventListener("reload",function(a){b.initpage(a.detail.ref)});window.addEventListener("unload",function(c){a.closeWaiting();b.paytipel.classList.add("mui-hidden")});var c=plus.webview.currentWebview();b.initpage(c.ref);a.pageLoaded()})}})});