function categoryTreeCall(categoryId, categoryName, categoryPath){
	//1.id
	$("input[name='categoryId']").val(categoryId);
	
	//2.name
	$("input[name='categoryName']").val(categoryName);
	
	//3.path
	$("input[name='categoryPath']").val(categoryPath);
	
	setTimeout(function(){
		$('form').data('bootstrapValidator').updateStatus("categoryId","VALID",null);
		$('form').data('bootstrapValidator').updateStatus("categoryName","VALID",null);
		$('form').data('bootstrapValidator').updateStatus("categoryPath","VALID",null);
	}, 200);
}

function updateApplyIndex(){
	$('.edit-indicator-form').bootstrapValidator('validate');
	if ($('.edit-indicator-form').data('bootstrapValidator').isValid()) {
		bootbox.dialog({
		    message: '确定修改指标吗?',
		    title: "修改指标",
		    className: "modal-inverse fn-sm",
		    buttons: {
		      success: {
		        label: "确定",
		        className: "btn-primary",
		        callback: function () {
		        	var applyIndexVO = $(".edit-indicator-form").serialize();
		        	$(".update-apply-index").attr("disabled", "disabled");
		    		loading.start();
		    		$.ajax({
		    			type : 'POST',
		    			url : "/gldata/myIndicator/saveEditAddApply",
		    			data : applyIndexVO,
		    			success : function(result) {
		    				$(".update-apply-index").removeAttr("disabled");
	    		    		loading.end();
		    				if(result.status=='200'){
		    					$.msg("修改指标成功!");
		    					setTimeout(function(){
		    						returnAddPage();//跳转到首页
		    					},500);
		    				}else{
		    					$.err(result.msg);
		    				}
		    			}
		    	    });
		        }
		      },
		      cancel: {
		        label: "取消",
		        className: "btn-primary"
		      }
		    }
		  });
	}
}


function addApplyIndex(){
	$('.add-indicator-form').bootstrapValidator('validate');
	if ($('.add-indicator-form').data('bootstrapValidator').isValid()) {
		$(".add-apply-index").attr("disabled", "disabled");
		loading.start();
		var applyIndexVO = $(".add-indicator-form").serialize();
		$.ajax({
			type : 'POST',
			url : "/gldata/myIndicator/saveAddAddApply",
			data : applyIndexVO,
			success : function(result) {
				$(".add-apply-index").removeAttr("disabled");
				loading.end();
				if(result.status=='200'){
					$.msg("添加成功");
					setTimeout(function(){
						returnAddPage();//跳转到首页
					},500);
				}else{
					$.err(result.msg);
				}
			}
	    });
	}
}

/**
 * 删除新增指标
 * @returns
 */
function removeAddApplyIndex(){
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
	        	$(".remove-add-apply-js").attr("disabled", "disabled");
	    		loading.start();
	        	$.ajax({
	        		type : 'POST',
	        		url : "/gldata/myIndicator/addRemove",
	        		data : {
	        			id : id
	        		},
	        		success : function(result) {
	        			$(".remove-add-apply-js").attr("disabled", "disabled");
        				loading.start();
	        			if(result.status=='200'){
	        				bootbox.hideAll();
	        				$.msg("删除成功!");
	        				setTimeout(function(){
	    						returnAddPage();//跳转到首页
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

function returnAddPage(){
	location.href = "/gldata/myIndicator";
}

$(document).ready(function () {
  //更新提交
  $("body").delegate(".update-apply-index", "click", updateApplyIndex);
  //新增提交
  $("body").delegate(".add-apply-index", "click", addApplyIndex);
  //删除
  $("body").delegate(".remove-add-apply-js", "click", removeAddApplyIndex);
  //返回首页
  $("body").delegate(".return-add-page-js", "click", returnAddPage);

  $('.edit-indicator-form,.add-indicator-form').bootstrapValidator({
	  message : '输入错误，请重新输入',
	  excluded: [':disabled', ':hidden', ':not(:visible)'],// 排除无需验证的控件，比如被禁用的或者被隐藏的
	  fields: {  
		  monitorLower : {
              validators: {
	        	  regexp: {  
	                    regexp: /^(\-|\+)?\d+(\.\d+)?$/,  
	                    message: '预警值必须为数字'  
	              },
	              stringLength: {
                      max: 8,
                      message: '长度不能大于8位'
                  },
                  
                  callback: {
		                message: '后面预警值必须大于前面值',
		                callback: function(value, validator) {
	                    	var higherValue = $("input[name='monitorHigher']:visible").val();//获得另一个的值
	                        if (eval(higherValue) <= eval(value)) {
	                            return false;
	                        }else{
	                        	validator.updateStatus("monitorLower", validator.STATUS_VALID, 'callback');
	                        	validator.updateStatus("monitorHigher", validator.STATUS_VALID, 'callback');
	                            return true;
	                        }
	                    }
		          }
              }
	      },
  
		  monitorHigher : {
			    validators: {
		    		regexp: {  
		                regexp: /^(\-|\+)?\d+(\.\d+)?$/,  
		                message: '预警值必须为数字'  
		            },
		            stringLength: {
                        max: 8,
                        message: '长度不能大于8位'
                    },
					callback: {
		                message: '后面预警值必须大于前面值',
		                callback: function(value, validator) {
	                    	var lowerValue = $("input[name='monitorLower']:visible").val();//获得另一个的值
	                        if (eval(lowerValue) >= eval(value)) {
	                            return false;
	                        }else{
	                        	validator.updateStatus("monitorLower", validator.STATUS_VALID, 'callback');
	                        	validator.updateStatus("monitorHigher", validator.STATUS_VALID, 'callback');
	                            return true;
	                        }
	                    }
		            }
			    }
		  }
	  }   
   });
});