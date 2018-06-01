$("body").on("click",".selectCategory",function(){
	if($(this).next().val() == $("#mainId").val()){
		top.$.err("关联主框架不可修改");
		return;
	}
	var dom_input = $(this);
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
//	        	categoryTreeCall($element.attr("treeid"), $element.attr("treename"), $element.text().trim(), $element.attr("dbcode"));
	        	if($("#mainId[value='"+$element.attr("treeid")+"']").length > 0 ){
	        		top.$.err("选择框架为主框架");
	        		return false;
	        	}
	        	if($(".selectCategoryId[value='"+$element.attr("treeid")+"']").length > 0){
	        		top.$.err("已选择该框架");
					return false;
				}
	        	dom_input.val($element.attr("treename"));
	        	dom_input.next().val($element.attr("treeid"));
	        }
	    },
	    cancel: {
	        label: "取消",
	        className: "btn-primary"
	    }
    }
  });
});
$("body").on("click","#selectCategorys .rowAddBtn",function(){
	var html = $("<div class='row'>"+$(this).parents(".row").html()+"</div>");
	$(html).find(".selectCategory").val("");
	$(html).find(".selectCategoryId").val("");
	$("#selectCategorys").append(html);
});
$("body").on("click","#selectCategorys .rowDelBtn",function(){
	if($(this).parents(".row:eq(0)").find(".selectCategoryId").val()==$("#mainId").val()){
		top.$.err("主框架不可删除");
		return;
	}
	if($("#selectCategorys .row").length == 1){
		var html = $("<div class='row'>"+$(this).parents(".row").html()+"</div>");
		$(html).find(".selectCategory").val("");
		$(html).find(".selectCategoryId").val("");
		$("#selectCategorys").append(html);
	}
	$(this).parents(".row:eq(0)").remove();
});

$("body").on("click","#submitBtn",function(){
	var vo = {};
	var categoryIds = new Array();
	$("#selectCategorys .selectCategoryId").each(function(i,e){
		if($(e).val()!="" && $(e).val() != $("#mainId").val()){
			categoryIds.push($(e).val());
		}
	});
	vo["categoryIds"]=categoryIds;
	vo["indexCode"]=$("#indexCode").val();
	$.ajax({
		type : 'POST',
		url : "/gldata/coreCategory/doLinkMetrics",
		data: JSON.stringify(vo),//将对象序列化成JSON字符串  
	    dataType:"json",
	    contentType : 'application/json;charset=utf-8', //设置请求头信息  
		success : function(result) {
			//console.log(result);
			if(result.status=='200'){
				top.$.msg("操作成功");
				setTimeout(function() {
					history.go(-1);
			    }, 3000);
			}else{
				top.$.err(result.msg);
			}
		}
    });
});
