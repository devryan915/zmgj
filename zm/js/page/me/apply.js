define(["app","mui","vue","mui.view"],function(d,b,f,g){b.init({});var e;new f({el:"#app",data:{canBack:!0,reqBpar:{},user:d.User.get(),viewApi:null,pageData:{rmbNum:0,mbNum:0,projectName:"\u6bd4\u8d5b",bank:{RealName:"",BankCard:"",BankCode:"",BankName:""},confirmBtn:null,canReceive:!0},par:{projectId:"",rosterId:"",payPwd:"",receiveType:null,realName:"",bankCard:"",bankName:""},serverData:{banks:[]}},computed:{isValid:function(){return this.pageData.bank.RealName&&0<this.pageData.bank.RealName.trim().length&&this.pageData.bank.BankCard&&0<this.pageData.bank.BankCard.trim().length&&this.pageData.bank.BankName&&0<this.pageData.bank.BankName.trim().length}},methods:{clear:function(){this.canBack=!0;this.pageData={rmbNum:0,mbNum:0,projectName:"\u6bd4\u8d5b",bank:{RealName:"",BankCard:"",BankCode:"",BankName:""},confirmBtn:null,canReceive:!0};this.par={projectId:"",rosterId:"",payPwd:"",receiveType:null,realName:"",bankCard:"",bankName:""}},back:function(){b.back()},chooseBank:function(){e&&(b.fire(e,"choosebank",{viewID:"me_apply"}),b.openWindow({id:"pub_choosebank"}))},confrim:function(a){this.pageData.confirmBtn=a.target},account:function(a,c,b){this.par.receiveType=1==a&&2==c||2==a?2:1;2==a&&2==c&&(b=b.$event.currentTarget.dataset,this.pageData.bank.RealName=b.name,this.pageData.bank.BankCard=b.card,this.pageData.bank.BankName=b.cname);1==a&&2==c&&(this.pageData.bank.RealName=null,this.pageData.bank.BankCard=null,this.pageData.bank.BankName=null)},reReward:function(){var a=this;1==a.par.receiveType?(a.par.realName=a.user.RealName,a.par.bankCard="",a.par.bankName=""):2==a.par.receiveType&&(a.par.realName=a.pageData.bank.RealName,a.par.bankCard=a.pageData.bank.BankCard,a.par.bankName=a.pageData.bank.BankName);d.post("api/User/ReceiveReward",this.par,function(c){a.pageData.confirmBtn&&(a.pageData.confirmBtn.innerText="\u8f6c\u51fa\u8fdb\u884c\u4e2d",a.pageData.canReceive=!1,a.par.payPwd="",b.back(),(c=plus.webview.getWebviewById("me_prize"))&&b.fire(c,"reload",{}))})},load:function(){var a=this;d.post("api/User/GetMyBank",a.reqBpar,function(b){b.forEach(function(a){a.sbCard=a.BankCard.substr(a.BankCard.length-4)});a.serverData.banks=b})}},created:function(){},ready:function(){var a=this;window.addEventListener("loadData",function(b){a.clear();a.par.projectId=b.detail.projectId;a.par.rosterId=b.detail.rosterId;a.par.receiveType=b.detail.receiveType;a.pageData.projectName=b.detail.projectName;a.pageData.rmbNum=b.detail.rmbNum;a.pageData.mbNum=b.detail.mbNum;b.detail.subViewID&&("mbaccount"==b.detail.subViewID&&(a.canBack=!1),a.viewApi.go("#"+b.detail.subViewID));a.load()});window.addEventListener("pubChooseBankRet",function(b){a.pageData.bank.BankCode=b.detail.bankCode;a.pageData.bank.BankName=b.detail.bankName});var c=location.href,d=c.lastIndexOf("#"),c=-1==d?"#cpayType":c.substring(d,c.length);a.viewApi=b("#app").view({defaultPage:c});b(".mui-scroll-wrapper").scroll();b.ready(function(){(function(b){var c=a.viewApi.view,d=b.back;b.back=function(){a.viewApi.canBack()&&a.canBack?a.viewApi.back():(a.viewApi.canBack()&&a.viewApi.back(),d(),plus.webview.currentWebview().hide())};c.addEventListener("pageBeforeShow",function(a){});c.addEventListener("pageShow",function(a){});c.addEventListener("pageBeforeBack",function(b){"inputPWD"==b.detail.page.id&&(a.par.payPwd="")});c.addEventListener("pageBack",function(a){})})(b);e=b.preload({id:"pub_choosebank",url:"../pub/choosebank.html",styles:{popGesture:"hide"}})});b.plusReady(function(){})}})});