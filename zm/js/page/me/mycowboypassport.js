define(["app","mui","vue"],function(c,e,f){new f({el:"#app",data:{Sex:"",BirthDT:"",user:c.User.get(),par:{}},computed:{},methods:{parseIDCard:function(){var a=this.user.IDCard.toUpperCase(),c=a.length;if("15"==c){var b=a.match(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/),d=b[2],b=b[3];this.Sex=0==a.substr(14,1)%2?"\u5973":"\u7537";this.BirthDT=d+"."+b}"18"==c&&(b=a.match(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/),d=b[2],b=b[3],this.Sex=0==a.substr(16,1)%2?"\u5973":"\u7537",this.BirthDT=d+"."+b)},pay:function(){}},ready:function(){var a=this;a.user=c.User.get();a.parseIDCard();e.ready(function(){c.loadImg();window.addEventListener("reload",function(e){a.user=c.User.get();a.parseIDCard();c.loadImg()})})}})});