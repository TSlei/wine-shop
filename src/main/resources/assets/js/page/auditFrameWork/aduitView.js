function pass(){
	var taskId = $(this).attr("data-id");
	if(taskId == "" ||taskId == null){
		return false;
	}
	bootbox.dialog({
	      message: '<form action="" class="fn-fail-form"><div class="form-group"><textarea id="passTextValue" class="form-control" rows="3" name="驳回理由"></textarea></div></form>',
	      title: "备注：",
	      className: "modal-inverse fn-sm",
	      buttons: {
	        success: {
	          label: "确定",
	          className: "btn-primary",
	          callback: function () {
	        	  var id = $("#id").val();
	        	  var reviewReason = $("#passTextValue").val();
	        	  var applyType = $("#applyType").val();
	        	  var applyStatus = $("#applyStatus").val();
	        	  if(applyStatus==0){
						applyStatus = 10;
					}else if(applyStatus==10){
						applyStatus=20;
					}
	        	  var auditingCategoryVO = {
	        			  id:id,
	        			  reviewReason:reviewReason,
	        			  applyType:applyType,
	        			  applyStatus:applyStatus,
	        			  taskId:taskId
	        			  
	        	  };
	        	  if(applyType != 1){
	        		  auditingCategoryVO["categoryId"] = $("#categoryId").val();
	        	  }
	        		$.ajax({
	        			type : 'POST',
	        			url : "/gldata/auditingCategory/poi/audit-apply-category",
	        			data: auditingCategoryVO,
	        		    success : function(result) {
	        			    if(result.status=="200"){
	        			    	var href="";
	        			    	if(applyType==1){
	        			    		href="/gldata/auditingCategory/poi/queryAddTaskPage";
	        			    	}
	        			    	if(applyType==2){
	        			    		href="/gldata/auditingCategory/poi/queryUpdateTaskPage";
	        			    	}
	        			    	if(applyType==3){
	        			    		href="/gldata/auditingCategory/poi/queryDelTaskPage";
	        			    	}
	        			    	location.href=href;
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
};
function reject(){
	var taskId = $(this).attr("data-id");
	if(taskId == "" ||taskId == null){
		return false;
	}
	bootbox.dialog({
	    message: '<form action="" class="fn-fail-form"><div class="form-group"><textarea id="rejectTextValue" class="form-control" rows="3" name="驳回理由" required data-bv-notempty-message="请填写必填项目"></textarea></div></form>',
	    title: '驳回理由<span class="red">*</span>：',
	    className: "modal-inverse fn-sm",
	    buttons: {
	      success: {
	        label: "确定",
	        className: "btn-primary",
	        callback: function () {
	          $('.fn-fail-form').bootstrapValidator('validate');
	          if ($('.fn-fail-form').data('bootstrapValidator').isValid()) {
	        	  debugger
	        	  var id = $("#id").val();
	        	  var reviewReason = $("#rejectTextValue").val();
	        	  var applyType = $("#applyType").val();
	        	  var applyStatus = $("#applyStatus").val();
	        	  if(applyStatus==0){
						applyStatus = 11;
					}else if(applyStatus==10){
						applyStatus=21;
					}
	        	  var auditingCategoryVO = {
	        			  id:id,
	        			  reviewReason:reviewReason,
	        			  applyType:applyType,
	        			  applyStatus:applyStatus,
	        			  taskId:taskId
	        	  };
	        	  if(applyType != 1){
	        		  auditingCategoryVO["categoryId"] = $("#categoryId").val();
	        	  }
	        		$.ajax({
	        			type : 'POST',
	        			url : "/gldata/auditingCategory/poi/audit-apply-category",
	        			data: auditingCategoryVO,
	        		    success : function(result) {
	        			    if(result.status=="200"){
	        			    	var href="";
	        			    	if(applyType==1){
	        			    		href="/gldata/auditingCategory/poi/queryAddTaskPage";
	        			    	}
	        			    	if(applyType==2){
	        			    		href="/gldata/auditingCategory/poi/queryUpdateTaskPage";
	        			    	}
	        			    	if(applyType==3){
	        			    		href="/gldata/auditingCategory/poi/queryDelTaskPage";
	        			    	}
	        			    	location.href=href;
	        			    }else{
	        			    	$.err(result.msg);
	        			    }
	        		    }
	        		});
	          
	          } else {
	            return false;
	          }
	        }
	      },
	      cancel: {
	        label: "取消",
	        className: "btn-primary"
	      }
	    }
	  });
};

$(document).ready(function () {
    $("#passBtn").click(pass);
    $("#rejectBtn").click(reject);
});