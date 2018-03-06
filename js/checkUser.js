var currentUserId = window.parent.currentUserId;
var currentUserNo = window.parent.currentUserNo;
var currentUserName = window.parent.currentUserName;
var currentUserPos = window.parent.currentUserPos;
var currentDeptId = window.parent.currentDeptId;
//获取主机地址之后的目录，如： SSAPP/manage/backManage.html
var pathName = window.document.location.pathname;
//获取带"/"的项目名，如：/SSAPP
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

$(document).ready(function(){ 
	
	
    
    //检查被踢状态，若被踢，返回对应url
    $.ajax({
    	url: projectName + "/sessionAdmin/getKickoutStatus/false",
    	datatype: "json",
    	type: "get",
    	data: {},
    	success: function (data, status, xhr) {
    		if(data.status == 1) {
    			//被踢了，执行跳转
    			window.top.location.href = projectName + data.msg;
    		}
    	} 
    });
    
    //取用户，同时验证session是否过期。若过期，跳转至登陆页面。
	/*if(typeof(currentUserId) != "undefined") {
		return;
	} else {*/
		$.ajax({
		      url: projectName + "/sessionAdmin/getUser",
		      datatype: "json",
		      type: "get",
		      data: {},
		      success: function (data, status, xhr) {
		    	  if(data.status == 1) {
		    		  var obj = eval("(" + data.msg + ")");
		    		  currentUserId = obj.userId;
		    		  currentUserNo = obj.userNo;
		    		  currentUserName = obj.userName;
		    		  currentUserPos = obj.positionId;
		    		  currentDeptId = obj.deptId;
		    	  } else {
		    		  window.top.location.href = projectName + data.msg;
		    	  }
		      } 
		});
	//}
	

	/*window.onbeforeunload = function(){  
        var warning="确认退出?";
        console.log(2);
        return warning;  
    };  
    window.onunload = function(){  
        var warning="谢谢光临";
        console.log(11);
        return warning;
    };*/  
    
});