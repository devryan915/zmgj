define(["app","mui","vue","load"],function(c,d,e,f){new e({el:"body",data:{user:c.User.get(),TitleName:"",pageData:{BannerUrl:"",ImgUrl:"",Memcount:0},par:{corpsId:""}},computed:{},methods:{goRider:function(b){var a;(a=plus.webview.getWebviewById("match_riderinfo"))?(d.fire(a,"riderID",{riderID:b,corpsID:this.par.corpsId,pageType:2}),d.openWindow({id:"match_riderinfo"})):d.openWindow({id:"match_riderinfo",url:"riderinfo.html",extras:{riderID:b,corpsID:this.par.corpsId,pageType:2},show:{aniShow:!1},waiting:{autoShow:!1}})},detail:function(b){this.goRider(b)},load:function(b){var a=this;a.par.corpsId=b;c.showWaiting(1);c.post("api/Events/GetCorpsInfo",a.par,function(b){a.pageData=b;c.loadImg();a.pageData.Memcount=a.pageData.Members.length;f.show();c.closeWaiting()},function(){c.showError(function(){c.showWaiting(1);a.load(a.par.corpsId)});c.closeWaiting()})}},ready:function(){var b=this;window.addEventListener("teamID",function(a){a.detail.teamID&&(b.TitleName=a.detail.name,b.load(a.detail.teamID))});d.ready(function(){d(".mui-scroll-wrapper").scroll({scrollY:!0,scrollX:!1,startX:0,startY:0,indicators:!0,deceleration:6E-4,bounce:!0})});d.plusReady(function(){var a=plus.webview.currentWebview();a&&a.teamID&&(b.TitleName=a.name,b.load(a.teamID))})}})});