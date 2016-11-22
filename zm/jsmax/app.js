var app = (function(document, undefined) {
	var $ = function() {};
	$.version = '1.6.1';
	$.welcomeVer = '1.6.1';
	$.serialNumber = '6.6.19 9:38';
	$.appType = 3; //1-开发；2-测试；3-生产  
	$.debug = false;
	$.upFile = '_doc/update/tm.wgt';
	$.appFile = '_doc/update/tm.apk';
	$.webHost = 'http://m.chorse-sports.com/';
	$.log = function(arg) {
		$.debug && console.log(arg);
	};
	$.defaultToken = 'zmgjapp';
	$.isStatusbarOffset = !1;
	$.getUrl = function(method) {
		if($.appType == 1) {
			//			 开发环境
			//			return 'http://192.168.1.113:31724/' + method;
			return 'http://192.168.1.202:8100/' + method;
			//			return 'http://api1.chorse-sports.com/' + method;
		} else if($.appType == 2) {
			//测试环境
			return 'http://testapi.chorse-sports.com/' + method;
		} else if($.appType == 3) {
			//正式环境
			return 'http://api.chorse-sports.com/' + method;
		}
	};
	$.method = {
		user_login: 'api/user/login',
		user_register: 'api/user/login/regist',
		user_UpdateUserBase: 'api/user/UpdateUserBase',
	};
	$.reg = {
		password: /^(\w){6,18}$/,
	};
	/**
	 * 获取url参数值
	 * @param {String} name 需要获取的参数 key 
	 */
	$.getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	};
	$.createNonceStr = function() {
		return Math.random().toString(36).substr(2, 15);
	};
	$.createTimestamp = function() {
		return parseInt(new Date().getTime() / 1000) + '';
	};
	$.getSN = function() {
		return $.Cache.get($.Cache.key.sn.toKeyName(), function() {

			return Math.random().toString(36).substr(2, 10);
		})
	};
	/**
	 * 检查用户是否登录，未登录，跳转至登录页；
	 * 					 已登录，执行回调函数
	 * @param {Function} callBack 已登录回调的函数
	 */
	$.checkLogin = function(callBack) {
		if(!$.User.getToken() || $.User.getToken() == $.defaultToken) {
			$.Cache.sset($.Cache.key.returnurl.toKeyName(), location.href);
			var refOpenId = $.getQueryString('refOpenId')
			refOpenId && $.Cache.set($.Cache.key.referrer.toKeyName(), refOpenId);
			history.replaceState(null, "", '../login/login.html');
			location.reload();
			//			location.href = '/page/login/login.html';
		} else {
			callBack();
		}
	};
	$.zeros = function(num, length) {
		var s = '000000000000' + num;
		return s.substr(s.length - length);
	};
	/**
	 * 判断当前运行环境
	 */
	$.os = function() {
		var ua = navigator.userAgent.toLowerCase(),
			app = navigator.appVersion;
		return {
			weixin: ua.match(/MicroMessenger/i) == "micromessenger", //是否为微信
			mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //|| !!ua.match(/AppleWebKit/), //是否为移动终端
		}
	}();
	$.toUtf8 = function(str) {
		var out, i, len, c;
		out = "";
		len = str.length;
		for(i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i);
			} else if(c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
		}
		return out;
	};
	$.getTime = function(s) {
		s = parseInt(s);
		var m = 0;
		var h = 0;
		var d = 0;
		if(s > 60) {
			m = parseInt(s / 60);
			s = parseInt(s % 60);
			if(m > 60) {
				h = parseInt(m / 60);
				m = parseInt(m % 60);
				if(h > 24) {
					d = parseInt(h / 24);
					h = parseInt(h % 24);
				}
			}
		}
		var time = s;
		if(m > 0) {
			time = m + ':' + time;
		}
		if(h > 0) {
			time = h + ':' + time;
		}
		if(d > 0) {
			time = d + '天' + time;
		}
		return time;
	};
	/**
	 * 检测客户端是否安装app
	 * @param {Object} id
	 */
	$.isInstalled = function(id) {
			if(id === 'qihoo' && mui.os.plus) {
				return true;
			}
			if(mui.os.android) {
				var main = plus.android.runtimeMainActivity();
				var packageManager = main.getPackageManager();
				var PackageManager = plus.android.importClass(packageManager)
				var packageName = {
					"qq": "com.tencent.mobileqq",
					"weixin": "com.tencent.mm",
					"sinaweibo": "com.sina.weibo"
				}
				try {
					return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
				} catch(e) {}
			} else {
				switch(id) {
					case "qq":
						var TencentOAuth = plus.ios.import("TencentOAuth");
						return TencentOAuth.iphoneQQInstalled();
					case "weixin":
						var WXApi = plus.ios.import("WXApi");
						return WXApi.isWXAppInstalled()
					case "sinaweibo":
						var SinaAPI = plus.ios.import("WeiboSDK");
						return SinaAPI.isWeiboAppInstalled()
					default:
						break;
				}
			}
		}
		/**
		 * 兼容 AMD 模块
		 **/
	if(typeof define === 'function' && define.amd) {
		define('app', [], function() {
			return $;
		});
	}
	return $;
})(document);
/**
 * 扩展方法
 * @param {Object} undefined
 */
(function(undefined) {
	if(String.prototype.toKeyName === undefined) { // fix for iOS 3.2
		/**
		 * 拼接缓存key名称
		 */
		String.prototype.toKeyName = function() {
			var s = this + '_';
			for(var i = 0; i < arguments.length; i++) {
				s += arguments[i] + '_';
			}
			return s;
		};
		// 对Date的扩展，将 Date 转化为指定格式的String 
		// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
		// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
		// 例子： 
		// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
		// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
		String.prototype.Format = function(fmt) { //author: meizz 

			var d = new Date(this);
			var o = {
				"M+": d.getMonth() + 1, //月份 
				"d+": d.getDate(), //日 
				"h+": d.getHours(), //小时 
				"m+": d.getMinutes(), //分 
				"s+": d.getSeconds(), //秒 
				"q+": Math.floor((d.getMonth() + 3) / 3), //季度 
				"S": d.getMilliseconds() //毫秒 
			};
			if(/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt.replace('T', ' ').replace('+08:00', ''); //.replace(/-/g, "/");
		}
		Date.prototype.Format = function(fmt) { //author: meizz 

			var d = this;
			var o = {
				"M+": d.getMonth() + 1, //月份 
				"d+": d.getDate(), //日 
				"h+": d.getHours(), //小时 
				"m+": d.getMinutes(), //分 
				"s+": d.getSeconds(), //秒 
				"q+": Math.floor((d.getMonth() + 3) / 3), //季度 
				"S": d.getMilliseconds() //毫秒 
			};
			if(/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
		}
	}
	Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
		obj['__proto__'] = proto;
		return obj;
	};
})();
/**
 * 缓存管理
 * @param {Object} $ app类
 * @param {Object} win
 */
(function($, win) {
	var mui = require('mui');
	win.indexedDB = win.indexedDB || win.mozIndexedDB || win.webkitIndexedDB || win.msIndexedDB;
	win.IDBTransaction = win.IDBTransaction || win.webkitIDBTransaction || win.msIDBTransaction;
	win.IDBKeyRange = win.IDBKeyRange || win.webkitIDBKeyRange || win.msIDBKeyRange;
	$.Cache = {
		keyTime: 'keyTime',
		key: {
			version: 'version',
			upFileVer: 'upFileVer',
			user: 'user',
			sn: 'sn',
			token: 'token',
			userID: 'userID',
			returnurl: 'returnurl',
			cpageTitle: 'cpageTitle', //当前公用页标题
			cpageUrl: 'cpageUrl', //当前公用页地址
			isUpFile: 'isUpFile', //是否有更新文件
			isRestartOpen: 'isRestartOpen',
			selectWelcome: 'selectWelcome',
			cindexData: 'cindexData',
			cnewsData: 'cnewsData', //新闻第一个数据缓存
			cclubData: 'cclubData', //新闻第一个数据缓存
			cequestrianData: 'cequestrianData',
			chooseFromPage: 'chooseFromPage',
			chooseFromPageID: 'chooseFromPageID',
			choosedClub: 'choosedClub',
			choosedClubIsParent: 'choosedClubIsParent',
			cOrderNo: 'cOrderNo',
			//俱乐部
			clubData: 'clubData',
			//分会
			chapterData: 'chapterData',
			cOrderMoney: 'cOrderMoney',
			headPhoto: 'headPhoto',
			userPhoto1: 'userPhoto1',
			userPhoto2: 'userPhoto2',
			selectAddr: 'selectAddr',
			wxService: 'wxService',
		},
		//初始化缓存
		init: function() {
			$.Cache.del($.Cache.key.caskNewsId.toKeyName());
		},
		/**
		 * 获取缓存中的数据
		 * @param {String} k
		 * @param {Function} fun 当缓存中无此key对应缓存值时，获取此值的函数
		 * @param {Number} t 有效秒数
		 */
		get: function(k, fun, t) {
			var v;
			//超时删除缓存中存在的原有值 
			var t1 = localStorage.getItem($.Cache.keyTime.toKeyName(k));
			t1 = t1 == null ? 0 : parseInt(t1);
			var time = new Date().getTime();
			//缓存值过期处理
			if(t1 != 0 && t1 < time) {
				localStorage.removeItem(k);
			}
			if(t != undefined) {
				localStorage.setItem($.Cache.keyTime.toKeyName(k), time + t * 1000);
			}
			v = localStorage.getItem(k);
			if(v == null) {
				if(fun != undefined) {
					v = fun();
					localStorage.setItem(k, v);
				}
			}
			return v;
		},
		getInt: function(k, fun, t) {
			var v = $.Cache.get(k, fun, t);
			return v == null ? 0 : parseInt(v);
		},
		set: function(k, v, t) {
			localStorage.setItem(k, v);
			if(t != undefined) {
				var time = new Date().getTime();
				localStorage.setItem($.Cache.keyTime.toKeyName(k), time + t * 1000);
			}
		},

		setObject: function(k, v, t) {
			localStorage.setItem(k, JSON.stringify(v));
			if(t != undefined) {
				var time = new Date().getTime();
				localStorage.setItem($.Cache.keyTime.toKeyName(k), time + t * 1000);
			}
		},
		getFloat: function(k, fun, t) {
			var v = $.Cache.get(k, fun, t);
			return v == null ? 0 : parseFloat(v);
		},
		getBoolean: function(k, fun, t) {
			var v = $.Cache.get(k, fun, t);
			return v == 'true' ? true : false;
		},
		getObject: function(k, fun, t) {
			var v = $.Cache.get(k, fun, t);
			return v == null ? null : JSON.parse(v);
		},
		getArray: function(k, fun, t) {
			var v = $.Cache.get(k, fun, t);
			return v == null ? [] : JSON.parse(v);
		},
		getString: function(k, fun, t) {
			var v = $.Cache.get(k, fun, t);
			return v == null ? '' : v.toString();
		},
		del: function(k) {
			localStorage.removeItem(k);
			localStorage.removeItem($.Cache.keyTime.toKeyName(k));
		},
		iHasKey: function(k) {
			k = $.Cache.keyTime.toKeyName(k);
			return localStorage.hasOwnProperty(k);
		},
		sset: function(k, v) {
			sessionStorage.setItem(k, v);
		},
		sget: function(k) {
			return sessionStorage.getItem(k);
		},
		sgetInt: function(k) {
			var v = $.Cache.sget(k);
			return isNaN(v) ? 0 : parseInt(v);
		},
		ssetObject: function(k, v) {
			sessionStorage.setItem(k, JSON.stringify(v))
		},
		sgetObject: function(k) {
			var v = $.Cache.sget(k);
			return v == null ? null : JSON.parse(v);
		},
		//indexeddb 存储

		version: 1, // important: only use whole numbers!

		objectStoreName: 'db',

		instance: {},

		upgrade: function(e) {

			var
				_db = e.target.result,
				names = _db.objectStoreNames,
				name = $.Cache.objectStoreName;

			if(!names.contains(name)) {

				_db.createObjectStore(
					name, {
						keyPath: 'key',
						autoIncrement: true
					});
			}
		},

		errorHandler: function(error) {
			//			window.alert('error: ' + error.target.code);

		},

		open: function(callback) {

			var request = win.indexedDB.open(
				$.Cache.objectStoreName, $.Cache.version);

			request.onerror = $.Cache.errorHandler;

			request.onupgradeneeded = $.Cache.upgrade;

			request.onsuccess = function(e) {

				$.Cache.instance = request.result;

				$.Cache.instance.onerror =
					$.Cache.errorHandler;

				callback();
			};
		},

		getObjectStore: function(mode) {

			var txn, store;

			mode = mode || 'readonly';

			txn = $.Cache.instance.transaction(
				[$.Cache.objectStoreName], mode);

			store = txn.objectStore(
				$.Cache.objectStoreName);

			return store;
		},

		/**
		 * 设置缓存
		 * @param {String} key 键
		 * @param {Object} data 值
		 * @param {Number} t    有效期 秒
		 * @param {Function} callback 成功后回调函数
		 */
		iset: function(k, v, t, callback) {
			t = t || 864000; //默认有效期为10天

			var time = new Date().getTime();
			k = $.Cache.keyTime.toKeyName(k);
			$.Cache.set(k, time + t * 1000);
			if(mui.os.plus) {
				if(typeof(v) == "object") {
					v = JSON.stringify(v);
				}
				plus.storage.setItem(k, v);
			} else {
				try {
					$.Cache.open(function() {
						var store, request,
							mode = 'readwrite',
							obj = {
								key: k,
								val: v,
							}
						store = $.Cache.getObjectStore(mode),
							request = k ?
							store.put(obj) :
							store.add(obj);
						request.onsuccess = callback;
					});
				} catch(e) {

				}
			}
		},
		iget: function(k, callback) {
			k = $.Cache.keyTime.toKeyName(k);
			try {
				if(mui.os.plus) {

					callback(plus.storage.getItem(k));
				} else {
					$.Cache.open(function() {
						var mode = 'readwrite',
							store = $.Cache.getObjectStore(mode);
						var request = store.get(k);
						request.onsuccess = function(e) {
							//							var result = e.target.result && new Date().getTime() > e.target.result.useTime ? null : e.target.result;
							//							result && $.Cache.iset(result.key, result.val, result.useT);
							callback(result ? result.val : null);
						};
					});
				}
			} catch(e) {
				callback(null);
			}

		},
		igetObject: function(k, callback) {
			k = $.Cache.keyTime.toKeyName(k);
			try {
				if(mui.os.plus) {
					var v = plus.storage.getItem(k);
					callback(v && JSON.parse(v));
				} else {
					$.Cache.open(function() {
						var mode = 'readwrite',
							store = $.Cache.getObjectStore(mode);
						var request = store.get(k);
						request.onsuccess = function(e) {
							//							result && $.Cache.iset(result.key, result.val, result.useT);
							callback(e.target.result ? e.target.result.val : null);
						};
					});
				}
			} catch(e) {
				callback(null);
			}

		},
		igetAll: function(callback) {

			$.Cache.open(function() {

				var
					store = $.Cache.getObjectStore(),
					cursor = store.openCursor(),
					data = [];

				cursor.onsuccess = function(e) {

					var result = e.target.result;

					if(result &&
						result !== null) {

						data.push(result.value);
						result.continue();

					} else {

						callback(data);
					}
				};

			});
		},
		idelete: function(k, callback) {
			$.Cache.open(function() {
				var
					mode = 'readwrite',
					store, request;

				store = $.Cache.getObjectStore(mode);

				request = store.delete(k);

				request.onsuccess = callback;
			});
		},

		ideleteAll: function(callback) {
			var ks = [];
			for(var i = 0; i >= 0; i++) {
				var k = localStorage.key(i);
				if(k) {
					if(k.indexOf($.Cache.keyTime.toKeyName()) == 0) {
						ks.push(k)
					}
				} else {
					i = -2;
				}
			}
			for(var i = 0; i < ks.length; i++) {
				var k = ks[i];
				$.Cache.del(k);
			}
			if(mui.os.plus) {
				plus.storage.clear();
				!!callback && callback();
			} else {
				$.Cache.open(function() {

					var mode, store, request;

					mode = 'readwrite';
					store = $.Cache.getObjectStore(mode);
					request = store.clear();

					!!callback && (request.onsuccess = callback);
				});
			}

		},
		/**
		 * 清除过期的缓存
		 */
		iclearExpired: function() {
			var ks = [];
			for(var i = 0; i >= 0; i++) {
				var k = localStorage.key(i);
				if(k) {
					if(k.indexOf($.Cache.keyTime.toKeyName()) == 0) {
						ks.push(k)
					}
				} else {
					i = -2;
				}
			}
			for(var i = 0; i < ks.length; i++) {
				var k = ks[i];
				var t1 = $.Cache.getInt(k);
				var time = new Date().getTime();
				//缓存值过期处理
				if(t1 != 0 && t1 < time) {
					$.Cache.del(k);
					mui.os.plus ? plus.storage.removeItem(k) : $.Cache.idelete(k)
				}

			}

			//			if(mui.os.plus) {
			//				var numKeys = plus.storage.getLength();
			//				var keys = [];
			//				for(var i = 0; i < numKeys; i++) {
			//					keys[i] = plus.storage.key(i);
			//				}
			//
			//				for(var i = 0; i < numKeys; i++) {
			//					var k = keys[i];
			//					if(k != null && k.indexOf($.Cache.keyTime.toKeyName()) == -1) {
			//						var t1 = plus.storage.getItem($.Cache.keyTime.toKeyName(k));
			//						t1 = t1 == null ? 0 : parseInt(t1);
			//						var time = new Date().getTime();
			//						//缓存值过期处理
			//						if(t1 != 0 && t1 < time) {
			//							plus.storage.removeItem(k);
			//							plus.storage.removeItem($.Cache.keyTime.toKeyName(k));
			//						}
			//					}
			//				}
			//
			//			} else {
			//				$.Cache.open(function() {
			//					var mode = 'readwrite';
			//					var
			//						store = $.Cache.getObjectStore(mode),
			//						cursor = store.openCursor(),
			//						data = [];
			//
			//					cursor.onsuccess = function(e) {
			//
			//						var result = e.target.result;
			//
			//						if(result &&
			//							result !== null && new Date().getTime() > result.value.useTime) {
			//							store.delete(result.value.key);
			//							result.continue();
			//
			//						} else {
			//
			//							//						callback(data);
			//						}
			//					};
			//
			//				});
			//			}
		},

	};

	/**
	 * 登录用户类，所有需要用到的用户信息都从此类获取
	 */
	$.User = {
		showName: '',
		loginName: '',
		token_type: '',
		UserID: "",
		NickName: '',
		MobileNum: '',
		VTimes: '',
		ImgUrl: '',
		PersonSign: '',
		Points: '',
		Exp: '',
		MB: 0,
		RiderNum: '',
		ChapterID: '',
		ChapterName: '',
		RealName: '',
		Sex: '',
		IDCard: '',
		RaderLevel: '',
		IsChapterMaster: '',
		LastDT: '',
		Token: '',
		BirthDT: '',
		ClubID: '',
		ClubName: '',
		MemberNo: '',
		IsMember: '',
		MemberCreateDT: '',
		ExpireDT: '',
		QRCode: '',
		//是否处于转会中
		IsChangClub: '',
		IsPayPwd: true,
		ImgUrls: [],
		FNums: '',
		getShowName: function(u) {
			if(u.NickName && u.NickName.length > 0) {
				return u.NickName;
			}
			if(u.RealName && u.RealName.length > 0) {
				return u.RealName;
			}
			if(u.loginName && u.loginName.length > 0) {
				return u.loginName;
			}
			return '';
		},
		set: function(u) {
			$.User.setToken(u.Token);
			$.User.setUserID(u.UserID);
			//			console.log(JSON.stringify(u));
			u.showName = $.User.getShowName(u);
			//			console.log(JSON.stringify(u) + '##################setuser');
			$.Cache.setObject($.Cache.key.user.toKeyName(), u);
		},
		get: function() {
			var u = $.Cache.getObject($.Cache.key.user.toKeyName());
			return u || $.User;
		},
		setToken: function(token) {
			$.Cache.set($.Cache.key.token.toKeyName(), token);
		},
		getToken: function() {
			return $.Cache.getString($.Cache.key.token.toKeyName());
		},

		setUserID: function(token) {
			$.Cache.set($.Cache.key.userID.toKeyName(), token);
		},
		getUserID: function() {
			return $.Cache.getString($.Cache.key.userID.toKeyName())
		},
		setAccessToken: function(token) {
			$.Cache.set($.Cache.key.access_token.toKeyName(), token);
		},
		getAccessToken: function() {
			return $.Cache.getString($.Cache.key.access_token.toKeyName())
		},
		clear: function() {
			$.Cache.del($.Cache.key.token.toKeyName());
			$.Cache.del($.Cache.key.userID.toKeyName());
			$.Cache.del($.Cache.key.user.toKeyName());
		}

	};
})(app, window);
/**
 *  UI 界面操作
 * @param {Object} $ app
 * @param {Document} doc document
 * @param {Window} win_Window
 */
(function($, doc, win) {
	$.createLoading = function(type) {
		return $.loading = doc.getElementById("app_LOADING"),
			$.loading || ($.loading = doc.createElement("div"),
				$.loading.id = "app_LOADING", $.loading.className = "mui-backdrop",
				$.loading.innerHTML = '<div class="con" ><div><i class="mui-spinner"></i></div></div>'),
			$.loading
	}();
	/** 
	 * 显示等待 
	 * type 等待框类型 
	 * 		空：小黑底白色菊花，用于调用接口提示用户
	 * 		1：不覆盖标题等待
	 * 		2： 全屏覆盖等待
	 * @param {Int32Array} type=[1|2]
	 * isAsyn
	 * 		空：异步
	 *  		1：同步
	 * 		2：异步
	 */
	$.showWaiting = function(type, isAsyn) {
		$.createLoading.className = type ? 'mui-backdrop mui-backdrop-' + type : 'mui-backdrop';
		doc.body.appendChild($.createLoading);
		var el = doc.getElementById("app_LOADING");
		if(isAsyn == '1') {
			el.addEventListener("touchstart", function(e) {
				//				console.log('scroll waiting');
				var e = e || window.event;
				e.preventDefault();
			});
		} else {
			el.addEventListener("doubletap", function() {
				$.closeWaiting();
			});
		}
	};
	/**
	 * 关闭等待
	 */
	$.closeWaiting = function() {
		$.loading && $.loading.parentNode && $.loading.parentNode.removeChild($.loading);

	};
	$.fExpect = function() {
		$.expectNew = doc.getElementById("app_fExpect");
		if(!$.expectNew) {
			$.expectNew = doc.createElement("div");
			$.expectNew.id = "app_fExpect";
			$.expectNew.innerHTML = '' +
				'<div style="position: fixed;z-index: 998;top: 0;right: 0;bottom: 0;left: 0;background-color: rgba(0, 0, 0, .4)">' +
				'	<div style="width: 200px;margin: 200px auto;background: #fff; border-radius: 10px;text-align: center;padding: 10px;">' +
				'		<div style="width: 80%;margin: 0 auto;">' +
				'			<img src="../../img/building.png" style="width: 100%" />' +
				'		</div>' +
				'		<div style="margin-top: 10px;font-size: 12px;">模块建设中，敬请期待~~</div>' +
				'	</div>' +
				'</div>';
			$.expectNew.addEventListener('tap', function() {
				$.expectNew && ($.expectNew.style.display = 'none');
			});
			doc.body.appendChild($.expectNew);
			setTimeout(function() {
				$.expectNew && ($.expectNew.style.display = 'none');
			}, 1000);
		} else {
			$.expectNew.style.display = '';
			setTimeout(function() {
				$.expectNew && ($.expectNew.style.display = 'none');
			}, 1000);
		}
	};
	/** 
	 * 显示网络错误页面
	 * @param {Object} callBack 点击错误页面时回调函数
	 * @param {Number} type =[1,2] 默认头部不覆盖，1 底部不覆盖 2全屏覆盖
	 */
	$.showError = function(callBack, type) {
		$.err = doc.getElementById("app_Error");
		$.closeWaiting();
		if(!$.err) {
			$.err = doc.createElement("div");
			$.err.id = "app_Error", $.err.className = type ? "mui-backdrop-error mui-backdrop-error-" + type : "mui-backdrop-error";
			$.err.innerHTML = '<div style="width: 300px;margin:100px auto;text-align: center;"><img src="../../img/net_error.png" style="width: 60%;" /><div style="margin-top: 25px;">网络不稳，请检查网络并刷新重试</div><button type="button" class="mui-button-row mui-btn-yellow" style="margin-top: 50px;width: 100px;">重新加载</button></div>';
			$.err.addEventListener('tap', function() {
				$.closeError();
				callBack();
			});
			doc.body.appendChild($.err);
		} else {
			$.err.style.display = '';
		}
	};
	/**
	 * 关闭错误页面
	 */
	$.closeError = function() {
		var err = doc.getElementById("app_Error");
		if(err) {
			err.style.display = 'none';
		} //&& a.err.parentNode && a.err.parentNode.removeChild(a.err)
	};
	/**
	 * 获取当前元素位置
	 * @param {Element} elem 
	 */
	$.getElementPosition = function(elem) {
		var defaultRect = {
			top: 0,
			left: 0
		};
		var rect = (elem.getBoundingClientRect && elem.getBoundingClientRect()) || defaultRect;
		var ret = {
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft
		}
		return ret;
	};
	/**
	 * 自动移动当前标签至可见位置，已防止虚拟键盘弹出挡住当前标签
	 * @param {String} selector 支持的标签选择器
	 */
	$.autoScroll = function(selector) {
		selector = selector || 'input';
		mui(selector).each(function() {
			var self = this;
			self.addEventListener('focus', function() {
				var self = this;
				var elP = $.getElementPosition(self);
				//						alert(document.body.clientHeight + '|' + document.body.offsetHeight)

				//						var n = a.top - self.offsetHeight;
				//						document.body.style.height = document.body.offsetHeight + n + self.clientHeight + 'px';
				//						console.log(getElementPosition(self));
				//						self.scrollIntoView(true)
				setTimeout(function() {
					if(doc.documentElement.clientHeight / 2 < elP.top + self.offsetHeight * 3) {
						doc.body.style.height = doc.documentElement.clientHeight * 1.5 + 'px';
						var top = elP.top - self.offsetHeight * 2;
						win.scrollTo(0, top);
					}
				}, 200)

			});
			self.addEventListener('blur', function() {
				var self = this;
				doc.body.style.height = '';
				//					window.scrollTo(0, 0);
			});
		});
	};
	$.toggleActive = function(className) {
		var CLASS_ACTIVE = 'mui-active';
		var timer;
		var classList;
		window.addEventListener(mui.EVENT_START, function(e) {
			var target = e.target;
			while(target && target !== document) {
				if(target.classList) {
					var cclasslist = target.classList;
					if(cclasslist.contains(className)) {
						if(timer) {
							timer.cancel();
							if(classList) {
								classList.remove(CLASS_ACTIVE);
							}
						}
						classList = cclasslist;
						classList.add(CLASS_ACTIVE);
						timer = mui.later(function() {
							classList.remove(CLASS_ACTIVE);
						}, 100);
						return;
					}
				}
				target = target.parentNode;
			}
		});
	};
	$.loadImg = function() {
		setTimeout(function() {
			$.loadingImg();
			setTimeout(function() {
				$.loadingImg();
			}, 1000);
		}, 200);
	};
	$.loadingImg = function() {
		var imgList = document.querySelectorAll("[data-img^='http']");
		var n = 0;
		var loadImg1 = function() {
			var el = imgList[n];
			n++;
			var fileName = el.dataset.img;
			if(!fileName) {
				return true;
			}
			//如果图片资源为改变不必重新加载
			//			if(el.localName == 'i' && el.style.background == 'url(' + fileName + ')') {
			//				console.log(el.style.background + "###############");
			//				return true;
			//			} else if(el.localName == 'img' && el.src == fileName) {
			//				console.log(el.src + "###############");
			//				return true;
			//			}
			//			el.removeAttribute('data-img');
			var img = new Image();
			img.src = fileName;
			img.onload = function(e) {
				//				el.classList.add('fadeIn');
				if(el.localName == 'i') {
					el.style.background = 'url(' + fileName + ')';
				} else if(el.localName == 'img') {
					el.src = fileName;
				}
				imgList.length > n && loadImg1();
			};
			img.onerror = function() {
				imgList.length > n && loadImg1();
			}
		}
		imgList.length > 0 && loadImg1();
		//						mui.each(document.querySelectorAll("[data-img^='http']"), function() {
		//					var el = this;
		//					var fileName = el.dataset.img;
		//					if(fileName && fileName.length == 0) {
		//						return true;
		//					}
		//					var img = new Image();
		//					img.src = fileName;
		//					img.onload = function(e) {
		//						el.classList.add('fadeIn');
		//						if(el.localName == 'i') {
		//							el.style.background = 'url(' + fileName + ')';
		//						} else if(el.localName == 'img') {
		//							el.src = fileName;
		//						}
		//					};
		//					el.removeAttribute('data-img');
		//				});

		//		mui.each(document.querySelectorAll("[data-img^='http']"), function() {
		//			var el = this;
		//			var fileName = el.dataset.img;
		//			if(fileName && fileName.length == 0) {
		//				return true;
		//			}
		//			var img = new Image();
		//			img.src = fileName;
		//			img.onload = function(e) {
		//				el.classList.add('fadeIn');
		//				if(el.localName == 'i') {
		//					el.style.background = 'url(' + fileName + ')';
		//				} else if(el.localName == 'img') {
		//					el.src = fileName;
		//				}
		//			};
		//			el.removeAttribute('data-img');
		//		});
	};
	$.ellipsisToggle = function() {
		setTimeout(function() {
			$.ellipsisT();
			setTimeout(function() {
				$.ellipsisT();
			}, 1000);
		}, 100);
	};
	$.ellipsisT = function() {

		var list = document.querySelectorAll(".y-ellipsis-flag");
		for(var i = 0; i < list.length; i++) {
			list[i].classList.remove("y-ellipsis-flag");
			var p = document.createElement("p");
			p.innerText = list[i].innerText;
			p.style.top = '-2000px';
			p.style.position = 'absolute';
			p.width = list[i].offsetWidth;
			list[i].parentNode.appendChild(p);
			if(p.offsetHeight > list[i].clientHeight) {
				var h6 = document.createElement("h6");
				h6.innerText = '展开';
				h6.className = 'mui-text-right y-ellipsis-tag';
				h6.addEventListener('tap', function() {
					var el = this;
					var elPre = el.previousElementSibling;

					elPre.classList.contains('y-ellipsis') ? (elPre.classList.remove('y-ellipsis'), el.innerText = '收起') : (elPre.classList.add('y-ellipsis'), el.innerText = '展开');
					//							console.log('111:::' + elPre.offsetHeight)
					//							var y = mui('.mui-scroll-wrapper').scroll()[0].y;
					//							mui('.mui-scroll-wrapper').scroll()[0].scrollTo(0, y + 10, 100);
					//							mui.trigger(elPre, 'swipedown');
				});
				list[i].parentNode.lastChild == list[i] ? list[i].parentNode.appendChild(h6) : list[i].parentNode.insertBefore(h6, list[i].nextElementSibling)

			}
			list[i].parentNode.removeChild(p);
		}

	};
	$.hideKeyboard = function() {
		try {
			var el = document.querySelector("input:focus");
			el && el.blur();
		} catch(e) {
			//TODO handle the exception
		}
	};
	$.share = function(msg) {
		var shares = {};
		plus.share.getServices(function(s) {
			if(s && s.length > 0) {
				for(var i = 0; i < s.length; i++) {
					var t = s[i];
					shares[t.id] = t;
				}
			}
			var ids = [{
					id: "weixin",
					ex: "WXSceneSession",
					name: '微信'
				}, {
					id: "weixin",
					ex: "WXSceneTimeline",
					name: '微信'
				}],
				bts = [{
					title: "发送给微信好友"
				}, {
					title: "分享到微信朋友圈"
				}];
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: bts
			}, function(e) {
				var i = e.index;
				if(i == 0) {
					return false;
				}
				msg.extra = {
					scene: ids[i - 1].ex
				};
				if(i > 0) {
					var s_id = ids[i - 1].id;
					var share = shares[s_id];
					if(!share.nativeClient) {
						mui.toast('无法打开“' + ids[i - 1].name + '”');
					} else if(share.authenticated) {
						share.send(msg, function() {
							mui.toast("分享到\"" + share.description + "\"成功！ ");
						}, function(e) {
							app.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
						});
					} else {
						share.authorize(function() {
							share.send(msg, function() {
								mui.toast("分享到\"" + share.description + "\"成功！ ");
							}, function(e) {
								app.log("分享到\"" + share.description + "\"失败: " + e.code + " - " + e.message);
							});
						}, function(e) {});
					}
				}
			});

		}, function() {});

	};
	$.shareCurrentWebview = function() {

		var ws = plus.webview.currentWebview();
		// 截图
		var bitmap1 = new plus.nativeObj.Bitmap();
		// 将webview内容绘制到Bitmap对象中
		ws.draw(bitmap1, function() {
			var fileurl = '_doc/img/temp/temp.jpg';

			bitmap1.save(fileurl, {
				overwrite: true
			}, function(e) {
				bitmap1.clear();
				var msg = {
					pictures: [fileurl]
				}
				$.share(msg);
			}, function(e) {

			});
		}, function(e) {});
	}
})(app, document, window);

//(function(w) {
//
//	document.addEventListener('plusready', function() {
//		console.log("Immersed-UserAgent: " + navigator.userAgent);
//	}, false);
//	var immersed = 0;
//	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
//	if(ms && ms.length >= 3) {
//		immersed = parseFloat(ms[2]);
//	}
//	w.immersed = immersed;
//	//	alert('222：：' + immersed + '|' + navigator.userAgent)
//	console.log('immersed:::' + immersed)
//		//	if(!immersed) {
//		//		return;
//		//	}
//	var t = document.querySelector('header');
//	//	var c=document.querySelector('.mui-content')
//	//	, t.style.background = '-webkit-linear-gradient(top,rgba(215,75,40,1),rgba(215,75,40,0.8))', t.style.color = '#FFF'
//	//	, t.style.height = 44 + immersed + 'px'
//	//	if(h){
//	//		if(h.classList.contains('mui-bar-transparent'))
//	//	}
//	//	else{
//	//		c.style.marginTop='0';
//	//	} 
//	t && (t.style.paddingTop = immersed + 'px', t.style.height = 44 + immersed + 'px');
//	t = document.querySelector('header.mui-bar-transparent~.mui-content'),
//		t && (t.style.marginTop = '0px');
//	t = document.querySelector('header.mui-bar-nav~.mui-content'),
//		t && (t.style.marginTop = immersed + 'px');
//})(window);

/**
 * mui.js 相关扩展方法
 * @param {Object} $
 * @param {Object} mui
 */
(function($) {
	var mui = require('mui');
	$.decToHex = function(str) {
		var res = [];
		for(var i = 0; i < str.length; i++)
			res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
		return "\\u" + res.join("\\u");
	};
	//	$.showLogin = function() {
	//		mui.openWindow({
	//			id: 'wlogin',
	//			url: '../login/login.html',
	//			show: {
	//				aniShow: 'slide-in-right',
	//			},
	//			waiting: {
	//				autoShow: false
	//			}
	//		});
	//	};
	$.pageLoaded = function() {
		var cpage = plus.webview.currentWebview();
		if(cpage.ref && cpage.ref.parentPageID) {
			if(cpage.ref.isFirstLoad != '1') {
				cpage.ref.isFirstLoad = '1';
				var ppage = plus.webview.getWebviewById(cpage.ref.parentPageID);
				mui.fire(ppage, cpage.id + 'loaded', {
					ref: {
						pageid: cpage.id,
					}
				});
			}
		}
	};
	$.openPage = function(href, id, ref, callback, styles) {
		if(mui.os.plus) {
			var cpage = plus.webview.currentWebview();
			ref = ref || {};
			ref.parentPageURL = cpage.getURL();
			//			console.log(ref.parentPageURL);
			ref.parentPageID = cpage.id;
			var npage = plus.webview.getWebviewById(id);
			if(npage) {
				npage.ref = ref;
				mui.fire(npage, 'reload', {
					ref: ref
				});
				npage.show('pop-in');
			} else {
				$.showWaiting();
				var loadedf = function(e) {
					if(e.detail.ref.pageid == id) {
						$.closeWaiting();
						npage.show('pop-in');
						npage.addEventListener(styles.popGesture, function(e) {
							mui.fire(npage, 'unload', {
								popevent: e,
							});
							!!callback && callback(npage);
						});
						window.removeEventListener(id + 'loaded', loadedf);
					}
				};
				window.addEventListener(id + 'loaded', loadedf);
				setTimeout(function() {
					$.closeWaiting();
				}, 5000);
				styles = styles || {
					popGesture: 'hide'
				};
				npage = mui.preload({
					id: id,
					url: href,
					styles: styles,
					extras: {
						ref: ref
					}
				});
			}
		} else {
			var par = '?';
			for(var k in ref) {
				par += 'ref.' + k + '=' + ref[k] + '&';
			}
			location.href = href + par;
		}
	};
	$.openWin = function(href, id, ref, callback, styles) {
		if(mui.os.plus) {
			var w = plus.webview.getWebviewById(id);
			if(w) {
				mui.fire(w, 'reload', {
					ref: ref
				});
				w.show('pop-in');
			} else {
				styles = styles || {
					popGesture: 'hide'
				};
				w = mui.preload({
					id: id,
					url: href,
					styles: styles,
					extras: {
						ref: ref
					}
				});
				w.show('pop-in');
				!!callback && w.addEventListener(styles.popGesture, function() {
					mui.fire(w, 'unload', {});
					callback(w);
				});
			}
		} else {
			var par = '?';
			for(var k in ref) {
				par += 'ref.' + k + '=' + ref[k] + '&';
			}
			location.href = href + par;
		}
	};
	mui.os.plus && ($.isStatusbarOffset = function() {

		return mui.os.ios && parseFloat(mui.os.version) >= 7
	});
	$.getWXService = function(event) {
		var service = undefined;
		plus && plus.oauth.getServices(function(services) {
				var auths = services;
				var supportAuth = ['weixin'];
				for(var i in auths) {
					var s = auths[i];
					if(~supportAuth.indexOf(s.id)) {
						service = s;
						break;
					}
				}
				//				&& $.isInstalled(s.id)
				//					mui.toast('微信登录服务初始化失败');
				return event(service);
			},
			function(e) {
				//				mui.toast('微信登录服务初始化失败');
				return event(service);
			});
	};
	$.loginWX = function(service, scall, ecall) {
		var par = {};
		app.showWaiting(undefined, 1);
		//				broad.classList.remove('mui-hidden');
		$.logUI(JSON.stringify(service));
		var pcInfo = plus.push.getClientInfo();
		try {
			par.weicode = service.userInfo.unionid;
			par.toke = service.authResult.refresh_token;
			par.nickName = service.userInfo.nickname;
			par.imgUrl = service.userInfo.headimgurl;
			par.other = {
				push: {
					clientid: pcInfo.clientid,
					token: pcInfo.token,
				},
				device: plus.device,
				screen: plus.screen,
				os: plus.os,
			};
			par.other = JSON.stringify(par.other);
		} catch(e) {
			$.logUI(e.toString());
		}
		//				broad.innerHTML += JSON.stringify(par);
		$.post('api/user/LoginWeiXin', par, function(data) {
			$.User.set(data);
			//wexinlogin.style.opacity = "0";
			//mainPage.style.opacity = "1";
			scall && scall();
			mui.toast("登录成功！");
			setTimeout(function() {
				app.closeWaiting()
			}, 500);
			$.Cache.setObject($.Cache.key.wxService.toKeyName(), service);
			//					var parValid = {};
			//					parValid.loginName = "13045659626";
			//					app.post('api/user/GetBindUserVaildCode', parValid, function(data) {
			//						var parBind = {};
			//						parBind.loginName = "13045659626";
			//						parBind.validCode = "";
			//						app.post('api/user/BindUser', parBind, function(data) {
			//
			//						}, function() {});
			//					}, function() {});

		}, function(error) {
			$.closeWaiting();
			if(ecall) {
				//如果有错误回调则不用重新尝试
				ecall();
			} else {
				//没有错误回调默认尝试重新登录
				$.showError(function() {
					$.loginWX(service);
				}, 2);
			}

		});
	};
	//强制重新登录
	/**
	 * 
	 * @param {Object} bCall 1服务端登录成功2获得微信有效授权3获取微信授权失败
	 */
	$.reloginWexin = function(bCall) {
		$.getWXService(function(service) {
			if(!service) {
				mui.toast("微信登录服务初始化失败，请检查微信是否安装");
				bCall && bCall(3);
				return;
			}
			if(!service.authResult || !service.authResult.refresh_token || !service.userInfo || !service.userInfo.unionid) {
				service.login(function(e) {
						mui.toast("登录认证成功！");
						//var result = e.target.authResult;
						//var userInfo = e.target.userInfo;
						//mainPage.classList.remove('mui-hidden');
						//mui.toast('result' + JSON.stringify(e.target));
						//broad.innerHTML += JSON.stringify(e.target);
						$.logUI('登录认证成功' + JSON.stringify(e.target));
						if(!e.target.authResult || !e.target.authResult.refresh_token || !e.target.userInfo || !e.target.userInfo.unionid) {
							service.getUserInfo(function(e) {
								//mui.toast("获取用户信息成功");
								if(!e.target.authResult.refresh_token) {
									$.logUI("refresh_token不存在");
									if(e.target.authResult.code) {
										$.logUI(e.target.authResult.code + "获取refresh_token");
										var rUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxfe2987a3e834dc74&secret=02576567e6091f5352530d0b53c0c691&code=" + e.target.authResult.code + "&grant_type=authorization_code";
										mui.ajax({
											url: rUrl,
											type: "get",
											headers: {
												'Content-Type': 'application/json'
											},
											contentType: 'application/json',
											timeout: 1000,
											success: function(res) {
												$.log(rUrl + '\n返回值：\n' + JSON.stringify(res, null, '\t'));
												$.logUI(rUrl + '\n返回值：\n' + JSON.stringify(res, null, '\t'));
												e.target.authResult.refresh_token = res.refresh_token;
												if(!(!e.target.authResult || !e.target.authResult.refresh_token || !e.target.userInfo || !e.target.userInfo.unionid)) {
													bCall && bCall(2);
													$.loginWX(e.target, function() {
														bCall && bCall(1);
													});
												} else {
													service.logout(function(e) {
														mui.toast("注销登录认证成功，重新登录！");
														$.reloginWexin(bCall);
													}, function(e) {
														mui.toast("注销登录认证失败！");
														bCall && bCall(3);
													});
												}
											},
											error: function(xhr, type, errorThrown) {
												//														mui.toast(type+xhr+errorThrown);
												bCall && bCall(3);
												$.log(type);
												$.logUI(type);
											}
										});
									} else {
										bCall && bCall(3);
										mui.toast("登录授权code不存在");
									}
								} else {
									bCall && bCall(2);
									$.loginWX(e.target, function() {
										bCall && bCall(1);
									});
								}
							}, function(e) {
								mui.toast("获取用户信息失败：" + e.message + " - " + e.code);
								service.logout(function(e) {
									$.reloginWexin(bCall);
								}, function(e) {
									bCall && bCall(3);
									mui.toast("注销登录认证失败！");
								});
							});
						} else {
							bCall && bCall(2);
							$.loginWX(e.target, function() {
								bCall && bCall(1);
							});
						}
					}, function(e) {
						bCall && bCall(3);
						mui.toast("登录认证失败！");
					}, {
						scope: "snsapi_userinfo",
					} // 授权获取用户信息
				);
			} else {
				bCall && bCall(2);
				mui.toast("已经登录认证！");
				$.logUI("已经登录认证！" + JSON.stringify(service));
				$.loginWX(service, function() {
					bCall && bCall(1);
				});
			}
		});
	};
	$.AutologinWexin = function(bcall) {
		var service = app.Cache.getObject(app.Cache.key.wxService.toKeyName());
		if(!service || !service.authResult || !service.authResult.refresh_token || !service.userInfo || !service.userInfo.unionid) {
			$.reloginWexin(bcall);
		} else {
			$.loginWX(service, function() {
				bcall && bcall(1);
			}, function() {
				$.reloginWexin(bcall);
			});
		}

	};
	$.logUI = function(msg) {
		return;
		if($.debug) {
			var body = document.querySelector("body");
			var logui = document.querySelector(".logui");
			if(!logui) {
				logui = document.createElement("div");
				logui.classList.add("logui");
				body.appendChild(logui);
			}
			logui.innerHTML += "<br/>" + msg + "<br/>";
			//			logui.addEventListener("touchstart", function(e) {
			//				var e = e || window.event;
			//				e.preventDefault();
			//			});
		}
	};
	/**
	 * post 请求服务器接口
	 * @param {String} method	类型
	 * @param {Object} data		数据
	 * @param {Function} callback 成功回调函数
	 * @param {Function} errorCallBack 失败回调函数
	 * @param {Boolean} isToast 是否显示请求结果提示
	 */
	$.post = function(method, data, callback, errorCallBack, isShowWaiting, timeout) {
		var url = $.getUrl(method);
		timeout = timeout || 3000;
		//		if (isShowWaiting == undefined) {
		//			isShowWaiting = true;
		//		}
		//		isShowWaiting && $.showWaiting();

		var cr = $.sign(method, data);
		if($.User.getToken().length == 0) {
			return false;
		};
		var t = new Date().getTime();
		$.log("发送请求" + t + '：' + url + '\n' + $.User.getToken() + '|' + JSON.stringify(cr));
		$.logUI("发送请求" + t + '：' + url + '\n' + $.User.getToken() + '|' + JSON.stringify(cr));
		//			var mui = require('mui');
		mui.ajax({
			url: url,
			type: "post",
			dataType: "json",
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(cr),
			contentType: 'application/json',
			timeout: timeout,
			crossDomain: false,
			success: function(res) {
				$.log('\n发送数据' + t + '：' + url + '\n' + $.User.getToken() + '|' + JSON.stringify(cr, null, '\t') + '\n返回值：\n' + JSON.stringify(res, null, '\t'));
				$.logUI('\n发送数据' + t + '：' + url + '\n' + $.User.getToken() + '|' + JSON.stringify(cr, null, '\t') + '\n返回值：\n' + JSON.stringify(res, null, '\t'));
				(res.Code == 0 && callback(res.Data)) || (res.Code > 0 && (mui.toast(res.Message), !!errorCallBack && errorCallBack())) || (res.Code == -1 && ($.User.clear(), $.Cache.set('gotab', false), $.closeWaiting(), !!errorCallBack && errorCallBack(), $.AutologinWexin())) || (res.Code <= -999 && (mui.toast(res.Message), !!errorCallBack && errorCallBack()));
			},
			error: function(result, textStatus, errorThrown) {
				//				var resStr = '';
				//				if(app.debug) {
				//					for(x in result) {
				//						resStr += x + ' ';
				//					}
				//setRequestHeader onreadystatechange timeout readyState withCredentials upload responseText responseXML responseType response status statusText responseURL open send abort getAllResponseHeaders getResponseHeader overrideMimeType UNSENT OPENED HEADERS_RECEIVED LOADING DONE onloadstart onprogress onabort onerror onload ontimeout onloadend addEventListener removeEventListener dispatchEvent
				var error = '失败::' + ('status:' + result.status + ' statusText:' + result.statusText + ' responseURL:' + result.responseURL + ' response:' +
					result.response) + '|' + textStatus + '|' + errorThrown;
				app.log(error);
				$.logUI(error);
				//				}

				//				isShowWaiting && $.closeWaiting();

				//				if (result.status == 400) {
				//					mui.toast(JSON.parse(result.response).error_description)
				//				} else
				//				if((result.statusText && result.statusText.indexOf("NetworkError") != -1) || result.status == "404") {
				//					//														mui.toast("网路连接失败，请您检查网路!");
				//					mui.toast("连接超时，请稍后重试!");
				//				} else {
				//					//					result.statusText == 'Internal Server Error' || mui.toast("连接超时，请稍后重试!");
				//				}
				if(textStatus == 'abort') {
					mui.toast("请检查网络!");
				} else if(textStatus == 'timeout') {
					mui.toast("连接超时，请稍后重试!");
				}

				!!errorCallBack && errorCallBack(error);
			}
		});
	};
	/**
	 * add by ryan 
	 * 用于缓存图片
	 * @param {Object} v
	 * {
	 * 	key:
	 * 	url:缓存的Url
	 * 	selector:回调
	 * 	reload:true 是否重新加载
	 * 	defValue:图片默认值
	 * }
	 */
	$.setImage = function(v) {
		try {
			var img = document.querySelector(v.selector);
			//				if(!img)
			//					return;
			//				if(win.XMLHttpRequest) {
			if(!v.reload) {
				var cacheData = $.Cache.get(v.key);
				if(cacheData) {
					$.log('本地缓存图片 key:' + v.key + ' data:' + cacheData);
					img.src = cacheData;
					return;
				}
			}
			var xhr = new window.XMLHttpRequest();
			//设置为二进制
			xhr.responseType = 'blob';
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4) {
					if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
						var reader = new FileReader()
						reader.onload = function(e) {
							var dataURL = e.target.result;
							$.Cache.set(v.key, dataURL);
							$.log('下载并缓存 key:' + v.key + ' data:' + dataURL);
							img && (img.src = dataURL);
						};
						//将二进制图片压缩成base64
						reader.readAsDataURL(xhr.response);
					}
				}
			}
			xhr.open("GET", v.url, true);
			xhr.send();
			//				}
		} catch(e) {
			//				$.log(e);
		}
	};
	$.sign = function(m, data) {
		var token = $.User.getToken();
		var cr = {};
		data.sn = $.getSN();
		data.uid = $.User.getUserID();
		if(token == '') {
			token = $.defaultToken;
			$.User.setToken(token);
		}

		// 排序key
		var keyArr = [];
		for(var item in data) {
			keyArr.push(item);
		}
		keyArr.sort(function(a, b) {
			return a.toLowerCase() > b.toLowerCase() ? 1 : -1
		});
		// 生成加密 
		var content = token;
		for(var i = 0; i < keyArr.length; i++) {
			var key = keyArr[i];
			var value = data[key];
			cr[key] = value;
			value != undefined && value != null && value !== '' && (content += key + value)
		}
		var md5 = require('md5');
		cr.sign = md5(content.toLowerCase());

		return cr;
	};

	$.down = function(sFilePath, lFilePath, successCall, isWaiting) {
		isWaiting = isWaiting || false;
		plus.io.resolveLocalFileSystemURL(lFilePath, function(entry) {
			// 可通过entry对象操作test.html文件 
			entry.remove();
		});
		var w = isWaiting && plus.nativeUI.showWaiting("　开始下载...　", {
			//			modal: false
		});
		var dtask = plus.downloader.createDownload(sFilePath, {
			filename: lFilePath,
			timeout: 10,
			retry: 1,
		}, function(d, status) {
			if(status == 200) {
				w && w.close();
				successCall(d);
			} else {
				w && w.close();
			}
		});
		var totalSize = 0;
		var downloadedSize = 0;
		var downStatus = function() {
			var a = downloadedSize / totalSize * 100;
			//					var a = task.downloadedSize;
			w && w.setTitle("　已下载" + parseInt(a) + "%　");
		}
		var fdown;
		dtask.addEventListener("statechanged", function(task, status) {
			switch(task.state) {
				case 1: // 开始
					w && w.setTitle("　开始下载...　");
					break;
				case 2: // 已连接到服务器
					w && w.setTitle("　下载中...　");
					fdown = setInterval(downStatus, 500);
					break;
				case 3:
					totalSize = task.totalSize;
					downloadedSize = task.downloadedSize;

					//					var a = task.downloadedSize / task.totalSize * 100;
					//					var a = task.downloadedSize;
					//					w.setTitle("　　 已下载" + parseInt(a) + "%　　 ");
					break;
				case 4: // 下载完成
					w && w.close();
					$.log('下载成功');
					clearInterval(fdown)
					break;
			}
		});

		dtask.start();
		setTimeout(function() {
			if(dtask.state < 3) {
				w && w.close();
				dtask.abort();
			}
		}, 10000);
	};
	$.iosBridge = function(callback) {
		$.log("ioscall begin");
		if(window.WebViewJavascriptBridge) {
			return callback(WebViewJavascriptBridge);
		}
		if(window.WVJBCallbacks) {
			return window.WVJBCallbacks.push(callback);
		}
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() {
			document.documentElement.removeChild(WVJBIframe)
		}, 0);
		$.log("ioscall end");
	};

})(app);
/**
 * vue.js 扩展
 */
(function() {
	var vue = require('vue');
	vue.filter('f-star', function(v, p) {
		var self = this;
		setTimeout(function() {
			var nodeD = document.querySelector("[data-starid='" + p + "']");
			//		y y-wujiaoxing 	y y-wujiaoxingo y-star-y  y-star-n
			if(nodeD && v) {
				var html = "";
				for(var i = 0; i < 5; i++) {
					if(v >= (i + 1)) {
						html += '<i class="y y-wujiaoxing y-star-y y-star-h" data-index="' + (i + 1) + '"></i>';
					} else if(v > i) {
						html += '<i class="y y-wujiaoxingo y-star-y y-star-h" data-index="' + (i + 1) + '" ></i>';
					} else {
						html += '<i class="y y-wujiaoxing y-star-n y-star-h"  data-index="' + (i + 1) + '"></i>';
					}
				}
				nodeD.innerHTML = html;
			}
		}, 500);
		return '';
	});
	vue.filter('f-img',
		/**
		 * 
		 * @param {String} v 当前路径
		 * @param {Number} w 宽度
		 * @param {Number} h 高度
		 * @param {String} type 处理类型
		 */
		function(v, w, h, type) {
			type = type || 'max';
			if(v) {
				if(v.indexOf('http') == 0 && w) {
					var h = h || w;
					//					var ind = v.toString().lastIndexOf('?');
					//					var ur = v.substring(0, ind);
					switch(type) {
						case 'max':

							break;
					}
					v = !v ? v : v + '?iopcmd=thumbnail&type=8&width=' + w + '&height=' + h;

					//					v = !ur ? v : ur + '?imageView2/1/w/' + w + '/h/' + h
				}
				return {
					backgroundImage: 'url(' + v + ')'
				}
			}
		});
	vue.filter('f-px', function(v) {
		if(v == undefined) {
			return v;
		} else {
			return v.replace(/(\d{1,3})px/g, function(m, p1) {

				return parseFloat(p1) * 1.25 + 'px'
			});
		}
	});

	vue.filter('f-imgUrl', function(v, w, h, dtype) {
		if(v) {
			if(w) {
				var h = h || w;
				v = !v ? v : v + '?iopcmd=thumbnail&type=8&width=' + w + '&height=' + h;
			}
			return v;
		}
		return v;
	});
	vue.filter('f-status', function(v, endTime) {
		var beginTime = new Date(v);
		var endTime = new Date(endTime);
		var t = new Date();
		var s;
		if(t > endTime) {
			s = 'y-gray';
		} else if(t > beginTime && t < endTime) {
			s = 'y-red';
		} else {
			s = 'y-blue';
		}
		return s;
	});
	vue.filter('f-candel', function(v) {
		//		console.log("f-candel   ###################" + v);
		if(v) {
			v = v.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
			v.lastIndexOf('.') > 0 && (v = v.substring(0, v.lastIndexOf('.')));
			var diffValue = new Date() - new Date(v);
			if(diffValue <= 1000 * 60 * 10) { 
				return '';  
			}
		}
		return 'mui-hidden';
	});
	vue.filter('f-time', function(v, format) {
		//modify by ryan 解决传入format解析出来的时间问题
		if(v) {
			v = v.replace('T', ' ').replace('+08:00', '').replace(/-/g, "/");
			v.lastIndexOf('.') > 0 && (v = v.substring(0, v.lastIndexOf('.')));
		}
		if(format) {
			result = !v ? '' : v.Format(format);
		} else {
			//JavaScript函数：
			var minute = 1000 * 60;
			var hour = minute * 60;
			var day = hour * 24;
			var halfamonth = day * 15;
			var month = day * 30;

			var diffValue = new Date() - new Date(v);
			if(diffValue < 0) {   }
			var monthC = diffValue / month;
			var weekC = diffValue / (7 * day);
			var dayC = diffValue / day;
			var hourC = diffValue / hour;
			var minC = diffValue / minute;
			if(diffValue / (day * 365) >= 1) {
				result = v.Format('yyyy-MM-dd');
			} else if(monthC >= 1) { 
				result = parseInt(monthC) + "个月前"; 
			} 
			else if(weekC >= 1) { 
				result = parseInt(weekC) + "周前"; 
			} 
			else if(dayC >= 1) { 
				result = parseInt(dayC) + "天前"; 
			} 
			else if(hourC >= 1) { 
				result = parseInt(hourC) + "小时前"; 
			} 
			else if(minC >= 1) { 
				result = parseInt(minC) + "分钟前"; 
			} else  {
				result = "刚刚";
			}
		}
		return result;

	});

})();