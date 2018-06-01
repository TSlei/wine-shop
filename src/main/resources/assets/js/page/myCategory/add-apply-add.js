function categoryTreeCall(id,name,path,dbCode){
	$("#parentName").val(name);
	$("#parentId").val(id);
	if(dbCode){
		$("#dbCode").val(dbCode);
	}else{
		if(name != "数据管理"){
			$("#dbCode").removeAttr("readonly");
		}else{
			$("#dbCode").attr("readonly","true");
		}
		$("#dbCode").val(null);
	}
	
	setTimeout(function(){
		$('form').data('bootstrapValidator').updateStatus("parentName","VALID",null);
		$('form').data('bootstrapValidator').updateStatus("parentId","VALID",null);
		$('form').data('bootstrapValidator').updateStatus("dbCode","VALID",null);
	}, 200);
}

function submitData(){
	var flag =  $("#addForm").data('bootstrapValidator').validate().isValid();
	if(flag){
		var jsonData=$("#addForm").serialize();
		
		$("#submitBtn").attr("disabled","true");
		$.ajax({
    		type : 'POST',
			url:'/gldata/mycategory/addApplyAdd',
			data:jsonData,
			success:function(data){
				if(data.status=="200"){
					$.msg("新增成功");
					setTimeout(function(){window.location.href="/gldata/mycategory/addApply";},1000);
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