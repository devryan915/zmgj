define(["app","mui","vue"],function(f,d,k){var h,g;new k({el:"#app",data:{par:{projectId:"",rType:0,LastDT:""},parSupport:{projectId:"",rid:"",rType:0,payPwd:"",isPayPwd:""},list:[],o:{title:"",first:{SelfReward:!1},list:[]},fee:0,index:0,num:0,time:"",endtime:"",laveSecond:0},methods:{detail:function(a){var b,e=a.currentTarget.dataset.id,c=a.currentTarget.dataset.sum;2==this.par.rType?(d.plus&&(b=plus.webview.getWebviewById("match_teaminfo")),b?(d.fire(b,"teamID",{teamID:e,name:a.currentTarget.dataset.name}),d.openWindow({id:"match_teaminfo"})):d.openWindow({id:"match_teaminfo",url:"../match/teaminfo.html",extras:{teamID:e,name:a.currentTarget.dataset.name},show:{aniShow:!1},waiting:{autoShow:!1}})):(d.plus&&(b=plus.webview.getWebviewById("match_riderinfo")),b?(d.fire(b,"riderID",{riderID:e,totalSum:c,pid:this.par.projectId,rtype:this.par.rType,pageType:3,nsn:this.o.NowSupportNum,freeNum:this.o.FreeNum,feeNum:this.fee}),d.openWindow({id:"match_riderinfo"})):d.openWindow({id:"match_riderinfo",url:"../match/riderinfo.html",extras:{riderID:e,totalSum:c,pid:this.par.projectId,rtype:this.par.rType,pageType:3,nsn:this.o.NowSupportNum,freeNum:this.o.FreeNum,feeNum:this.fee},show:{aniShow:!1},waiting:{autoShow:!1}}))},load:function(){var a=this;f.post("api/Events/GetProjectRosterDT",a.par,function(b){b.Items.length&&(a.setList(b.Items),a.num=b.Items.length,a.par.LastDT=b.LastDT);h=setInterval(function(){f.post("api/Events/GetProjectRosterDT",a.par,function(b){b.Items.length&&(a.setList(b.Items),a.num=b.Items.length,a.par.LastDT=b.LastDT)})},3E3);g=setInterval(function(){a.time=a.settime(new Date(a.endtime.Format("yyyy-MM-dd hh:mm")))},1E3);f.closeWaiting()},function(){f.showError(function(){f.showWaiting(1);a.load()});f.closeWaiting()})},settime:function(a){var b=new Date;a=a.getTime()-b.getTime();this.laveSecond=a=parseInt(a/1E3);var b=Math.floor((a-0)/3600),e=Math.floor((a-0-3600*b)/60),c=Math.floor(a-0-3600*b-60*e),b="\u6295\u7968\u5012\u8ba1\u65f6\uff1a"+b+":"+f.zeros(e,2)+":"+f.zeros(c,2);0>a&&(b="",clearInterval(g));return b},setList:function(a){for(var b={},e=[],c=0;c<a.length;c++)a[c].index=c,0==c?this.o.first=a[c]:1==c%2?b.o1=a[c]:(b.o2=a[c],e.push(b),b={});b.o1&&e.push(b);this.o.list=[];this.o.list=e}},created:function(){},ready:function(){var a=this;d.init();d.ready(function(){d(".mui-scroll-wrapper").scroll()});d.plusReady(function(){window.addEventListener("reload",function(b){a.par.projectId=b.detail.ref.id;a.fee=b.detail.ref.fee;a.par.rType=b.detail.ref.rtype;a.o.FreeNum=parseInt(b.detail.ref.FreeNum);a.o.NowSupportNum=parseInt(b.detail.ref.NowSupportNum);a.endtime=b.detail.ref.endtime;a.o.title=b.detail.ref.title;a.load()});window.addEventListener("unload",function(b){clearInterval(h);clearInterval(g);a.par.LastDT="";a.o={title:"",first:{},list:[]};a.list=[];a.num=0;a.time="";d(".mui-scroll-wrapper").scroll().scrollTo(0,0,100)});var b=plus.webview.currentWebview();b.ref&&(a.par.projectId=b.ref.id,a.fee=b.ref.fee,a.par.rType=b.ref.rtype,a.o.FreeNum=parseInt(b.ref.FreeNum),a.o.NowSupportNum=parseInt(b.ref.NowSupportNum),a.o.title=b.ref.title,a.endtime=b.ref.endtime,a.load());document.getElementById("btnShare").addEventListener("tap",function(){f.shareCurrentWebview()})})}})});