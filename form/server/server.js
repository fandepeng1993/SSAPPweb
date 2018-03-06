/**
 * Created by Administrator on 2017/6/19.
 */
//自定义服务
angular.module('serve',[])
    .service('CommonDataService', ['$http', '$q', function ($http, $q) {
        return {
            //根据方法名和参数列表获取数据
            getData: function (url) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url:url
                }).then(function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
        }
    }])
    .service('customFormService', ['$http', '$q', function ($http, $q) {
        return {
            //根据方法名和参数列表获取数据
        	initCheckBoxAndRadio: function () {
        		//填充radio和checkbox
    			var radioArr = $("input[type='radio']");
    			var checkboxArr = $("input[type='checkbox']");
    			var valueMap = {};
    			var checkboxMap = {};
    			$.each(radioArr, function(index, item) {
    				valueMap[$(item).attr("name")] = $("input[type='radio'][name='" + $(item).attr("name") + "']").val();
    			});
    			$.each(checkboxArr, function(index, item) {
    				checkboxMap[$(item).attr("name")] = $("input[type='checkbox'][name='" + $(item).attr("name") + "']").val();
    			});
    			if(radioArr.length > 0) {
    				radioArr.iCheck({
    					radioClass: 'iradio_square-green',
    					increaseArea: '20%'
    				});
    			}
    			if(checkboxArr.length > 0) {
    				checkboxArr.iCheck({
    					checkboxClass: 'icheckbox_square-green',  //icheckbox_square-green/icheckbox_minimal-green/icheckbox_flat-green/icheckbox_polaris/icheckbox_futurico
    					increaseArea: '20%'
    				});
    			}
    			for(var key in valueMap) {
    				if(key == "undefined") $("input[name='" + key + "'][value='" + valueMap[key] + "']").iCheck('check');
    			}
    			for(var key in checkboxMap) {
    				if(key == "undefined") $("input[name='" + key + "'][value='" + valueMap[key] + "']").iCheck('check');
    			}
            },
            initConstructObj: function (elements, constructObj) {
            	//获取最大列数
				$.each(elements, function (index, item) {
					//对属性未设的元素，进行默认属性设置
					item.icon = (item.icon == "" || item.icon == null) ? item.icon : "";
					item.minSizeX = item.minSizeX != 0 ? item.minSizeX : 1;
					item.minSizeY = item.minSizeY != 0 ? item.minSizeY : 1;
					if(item.sizeX == 0 && item.sizeY == 0 && item.row == 0 && item.col == 0) {
						item.sizeX = item.sizeX != 0 ? item.sizeX : 1;
						item.sizeY = item.sizeY != 0 ? item.sizeY : 1;
						item.row = item.row != 0 ? item.row : item.elementIndex-1;
						item.col = item.col != 0 ? item.col : 0;
					}
					if(item.options != "") {
						item.options = angular.fromJson(item.options);
					}
					if(item.event != "") {
						item.event = angular.fromJson(item.event);
					}
					if((item.col + item.sizeX) > constructObj.maxColNum) {
						constructObj.maxColNum = item.col + item.sizeX;
					}
					if((item.row + item.sizeY) > constructObj.maxRowNum) {
						constructObj.maxRowNum = item.row + item.sizeY;
					}
					
				});
            }
        }
    }])
    .filter('unique', function() {
	   return function(collection, keyname) {
	      var output = [], 
	          keys = [];
	
	      angular.forEach(collection, function(item) {
	          var key = item[keyname];
	          if(keys.indexOf(key) === -1) {
	              keys.push(key);
	              output.push(item);
	          }
	      });
	
	      return output;
	   };
	})
    .filter('UpabC', function() { //可以注入依赖
        return function(input) {
            return String.fromCharCode(input+65);
        }
    })
    .filter('isInArray',function(){
        return function (input,a){
            return a.indexOf(input)!=-1?true:false;
        }
    })
    .filter('timeDifference',function(){
        return function (input,a){
            if(a=='day'){
                return input>=0?(input/ 1000 / 60 / 60 / 24).toFixed(1):0;
            }
            else {
                return input>=0?(input/ 1000 / 60 / 60 ).toFixed(1):0;
            }

        }
    })
    .filter('changeMoney',function(){
    return function (money,a){
        var cnNums = new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖"); //汉字的数字
        var cnIntRadice = new Array("","拾","佰","仟"); //基本单位
        var cnIntUnits = new Array("","万","亿","兆"); //对应整数部分扩展单位
        var cnDecUnits = new Array("角","分","毫","厘"); //对应小数部分单位
        //var cnInteger = "整"; //整数金额时后面跟的字符
        var cnIntLast = "元"; //整型完以后的单位
        var maxNum = 999999999999999.9999; //最大处理的数字

        var IntegerNum; //金额整数部分
        var DecimalNum; //金额小数部分
        var ChineseStr=""; //输出的中文金额字符串
        var parts; //分离金额后用的数组，预定义
        if( money == "" ){
            return "";
        }
        money = parseFloat(money);
        if( money >= maxNum ){
            $.alert('超出最大处理数字');
            return "";
        }
        if( money == 0 ){
            ChineseStr = cnNums[0]+cnIntLast;
            return ChineseStr;
        }
        money = money.toString(); //转换为字符串
        if( money.indexOf(".") == -1 ){
            IntegerNum = money;
            DecimalNum = '';
        }else{
            parts = money.split(".");
            IntegerNum = parts[0];
            DecimalNum = parts[1].substr(0,4);
        }
        if( parseInt(IntegerNum,10) > 0 ){//获取整型部分转换
            zeroCount = 0;
            IntLen = IntegerNum.length;
            for( i=0;i<IntLen;i++ ){
                n = IntegerNum.substr(i,1);
                p = IntLen - i - 1;
                q = p / 4;
                m = p % 4;
                if( n == "0" ){
                    zeroCount++;
                }else{
                    if( zeroCount > 0 ){
                        ChineseStr += cnNums[0];
                    }
                    zeroCount = 0; //归零
                    ChineseStr += cnNums[parseInt(n)]+cnIntRadice[m];
                }
                if( m==0 && zeroCount<4 ){
                    ChineseStr += cnIntUnits[q];
                }
            }
            ChineseStr += cnIntLast;
            //整型部分处理完毕
        }
        if( DecimalNum!= '' ){//小数部分
            decLen = DecimalNum.length;
            for( i=0; i<decLen; i++ ){
                n = DecimalNum.substr(i,1);
                if( n != '0' ){
                    ChineseStr += cnNums[Number(n)]+cnDecUnits[i];
                }
            }
        }
        if( ChineseStr == '' ){
            ChineseStr += cnNums[0]+cnIntLast;
        }
        return ChineseStr;

    }
});