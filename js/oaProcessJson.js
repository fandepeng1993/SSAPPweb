var processJson = window.parent.processJson;
if(!projectName) projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

/**
 * 更新面板信息列表。
 * @param successCallBack 回调函数
 */
function getProcessJson(successCallBack) {
	if(processJson) {
		//console.log(processJson);
		//若已经取过processJson信息
		if(successCallBack) successCallBack(processJson);
	} else {
		//若还未取processJson信息，发请求去取
		$.ajax({
			url: projectName + "/processPanelAdmin/selectAll",
			datatype: "json",
			type: "get",
			data: {},
			success: function (data, status, xhr) {
				processJson = data;
				if(successCallBack) successCallBack(processJson);
			} 
		});
		
	}
}

getProcessJson();

/*var processJson ={
	"travelProcess": {
	"name": "出差申请单",
	"type": "行政管理",
	"processDefinitionKey": "travelProcess",
	"menuCode": "L00_01"
},
"entryProcess": {
	"name": "入职申请单",
	"type": "人事管理",
	"processDefinitionKey": "entryProcess",
	"menuCode": "L00_02"
},
"quitProcess": {
	"name": "离职申请单",
	"type": "人事管理",
	"processDefinitionKey": "quitProcess",
	"menuCode": "L00_03"
},

"sealApplyProcess": {
	"name": "公章申请单",
	"type": "行政管理",
	"processDefinitionKey": "sealApplyProcess",
	"menuCode": "L00_04"
},
"outCarDoorProcess": {
	"name": "出门出车单",
	"type": "行政管理",
	"processDefinitionKey": "outCarDoorProcess",
	"menuCode": "L00_05"
},
"socialApplyProcess": {
	"name": "应酬申请单",
	"type": "行政管理",
	"processDefinitionKey": "socialApplyProcess",
	"menuCode": "L00_06"
},
"leaveProcess": {
	"name": "请假申请单",
	"processDefinitionKey": "leaveProcess",
	"menuCode": "L00_07",
},
"cardProcess": {
	"name": "补卡申请单",
	"processDefinitionKey": "cardProcess",
	"menuCode": "L00_08",
},
"overtimeProcess": {
	"name": "加班申请单",
	"processDefinitionKey": "overtimeProcess",
	"menuCode": "L00_09",
},
"outSendProcess": {
	"name": "外发货通知单",
	"processDefinitionKey": "outSendProcess",
	"menuCode": "L00_10",
},
"clientVisitProcess": {
	"name": "客户来访联络函",
	"processDefinitionKey": "clientVisitProcess",
	"menuCode": "L00_11",
},
"commitmentProcess": {
	"name": "承诺书",
	"processDefinitionKey": "commitmentProcess",
	"menuCode": "L00_12",
},
"bidRecordProcess": {
	"name": "投标备案审批表",
	"processDefinitionKey": "bidRecordProcess",
	"menuCode": "L00_13",
},
"sampleProcess": {
	"name": "样品申请作业",
	"processDefinitionKey": "sampleProcess",
	"menuCode": "L00_14",
},
"orderChangeProcess": {
	"name": "订单变更/取消",
	"processDefinitionKey": "orderChangeProcess",
	"menuCode": "L00_15",
},
"orderCloseProcess": {
	"name": "订单结案",
	"processDefinitionKey": "orderCloseProcess",
	"menuCode": "L00_16",
},
"transportProcess": {
	"name": "运输申请单",
	"processDefinitionKey": "transportProcess",
	"menuCode": "L00_17",
},
"disqualificationProcess": {
	"name": "不合格品处置",
	"processDefinitionKey": "disqualificationProcess",
	"menuCode": "L00_18",
},
"inventoryProcess": {
	"name": "库存改制申请",
	"processDefinitionKey": "inventoryProcess",
	"menuCode": "L00_19",
},
"productionProcess": {
	"name": "生产指令单",
	"processDefinitionKey": "productionProcess",
	"menuCode": "L00_20",
},
"supplementaryProcess": {
	"name": "补料单",
	"processDefinitionKey": "supplementaryProcess",
	"menuCode": "L00_21",
},
"equipmentProcess": {
	"name": "设备保修/保养单",
	"processDefinitionKey": "equipmentProcess",
	"menuCode": "L00_22",
},
"returnsProcess": {
	"name": "退货通知单",
	"processDefinitionKey": "returnsProcess",
	"menuCode": "L00_23",
},
"purchaseProcess": {
	"name": "采购超收申请单",
	"processDefinitionKey": "purchaseProcess",
	"menuCode": "L00_24",
},
"paymentProcess": {
	"name": "付款申请单",
	"processDefinitionKey": "paymentProcess",
	"menuCode": "L00_25",
},
"elseProcess": {
	"name": "其他费用申请",
	"processDefinitionKey": "elseProcess",
	"menuCode": "L00_26",
},
"billProcess": {
	"name": "票据先行流程",
	"processDefinitionKey": "billProcess",
	"menuCode": "L00_27",
}

};*/