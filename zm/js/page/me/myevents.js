define(["app","mui","vue"],function(c,a,l){var d,e,h,k;new l({el:"#app",data:{editable:!1,pageData:{events:{},eventID:""},par:{eType:"1"},delPar:{projectId:""}},computed:{},methods:{detail:function(f,b,c,g){2==b||3===b?d&&(a.fire(d,"loadData",{isZ:2==b,projectId:f,isPoint:c,projectName:g}),a.openWindow({id:"me_prize"})):1==b?(a.fire(e,"reload",{id:f}),e.show("pop-in")):4==b?(a.fire(h,"reload",{id:f}),h.show("pop-in")):5==b&&(a.fire(k,"reload",{id:f}),k.show("pop-in"))},del:function(f,b){var d=this,g=b.target;d.delPar.projectId=g.value;var e=g.parentNode.parentNode;a.confirm(f?"\u8be5\u573a\u8d5b\u4e8b\u5956\u91d1\u672a\u9886\u53d6\u6210\u529f\n\u786e\u8ba4\u5220\u9664":"\u786e\u8ba4\u5220\u9664\u8be5\u6761\u8d5b\u4e8b\u8bb0\u5f55","\u5220\u9664\u8d5b\u4e8b",["\u786e\u8ba4","\u53d6\u6d88"],function(a){0==a.index?c.post("api/User/RemoveMyProject",d.delPar,function(a){e.parentNode.removeChild(e)}):g.checked=""})},eitor:function(){this.editable=!this.editable},load:function(){var a=this;c.showWaiting();c.post("api/User/GetMyProject",a.par,function(b){a.pageData.events=b;c.closeWaiting()},function(){c.closeWaiting()})}},ready:function(){a.ready(function(){a(".mui-scroll-wrapper").scroll({scrollY:!0,scrollX:!1,startX:0,startY:0,indicators:!0,deceleration:6E-4,bounce:!0});d=a.preload({id:"me_prize",url:"prize.html",styles:{popGesture:"hide"}})});a.plusReady(function(){e=plus.webview.getWebviewById("wgame_contestants")||a.preload({url:"../game/contestants.html",id:"wgame_contestants",styles:{popGesture:"hide"}});h=plus.webview.getWebviewById("wgame_score")||a.preload({url:"../game/score.html",id:"wgame_score",styles:{popGesture:"hide"}});k=plus.webview.getWebviewById("wgame_rule")||a.preload({url:"../game/rule.html",id:"wgame_rule",styles:{}})});this.load()}})});