function categoryTreeCall(id){
	$.ajax({
		type : 'POST',
		url : "/gldata/mycategory/getCoreIndexById",
		data: {
			"id":id
		},
	    success : function(result) {
		    if(result.status=="200"){
		    	var obj = result.data;
		    	$("#oldName").val(obj.name);
		    	$("#categoryId").val(id);
		    	$("#dbCode").val(obj.dbCode);
		    	$("#name").val(obj.name);
		    	$("#showName").val(obj.showName);
		    	$("#enName").val(obj.enName);
		    	$("#enShowName").val(obj.enShowName);
		    	$("#description").val(obj.description);
		    	$("#applyReason").val(obj.applyReason);
		    	
		    	setTimeout(function(){
		    		$('form').data('bootstrapValidator').updateStatus("categoryId","VALID",null);
		    		$('form').data('bootstrapValidator').updateStatus("name","VALID",null);
		    		$('form').data('bootstrapValidator').updateStatus("dbCode","VALID",null);
		    		$('form').data('bootstrapValidator').updateStatus("showName","VALID",null);
		    	}, 200);
		    }else{
		    	$.err(result.msg);
		    }
	    },
	    error : function(){
	    	$.err("系统异常");
	    }
	});
}

function submitData(){
	var flag =  $("#addForm").data('bootstrapValidator').validate().isValid();
	if(flag){
		var jsonData=$("#addForm").serialize();
		
		$("#submitBtn").attr("disabled","true");
		$.ajax({
    		type : 'POST',
			url:'/gldata/mycategory/modifyApplyAdd',
			data:jsonData,
			success:function(data){
				if(data.status=="200"){
					$.msg("新增成功");
					setTimeout(function(){window.location.href="/gldata/mycategory/modifyApply";},1000);
				}else{
					$.err(data.msg);
					$("#submitBtn").removeAttr("disabled");
				}
			}
		})
	}
}


$(function(){
	
	$('#addForm').bootstrapValidator({
        message: '输入错误，请重新输入'
    });
	
	$("#submitBtn").on("click",submitData);
	
	
	
	
});