/*angularjs自动化表单部分*/
var wholeFormStyle = $.cookie("wholeFormStyle");
var useAngularForm = false;
if(wholeFormStyle == "newStyle") {
	useAngularForm = true;
	/*document.write('<link rel="stylesheet" href="../../form/plugs/scroller/css/normalize.css">');
	document.write('<link rel="stylesheet" href="../../form/plugs/scroller/css/jquery-ui.theme.min.css">');*/
	/*document.write('<link rel="stylesheet" href="../../form/plugs/scroller/css/jquery.mCustomScrollbar.min.css">');*/
	/*document.write('<link rel="stylesheet" href="../../form/plugs/scroller/css/bootstrap.min.css">');*/
	document.write('<link rel="stylesheet" href="../../form/css/jquery-ui.css">');
	document.write('<link rel="stylesheet" href="../../form/css/angular-gridster.min.css">');
	document.write('<link rel="stylesheet" href="../../form/css/styless.css">');
	document.write('<link rel="stylesheet" href="../../form/alfont/iconfont.css">');
	document.write('<link rel="stylesheet" href="../../form/css/form.css">');
	document.write('<link rel="stylesheet" href="../../form/css/docs.min.css">');
	document.write('<script src="../../form/js/angular.min.js"></script>');
	/*document.write('<script src="../../form/js/angular-ui-router.min.js"></script>');*/
	document.write('<script src="../../form/js/bootstrap.min.js"></script>');
	document.write('<script src="../../form/js/jquery.ba-resize.js"></script>');
	document.write('<script src="../../form/js/angular-gridster.js"></script>');
	document.write('<script src="../../form/js/ui-bootstrap-tpls.min.js"></script>');
	document.write('<script src="../../form/js/angular-strap.js" ></script>');
	document.write('<script src="../../form/js/angular-strap.tpl.min.js" ></script>');
	document.write('<script src="../../form/js/angular-sanitize.min.js"></script>');
	document.write('<script src="../../form/js/angular-locale_zh-cn.js"></script>');
	
	/*滚动条插件*/
	/*document.write('<script src="../../form/plugs/scroller/js/jquery-ui-1.10.4.min.js"></script>');*/
	/*document.write('<script src="../../form/plugs/scroller/js/jquery.mCustomScrollbar.concat.min.js"></script>');*/
	document.write('<script src="../../form/module/appmodule.js"></script>');
	document.write('<script src="../../form/controller/controllers.js"></script>');
	document.write('<script src="../../form/server/server.js"></script>');
}
