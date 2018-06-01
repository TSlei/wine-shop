function returnModifyApplyPage() {
	location.href = "/gldata/myIndicator/toPageEditApply";
}

function removeModifyApply(){
	var id = $("#applyId").val();
	bootbox.dialog({
	    message: '确定删除该选项',
	    title: "确定删除",
	    className: "modal-inverse fn-sm",
	    buttons: {
	      success: {
	        label: "确定",
	        className: "btn-primary",
	        callback: function () {
	        	$(".remove-modify-apply-js").attr("disabled", "disabled");
	    		loading.start();
	        	$.ajax({
	        		type : 'POST',
	        		url : "/gldata/myIndicator/saveDeleteEditApply",
	        		data : {
	        			id : id
	        		},
	        		success : function(result) {
	        			$(".remove-modify-apply-js").removeAttr("disabled");
        				loading.end();
	        			if(result.status=='200'){
	        				bootbox.hideAll();
	        				$.msg("删除成功!");
	        				setTimeout(function(){
	    						returnEditPage();//跳转到首页
	    					},500);
	        			}else{
	        				$.err(result.msg);
	        			}
	        		}
	            });
	        	return false;
	        }
	      },
	      cancel: {
	        label: "取消",
	        className: "btn-primary"
	      }
	    }
	  });
}

function saveModifyApply(){
	$('.modify-apply-edit-form').bootstrapValidator('validate');
	if ($('.modify-apply-edit-form').data('bootstrapValidator').isValid()) {
		var applyIndexVO = $(".modify-apply-edit-form").serialize();
		$(".save-modify-apply-js").attr("disabled", "disabled");
		loading.start();
		$.ajax({
			type : 'POST',
			url : "/gldata/myIndicator/saveModifyEditApply",
			data : applyIndexVO,
			success : function(result) {
				$(".save-modify-apply-js").removeAttr("disabled");
				loading.end();
				if(result.status=='200'){
					$.msg("修改成功!");
					setTimeout(function(){
						returnEditPage();//跳转到首页
					},500);
				}else{
					$.err(result.msg);
				}
			}
	    });
	}
	
}

function returnEditPage(){
	window.location.href = "/gldata/myIndicator/toPageEditApply";
} 

$(document).ready(function() {
	$('.modify-apply-edit-form').bootstrapValidator({
		message : '输入错误，请重新输入'
	});
	
	$(".remove-modify-apply-js").on("click", function(){
		removeModifyApply();
	});
	
	$(".return-modify-apply-js").on("click", function(){
		returnModifyApplyPage();
	});
	
	$(".save-modify-apply-js").on("click", function(){
		saveModifyApply();
	});
});