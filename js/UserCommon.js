function UserCommon() {};

/**
 * 用于验证表单数据是否填写完毕的方法。
 * @param elemtId 弹出层id
 * @param formObj 元素jquery对象，会检查这个元素下的所有表单元素。
 * @param msg 错误信息
 * @returns {Boolean} 验证表单填写成功与否。
 */
UserCommon.prototype.show = function(elemtId, formObj, msg) {
	if(circleArray("input", msg) == true) {
		if(circleArray("textarea", msg) == true) {
			if(circleArray("radio", msg) == true) {
				if(circleArray("select", msg) == true) {
					return circleArray("script", msg);
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
	
	
	/**
	 * 循环不同类的输入元素,tagName：要检查的标签名
	 * 返回值：若为true,表示表单都填写完成了。false,则表示有输入框未填写
	 */
	function circleArray(tagName, msg) {
		for(var i=0; i<formObj.find(tagName).length; i++) {
			var obj = formObj.find(tagName + ":eq(" + i + ")");
			if(tagName == "select") {
				if(obj.attr("type") != "hidden" && (obj.val() == -1 || obj.val() == null) && obj.attr("isEmpty") != "true") {
					showPopup(obj, msg);
					return false;
				}
			} 
			if(obj.attr("type") != "hidden" && obj.attr("type") != "button" && obj.val() == "" && obj.attr("isEmpty") != "true") {
				showPopup(obj, msg);
				return false;
			}
			if(obj.attr("type") == "tel" && obj.val()!="") {
				if(!isTelephone(obj.val())) {
					showPopup(obj, msg);
					return false;
				}
			}
			if(obj.attr("type") == "email" && obj.val()!="") {
				if(!isEmail(obj.val()) && obj.val() != "") {
					showPopup(obj, msg);
					return false;
				}
			}
			//if(inputArray[i].value == )
		}
		return true;
	}
	
	/**
	 * 对单个元素对象执行弹出框弹出
	 */
	function showPopup(obj, msg) {
		$('#' + elemtId).find("span:eq(1)").text(obj.attr("label") + obj.attr("errorMsg"));
		$('#' + elemtId).show().css({
			  top:obj.offset().top+obj.height()+12,
			  left:obj.offset().left,
			  position:'absolute'
			  });
		setTimeout(function (){
			$('#' + elemtId).hide();
			$('#' + elemtId).find("span:eq(1)").text("");
			obj.focus();
		}, 1000);
	}
}

/**
 * 成功提交后的弹出框
 * @param elemtId 弹出元素Id
 * @param msg 弹出消息
 * @param url 跳转url
 * @param category 弹出类别（success,fail,warning）
 * @param millis 弹出层显示毫秒数
 */
UserCommon.prototype.check = function(elemtId, msg, url, category, millis) { 
	$("#" + elemtId).find("span:eq(0)").text(msg);
	$("#" + elemtId).children("div:eq(0)").removeClass();
	if(category == "success") {
		$("#" + elemtId).children("div:eq(0)").addClass("alert alert-success alert-dismissable");
	} else if(category == "fail") {
		$("#" + elemtId).children("div:eq(0)").addClass("alert alert-danger alert-dismissable");
	} else if(category == "warning") {
		$("#" + elemtId).children("div:eq(0)").addClass("alert alert-warning alert-dismissable");
	}
	$("#" + elemtId).show();
	setTimeout(function (){
		$('#' + elemtId).hide();
		if(url != null) {
			window.location.href = url;
		}
	}, millis ? millis : 1000);
}

/**
 * 为数组对象添加一个方法contains，可用来判断数组是否包含某元素
 */
Array.prototype.contains = function (elem) {   
	 for (var i = 0; i < this.length; i++) {       
	      if (this[i] == elem) {              
	       return true;           
	     }      
	 }     
	 return false; 
}

/**
 * 判断是否是电话号码
 */
function isTelephone(str) {
   var re = /^1[3|4|5|7|8][0-9]\d{8}$/;
   if (re.test(str)) {
       return true;
   } else {
	   return false;
   }
}

/**
 * 判断是否是email
 */
function isEmail(str){
   var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
   if (re.test(str)) {
       return true;
   } else {
	   return false;
   }
}

/**
 * 	弹出层，固定宽度和高度。
 * @param title 弹出层标题
 * @param url 请求的url
 * @param w 弹出层宽度（缺省调默认值）
 * @param h 弹出层高度（缺省调默认值）
 */
UserCommon.prototype.layer_showBySize = function(title, url, w, h) {
    if (title == null || title == '') {
        title = false;
    };
    if (url == null || url == '') {
        url = "404.html";
    };
    if (w == null || w == '') {
        w = 800;
    };
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    };
    layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false,
        //不固定
        maxmin: true,
        shade: 0.4,
        title: title,
        content: url
    });
}

/**
 * 弹出层，弹出后调用相关方法实现高度自适应。
 * @param title 弹出层标题
 * @param url 请求的url
 * @param w 宽度
 * @param hideContent 是否要隐藏content，可为null，oa流程部分个别页面输入true
 */
UserCommon.prototype.layer_show = function(title, url, w, hideContent) {
	h = 0;
    layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false,
        //不固定
        maxmin: true,
        shade: 0.4,
        title: title,
        content: url
    });
    $(".layui-layer-shade").last().hide();
	$(".layui-layer-title").last().hide();
	if(hideContent) $(".layui-layer-content").last().hide();
	$(".layui-layer-setwin").last().hide();
}

/**
 * 关闭弹出框
 */
UserCommon.prototype.layer_close = function() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

/**
 * 获取iframe的大小信息的数据对象。
 * @param documentObj document对象
 */
function getIframeSize(documentObj) {
	var json = {};
	var iframes = $("iframe", documentObj);
	$.each(iframes, function (index, item) {
		if($(item).is(':visible')) {
			json.height = $(item).height();
			json.width = $(item).width();
		}
	});
	return json;
}

//当前iframe的大小信息json
var iframeJson = getIframeSize(parent.document);
//父级页面的iframe大小信息json
var pp_iframeJson = getIframeSize(parent.parent.document);

/**
 * 自适应弹出层的高度。
 * @param hasCalendar 是否有日历
 * @param showContent 是否显示content
 */
function initLayerSize(hasCalendar, showContent) {
	if($("#createSubmitForm").length>0) {
		//说明此页面有自动化表单构造
		var width = $("html", parent.document).width();
		var formWidth = $("#createSubmitForm").width();
		var left;
		if(formWidth < (width-100)) {
			//如果小于	父页面宽度-100px
			$(".layui-layer", parent.document).last().css("width", formWidth);
			$(".layui-layer", parent.document).last().css("left", ((width-100)-formWidth)/2);
		} else {
			//如果大于	父页面宽度-100px，就设为  父页面宽度-100px
			$(".layui-layer", parent.document).last().css("width", width-100);
			$(".layui-layer", parent.document).last().css("left", 50);
		}
	}
	
	var height = $(document).height();
	if(hasCalendar && height<202) {
		height = 202;
	}
	if($("#createSubmitForm").length>0) {
		height += 50;
	}
	
	var parentHtmlHeight = pp_iframeJson.height;
	if(parentHtmlHeight == 0) {
		parentHtmlHeight = $("html", parent.document).height();
	}
	if(parentHtmlHeight == 0) {
		parentHtmlHeight = $("body div:eq(0)", parent.document).height();
	}
	if((height + 57) >= parentHtmlHeight) {
		$("iframe", parent.document).last().css("height", parentHtmlHeight- 62);
		$(".layui-layer", parent.document).last().css("height", parentHtmlHeight-20);
		$(".layui-layer", parent.document).last().css("top", 10);
	} else {
		$("iframe", parent.document).last().css("height", height + 15);
		$(".layui-layer", parent.document).last().css("height", height + 57);
		$(".layui-layer", parent.document).last().css("top", (parentHtmlHeight-(height + 57))/2);
	}
	$(".layui-layer-shade", parent.document).last().show();
	$(".layui-layer-title", parent.document).last().show();
	if(showContent) $(".layui-layer-content", parent.document).last().show();
	$(".layui-layer-setwin", parent.document).last().show();
}


/**
 * 用于填充表单table
 * @param tbodyId table表单的要添加内容的tbody标签的id
 * @param item 单个json数据项
 * @param index 该单个json数据项的下标值
 */
UserCommon.prototype.fillTable = function(tbodyId,item,index) {
	//定义TableUtil工具类
	function TableUtil(tbodyId,item,index) { 
		var _this = this;
		//添加相关属性
		this.tbodyId = tbodyId;
		this.item = item;
		this.index = index;
		this.thArray = null;
		//添加init方法
		this.init = function() {
			var thArray = new Array();
			//首先添加tr的fieldType和fieldName
			var trObj = new Object();
			
			var trForTh = $("#" + this.tbodyId).prev().find("tr:eq(0)");
			if(trForTh.children("th").length == 0) {
				trForTh = $("#" + this.tbodyId).prev().find("tr:eq(1)");
			}
			trObj.fieldType = trForTh.attr("fieldType");
			trObj.fieldName = trForTh.attr("fieldName");
			/*trObj.fieldType = $("#" + this.tbodyId).prev().find("tr:eq(0)").attr("fieldType");
			trObj.fieldName = $("#" + this.tbodyId).prev().find("tr:eq(0)").attr("fieldName");*/
			thArray.push(trObj);
			//再添加th的fieldType和fieldName
			var theads = trForTh.find("th");
			/*var theads = $("#" + this.tbodyId).prev().find("tr:eq(0)").find("th");*/
			theads.each(function (thIndex,element){
				var obj = new Object();
				obj.fieldType = $(element).attr("fieldType");
				obj.fieldName = $(element).attr("fieldName");
				thArray.push(obj);
			});
			//给类的thArray属性赋值
			this.thArray = thArray;
		};
		//表格各栏
		this.title = "";
		//添加init方法
		this.initByJqGrid = function() {
			var thArray = new Array();
			var thTitle = new Array();
			//首先添加tr的fieldType和fieldName
			var trObj = new Object();
			trObj.fieldType = $("#" + this.tbodyId).prev().find("tr:eq(0)").attr("fieldType");
			trObj.fieldName = $("#" + this.tbodyId).prev().find("tr:eq(0)").attr("fieldName");
			thArray.push(trObj);
			
			//再添加th的fieldType和fieldName
			var theads = $("#" + this.tbodyId).prev().find("tr:eq(0)").find("th");
			theads.each(function (thIndex, element){
				var obj = new Object();
				obj.fieldType = $(element).attr("fieldType");
				obj.fieldName = $(element).attr("fieldName");
				obj.fieldText = $(element).text();
				thArray.push(obj);
				thTitle.push(obj.fieldText);
			});
			//给类的thArray属性赋值
			this.thArray = thArray;
			title = thTitle;
			
			/*去掉空的数组数值*/
		    /*for(var i = 0; i < title.length; i++) {
		        if(title[i].length == 0) title.splice(i,1);
		    }*/
		    /*给标题赋值*/
		    this.title = title;
		    /*添加查看按钮*/
/*			$.each(tableDate, function(index, item) {
				item.content = "<a class=\"btn btn-xs btn-info\" onclick=\"fillDetail(" + item.id + ")\"><span class=\"glyphicon glyphicon-search\"></span> 查看</a>";
				动态赋值行数
				item["trNum"] = tableDate.length - index;
				
			});*/
		    /* 填充表格*/
		    //new UserCommon().jqGrid("table_list_1", this.title, tableDate);
			
		    /*获取打勾的行*/
/*			var trL = $("#table_list_1 tr");
			for(var i = 0; i<trL.length; i++){
					trL.eq(i).on("click", function(){
						setTimeout(function () {
						trLength = $("#table_list_1").find(".success").length;
			    }, 50)});
			}*/
			
		    /*自适应屏幕height*/
		 /*   var height = $("body").parent().parent().height() - 115;
			$(".ui-jqgrid-bdiv").css("height", height);*/
		};
		
		//添加fillTable方法,根据赋值好的thArray动态填充table
		this.fillTable = function() {
			var str = "";
			$.each(this.thArray, function(thIndex,thObj){
				if(thIndex == 0) {
					//构建tr
					//如果是需要控制全选checkbox的的类型
					if(thObj.fieldType == "controlCB") {
						if(_this.index%2 == 0) {
							str = str + "<tr class=\"light checkboxTr\" style=\"font-size:12px;\" id=\"Tr" + eval("_this.item." + thObj.fieldName) + "\" onclick=\"fillThisCB('" + eval("_this.item." + thObj.fieldName) + "')\">";
						} else {
							str = str + "<tr class=\"active checkboxTr\" style=\"font-size:12px;\" id=\"Tr" + eval("_this.item." + thObj.fieldName) + "\" onclick=\"fillThisCB('" + eval("_this.item." + thObj.fieldName) + "')\">";
						}
					} else if(thObj.fieldType == "controlSellGoal") {
						str = str + "<tr class=\"leiqiu\" id=\"" + eval("_this.item." + thObj.fieldName) + "\">";
					} else if(thObj.fieldType == "radioTable") {
						if(_this.index%2 == 0) {
							str = str + "<tr class=\"light checkboxTr\" style=\"font-size:12px;\" id=\"Tr" + eval("_this.item." + thObj.fieldName) + "\" )\">";
						} else {
							str = str + "<tr class=\"active checkboxTr\" style=\"font-size:12px;\" id=\"Tr" + eval("_this.item." + thObj.fieldName) + "\" )\">";
						}
					} else {
						if(_this.index%2 == 0) {
							str = str + "<tr class=\"light checkboxTr\" style=\"font-size:12px;\">";
						} else {
							str = str + "<tr class=\"active checkboxTr\" style=\"font-size:12px;\">";
						}
					}
				} else {
					var itemFieldValue = "";
					if(thObj.fieldName && eval("_this.item." + thObj.fieldName.split(".")[0]) != null) {
						itemFieldValue = eval("_this.item." + thObj.fieldName);
					}
					//构建tr里的td
					if(thObj.fieldType == "checkbox") {
						str = str + "<td><input type=\"checkbox\" name=\"selectFlag\" id=\"CB" + itemFieldValue + "\" value=" + itemFieldValue + " onclick=\"fillThisCB('" + itemFieldValue + "')\" class=\"check\"></td>";

					} else if(thObj.fieldType == "roleUserCB") {
						if(typeof(_this.item.roleIds) == "string" && _this.item.roleIds.split(",").indexOf(roleId) != -1) {
							str = str + "<td></td>";
						} else {
							str = str + "<td><input type=\"checkbox\" name=\"selectFlag\" id=\"CB" + itemFieldValue + "\" value=" + itemFieldValue + " onclick=\"fillThisCB('" + itemFieldValue + "')\" class=\"check\"></td>";
						}
					} else if(thObj.fieldType == "num") {
						str = str + "<td title='" + (_this.index+1) + "'>" + (_this.index+1) + "</td>";
					} else if(thObj.fieldType == "text") {
						if(eval("_this.item." + thObj.fieldName.split(".")[0]) != null) {
							str = str + "<td title='" + itemFieldValue + "'>" + itemFieldValue + "</td>";
						} else {
							str = str + "<td></td>";
						}
					} else if(thObj.fieldType == "datetime") {
						if(typeof(itemFieldValue) == "string") {
							str = str + "<td title='" + itemFieldValue.substring(0, 19) + "'>" + itemFieldValue.substring(0, 19) + "</td>";
						} else {
							str = str + "<td></td>";
						}
					} else if(thObj.fieldType == "datetimeForMillis") {
						itemFieldValue = new Date(itemFieldValue).format("yyyy-MM-dd hh:mm:ss");
						str = str + "<td title='" + itemFieldValue + "'>" + itemFieldValue + "</td>";
					} else if(thObj.fieldType == "date") {
						str = str + "<td title='" + itemFieldValue.substring(0, 10) + "'>" + itemFieldValue.substring(0, 10) + "</td>";
					} else if(thObj.fieldType == "month") {
						str = str + "<td title='" + itemFieldValue.substring(0, 7) + "'>" + itemFieldValue.substring(0, 7) + "</td>";
					} else if(thObj.fieldType == "monthWeek") {
						var fieldValue = itemFieldValue;
						var fieldArr = fieldValue.split("|");
						itemFieldValue = fieldArr[0] + "年" + fieldArr[1] + "月第" + fieldArr[2] + "周";
						str = str + "<td title='" + itemFieldValue + "'>" + itemFieldValue + "</td>";
					} else if(thObj.fieldType == "detailInfo") {
						str = str + "<td><button name=\"add-g2\" class=\"btn btn-xs\" onclick=\"fillDetail(" + itemFieldValue + ")\">查看</button></td>"; 
					} else if(thObj.fieldType == "detailInfoContent") {
						str = str + "<td><button name=\"add-g2\" class=\"btn btn-xs\" onclick=\"fillDetail('" + itemFieldValue + "')\">查看</button></td>"; 
					}  else if(thObj.fieldType == "followInfo") {
						str = str + "<td><button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"fillDetail(" + itemFieldValue + ")\">查看</button>" +
						"<button name=\"add-g1\" class=\"btn btn-xs\"  onclick=\"fillPfollow(" + itemFieldValue + ")\">跟进</button></td>"; 
					} else if(thObj.fieldType == "chanRecoInfo") {
						str = str + "<td><button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"fillDetail(" + itemFieldValue + ")\">查看</button>" +
						"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"fillChanReco(" + itemFieldValue + ")\">跟进</button></td>"; 
					} else if(thObj.fieldType == "visitRecord") {
						str = str + "<td><button  class=\"btn btn-xs\" onclick=\"fillVisitRecord(" + itemFieldValue + ")\">回访</button></td>"; 
					} else if(thObj.fieldType == "busTripReport") {
						str = str + "<td><button  class=\"btn btn-xs\" onclick=\"fillBusTripReport(" + itemFieldValue + ")\">出差报告</button></td>"; 
					} else if(thObj.fieldType == "visitStatus") {
						if(itemFieldValue == 1) {
							str = str + "<td title='已回访'>已回访</td>";
						} else {
							str = str + "<td title='未回访'>未回访</td>";
						}
					} else if(thObj.fieldType == "sellGoal") {
						if(eval("_this.item." + thObj.fieldName.split(".")[0]) != null) {
							str = str + "<td month=\"" + thObj.fieldName + "\" title='" + itemFieldValue + "'>" + itemFieldValue + "</td>";
						} else {
							str = str + "<td month=\"" + thObj.fieldName + "\"></td>";
						}
					} else if(thObj.fieldType == "kpi") {
						if(eval("_this.item." + thObj.fieldName.split(".")[0]) != null) {
							str = str + "<td kpi=\"" + thObj.fieldName + "\" title='" + itemFieldValue + "'>" + itemFieldValue + "</td>";
						} else {
							str = str + "<td kpi=\"" + thObj.fieldName + "\"></td>";
						}
					} else if(thObj.fieldType == "fillVote"){

						str = str + "<td><button name=\"add-g2\" class=\"btn btn-xs\" onclick=\"fillVote(" + itemFieldValue + ")\">填写问卷</button></td>"; 

					} else if(thObj.fieldType == "fillTopic"){

						str = str + "<td><button name=\"add-g2\" class=\"btn btn-xs\" onclick=\"fillTopic(" + itemFieldValue + ")\">查看详情</button></td>"; 
						
					} else if(thObj.fieldType == "addPPTTopic"){

						str = str + "<td><button name=\"add-g2\" class=\"btn btn-xs\" onclick=\"addPPTTopic(" + itemFieldValue + ")\">添加主题</button></td>"; 

					} else if(thObj.fieldType == "kpi") {
						if(eval("_this.item." + thObj.fieldName.split(".")[0]) != null) {
							str = str + "<td kpi=\"" + thObj.fieldName + "\" title='" + itemFieldValue + "'>" + itemFieldValue + "</td>";
						} else {
							str = str + "<td kpi=\"" + thObj.fieldName + "\"></td>";
						}
					} else if(thObj.fieldType == "isExtends") {
						if(itemFieldValue == deptId) {
							str = str + "<td>否</td>";
						} else {
							str = str + "<td>是</td>";
						}
					} else if(thObj.fieldType == "deleteProcess") {

						str = str + "<td><button name=\"add-g2\" class=\"btn btn-xs\" onclick=\"deleteProcess(" + itemFieldValue + ")\">撤销流程</button></td>"; 

					} else if(thObj.fieldType == "getBackProcess") {

						str = str + "<td><button name=\"add-g2\" class=\"btn btn-xs\" onclick=\"getBackProcess(" + itemFieldValue + ")\">取回重办</button></td>"; 

					} else if(thObj.fieldType == "getProcessImg") {

						str = str + "<td><button name=\"add-g2\" class=\"btn btn-xs\" onclick=\"getProcessImg(" + itemFieldValue + ")\">流程详细</button></td>"; 

					} else if(thObj.fieldType == "viewUserDetail") {
						str = str + "<td><span><a onclick=\"fillUserDetail(" + _this.item.userId + ")\" style=\"cursor:pointer\">" + itemFieldValue + "</a></span></td>";
					} else if(thObj.fieldType == "dockerOper") {
						str = str + "<td>" +
								"<button id=\"createContainer_" + itemFieldValue + "\" name=\"containerBut\" disabled style=\"color:#4876FF;width:80px;height:25px;\" onclick=\"create_docker(" + itemFieldValue + ")\"><span class=\"glyphicon glyphicon-search\"></span> 创建容器</button>" +
								"<button id=\"startContainer_" + itemFieldValue + "\" name=\"containerBut\" disabled style=\"color:#4876FF;width:80px;height:25px;\" onclick=\"start_docker(" + itemFieldValue + ")\"><span class=\"glyphicon glyphicon-search\"></span> 启动容器</button>" +
								"<button id=\"stopContainer_" + itemFieldValue + "\" name=\"containerBut\" disabled style=\"color:#4876FF;width:80px;height:25px;margin-left:6px\" onclick=\"stop_docker(" + itemFieldValue + ")\"><span class=\"glyphicon glyphicon-search\"></span> 停止容器</button>" +
								//"<button style=\"color:#4876FF;width:80px;height:25px;margin-left:6px\" onclick=\"delete_docker(" + itemFieldValue + ")\"><span class=\"glyphicon glyphicon-search\"></span> 删除容器</button>" +
								"<button id=\"startTomcat_" + itemFieldValue + "\" name=\"containerBut\" disabled style=\"color:#4876FF;width:120px;height:25px;margin-left:6px\" onclick=\"start_docker_tomcat(" + itemFieldValue + ")\"><span class=\"glyphicon glyphicon-search\"></span> 启动tomcat服务</button>" +
								"<button id=\"stopTomcat_" + itemFieldValue + "\" name=\"containerBut\" disabled style=\"color:#4876FF;width:120px;height:25px;margin-left:6px\" onclick=\"stop_docker_tomcat(" + itemFieldValue + ")\"><span class=\"glyphicon glyphicon-search\"></span> 停止tomcat服务</button>" +
								"</td>";
					} else if(thObj.fieldType == "processModelOper") {
						str = str + "<td>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"deployModel(" + itemFieldValue + ")\">部署</button>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"updateModel(" + itemFieldValue + ")\">修改</button>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"deleteModel(" + itemFieldValue + ")\">删除</button>" +
									"</td>";
					} else if(thObj.fieldType == "processDefinitionOper") {
						var secondFieldName = $("#" + tbodyId).prev().children().children("th[fieldType='" + thObj.fieldType + "']").attr("secondFieldName");
						var secondFieldValue = eval("_this.item." + secondFieldName);
						//var secondFieldName = $("#"+tbodyId).prev().childern().children("th[fieldType='" + thObj.fieldType+ "']").attr("secondFieldName");
						str = str + "<td>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"convertToModel('" + itemFieldValue + "')\">转为模型</button>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"updateDefinition('" + itemFieldValue + "')\">审批设置</button>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"suspendDefinition('" + itemFieldValue + "', " + secondFieldValue + ")\">" + (!secondFieldValue ? "挂起" : "激活") + "</button>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"deleteDefinition('" + itemFieldValue + "')\">删除</button>" +
									"</td>";
					} else if(thObj.fieldType == "processDefinitionXML") {
						var secondFieldName = $("#" + tbodyId).prev().children().children("th[fieldType='" + thObj.fieldType + "']").attr("secondFieldName");
						var thirdFieldName = $("#" + tbodyId).prev().children().children("th[fieldType='" + thObj.fieldType + "']").attr("thirdFieldName");
						var secondFieldValue = eval("_this.item." + secondFieldName);
						var thirdFieldValue = eval("_this.item." + thirdFieldName);
						str = str + "<td>" +
										"<a target=_blank style=color:#2EB6FF; href=../../ProcessDefinitionlController/selectXML/"+itemFieldValue+","+"xml"+","+thirdFieldValue+ ">"+secondFieldValue+"</a>" +
										//"<p style=color:#2EB6FF; onclick=\"selectXML('" + itemFieldValue + "')\">" + secondFieldValue + "</p>" +
									"</td>";
					} else if(thObj.fieldType =="selRUProcessOper"){
						str = str + "<td>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"selProcessInstanceRU('" + itemFieldValue + "')\">查看详细</button>" +
									"</td>";
					} else if(thObj.fieldType =="selHIProcessOper"){
						str = str + "<td>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"selProcessInstanceHI('" + itemFieldValue + "')\">查看详细</button>" +
									"</td>";
					} else if(thObj.fieldType =="selProcessTask"){
						str = str + "<td>" +
										"<button name=\"add-g1\" class=\"btn btn-xs\" onclick=\"selProcessTask('" + itemFieldValue + "')\">流程详细</button>" +
									"</td>";
					} else if(thObj.fieldType == "dockerStatus") {
						var dockerStatus = itemFieldValue;
						switch(dockerStatus) {
						case 0:
							str = str + "<td title='未创建，未启动'>未创建，未启动</td>";
							break;
						case 1:
							str = str + "<td title='已创建，未启动'>已创建，未启动</td>";
							break;
						case 2:
							str = str + "<td title='已启动，tomcat未启动'>已启动，tomcat未启动</td>";
							break;
						case 3:
							str = str + "<td title='已启动，tomcat已启动'>已启动，tomcat已启动</td>";
							break;
						default:
							str = str + "<td></td>";
							break;
						}
					}
				}
				//在最后加上</tr>
				if(thIndex == _this.thArray.length) {
					str = str + "</tr>";
				}
			}); 
			$("#" + this.tbodyId).append(str);
			
			//重新添加事件
			$('button[name=add-g1]').click(function(){
		        $('.list2-input').show();
		        $('.input2-bg').show();
		    });
		};     
	}
	//调用
	var tableUtil = new TableUtil(tbodyId,item,index);     
	//原始构建table
	tableUtil.init();
	tableUtil.fillTable();
	//调用JqGrid构建table
	//tableUtil.initByJqGrid();
}

/* 表格调用函数 */
UserCommon.prototype.jqGrid = function(elemtId, colNames, tableDate) {
    var mydata = tableDate;
    var tableLength = $(".table-first-tr th").length;
    var fieldValue = $(".table-first-tr th");
    var dataCol = [];
    for(var i = 0; i< tableLength; i++){
    	var obj = new Object();
    	obj.name = fieldValue.eq(i).attr("fieldName");
    	obj.index = fieldValue.eq(i).attr("fieldName");
    	dataCol.push(obj);
    }
    /*console.log(tableLength);
    console.log(dataCol.length);*/
    $("#" + elemtId).jqGrid({
        data: mydata,
        datatype: "local",
        height: 400,
        autowidth: true,
        shrinkToFit: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        onPaging: 'next',
        sortname: 'trNum',
        recordpos: 'left',
        viewrecords: true,
        sortorder: "asc", //desc降序asc升序
        multiselect: true,
        colNames: colNames, //["序号", "版本号", "适用系统", "创建时间", "详细信息"]
        colModel: dataCol/*[{
        	name: "id",
        	index: "id",
        	width: 80,
        	sorttype: "int"
        }, 
        {
            name: "version",
            index: "version",
            width: 80,
            sorttype: "float",
            formatter: "number"
        },
        {
        	name: "type",
        	index: "type",
        	width: 80,
        	sorttype: "float"
        }, 
        {
            name: "createdate",
            index: "createdate",
            width: 80,
            sorttype: "float"
        }, 
        {
        	name: "content",
        	index: "content",
        	width: 120,
        	sortable: false
        }]*/,/*.navGrid("#pager_list_1",{edit:false,add:false,del:false})*/
        pager: "#pager_list_1",
        viewrecords: true,
        hidegrid: false,
        onPaging: function(){   
        }
    });
}

/**
 * 根据单个对象填充表单form
 * @param formId 表单form的Id
 * @param item 单个对象json数据
 */
UserCommon.prototype.fillForm = function(formId,item) {
	this.fillFormWithObj($("#" + formId), item);
}

/**
 * 根据单个对象填充表单form
 * @param element 表单form的jquery对象
 * @param item 单个对象json数据
 */
UserCommon.prototype.fillFormWithObj = function(element, item) {
	circleArray("input");
	circleArray("textarea");
	circleArray("select");
	circleArray("script");
	
	/**
	 * 循环不同类的输入元素,tagName：要检查的标签名
	 * 返回值：若为true,表示表单都填写完成了。false,则表示有输入框未填写
	 */
	function circleArray(tagName) {
		$.each(element.find(tagName), function (index,obj){
			if(typeof($(obj).attr("name")) != "undefined" && $(obj).attr("name") != "" && eval("item." + $(obj).attr("name").split(".")[0]) != null) {
				if($(obj).attr("type") == "datetime") {
					/* datetime日期类型  */
					var datetimes = $("input[type='datetime'][name='" + $(obj).attr("name") + "']");
					if(datetimes.length == 1) $(obj).val(eval("item." + $(obj).attr("name")).substring(0, 19));
					if(datetimes.length == 2) {
						//说明是自动化表单的组件
						var index = datetimes.index($(obj));
						if(index == 0) $(obj).val(eval("item." + $(obj).attr("name")).substring(0, 10));
						else if(index == 1) $(obj).val(eval("item." + $(obj).attr("name")).substring(11, 19));
					}
				} else if($(obj).attr("type") == "date") {
					/* date类型  */
					$(obj).val(eval("item." + $(obj).attr("name")).substring(0,10));
				} else if($(obj).attr("type") == "text") {
					/* 普通文本类型  */
					$(obj).val(eval("item." + $(obj).attr("name")));
				} else if($(obj).attr("type") == "radio") {
					/* radio类型  */
					var radioName = $(obj).attr("name");
					if(eval("item." + $(obj).attr("name")) == $(obj).attr("value")) {
						//$(obj).prop("checked",true);
						$(obj).iCheck('check');
					} else {
						//$(obj).prop("checked",false);
						$(obj).iCheck('uncheck');
					}
					//$(obj).attr("checked",checked);
					//$("#input[name='" + radioName + "'][value=\"" + eval("item." + $(obj).attr("name")) + "\"]").get(0).checked=true;
				} else if($(obj).attr("type") == "checkbox") {
					/* checkbox类型  */
					//var str = "1,2,3";//模拟数据库中存储的信息
					//var checkboxArray = str.split(",");
					var checkboxArray = eval("item." + $(obj).attr("name")).split(",");
					if($.inArray($(obj).attr("value"), checkboxArray) != -1) {
						//$(obj).prop("checked",true);
						$(obj).iCheck('check');
					} else {
						//$(obj).prop("checked",false);
						$(obj).iCheck('uncheck');
					}
				} else if($(obj).attr("type") == "ueditor") {
					/* 编辑器ueditor类型  */
					UE.getEditor("'" + $(obj).attr("id") + "'").execCommand("cleardoc");
					UE.getEditor("'" + $(obj).attr("id") + "'").execCommand('insertHtml', eval("item." + $(obj).attr("name")));
				} else {
					$(obj).val(eval("item." + $(obj).attr("name")));
				}
				//判断只读
				if($(obj).attr("isReadonly") == "true") {
					$(obj).attr({ readonly: 'true' });
				}
				//判断是否可编辑
				if($(obj).attr("isEditable") == "false") {
					$(obj).attr({ readonly: 'true' });
				}
			}
		});
	}
}

/**
 * 根据单个对象填充表单form
 * @param element 上层标签元素
 * @param item 单个对象json数据
 */
UserCommon.prototype.fillSpanWithObj = function(element, item) {
	circleArray(element.find("span"));
	circleArray(element.find("textarea"));
	circleArray(element.find("div[type='html']"));

	/**
	 * 循环不同类的输入元素,tagName：要检查的标签名
	 * 返回值：若为true,表示表单都填写完成了。false,则表示有输入框未填写
	 */
	function circleArray(elements) {
		$.each(elements, function (index,obj){
			if($(obj).attr("name") != "" && eval("item." + $(obj).attr("name").split(".")[0]) != null) {
				
				if($(obj).attr("type") == "datetime") {
					$(obj).text(eval("item." + $(obj).attr("name")).substring(0, 19));
				} else if($(obj).attr("type") == "date") {
					$(obj).text(eval("item." + $(obj).attr("name")).substring(0, 10));
				} else if($(obj).attr("type") == "money-c") {
					$(obj).text("￥ " + eval("item." + $(obj).attr("name")));
				} else if($(obj).attr("type") == "html") {
					$(obj).append(eval("item." + $(obj).attr("name")));
				} else if($(obj).attr("type") == "text") {
					$(obj).text(eval("item." + $(obj).attr("name")));
				} else if($(obj).attr("type") == "radio") {
					var radioName = $(obj).attr("name");
					if(eval("item." + $(obj).attr("name")) == $(obj).attr("value")) {
						$(obj).iCheck('check');
					} else {
						$(obj).iCheck('uncheck');
					}
				} else if($(obj).attr("type") == "checkbox") {
					var checkboxArray = eval("item." + $(obj).attr("name")).split(",");
					if($.inArray($(obj).attr("value"), checkboxArray) != -1) {
						$(obj).iCheck('check');
					} else {
						$(obj).iCheck('uncheck');
					}
				} else if($(obj).attr("type") == "ueditor") {
					UE.getEditor("'" + $(obj).attr("id") + "'").execCommand("cleardoc");
					UE.getEditor("'" + $(obj).attr("id") + "'").execCommand('insertHtml', eval("item." + $(obj).attr("name")));
				} else {
					$(obj).text(eval("item." + $(obj).attr("name")));
				}
				//判断只读
				if($(obj).attr("isReadonly") == "true") {
					$(obj).attr({ readonly: 'true' });
				}
				//判断是否可编辑
				if($(obj).attr("isEditable") == "false") {
					$(obj).attr({ readonly: 'true' });
				}
			}
		});
	}
}


/**
 * 根据json数据创建表单form
 * @param formId 表单form的Id
 * @param data 构建所需json数据
 * @param cols 分栏，将分为cols/2栏
 */
UserCommon.prototype.createForm = function(formId,data,cols) {
	var str = "";
	//str = str + "<table>";
	//一个整tr的html代码
	var trStr = "";
	//非整除时的余数项元素的html代码
	var remainTrStr = "";
	var temp = 0;
	//循环data生成表单元素
	$.each(data,function (index,item){
		if(item.type == "hidden") {
			str = str + getHiddenInput(item);
			temp = index + 1;
		} else if(item.isWrap == "true") {
			//如果isWrap == true,则将原来已有的构建成一行，再将新建的这个要占据一整行的构建为一行
			if(trStr != "") {
				//原来的构建为一行
				str = str + createTr(trStr);
			} 
			//新建的构建为一行
			str = str + createTr(circleElement(item));
			trStr = "";
			temp = index + 1;
		} else if((index-temp+1)%(cols/2) == 0) {
			trStr = trStr + circleElement(item);
			str = str + createTr(trStr);
			trStr = "";
		} else {
			trStr = trStr + circleElement(item);
		}
		remainTrStr = trStr;
	});
	if(remainTrStr != "") {
		str = str + createTr(remainTrStr);
	}
	$("#" + formId).append(str);
	
	//fillCss(formId);
}

/**
 * 根据json数据创建表单form
 * @param formObj 表单form的元素
 * @param data 构建所需json数据
 * @param cols 分栏，将分为cols/2栏
 */
UserCommon.prototype.createFormWithObj = function(formObj,data,cols) {
	var str = "";
	//str = str + "<table>";
	//一个整tr的html代码
	var trStr = "";
	//非整除时的余数项元素的html代码
	var remainTrStr = "";
	var temp = 0;
	//循环data生成表单元素
	$.each(data,function (index,item){
		if(item.type == "hidden") {
			str = str + getHiddenInput(item);
			temp = index + 1;
		} else if(item.isWrap == "true") {
			//如果isWrap == true,则将原来已有的构建成一行，再将新建的这个要占据一整行的构建为一行
			if(trStr != "") {
				//原来的构建为一行
				str = str + createTr(trStr);
			} 
			//新建的构建为一行
			str = str + createTr(circleElement(item));
			trStr = "";
			temp = index + 1;
		} else if((index-temp+1)%(cols/2) == 0) {
			trStr = trStr + circleElement(item);
			str = str + createTr(trStr);
			trStr = "";
		} else {
			trStr = trStr + circleElement(item);
		}
		remainTrStr = trStr;
	});
	if(remainTrStr != "") {
		str = str + createTr(remainTrStr);
	}
	formObj.append(str);
	
	//fillCss(formId);
}

/**
 * 循环构造一个表单元素
 * @param item 表单元素
 * @returns {String} 表单元素构造得到的HTML代码
 */
function circleElement(item) {
	var elementStr = "";
	if(item.type != "hidden") {
		if(item.type == "ueditor" || item.element == "textarea") {
			elementStr = elementStr + "<div class=\"zsy-textarea\">";
		} else {
			elementStr = elementStr + "<div class=\"zsy-common\">";
		}
	}
	//构建labelTd，单个元素中第一个td
	elementStr = elementStr + createLableTd(item);
	if(item.element == "input") {
		//如果type为radio
		if(item.type == "radio" || item.type == "checkbox") {
			elementStr = elementStr + getRadioOrCheckboxTd(item);
			return elementStr;
		}
		//如果type为ueditor
		if(item.type == "ueditor") {
			elementStr = elementStr + getEditorTd(item);
			return elementStr;
		}
		//单个元素中第二个td
		var tdStr = "<input type=\"" + (item.type=="date"?"text":item.type) + "\" id=\"" + item.elementId + "\" isEditable=\"" + item.isEditable + "\" " +
				"name=\"" + item.name + "\" value=\"" + item.defaultValue + "\" isReadonly=\"" + item.isReadonly + "\" " +
				"isDisable=\"" + item.isDisable + "\" isVisible=\"" + item.isVisible + "\" " +
				"label=\"" + item.label + "\" errorMsg=\"" + item.errorMsg + "\" isEmpty=\"" + item.isEmpty + "\" ";
		if(item.type == "datetime" || item.type == "date") {
			tdStr = tdStr + "class=\"input-text laydate-icon\" ";
		} else {
			tdStr = tdStr + "class=\"input-text\" ";
		}
		//判断只读
		if(item.isReadonly == "true") {
			tdStr = tdStr + "readOnly=\"true\" ";
		}
		if(item.event != "" && item.event != null) {
			var eventObj = eval("(" + item.event + ")");
			$.each(eventObj, function(eventIndex,eventItem) {
				tdStr = tdStr + eventItem.eventType + "=\"" + eventItem.eventFun + "\"";
			});
		}
		//判断可见
		if(item.isVisible == "false") {
			tdStr = tdStr + "style=\"display:none;" + item.style + "\" ";
		} else {
			tdStr = tdStr + "style=\"" + item.style + "\" ";
		}
		tdStr = tdStr + ">";
		//如果为hidden
		if(item.type == "hidden") {
			elementStr = elementStr + tdStr;
		} else {
			elementStr = elementStr + createTd(tdStr, "right");
		}
	} else if(item.element == "select") {
		//单个元素中第二个td
		var tdStr = "<select type=\"" + item.type + "\" id=\"" + item.elementId + "\" " +
				"name=\"" + item.name + "\" isReadonly=\"" + item.isReadonly + "\" isEditable=\"" + item.isEditable + "\" " +
				"isDisable=\"" + item.isDisable + "\" isVisible=\"" + item.isVisible + "\" " +
				"label=\"" + item.label + "\" errorMsg=\"" + item.errorMsg + "\" isEmpty=\"" + item.isEmpty + "\" ";
		//判断只读
		if(item.isReadonly == "true") {
			tdStr = tdStr + "readOnly=\"true\"";
		}
		//设置事件
		if(item.event != "") {
			$.each(eval("(" + item.event + ")"), function(eventIndex,eventItem) {
				tdStr = tdStr + eventItem.eventType + "=\"" + eventItem.eventFun + "\"";
			});
		}
		//判断可见
		if(item.isVisible == "false") {
			tdStr = tdStr + "style=\"display:none;" + item.style + "\" ";
		} else {
			tdStr = tdStr + "style=\"" + item.style + "\" ";
		}
		tdStr = tdStr + ">";
		//循环options进行设定选项
		if(item.options != "") {
			$.each(eval("(" + item.options + ")"),function (itemIndex,optionItem){
				tdStr = tdStr + "<option value=\"" + optionItem.value + "\">" + optionItem.text + "</option>";
			});
		}
		tdStr = tdStr + "</select>";
		elementStr = elementStr + createTd(tdStr, "right");
	} else if(item.element == "textarea") {
		//单个元素中第二个td
		var tdStr = "<textarea type=\"" + item.type + "\" id=\"" + item.elementId + "\" isEditable=\"" + item.isEditable + "\" " +
				"name=\"" + item.name + "\" isReadonly=\"" + item.isReadonly + "\" value=\"" + item.defaultValue + "\" " +
				"isDisable=\"" + item.isDisable + "\" isVisible=\"" + item.isVisible + "\" " +
				"label=\"" + item.label + "\" errorMsg=\"" + item.errorMsg + "\" isEmpty=\"" + item.isEmpty + "\" ";
		//判断只读
		if(item.isReadonly == "true") {
			tdStr = tdStr + "readOnly=\"true\"";
		}
		if(item.event != "") {
			var eventObj = eval("(" + item.event + ")");
			$.each(eventObj, function(eventIndex,eventItem) {
				tdStr = tdStr + eventItem.eventType + "=\"" + eventItem.eventFun + "\"";
			});
		}
		//判断可见
		if(item.isVisible == "false") {
			tdStr = tdStr + "style=\"display:none;" + item.style + "\" ";
		} else {
			tdStr = tdStr + "style=\"" + item.style + "\" ";
		}
		tdStr = tdStr + "></textarea>";
		if(item.type == "hidden") {
			elementStr = elementStr + tdStr;
		} else {
			elementStr = elementStr + createTd(tdStr, "right");
		}
	}
	if(item.type != "hidden") {
		elementStr = elementStr + "</div>";
	}
	return elementStr;
}
/**
 * 构建表单标签td
 */
function createLableTd(item) {
	var labelTdStr = "<label>";
	//单个元素中第一个td
	if(item.isEmpty == "false" && item.type != "hidden" && item.isVisible != "false") {
		var tdStr = "<span style=\"color:red;font-size:18px\">*</span>" + item.label + "：";
		labelTdStr = labelTdStr + tdStr;
	} else if (item.type != "hidden" && item.isVisible != "false"){
		labelTdStr = labelTdStr + item.label + "：";
	}
	labelTdStr = labelTdStr + "</label>";
	return createTd(labelTdStr, "left");
}
/**
 * 构建radio类型或checkbox类型的td
 */
function getRadioOrCheckboxTd(item) {
	var tdStr = "";
	//单个元素中第二个td,循环options
	if(item.options != "") {
		var obj = eval("(" + item.options + ")");
		$.each(obj, function(optionIndex,optionItem) {
			var optionStr = "<label><input type=\"" + item.type + "\" id=\"" + item.elementId + "\" isEditable=\"" + item.isEditable + "\" " +
					"name=\"" + item.name + "\" isReadonly=\"" + item.isReadonly + "\" value=\"" + optionItem.value + "\" " +
					"isDisable=\"" + item.isDisable + "\" class=\"radius-left\" isVisible=\"" + item.isVisible + "\" " +
					"label=\"" + item.label + "\" errorMsg=\"" + item.errorMsg + "\" isEmpty=\"" + item.isEmpty + "\" ";
			//设置选中
			if(optionItem.value == item.defaultValue) {
				optionStr = optionStr + "checked=\"checked\" ";
			}
			//判断只读
			if(item.isReadonly == "true") {
				optionStr = optionStr + "readOnly=\"true\"";
			}
			if(item.event != "") {
				var eventObj = eval("(" + item.event + ")");
				$.each(eventObj, function(eventIndex,eventItem) {
					optionStr = optionStr + eventItem.eventType + "=\"" + eventItem.eventFun + "\"";
				});
			}
			//判断可见
			if(item.isVisible == "false") {
				optionStr = optionStr + "style=\"display:none;" + item.style + "\" ";
			} else {
				optionStr = optionStr + "style=\"" + item.style + "\" ";
			}
			optionStr = optionStr + ">" + optionItem.text + "</label>";
			tdStr = tdStr + optionStr;
		});
	}
	return createTd(tdStr, "right") + "</div>";
}
function getHiddenInput(item) {
	//单个元素中第二个td
	var tdStr = "<input type=\"" + item.type + "\" id=\"" + item.elementId + "\" isEditable=\"" + item.isEditable + "\" " +
			"name=\"" + item.name + "\" value=\"" + item.defaultValue + "\" isReadonly=\"" + item.isReadonly + "\" " +
			"isDisable=\"" + item.isDisable + "\" isVisible=\"" + item.isVisible + "\" " +
			"label=\"" + item.label + "\" errorMsg=\"" + item.errorMsg + "\" isEmpty=\"" + item.isEmpty + "\"> ";
	return tdStr;
}
/**
 * 构建Editor类型td
 */
function getEditorTd(item) {
	var tdStr = "<script class=\"zsy-editor\" type=\"text/plain\" id=\"" + item.elementId + "\" name=\"" + item.name + "\" isEditable=\"" + item.isEditable + "\" " +
				"isDisable=\"" + item.isDisable + "\" isVisible=\"" + item.isVisible + "\" isReadonly=\"" + item.isReadonly + "\" " + 
				"label=\"" + item.label + "\" errorMsg=\"" + item.errorMsg + "\" isEmpty=\"" + item.isEmpty + "\" ";
	//判断只读
	if(item.isReadonly == "true") {
		tdStr = tdStr + "readOnly=\"true\"";
	}
	if(item.event != "") {
		var eventObj = eval("(" + item.event + ")");
		$.each(eventObj, function(eventIndex,eventItem) {
			tdStr = tdStr + eventItem.eventType + "=\"" + eventItem.eventFun + "\"";
		});
	}
	//判断可见
	if(item.isVisible == "false") {
		tdStr = tdStr + "style=\"display:none;height:200px;" + item.style + "\" ";
	} else {
		tdStr = tdStr + "style=\"height:200px;" + item.style + "\" ";
	}
	tdStr = tdStr + "></script>";
	return createTd(tdStr, "right") + "</div>";
}

function createTr(str) {
	return "<div class=\"zsy\">" + str + "</div>";
}
function createTd(str, category) {
	if(category == "left") {
		return "<div class=\"zsy-common-left\">" + str + "</div>";
	} else if (category == "right") {
		return "<div class=\"zsy-common-right\">" + str + "</div>";
	} else if (category == "none") {
		return "<div>" + str + "</div>";
	}
}

/**
 * 统一的为表单自动生成的checkbox附加样式并执行相关控制。
 */
UserCommon.prototype.checkboxListener = function() {
	//为checkbox注入css样式
	$("input[type='checkbox']").iCheck({
		checkboxClass: 'icheckbox_square-green',  //icheckbox_square-green/icheckbox_minimal-green/icheckbox_flat-green/icheckbox_polaris/icheckbox_futurico
		//radioClass: 'iradio_square-green',
		//labelHover: false,
		increaseArea: '20%'
		//increaseArea: '-10%' // optional
	});
	
	//监听checkbox的ifChecked、ifUnchecked、ifChanged事件
	$(".all").on('ifChecked', function(event){
		//alert(event.type + ' callback');
		//alert($(this).is(':checked')); //取值
		//$("input[id!='chkAll']").iCheck('check');
		$("input:not(:checked)").iCheck('check');
		
		if($(this).is(':checked')) {
			$(".checkboxTr").css("color","#1ab394");
		} else {
			$(".checkboxTr").css("color","#000");
		}
		
	});

	$(".all").on('ifUnchecked', function(event){
		//alert(event.type + ' callback');
		//alert($(this).is(':checked')); //取值
		//$("input[id!='chkAll']").iCheck('uncheck');
		$("input:checked").iCheck('uncheck');
		
		if(!$(this).is(':checked')) {
			$(".checkboxTr").css("color","#000");
		} else {
			$(".checkboxTr").css("color","#1ab394");
		}
	});
	
	//监听checkbox的ifChecked、ifUnchecked、ifChanged事件
	$(".check").on('ifChecked', function(event){
		$(this).parent().parent().parent().css("color","#1ab394");
	});
	
	//监听checkbox的ifChecked、ifUnchecked、ifChanged事件
	$(".check").on('ifUnchecked', function(event){
		$(this).parent().parent().parent().css("color","#000");
	});
	
	//监听checkbox的ifChanged事件
	$('input.check').on('ifChanged', function(event){
		//alert(event.type + ' callback');
		//console.log($('input.check').filter(':checked').length,$('input.check').length)
		
		if($('input.check').filter(':checked').length == $('input.check').length) {
			$('input.all').prop('checked', 'checked');
			//$("input.all").iCheck('check');
		} else {
			$('input.all').removeAttr('checked');
			//$("input.all").iCheck('uncheck');
		}
		$('input.all').iCheck('update');
	});
}
UserCommon.prototype.PowerListener=function(tbodyId){
	$("#tbody" + tbodyId + " :checkbox").iCheck({
		checkboxClass: 'icheckbox_square-green',  //icheckbox_square-green/icheckbox_minimal-green/icheckbox_flat-green/icheckbox_polaris/icheckbox_futurico
		//radioClass: 'iradio_square-green',
		//labelHover: false,
		increaseArea: '20%'
		//increaseArea: '-10%' // optional
	});
	$('#tbody' + tbodyId + ' .ifallcheck').on('ifChecked',function(event){
		/*$("input:not(:checked)").iCheck('check');*/
		$(this).parents('tr').find('input:not(:checked)').iCheck('check');
	})
	$('#tbody' + tbodyId + ' .ifallcheck').on('ifUnchecked',function(event){
		/*$("input:not(:checked)").iCheck('check');*/
		$(this).parents('tr').find('input:checked').iCheck('uncheck');
	})
	//监听checkbox的ifChanged事件
	$('#tbody' + tbodyId + ' input.check').on('ifChanged', function(event){
		var TrsCheckbox=$(this).parents('tr').find('.check');
		var TrsCheckAll=$(this).parents('tr').find('.ifallcheck');
		
		if(TrsCheckbox.filter(':checked').length == TrsCheckbox.length) {
			TrsCheckAll.prop('checked', 'checked');
		} else {
			TrsCheckAll.removeProp('checked');
		}
			TrsCheckAll.iCheck('update');
	});
}

/**
 * 统一的为radio添加样式
 */

UserCommon.prototype.radioListener = function() {
	//为radio注入css样式
	$("input[type='radio']").iCheck({
		//checkboxClass: 'icheckbox_square-green',  //icheckbox_square-green/icheckbox_minimal-green/icheckbox_flat-green/icheckbox_polaris/icheckbox_futurico
		radioClass: 'iradio_square-green',
		//labelHover: false,
		increaseArea: '20%'
		//increaseArea: '-10%' // optional
	});
	
	//监听radio的ifChecked、ifUnchecked、ifChanged事件
	$("input[name='selectFlag'][type='radio']").on('ifChecked', function(event){
		$(this).parents('tr').addClass('onColor');
	});
	
	
	//监听radio的ifChecked、ifUnchecked、ifChanged事件
	$("input[name='selectFlag'][type='radio']").on('ifUnchecked', function(event){
		$(this).parents('tr').removeClass('onColor');
	});
	
	
	$('.auditRadio').on('ifChecked', function(event){
		var id = $(this).attr('name').substring(5);
		var values= $(this).attr('value');
		var jsonObj = {
			"userId": id,
			"audit":values
		};
		$.ajax({
		      url: "../../userAdmin/updateUser",
		      datatype: "json",
		      type: "post",
		      data: JSON.stringify(jsonObj),
		      success: function (data, status, xhr) {
		    	  console.log(1456)
		      } 
		});
	});
	$('.disabledRadio').on('ifChecked', function(event){
		
		var id = $(this).attr('name').substring(7);
		var values= $(this).attr('value');
		var jsonObj = {
			"userId": id,
			"disable":values
		};
		
		$.ajax({
		      url: "../../userAdmin/updateUser",
		      datatype: "json",
		      type: "post",
		      data: JSON.stringify(jsonObj),
		      success: function (data, status, xhr) {
		    	  console.log(123)
		      } 
		});
	});
	
}

/*填充checkbox函数*/
function fillThisCB(id) {
	/*if($("#CB" + id).prop("checked") == true) {
	$("#CB" + id).prop("checked",false);
	$("#Tr" + id).css("color","#000");
	} else {
		$("#CB" + id).prop("checked",true);
		$("#Tr" + id).css("color","#0099FF");
	}*/
	if(typeof($("#CB" + id).html()) == "undefined") {
		var color = $("#Tr" + id).css("color");
		$("#Tr" + id).css("color", (color == "rgb(51, 51, 51)" || color == "rgb(0, 0, 0)") ? "#1ab394" : "#000");
		return;
	}
	
	if($("#CB" + id).is(':checked')){
		$("#CB" + id).iCheck('uncheck');
		$("#Tr" + id).css("color","#000");
	} else{
		$("#CB" + id).iCheck('check');
		$("#Tr" + id).css("color","#1ab394");
	}
	
}

/*填充字段为radioTable的表格*/
function inittAble(){
	/*初始化 table tr点击事件*/
	$('.centerTable .table tbody tr').click(function(){
		$(this).addClass('onColor').siblings().removeClass('onColor');
		var thats=$(this).children('td:first').find("input[type='radio']");
		if(thats){
			$(this).children('td:first').find("input[type='radio']").iCheck('check');
		}
		
	})
	
	
}

function fillThisCB1(id) {
	if($("#checkbox" + id).prop("checked") == true) {
		$("#checkbox" + id).prop("checked",false);
		$("#tr" + id).css("color","#000");
	} else if(typeof($("#checkbox" + id).val()) != "undefined") {
		$("#checkbox" + id).prop("checked",true);
		$("#tr" + id).css("color","#0099FF");
	}
}

function checkAll() {
	
	for(var i=0; i<$("input[name='selectFlag']").length; i++) {
		$("input[name='selectFlag']")[i].checked = $("input[name='ifAll']")[0].checked;
	}
	
	if($("input[name='ifAll']")[0].checked == true) {
		$(".checkboxTr").css("color","#1ab394");
	} else {
		$(".checkboxTr").css("color","#000");
	}
}

/**
 * 根据设置可编辑表单td列的初始下标值和末尾下标值。来将普通表单初始化为可编辑表单。
 */
UserCommon.prototype.createEditableTable = function(tbodyId, firstTdIndex, lastTdIndex) {
	//调用
	var editableTableUtil = new EditableTableUtil(tbodyId, firstTdIndex, lastTdIndex);     
	editableTableUtil.addEventForTd();
}

/**
 * 根据设置可编辑表单td对应的class。来将普通表单初始化为可编辑表单。
 */
UserCommon.prototype.createEditableTableByClass = function(tbodyId, className) {
	//调用
	var editableTableUtil = new EditableTableUtilWithClass(tbodyId, className);     
	editableTableUtil.addEventForTd();
}

/**
 * 定义创建可编辑表格的工具类
 * 可编辑的Td范围(firstTdIndex < cur <= lastTdIndex)
 */
function EditableTableUtil(tbodyId, firstTdIndex, lastTdIndex, unEditTrNum, updateFun, createJsonFun) { 
	var _this = this;
	//添加相关属性
	this.tbodyId = tbodyId;
	this.firstTdIndex = firstTdIndex;
	this.lastTdIndex = lastTdIndex;
	this.unEditTrNum = unEditTrNum;
	this.temp = 0;

	//td事件绑定
	this.addEventForTd = function () {
		for(var j=0; j<=$("#" + _this.tbodyId + " tr").size()-_this.unEditTrNum; j++){
			$("#" + _this.tbodyId + " tr:eq(" + j + ") td:gt(" + _this.firstTdIndex + "):lt(" + (_this.lastTdIndex - _this.firstTdIndex) + ")").each(function(index, element){
				$(element).dblclick(function(){
					_this.addInputToTD($(this));
				});
			});
			//屏蔽Enter按键和tab按键
			$(document).keydown(function (event) {  
			    switch (event.keyCode) {  
			        case 13:case 9: return false;
			    }  
			});
		}
	}
	
	//修改方法
	this.update = function(inputObj, eventType){
		var newText = inputObj.val(); 
		var objTD = inputObj.parent();
		var json = _this.createJson(inputObj);
		if(!isNaN(newText) && newText!='') {
			$.ajax({
				url: "../../sellgoalAdmin/upsellgoal",
				datatype: "json",
				type: "put",
				data:json,
				success: function (data) {
					objTD.html(newText); 
					_this.updateTotalValue(objTD);
					if(eventType != "blur") {
						_this.jumpToNextTD(objTD);
					}
				}
			});
		} else {
		  	alert("请输入有效值");
		  	setTimeout(function () { 
		  		inputObj.trigger("focus").trigger("select");
			   },50);   
		} 
	}
	if(updateFun != null) this.update = updateFun;
	
	//封装json
	this.createJson = function(inputObj) {
		var id = inputObj.parent().parent().attr("id");
		var month = inputObj.parent().attr("month");
		var value = inputObj.val();
		var pvaltr = _this.getTrval($(inputObj).parent(),value);
		var json="{'sellgoalId':" + id + ",'" + month + "':'" + value + "','plangoal':'"+pvaltr+"'}";
		return json;
	}

	if(createJsonFun != null) this.createJson = createJsonFun;
	//行求和年计划量
	this.getTrval = function(objTD,newText){
		var tdIndex = _this.getTdIndex(objTD);
		var trIndex = _this.getTrIndex(objTD);
		var pvaltr = 0;
		$("#" + _this.tbodyId).find("tr:eq(" + trIndex + ")").find("td:gt(" + _this.firstTdIndex + "):lt(" + (_this.lastTdIndex - _this.firstTdIndex) + ")").each(function(index, element){
			if(index < 13){
			    if(index == (tdIndex - (_this.firstTdIndex + 1))) {
				    pvaltr += parseFloat(newText);
			    } else {
					pvaltr += parseFloat($(element).text());
				}
		 	}
	  	});
		return pvaltr;
	}

	//实时修改列。行。合计的值
	this.updateTotalValue = function(objTD) {
		var tdIndex = _this.getTdIndex(objTD);
		var trIndex = _this.getTrIndex(objTD);
		var size = $("#" + _this.tbodyId + " tr").size();
		var valtd = 0;
		var valtr = 0;
		var total = 0;
		$("#" + _this.tbodyId + " tr").find("td:eq(" + tdIndex + ")").each(function(index, element){
			if(index < size-1){
				valtd += parseFloat($(element).text());
			}
		});
		$("#" + _this.tbodyId).find("tr:eq(" + trIndex + ")").find("td:gt(" + _this.firstTdIndex + "):lt(" + (_this.lastTdIndex - _this.firstTdIndex) + ")").each(function(index, element){
			if(index < 13){
				valtr += parseFloat($(element).text());
			}
		});
		//修改对应索引的同行第四列的td的合计值
		$("#" + _this.tbodyId).find("tr:eq(" + trIndex + ")").find("td:eq(3)").text(valtr);
		//修改对应索引的最后一行的同列td的合计值
		$("#" + _this.tbodyId + " tr:eq(" + (size - 1) + ")").find("td:eq(" + (tdIndex-2) + ")").text(valtd);
		//修改第三列的合计值
		$("#" + _this.tbodyId + " tr").find("td:eq(3)").each(function(index, element){
			if(index < size-1){
				total += parseFloat($(element).text());
			}
		});
		$("#" + _this.tbodyId + " .dleiqiu").find("td:eq(1)").text(total);
	}

	//获取当前TD的列索引
	this.getTdIndex = function(objTd) {
		var tdIndex = objTd.parent().find("td").index(objTd[0]);	//获取当前单元格列的索引
		return tdIndex;
	}

	//获取当前TD的行索引
	this.getTrIndex = function(objTd) {
		var trIndex = objTd.parent().parent().find("tr").index(objTd.parent()[0]);//获取行的索引
		return trIndex;
	}

	//根据当前td跳转到下一个td
	this.jumpToNextTD = function(objTD){
		var size = $("#" + _this.tbodyId + " tr").size();
		var tdIndex = _this.getTdIndex(objTD);
		var trIndex = _this.getTrIndex(objTD);
		if(tdIndex > _this.firstTdIndex && tdIndex < _this.lastTdIndex) {
			_this.addInputToTD(objTD.next());
		} else if (tdIndex == _this.lastTdIndex) {
			if(trIndex < size-1-_this.unEditTrNum) {
				var nextTrTD = $("#" + _this.tbodyId + " tr:eq(" + (trIndex + 1) + ")").find("td:eq(" + (_this.firstTdIndex+1) + ")");
				_this.addInputToTD(nextTrTD);
			} else {
				new UserCommon().check("success","已到最后一个！",null,"warning");
				return;
			}
		}
	}

	//为td元素构建input输入框并为输入框添加相应事件
	this.addInputToTD = function(objTD) {
		var oldText = $.trim(objTD.text());
		var input = $("<input type='text' class=\"pkq\"/>");
		input.val(oldText);
		objTD.html(input);
		input.click(function(){
			return false;
		});
		input.css({border:"0px",padding:"0px",fontSize:"13px",font:"宋体"});
		input.trigger("focus").trigger("select");
		//input的blur事件
	 	input.blur(function(){
	 		if(_this.temp > 0) {
	 			_this.temp = 0;
	 			return;
	 		}
	 		_this.dealInputEvent(objTD, oldText, $(this), false, "blur");
		}); 
		//input的blur事件
		input.keydown(function () {  
			var jianzhi = event.keyCode;  
			switch (jianzhi) {  
				case 13:case 9:   //按下回车或tab，保存修改
					if((isNaN($(this).val()) || $(this).val() == '') && 
							_this.getTdIndex(objTD) != _this.lastTdIndex) {
	            		//之后不运行blur事件
	            		_this.temp ++;
	            	}
					_this.dealInputEvent(objTD, oldText, $(this), true, "keydown");
	             	break;
				case 27:    //按下Esc，取消修改，吧文本框变成文本  
					objTD.html(oldText);  
					break;
	     	}
		});
	}

	/*
	*	处理input相关事件的处理。
	*/
	this.dealInputEvent = function(objTD, oldText, inputObj, toNext, eventType) {
		var newText = inputObj.val();
		if(oldText != newText){
			_this.update(inputObj, eventType);
		} else {
		    //前后文本一样，将文本框变成标签  
		    objTD.html(newText);  
		    if(toNext) {
		    	_this.jumpToNextTD(objTD);
		    }
		} 
	}
}

/**
 * 定义创建可编辑表格的工具类
 * 可编辑的Td范围(class = className)
 */
function EditableTableUtilWithClass(tbodyId, className, updateFun, createJsonFun) { 
	var _this = this;
	//添加相关属性
	this.tbodyId = tbodyId;
	this.className = className;
	this.temp = 0;
	
	this.getFirstTdIndex = function (objTD) {
		var objTR = objTD.parent();
		return objTR.children("td").index(objTR.children("." + className + ":first"));
	}
	
	this.getLastTdIndex = function (objTD) {
		var objTR = objTD.parent();
		return objTR.children("td").index(objTR.children("." + className + ":last"));
	}

	//td事件绑定
	this.addEventForTd = function () {
		$("." + className).each(function(index, element){
			$(element).dblclick(function(){
				_this.addInputToTD($(this));
			});
		});
		//屏蔽Enter按键和tab按键
		$(document).keydown(function (event) {  
		    switch (event.keyCode) {  
		        case 13:case 9: return false;
		    }  
		});
	}
	
	//获取当前TD的列索引
	this.getTdIndex = function(objTd) {
		var tdIndex = objTd.parent().find("td").index(objTd[0]);	//获取当前单元格列的索引
		return tdIndex;
	}

	//获取当前TD的行索引
	this.getTrIndex = function(objTd) {
		var trIndex = objTd.parent().parent().find("tr").index(objTd.parent()[0]);//获取行的索引
		return trIndex;
	}

	if(updateFun != null) this.update = updateFun;
	
	if(createJsonFun != null) this.createJson = createJsonFun;
	
	//根据当前td跳转到下一个td
	this.jumpToNextTD = function(objTD){
		var size = $("#" + _this.tbodyId + " tr").size();
		var tdIndex = _this.getTdIndex(objTD);
		var trIndex = _this.getTrIndex(objTD);
		if(tdIndex > _this.getFirstTdIndex(objTD) && tdIndex < _this.getLastTdIndex(objTD)) {
			_this.addInputToTD(objTD.next());
		} else if (tdIndex == _this.getLastTdIndex(objTD)) {
			if($("."+className).index(objTD)!=$("."+className).length-1) {
				var nextTrTD = $("."+className).eq($("."+className).index(objTD)+1);
				_this.addInputToTD(nextTrTD);
			} else {
				new UserCommon().check("success","已到最后一个！",null,"warning");
				return;
			}
		}
	}

	//为td元素构建input输入框并为输入框添加相应事件
	this.addInputToTD = function(objTD) {
		var oldText = $.trim(objTD.text());
		var input = $("<input type='text' class=\"pkq\"/>");
		input.val(oldText);
		objTD.unbind("dblclick");
		objTD.html(input);
		input.click(function(){
			return false;
		});
		input.css({border:"0px",padding:"0px",fontSize:"13px",font:"宋体"});
		input.trigger("focus").trigger("select");
		//input的blur事件
	 	input.blur(function(){
	 		/*if(_this.temp > 0) {
	 			_this.temp = 0;
	 			//return;
	 		}*/
	 		//_this.temp++;
	 		console.log(_this.temp);
	 		_this.dealInputEvent(objTD, oldText, $(this), false, "blur");
	 		
		}); 
		//input的key事件
		input.keydown(function () {  
			var jianzhi = event.keyCode;  
			switch (jianzhi) {  
				case 13:case 9:   //按下回车或tab，保存修改
					if((isNaN($(this).val()) || $(this).val() == '') && 
							_this.getTdIndex(objTD) != _this.getLastTdIndex(objTD)) {
	            		//之后不运行blur事件
	            		//_this.temp ++;
	            	}
					_this.dealInputEvent(objTD, oldText, $(this), true, "keydown");
	             	break;
				case 27:    //按下Esc，取消修改，吧文本框变成文本  
					_this.removeInput(objTD, oldText); //objTD.html(oldText);  
					break;
	     	}
		});
	}

	/*
	*	处理input相关事件的处理。
	*/
	this.dealInputEvent = function(objTD, oldText, inputObj, toNext, eventType) {
		var newText = inputObj.val();
		if(oldText != newText){
			_this.update(inputObj, eventType);
			/*if(toNext) {
		    	_this.jumpToNextTD(objTD);
		    }*/
		} else {
		    //前后文本一样，将文本框变成标签  
			_this.removeInput(objTD, newText); //objTD.html(newText);  
		    if(toNext) {
		    	_this.jumpToNextTD(objTD);
		    }
		} 
	}
	
	this.removeInput = function(objTD, newText) {
		//将文本框变成标签  
	    objTD.html(newText);  
	    objTD.dblclick(function(){
			_this.addInputToTD($(this));
		});
	}
}

/**
 * 弹出高级搜索
 */
function alertSearchBox(data){
	slideRight=null;
	cancelRight=null;
	AddCheck=null;

	var str = "<option value=\"-1\">请选择</option>";
	$.each(data , function(index,item){
		if(item.type=="date"){
			$(".highInput").attr("onClick","");
		}
		str = str + "<option data-type=\"" + item.type + "\" value=\"" + item.value + "\">" + item.text + "</option>"
	});
		
    var cloneNode='<div class="Condition">' +   
	'<select onchange="getInputType(this)">' + str +'</select>' +
	'<select>' +
	'<option value="like">相似</option>' +
	'<option value="not like">不相似</option>' +
/*	'<option value="A%">以..开始</option>' +
	'<option value="%A">以..结束</option>' +*/
	'<option value="=">相等</option>' +
	'<option value="!=">不相等</option>' +
	'<option value=">">大于</option>' +
	'<option value=">=">大于或等于</option>' +
	'<option value="<">小于</option>' +
	'<option value="<=">小于或等于</option>' +
	'<option value="in">包括在...</option>' +
	'<option value="not in">不包括...</option>' +
	'</select><br><input type="text" class="highInput" />' +
	/*'<button class="btn btn-danger btn-xs addBtnCondi" onclick="AddCheck()">增加条件</button>'+*/
	'<button class="btn btn-danger btn-xs deleteBtnCondi" onclick="deletecondit(this)"><span class="glyphicon glyphicon-remove-sign"></span> 删除条件</button>'+
	'<select class="selectKey">' +
	'<option value="and">并且</option>'+
	'<option value="or">或者</option>'+
	'</select>'+
	'</div>';
    
    var cloneGroupNode='<div class="outPkq">'+'<span>组间条件:</span>'+'<select class="outPkqSelect">' +
	'<option value="and">并且</option>'+
	'<option value="or">或者</option>'+
	'</select>'+'</div>'+'<div class="fengePkq">'+'</div>'+'<div class="groupCondition" style="border:1px skyblue solid">' + '<div class="Condition">' +
    '<fieldset>'+
    '<legend name="numLegend" style="display: block; width:70px;padding:7px;font-size: 13px;line-height: inherit;color: #333;border: 0;margin-bottom: 0px;">第1组</legend>'+
	'<select onchange="getInputType(this)">' + str +'</select>' +
	'<select>' +
	'<option value="like">相似</option>' +
	'<option value="not like">不相似</option>' +
/*	'<option value="A%">以..开始</option>' +
	'<option value="%A">以..结束</option>' +*/
	'<option value="=">相等</option>' +
	'<option value="!=">不相等</option>' +
	'<option value=">">大于</option>' +
	'<option value=">=">大于或等于</option>' +
	'<option value="<">小于</option>' +
	'<option value="<=">小于或等于</option>' +
	'<option value="in">包括在...</option>' +
	'<option value="not in">不包括...</option>' +
	'</select><br><input type="text" class="highInput" />' +
	'<button class="btn btn-danger btn-xs addBtnCondi" onclick="AddCheck(this)"><span class="glyphicon glyphicon-plus-sign"></span> 增加条件</button>'+
	'<button class="btn btn-danger btn-xs deleteBtnCondi" onclick="deletecondit(this)"><span class="glyphicon glyphicon-remove-sign"></span> 删除条件</button>'+
	'<select class="selectKey">' +
	'<option value="and">并且</option>'+
	'<option value="or">或者</option>'+
	'</select>'+'</fieldset>'+'</div>'+
	'</div>';
    
	slideRight = function(){
		if($("div .groupCondition").length==0){
			AddGroup();
			$(".outPkq").css("display","none");
			$(".fengePkq").css("display","none");
		}  
		$('#J_block_car_container').toggleClass('shower');
		$('#right-sidebar').removeClass('sidebar-open');
		/*$("body").append("<div class=\"search-background\" id=\"background\" onclick=\"hidebg()\"></div>");*/
		$("#background").show();
		
	}
	hidebg = function(){
		$("#background").hide();
		$('#J_block_car_container').toggleClass('shower');
	}

	AddCheck = function(pkq){
		$(pkq).parent().parent().append(cloneNode);
		//$(pkq).parent().nextAll().find(".addBtnCondi").css("display","none");
		//$(pkq).parent().nextAll().find(".deleteBtnCondi").css("right","64px");
		$(pkq).parent().parent().find('.selectKey:last').hide();
		$(pkq).parent().parent().find('.selectKey:first').css("margin","-56px 0px 0px 130px");
		$(pkq).parent().parent().find('.Condition').eq(0).css("margin-top","-10px");
		$(pkq).parent().nextAll().prevAll().find('.selectKey').show();
	};
	
	deletecondit=function(inx){
		if($(inx).parent().parent().find(".addBtnCondi").length>0){
			$(inx).parent().slideUp().remove();
		}
		//$(inx).parents('.Condition').slideUp().remove();
	};
	AddGroup = function(){
		var length=$(".groupCondition").length;
		$(".addCondition:last").append(cloneGroupNode);
		$(".groupCondition:last").find(".Condition").eq(0).find(".deleteBtnCondi").css("display","none");
		$(".groupCondition:last").find(".Condition").eq(0).find(".selectKey").css("display","none");
		$(".groupCondition:last").find('legend').html('第'+(length+1) + '组');
	}
	DeleteGroup = function(){
		if($(".groupCondition").length>1){
			$(".groupCondition:last").slideUp().remove();
			$(".outPkq:last").slideUp().remove();
			$(".fengePkq:last").slideUp().remove();
			updateNum($(".groupCondition").length);
		}
	}
	function updateNum (index) {
		var numLegend = $("legend[name='numLegend']");
		for(var i=index; i<numLegend.length; i++) {
			numLegend.eq(i).html("第" + (i+1) + "组");
		}
	}
	keySearch = function(event){
		var jianzhi = event.keyCode;
		if(jianzhi == 13){
			AdvancedSearch();
		}
	};
	getInputType = function(t){
		var dataType = $(t).find("option:selected").attr('data-type');
		if(dataType=="date"){
			$(t).parent().find(".highInput").attr({onclick:"laydate({istime: true, format: 'YYYY-MM-DD'})"}).addClass('laydate-icon');
		}else if(dataType=="datetime"){
			$(t).parent().find(".highInput").attr({onclick:"laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"}).addClass('laydate-icon');
		}else{
			if($(t).parent().find(".highInput").attr('onclick')){
				$(t).parent().find(".highInput").removeClass("laydate-icon");
				$(t).parent().find(".highInput").removeAttr('onclick');
			}
		}
	}
	AdvancedSearch = function(){
		var fistInputVal = $("div .groupCondition").eq(0).find(".highInput").val();
		var fistConditionSelectVal = $("div .groupCondition").eq(0).find("select").eq(1).val();
		var DTO = [];
		var groupsize = $("div .groupCondition").length;
		if(fistInputVal!=null){
			for(var i = 0 ;i<groupsize;i++){
				var consize = $("div .groupCondition").eq(i).find(".Condition").length;
				var searchDTOs = [];
				var groupLogicalOperator = null;
				if(i!=(groupsize-1)){
					groupLogicalOperator = $(".outPkqSelect").eq(i+1).val();
				}else {
					groupLogicalOperator = "";
				}
				for (var j = 0;j<consize;j++){
					var conObj = $("div .groupCondition").eq(i).find(".Condition").eq(j);
					var fieldName = conObj.find("select").eq(0).val();
					var condition = conObj.find("select").eq(1).val();
					var fieldValue = conObj.find("input").eq(0).val();
					var logicalOperator;
					if(j==(consize-1)){
						logicalOperator = "";
					}else{
						logicalOperator = conObj.find(".selectKey").val();
						logicalOperator = logicalOperator == null ? "" : logicalOperator;
					}
					var dtoObj = {
							"fieldName" : fieldName,
							"condition" : condition,
							"fieldValue" : fieldValue,
							"logicalOperator" : logicalOperator
					};
					if(dtoObj.fieldValue == "" && condition != "like" && condition != "not like") {
						new UserCommon().check("success","根据" + conObj.find("select").eq(1).children("option:selected").text() + "查询，输入框不能为空！",null,"warning");
						return;
					}
					
					searchDTOs.push(dtoObj);
				}
				groupLogicalOperator = groupLogicalOperator == null ? "": groupLogicalOperator;
				var advancedDTO = {
						"searchDTOs" : searchDTOs,
						"groupLogicalOperator" : groupLogicalOperator
				};
				DTO.push(advancedDTO);
			}
		}
		
		if(DTO[0].searchDTOs[0].fieldValue!=null){
			advancedSearch(DTO);
		}
		//$('#J_block_car_container').toggleClass('shower');
		hidebg();
	}
	
	$.ajax({
		  url: "../../manage/comonSearch.html",
		  datatype: "text",
		  type: "get",
		  success: function (data) {
				$('body').append($(data));
		  }
	});
}

//初始化高级搜索的数据，可用来查询所有。
var initAdvancedSearchData = "[{\"searchDTOs\":[{\"fieldName\":\"-1\",\"condition\":\"like\",\"fieldValue\":\"\",\"logicalOperator\":\"\"}],\"groupLogicalOperator\":\"\"}]";

/*高级搜索请求获取构建下拉菜单所需数据*/
$(document).ready(function() {
	
	menuCode = Request["menuCode"];
	function getSearchValue(){
		$.ajax({
			url: "../../menuPojoAdmin/getSearchNeedSelect/" + menuCode,
			datatype: "json",
			type: "get",
			data: {},
			success: function (data, status, xhr) {
				//console.log(data);
				alertSearchBox(data);
			}
		});
	} 
	if(typeof(menuCode) != "undefined") {
		getSearchValue();
	}
});

/**
 * JqGridUtil是封装了JqGrid的工具类。
 */
function JqGridUtil() {};

/**
 * 根据直接获取所有数据的接口url，以及展现fieldTitles，fieldModels进行构建jqGrid表格。
 * @param dataObj 包含三个属性：allDataUrl，fieldTitles，fieldModels
 * @param gridId
 * @param pagerId
 */
JqGridUtil.prototype.initTableForAllData = function(dataObj, gridId, pagerId) {
	$.ajax({
		url: allDataUrl,
		datatype: "json",
		type: "get",
		data: {},
		success: function (data, status, xhr) {
			if(typeof(data) != "object") data = JSON.parse(data);
			
			var grid = $("#" + gridId).jqGrid({
				data: data,
				datatype: "local",
				height: 36*5,
				autowidth: true,
				shrinkToFit: true,
				rowNum: 2,
				rowList: [2],
				colNames: dataObj.fieldTitles,
				colModel: dataObj.fieldModels,
				pager: "#" + pagerId,
				viewrecords: true,
				hidegrid: false,
				sortable: false,
			});
			
			//禁掉排序
			/*var columnNames = grid.jqGrid('getGridParam','colModel');
			for (i = 0; i < columnNames.length; i++) {
				grid.setColProp(columnNames[i].index, { sortable: false });
			}*/
		}
	});
}

/**
 * 在initTableForLazy方法中被调用来更新表单数据的。根据gridTable, panelElement, pageNo和pageSize更新mydata数据，即更新table的数据
 * @param grid
 * @param mydata
 * @param panelElement
 * @param pageNo
 * @param pageSize
 */
JqGridUtil.prototype.updateGridTable = function(grid, mydata, panelElement, pageNo, pageSize) {
	var countUrl = projectName + panelElement.panelData.countUrl.replace(/{userId}/g, currentUserId);
	countUrl = countUrl.replace(/{userNo}/g, currentUserNo);
	countUrl = countUrl.replace(/{selPri}/g, panelElement.priData.viewPri);
	var url = projectName + panelElement.panelData.url.replace(/{userId}/g, currentUserId);
	url = url.replace(/{userNo}/g, currentUserNo);
	url = url.replace(/{selPri}/g, panelElement.priData.viewPri);
	url = url.replace(/{pageNo}/g, pageNo);
	url = url.replace(/{pageSize}/g, pageSize);
	$.ajax({
		url: countUrl,
		datatype: "json",
		type: "get",
		data: {},
		success: function (data, status, xhr) {
			//获取数据总条数，赋值到mydata.totalRecords中
			//mydata.totalRecords = ...;
			//根据pageNo和pageSize发请求获取数据集,赋值到mydata.rows中
			mydata.totalRecords = data;
			mydata.totalPages = (mydata.totalRecords%pageSize==0 ? mydata.totalRecords/pageSize : mydata.totalRecords/pageSize+1);
			$.ajax({
				url: url,
				datatype: "json",
				type: "get",
				data: {},
				success: function (data, status, xhr) {
					if(typeof(data) != "object") data = JSON.parse(data);
					mydata.rows = data;
					grid.trigger('reloadGrid');
				}
			});
		}
	});
}

/**
 * 根据panelElement使用懒加载填充表单
 * @param panelElement 首页面板元素对象
 * @param gridId 表单table的id
 * @param pagerId 分页器的id
 */
JqGridUtil.prototype.initTableForLazy = function(panelElement, gridId, pagerId) {
	var _this = this;
	var mydata = {totalPages: 1, currPage: 1, totalRecords: 1, rows: []};
  
	var reader = {
		  root: function(obj) { return mydata.rows; },
		  page: function(obj) { return mydata.currPage; },
		  total: function(obj) { return mydata.totalPages; },
		  records: function(obj) { return mydata.totalRecords; }
	};
  
	var grid = $("#" + gridId).jqGrid({
		datatype: "local",
		height: 36*5,
		autowidth: true,
		shrinkToFit: true,
		rowNum: 5,
		rowList: [5,10],
		colNames: panelElement.panelData.fieldTitles,
		colModel: panelElement.panelData.fieldModels,
		pager: "#" + pagerId,
		viewrecords: true,
		hidegrid: false,
		sortable: false,
		onSortCol: function(a,b,c) {
			console.log(a,b,c);
		},
		onPaging: function(data, obj){
			var pageNo;
			var pageSize = grid.getGridParam('rowNum');
			switch(data) {
			case "first":
			pageNo = 1;
				break;
			case "last":
				pageNo = mydata.totalPages;
				break;
			case "next":
				pageNo = mydata.currPage+1;
				break;
			case "prev":
				pageNo = mydata.currPage-1;
				break;
			case "user":
				pageNo = $("#" + pagerId + " input[role='textbox']").val();
				//验证数据是否是整数
				var reg = /^(-){0,1}\d+$/;
				if(!reg.test(pageNo)) {
					new UserCommon().check("success","页码格式错误！请重新输入！",null,"warning");
					setTimeout(function() {
						$("#" + pagerId + " input[role='textbox']").focus();
					});
					return;
				}
				break;
			case "records":
				pageNo = mydata.currPage;
				pageSize = $(obj).val();
				mydata.totalPages = (mydata.totalRecords%pageSize==0 ? mydata.totalRecords/pageSize : mydata.totalRecords/pageSize+1);
				break;
			}
			pageNo = Math.min(pageNo, Math.floor(mydata.totalPages));
			pageNo = Math.max(pageNo, 1);

			mydata.currPage = pageNo;

			//跳转页码，更新数据
			_this.updateGridTable(grid, mydata, panelElement, pageNo, pageSize);
		},
		localReader: reader
	});
	
	//禁掉排序
	var columnNames = grid.jqGrid('getGridParam','colModel');
	for (i = 0; i < columnNames.length; i++) {
		grid.setColProp(columnNames[i].index, { sortable: false });
	}
	 
	var pageSize = grid.getGridParam('rowNum');
	//初始化数据为第一页内容
	_this.updateGridTable(grid, mydata, panelElement, 1, pageSize);
}


/**
*	gridTable对象
*/
function GridTable(formId, tableId) {
	var _this = this;
	this.formId = formId;
	this.tableId = tableId;
	this.gridTableThs = $("#" + this.tableId).prev().find("th");
	this.selectValTr;
	
	this.clearForm = function() {
		$.each(this.gridTableThs, function(index, item) {
			var fieldName = $(item).attr("fieldName");
			$("#" + formId + " input[name='" + fieldName + "']").val("");
			$("#" + formId + " textarea[name='" + fieldName + "']").val("");
		});
	}
	
	this.insert = function () {
		var formJson = $("#" + formId).serializeNestedObject();
		console.log(formId,formJson)
		new UserCommon().fillGridTable(tableId, formJson, null);
		this.clearForm();
	}
	
	this.selectTr = function(that) {
		this.selectValTr = $(that);
		var trDataJson = {};
		$("#" + tableId + " tr").removeClass("Sactive");
		$(that).addClass("Sactive");
		$.each(this.gridTableThs, function(index, item) {
			var fieldName = $(item).attr("fieldName");
			trDataJson[fieldName] = _this.selectValTr.children("td:eq(" + index + ")").text();
		});
		new UserCommon().fillForm(this.formId, trDataJson);
	}
	
	this.deleteFormTr = function() {
		if(this.selectValTr) {
			this.selectValTr.remove();
			this.clearForm();
		}
	}
}
UserCommon.prototype.fillGridTable = function(tbodyId,item,index) {
	//定义TableUtil工具类
	function TableUtil(tbodyId,item,index) { 
		var _this = this;
		//添加相关属性
		this.tbodyId = tbodyId;
		this.item = item;
		this.index = index;
		this.thArray = null;
		//添加init方法
		this.init = function() {
			var thArray = new Array();
			//首先添加tr的fieldType和fieldName
			var trObj = new Object();
			var trForTh = $("#" + this.tbodyId).prev().find("tr:eq(0)");
			if(trForTh.children("th").length == 0) {
				trForTh = $("#" + this.tbodyId).prev().find("tr:eq(1)");
			}
			trObj.fieldType = trForTh.attr("fieldType");
			trObj.fieldName = trForTh.attr("fieldName");
			thArray.push(trObj);
			//再添加th的fieldType和fieldName
			var theads = trForTh.find("th");
			theads.each(function (thIndex,element){
				var obj = new Object();
				obj.fieldType = $(element).attr("fieldType");
				obj.fieldName = $(element).attr("fieldName");
				thArray.push(obj);
			});
			//给类的thArray属性赋值
			this.thArray = thArray;
		};
		//添加fillTable方法,根据赋值好的thArray动态填充table
		this.fillTable = function() {
			var str = "";
			$.each(this.thArray, function(thIndex,thObj){
				if(thIndex == 0) {
					//构建tr
					str = str + "<tr onclick=\"selectTr(this)\" >";
				} else {
					//构建tr里的td
					if(thObj.fieldType == "num") {
						str = str + "<td>" + (_this.index+1) + "</td>";
					} else if(thObj.fieldType == "text") {
						if(eval("_this.item." + thObj.fieldName.split(".")[0]) != null) {
							str = str + "<td>" + eval("_this.item." + thObj.fieldName) + "</td>";
						} else {
							str = str + "<td></td>";
						}
					} else if(thObj.fieldType == "datetime") {
						str = str + "<td>" + eval("_this.item." + thObj.fieldName).substring(0, 19) + "</td>";
					} else if(thObj.fieldType == "date") {
						str = str + "<td>" + eval("_this.item." + thObj.fieldName).substring(0, 10) + "</td>";
					}
				}
				//在最后加上</tr>
				if(thIndex == _this.thArray.length) {
					str = str + "</tr>";
				}
			}); 
			$("#" + this.tbodyId).append(str);
		};     
	}     
	//调用
	var tableUtil = new TableUtil(tbodyId,item,index);     
	tableUtil.init();
	tableUtil.fillTable();
}
