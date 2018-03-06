//formatter参数
//cellvalue - 当前cell的值  
//options - 该cell的options设置，包括{rowId, colModel,pos,gid}  
//rowObject - 当前cell所在row的值
var homePagePanelJson = [
				{
					"type": "table1",
					"title": "问卷调查",
					"menuCode": "A00_04",  //若title为空，自动去找menuName
					"fieldTitles": ["问卷名称","问卷时间","截止时间"],
					"fieldNames": ["title","createdate","enddate"],
					"fieldModels": [{name: "title", index: "title", width: 100}, 
					                {name: "createdate",index: "createdate",width: 90, formatter: function(cellValue, options, rowObject) { return cellValue.substring(0,19);}},
					                {name: "enddate",index: "enddate",width: 90, formatter: function(cellValue, options, rowObject) { return cellValue.substring(0,19);}}],
					"countUrl": "/ssVoteAdmin/votesCountByUserPri/{userId},{selPri}",
					"url": "/ssVoteAdmin/votesByUserPriLazy/{userId},{selPri},{pageNo},{pageSize}",
					"panelDivId": "panel_list_0",
					"gridId": "table_list_0",
					"pagerId": "pager_list_0",
					"index": 0,
					"hide": false
				},
				{
					"type": "table1",
					"title": "入网证书",
					"menuCode": "C00_15",  //若title为空，自动去找menuName
					"fieldTitles": ["入网编号","入网单位","入网时间"],
					"fieldNames": ["netinNo","netinUnit","netindate"],
					"fieldModels": [{name: "netinNo", index: "netinNo", width: 60}, 
					                {name: "netinUnit", index: "netinUnit", width: 100}, 
					                {name: "netindate",index: "netindate",width: 90, formatter: function(cellValue, options, rowObject) { return cellValue.substring(0,10);}}],
					"countUrl": "/NetinAdmin/NetinsCount/",
					"url": "/NetinAdmin/netinsByPageNoAndSize/{pageNo},{pageSize}",
					"panelDivId": "panel_list_1",
					"gridId": "table_list_1",
					"pagerId": "pager_list_1",
					"index": 1,
					"hide": false
				},
				{
					"type": "table1",
					"title": "出差报告",
					"menuCode": "E00_10",  //若title为空，自动去找menuName
					"fieldTitles": ["客户名称","业务员","开始日期","结束日期"],
					"fieldNames": ["customer.customerName","user.userName","fromdate","enddate"],
					"fieldModels": [{name: "customer.customerName", index: "customer.customerName", width: 200}, 
					                {name: "user.userName", index: "user.userName", width: 60}, 
					                {name: "fromdate",index: "fromdate",width: 90, formatter: function(cellValue, options, rowObject) { return cellValue.substring(0,10);}},
					                {name: "enddate",index: "enddate",width: 90, formatter: function(cellValue, options, rowObject) { return cellValue.substring(0,10);}}],
					"countUrl": "/busTripReportAdmin/btReportsCountByUserPri/{userId}",
					"url": "/busTripReportAdmin/btReportsByUserPriLazy/{userId},{pageNo},{pageSize}",
					"panelDivId": "panel_list_2",
					"gridId": "table_list_2",
					"pagerId": "pager_list_2",
					"index": 2,
					"hide": false
				},
				{
					"type": "table1",
					"title": "周例会",
					"menuCode": "C00_14",  //若title为空，自动去找menuName
					"fieldTitles": ["周例会","创建时间"],
					"fieldNames": ["monthWeek","createdate"],
					"fieldModels": [{name: "monthWeek", index: "monthWeek", width: 60, formatter: function(cellValue, options, rowObject) { var valArr = cellValue.split("|"); return valArr[0]+"年"+valArr[1]+"月"+"第"+valArr[2]+"周";}}, 
					                {name: "createdate",index: "createdate",width: 90, formatter: function(cellValue, options, rowObject) { return cellValue.substring(0,19);}}],
					"countUrl": "/weekMeetingAdmin/countByPri/{userId}",
					"url": "/weekMeetingAdmin/selectByPriLazy/{userId},{pageNo},{pageSize}",
					"panelDivId": "panel_list_3",
					"gridId": "table_list_3",
					"pagerId": "pager_list_3",
					"index": 3,
					"hide": false
				},
				{
					"type": "table1",
					"title": "扣分记录",
					"menuCode": "C00_12",  //若title为空，自动去找menuName
					"fieldTitles": ["员工名称","对应制度","得分","日期"],
					"fieldNames": ["employee.userName","institution.name","createdate"],
					"fieldModels": [{name: "employee.userName", index: "employee.userName", width: 60}, 
					                {name: "institution.name", index: "institution.name", width: 100}, 
					                {name: "score",index: "score",width: 90, formatter: function(cellValue, options, rowObject) { return "<span class=\"badge badge-danger\">" + cellValue + "分</span>";}},
					                {name: "createdate",index: "createdate",width: 90, formatter: function(cellValue, options, rowObject) { return cellValue.substring(0,10);}}],
					"countUrl": "/uScoreAdmin/uScoresCountByUserPri/{userId},{selPri}",
					"url": "/uScoreAdmin/uScoresByUserPriLazy/{userId},{selPri},{pageNo},{pageSize}",
					"panelDivId": "panel_list_4",
					"gridId": "table_list_4",
					"pagerId": "pager_list_4",
					"index": 4,
					"hide": false
				},
				{
					"type": "table1",
					"title": "考勤管理",
					"menuCode": "A00_06",  //若title为空，自动去找menuName
					"fieldTitles": ["员工名称","考勤日期","签到时间","签退时间","备注","异常情况"],
					"fieldNames": ["userName","date","signInTime","signOutTime","note","unusual"],
					"fieldModels": [{name: "userName", index: "userName", width: 60}, 
					                {name: "date", index: "date", width: 60}, 
					                {name: "signInTime", index: "signInTime", width: 60}, 
					                {name: "signOutTime", index: "signOutTime", width: 60}, 
					                {name: "note", index: "note", width: 60}, 
					                {name: "unusual",index: "unusual",width: 90}],
					"countUrl": "/checkOutAdmin/getCountByUserNo/{userNo}",
					"url": "/checkOutAdmin/getCheckOutsLazy/{userNo},{pageNo},{pageSize}",
					"panelDivId": "panel_list_5",
					"gridId": "table_list_5",
					"pagerId": "pager_list_5",
					"index": 5,
					"hide": false
				},
				/*{
					"type": "table",
					"title": "考勤管理",
					"menuCode": "A00_06",  //若title为空，自动去找menuName
					"fieldTitles": ["员工名称","考勤日期","签到时间","签退时间"],
					"fieldNames": ["user.userName","attDate","signInTime","signOutTime"],
					"countUrl": "/attAdmin/attsCountByUserPri/{userId},{selPri}",
					"url": "/attAdmin/attsByUserPriLazy/{userId},{selPri},{pageNo},{pageSize}",
					"index": 5,
					"hide": false
				},*/
				{
					"type": "table1",
					"title": "紧急求购",
					"menuCode": "K00_02",  //若title为空，自动去找menuName
					"fieldTitles": ["品名","材质","规格","执行标准","联系人"],
					"fieldNames": ["proName","dSteel","dSpec","dStandards","contact"],
					"fieldModels": [{name: "proName", index: "proName", width: 60}, 
					                {name: "dSteel",index: "dSteel",width: 90},
					                {name: "dSpec",index: "dSpec",width: 90},
					                {name: "dStandards",index: "dStandards",width: 90},
					                {name: "contact",index: "contact",width: 90}],
					"countUrl": "/ordersAdmin/ordersCount",
					"url": "/ordersAdmin/ordersLazy/{pageNo},{pageSize}",
					"panelDivId": "panel_list_6",
					"gridId": "table_list_6",
					"pagerId": "pager_list_6",
					"index": 6,
					"hide": false
				},
				{
					"type": "table1",
					"title": "客户管理",
					"menuCode": "E00_01",  //若title为空，自动去找menuName
					"fieldTitles": ["客户名称","客户来源","客户类型","业务员","发布时间"],
					"fieldNames": ["customerName","source","type","salesman.userName","createdate"],
					"fieldModels": [{name: "customerName", index: "customerName", width: 60}, 
					                {name: "source",index: "source",width: 90},
					                {name: "type",index: "type",width: 90},
					                {name: "salesman.userName",index: "salesman.userName",width: 90},
					                {name: "createdate",index: "createdate",width: 90, formatter: function(cellValue, options, rowObject) { return cellValue.substring(0,19);}}],
					"countUrl": "/cusAdmin/cusesCountByUserPri/{userId},{selPri}",
					"url": "/cusAdmin/cusesByUserPriLazy/{userId},{selPri},{pageNo},{pageSize}",
					"panelDivId": "panel_list_7",
					"gridId": "table_list_7",
					"pagerId": "pager_list_7",
					"index": 7,
					"hide": false
				},
				{
					"type": "table1",
					"title": "项目管理",
					"menuCode": "I00_01",  //若title为空，自动去找menuName
					"fieldTitles": ["项目名称","项目区域","项目领域","业务员"],
					"fieldNames": ["projectName","area","type","salesman.userName"],
					"fieldModels": [{name: "projectName", index: "projectName", width: 60}, 
					                {name: "area",index: "area",width: 90},
					                {name: "type",index: "type",width: 90},
					                {name: "salesman.userName",index: "salesman.userName",width: 90}],
					"countUrl": "/projectAdmin/proesCountByUserPri/{userId},{selPri}",
					"url": "/projectAdmin/proesByUserPriLazy/{userId},{selPri},{pageNo},{pageSize}",
					"panelDivId": "panel_list_8",
					"gridId": "table_list_8",
					"pagerId": "pager_list_8",
					"index": 8,
					"hide": false
				}
			];