function showCategoryTree(){
	var _this = this;
    window.parent.bootbox.dialog({
	    message: $("#categoryTreeModal").html(),
	    title: "选择框架",
	    lage: true,
	    className: "modal-inverse",
	    buttons: {
	      success: {
	        label: "确认",
	        className: "btn-primary",
	        callback: function () {
	        	var $element = $(window.parent.document).find("#categoryTreeIframe").contents().find(".select-category-area");
	        	//页面自定义callback函数共用
	        	categoryTreeCall($element.attr("treeid"), $element.attr("treename"), $element.text().trim(), $element.attr("dbcode"));
	        }
	    },
	    cancel: {
	        label: "取消",
	        className: "btn-primary"
	    }
    }
  });
}

$(document).ready(function () {
	// 选择框架
	$("body").delegate(".select-category-js", "click", showCategoryTree);
});