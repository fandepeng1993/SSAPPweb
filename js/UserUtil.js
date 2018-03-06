/**
 * 判断str是否为整数
 * @param str
 * @returns
 */
function isInteger(str) {
	var reg = /^(-){0,1}\d+$/;
	return reg.test(str);
}

/**
 * 根据按钮名称设置权限变量selPri的值。
 * @param menuName
 */
function setSelPriByMenuName(menuName) {
	if (menuName == "查看所有") {
		selPri = 1;
	} else if (menuName == "查看直属下级") {
		if (selPri != 1 && selPri != 3)
			selPri = 2;
	} else if (menuName == "查看所有下级") {
		if (selPri != 1)
			selPri = 3;
	} else if (menuName == "查看自己") {
		if (selPri != 1 && selPri != 2 && selPri != 3)
			selPri = 4;
	}
}

/**
 * 根据按钮名称根据权限变量名称设置其值。
 * @param menuName
 */
function setSelPriByMenuNameAndVar(menuName, varName) {
	if (menuName == "查看所有") {
		eval(varName + "= 1");
	} else if (menuName == "查看直属下级") {
		if (eval(varName) != 1 && eval(varName) != 3)
			eval(varName + "= 2");
	} else if (menuName == "查看所有下级") {
		if (eval(varName) != 1)
			eval(varName + "= 3");
	} else if (menuName == "查看自己") {
		if (eval(varName) != 1 && eval(varName) != 2 && eval(varName) != 3)
			eval(varName + "= 4");
	}
}

/**
 * 字符串处理
 */
function trim(str) { // 删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str) { // 删除左边的空格
	return str.replace(/(^\s*)/g, "");
}
function rtrim(str) { // 删除右边的空格
	return str.replace(/(\s*$)/g, "");
}
/* Array包含函数 */
function contains(arr, str) {
	var i = arr.length;
	while (i--) {
		if (arr[i] === str) {
			return true;
		}
	}
	return false;
}

/**
 * 获取传入日期所在周是一月中的第几周（按周一算）
 */ 
function monthWeek(date_) {
	var firstMonday = new Date(date_.getFullYear(), date_.getMonth(), 1);
	if (firstMonday.getDay() === 0) {
		firstMonday.setDate(2);
	} else if (firstMonday.getDay() === 1) {
		firstMonday.setDate(1);
	} else {
		firstMonday.setDate(9 - firstMonday.getDay());
	}
	var num = Math.floor((date_.getDate() - firstMonday.getDate()) / 7);
	return num + 1;
}

/**
 * 日期类型进行格式化
 */
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1,
		// month
		"d+" : this.getDate(),
		// day
		"h+" : this.getHours(),
		// hour
		"m+" : this.getMinutes(),
		// minute
		"s+" : this.getSeconds(),
		// second
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		// quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format) || /(Y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};
function timestampformat(timestamp) {
	return (new Date(timestamp * 1000)).format("yyyy-MM-dd hh:mm:ss");
}

function TimeUtil() {
};

/**
 * 根据年，月，日获取阴历字符串
 * 
 * @param year
 *            年份
 * @param month
 *            月份
 * @param day
 *            日期
 * @returns {String}
 */
TimeUtil.prototype.getLunarDay = function(year, month, day) {
	var CalendarData = new Array(100);
	var madd = new Array(12);
	var tgString = "甲乙丙丁戊己庚辛壬癸";
	var dzString = "子丑寅卯辰巳午未申酉戌亥";
	var numString = "一二三四五六七八九十";
	var monString = "正二三四五六七八九十冬腊";
	var weekString = "日一二三四五六";
	var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
	var cYear, cMonth, cDay, TheDate;
	CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6,
			0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD,
			0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55,
			0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA,
			0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95,
			0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26,
			0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D,
			0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497,
			0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F,
			0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D,
			0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B,
			0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5,
			0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
	madd[0] = 0;
	madd[1] = 31;
	madd[2] = 59;
	madd[3] = 90;
	madd[4] = 120;
	madd[5] = 151;
	madd[6] = 181;
	madd[7] = 212;
	madd[8] = 243;
	madd[9] = 273;
	madd[10] = 304;
	madd[11] = 334;
	function GetBit(m, n) {
		return (m >> n) & 1;
	}

	function GetcDateString() {
		var tmp = "";
		tmp += tgString.charAt((cYear - 4) % 10);
		tmp += dzString.charAt((cYear - 4) % 12);
		tmp += "年 ";
		if (cMonth < 1) {
			tmp += "(闰)";
			tmp += monString.charAt(-cMonth - 1);
		} else {
			tmp += monString.charAt(cMonth - 1);
		}
		tmp += "月";
		tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿"
				: "三十"));
		if (cDay % 10 != 0 || cDay == 10) {
			tmp += numString.charAt((cDay - 1) % 10);
		}
		return tmp;
	}

	function e2c() {
		TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0],
				arguments[1], arguments[2]);
		var total, m, n, k;
		var isEnd = false;
		var tmp = TheDate.getFullYear();
		total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4)
				+ madd[TheDate.getMonth()] + TheDate.getDate() - 38;
		if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
			total++;
		}
		for (m = 0;; m++) {
			k = (CalendarData[m] < 0xfff) ? 11 : 12;
			for (n = k; n >= 0; n--) {
				if (total <= 29 + GetBit(CalendarData[m], n)) {
					isEnd = true;
					break;
				}
				total = total - 29 - GetBit(CalendarData[m], n);
			}
			if (isEnd)
				break;
		}
		cYear = 1921 + m;
		cMonth = k - n + 1;
		cDay = total;
		if (k == 12) {
			if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
				cMonth = 1 - cMonth;
			}
			if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
				cMonth--;
			}
		}
	}

	function GetLunarDay(solarYear, solarMonth, solarDay) {
		solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
		e2c(solarYear, solarMonth, solarDay);
		return GetcDateString();
	}
	return GetLunarDay(year, month, day);
}

/**
 * 获取传入日期所在周是一月中的第几周（按周一算）
 */
TimeUtil.prototype.monthWeek = function(date_) {
	var firstMonday = new Date(date_.getFullYear(), date_.getMonth(), 1);
	if (firstMonday.getDay() === 0) {
		firstMonday.setDate(2);
	} else if (firstMonday.getDay() === 1) {
		firstMonday.setDate(1);
	} else {
		firstMonday.setDate(9 - firstMonday.getDay());
	}
	var num = Math.floor((date_.getDate() - firstMonday.getDate()) / 7);
	return num + 1;
}

/* 表单序列化函数 */
/**
 * 功能：序列化form表单元素 1.同名的name属性，值会被序列化为数组，例如checkbox等控件
 * 2.可以嵌套对象，name和value会被序列化为嵌套的json对象格式 3.可以嵌套对象列表，name和value会被序列化成嵌套的json数组对象
 */
$.fn.serializeNestedObject = function() {
	var formObj = $(this);
//	console.log(formObj);
	/**
	 * 功能：判断key在Json结构中是否存在 存在，返回true; 否则，返回false.
	 */
	function existKeyInJSON(key, json) {
		if (key == null || key == '' || $.isEmptyObject(json)) {
			return false;
		}
		var exist = false;
		for ( var k in json) {
			if (key === k) {
				exist = true;
			}
		}
		return exist;
	}

	/**
	 * 根据自定义表单自动生成json提交字符串
	 */
	var getFormValuesByCustomForm = function() {
		var arr = {};
		var inputs = formObj.find("input");
		var selects = formObj.find("select");
		var textareas = formObj.find("textarea");
		// input类型
		$.each(inputs,
				function(index, item) {
					var type = $(item).attr("type");
					var name = $(item).attr("name");
					var value = "";
					switch (type) {
					case "datetime":
						// 对应日期时间类型生成json对应属性
						$.each(formObj.find("input[type='" + type + "'][name='" + name
								+ "']"), function(datetimeIndex, datetimeItem) {
							if (datetimeIndex == 0) {
								value = $(datetimeItem).val();
							} else {
								value = value + " " + $(datetimeItem).val();
							}
						})
						arr[name] = value;
						break;
					case "radio":
						// 对应radio类型生成json对应属性
						arr[name] = formObj.find(
								"input[type='radio'][name='" + name
										+ "']:checked").val();
						break;
					case "checkbox":
						// 对应checkbox类型生成json对应属性
						var checkboxArr = [];
						$.each(formObj.find("input[type='checkbox'][name='" + name
								+ "']:checked"), function(checkboxIndex,
								checkboxItem) {
							checkboxArr.push($(checkboxItem).val());
						});
						arr[name] = checkboxArr;
						break;
					default:
						// 默认生成json对应属性
						arr[name] = formObj.find(
								"input[type='" + type + "'][name='" + name
										+ "']").val();
						break;
					}
				});
		// select类型
		$.each(selects, function(index, item) {
			var type = $(item).attr("type");
			var name = $(item).attr("name");
			var value = "";
			switch (type) {
			default:
				// 默认select生成json对应属性
				if (typeof (type) != "undefined" && type != null && type != "")
					arr[name] = formObj.find(
							"select[type='" + type + "'][name='" + name + "']")
							.val();
				else
					arr[name] = formObj.find("select[name='" + name + "']").val();
				break;
			}
		});
		// textarea类型
		$.each(textareas, function(index, item) {
			var type = $(item).attr("type");
			var name = $(item).attr("name");
			var value = "";
			switch (type) {
			default:
				// 默认textarea生成json对应属性
				if (typeof (type) != "undefined" && type != null && type != "")
					arr[name] = formObj.find(
							"textarea[type='" + type + "'][name='" + name
									+ "']").val();
				else
					arr[name] = formObj.find("textarea[name='" + name + "']").val();
				break;
			}
		});

		var resultObj = {};
		// 统一过滤一遍嵌套属性
		for ( var key in arr) {
			// 有嵌套的属性，用'.'分隔的
			if (key.indexOf('.') > -1) {
				var pos = key.indexOf('.');
				var objKey = key.substring(0, pos);
				// 判断此key是否已存在resultObj数据中，不存在则新建一个对象出来
				if (!existKeyInJSON(objKey, resultObj)) {
					resultObj[objKey] = {};
				}
				var subKey = key.substring(pos + 1);
				if (typeof (arr[key]) == "string") {
					resultObj[objKey][subKey] = trim(arr[key]) || '';
				} else {
					resultObj[objKey][subKey] = '';
				}
			}
			// 普通属性
			else {
				if (typeof (arr[key]) == "string") {
					resultObj[key] = trim(arr[key]) || '';
				} else if (key != "undefined") {
					resultObj[key] = arr[key];
				}
			}
		}

		// console.log(resultObj);
		return resultObj;
	}

	var _this = this;
	/**
	 * 原生成表单json
	 */
	var getFormValues = function() {
		var json = {};
		var arrObj = _this.serializeArray();
		$.each(arrObj, function() {
			// 对重复的name属性，会将对应的众多值存储成json数组
			if (json[this.name]) {
				if (!json[this.name].push) {
					json[this.name] = [ json[this.name] ];
				}
				json[this.name].push(this.value || '');
			} else {
				// 有嵌套的属性，用'.'分隔的
				if (this.name.indexOf('.') > -1) {
					var pos = this.name.indexOf('.');
					var key = this.name.substring(0, pos);
					// 判断此key是否已存在json数据中，不存在则新建一个对象出来
					if (!existKeyInJSON(key, json)) {
						json[key] = {};
					}
					var subKey = this.name.substring(pos + 1);
					json[key][subKey] = this.value || '';
				}
				// 普通属性
				else {
					json[this.name] = this.value || '';
				}

			}
		});

		// 处理那些值应该属于数组的元素，即带'[number]'的key-value对
		var resultJson = {};
		for ( var key in json) {
			// 数组元素
			if (key.indexOf('[') > -1) {
				var pos = key.indexOf('[');
				var realKey = key.substring(0, pos);
				// 判断此key是否已存在json数据中，不存在则新建一个数组出来
				if (!existKeyInJSON(realKey, resultJson)) {
					resultJson[realKey] = [];
				}
				resultJson[realKey].push(json[key]);

			} else { // 单元素
				resultJson[key] = json[key];
			}
		}
		return resultJson;
	}

	// return getFormValues();
	return getFormValuesByCustomForm();
};

/* Request获取传参 */
var Request = new Object();
Request = GetRequest();
function GetRequest() {
	var url = decodeURI(location.search); // 获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}

	return theRequest;
}

function gaodeMap() {
};

/**
 * 在地图上添加标记
 */
gaodeMap.prototype.addMarker = function(map, lnglatXY, content) {
	var marker;
	var infoWindow = new AMap.InfoWindow({
		offset : new AMap.Pixel(10, -30)
	});
	var addMarkerInMap = function(lnglatXY, content) {
		marker = new AMap.Marker({ // 加点
			map : map,
			position : lnglatXY,
			// icon: "http://webapi.amap.com/images/0.png"
			icon : new AMap.Icon({
				size : new AMap.Size(40, 50), // 图标大小
				image : "../images/map.png"
			})
		});
		marker.setMap(_map); // 在地图上添加点
		// _map.setFitView();
		marker.content = content;
		marker.on('click', markerClick);
		marker.emit('click', {
			target : marker
		});
	};

	var markerClick = function(e) {
		infoWindow.setContent(e.target.content);
		infoWindow.open(_map, e.target.getPosition());
	};
	addMarkerInMap(lnglatXY, content);
}

/**
 * 调用地理编码服务
 * @param map 地图
 * @param address 地址
 */
gaodeMap.prototype.getLocation = function(map, address) {

	// 调用地理编码服务
	AMap.plugin('AMap.Geocoder', function() {
		var geocoder = new AMap.Geocoder({});
		var marker = new AMap.Marker({
			map : map,
			bubble : true
		})
		var infoWindow = new AMap.InfoWindow({
			offset : new AMap.Pixel(10, -30)
		});
		var markerClick = function(e) {
			infoWindow.setContent(e.target.content);
			infoWindow.open(map, e.target.getPosition());
		};
		geocoder.getLocation(address, function(status, result) {
			// alert(JSON.stringify(result.geocodes[0].location));
			if (status == 'complete' && result.geocodes.length) {
				// var center = [result.geocodes[0].location.lng,
				// result.geocodes[0].location.lat];
				marker.setPosition(result.geocodes[0].location);
				marker.content = address;
				marker.on('click', markerClick);
				map.setCenter(marker.getPosition());

				infoWindow.setContent(address);
				infoWindow.open(map, marker.getPosition());
			} else {
				alert('获取位置失败');
			}
		})
	});
}

/**
 * 调用逆地理编码服务
 * @param map 地图
 * @param center 中心坐标
 * @param callBackFun 回调函数
 */
gaodeMap.prototype.getAddress = function(map, center, callBackFun) {
	// 调用逆地理编码服务
	map.plugin('AMap.Geolocation', function() {
		var geocoder = new AMap.Geocoder({
			radius : 1000,
			extensions : "all"
		});
		geocoder.getAddress(center, function(status, result) {
			if (status === 'complete' && result.info === 'OK') {
				callBackFun(result);
			}
		});
	});
}

/**
 * 搜索POI搜索服务
 * @param cpoint 中心点
 * @param type 搜索类别
 * @param callBackFun 回调函数
 */
gaodeMap.prototype.placeSearch = function(cpoint, type, callBackFun) {
	// 搜索周边公司企业
	AMap.service([ "AMap.PlaceSearch" ], function() {
		var placeSearch = new AMap.PlaceSearch({ // 构造地点查询类
			type : type
		});

		// var cpoint = [121.24532, 31.36288]; //中心点坐标
		placeSearch.searchNearBy('', cpoint, 1000, function(status, result) {
			if (status === 'complete' && result.info === 'OK') {
				callBackFun(result);
			}
		});
	});
}

function cookie() {};
cookie.prototype.getCookie = function(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

cookie.prototype.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value)
			+ ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

cookie.prototype.checkCookie = function() {
	username = getCookie('username')
	if (username != null && username != "") {
		alert('Welcome again ' + username + '!')
	} else {
		username = prompt('Please enter your name:', "")
		if (username != null && username != "") {
			setCookie('username', username, 365)
		}
	}
}
