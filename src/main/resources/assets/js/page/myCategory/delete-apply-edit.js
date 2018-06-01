
function updateData(){
	var flag =  $("#updateForm").data('bootstrapValidator').validate().isValid();
	if(flag){
		var id = $("#id").val();
		var categoryId = $("#categoryId").val();
		var applyReason = $("#applyReason").val();
		var jsonData = {
			id:id,
			categoryId:categoryId,
			applyReason:applyReason
		};
		
		$("#updateBtn").attr("disabled","true");
		$.ajax({
    		type : 'POST',
			url:'/gldata/mycategory/deleteApplyEdit',
			data:jsonData,
			success:function(data){
				if(data.status=="200"){
					$.msg("修改成功");
					setTimeout(function(){window.location.href="/gldata/mycategory/deleteApply";},1000);
				}else{
					$.err(data.msg);
					$("#updateBtn").removeAttr("disabled");
				}
			}
		})
	}
}

function deleteData(){
	var id = $("#id").val();
	if(!id){
		return;
	}
	
	var jsonData = {
		id:id
	};
	$("#deleteBtn").attr("disabled","true");
	$.ajax({
		type : 'POST',
		url:'/gldata/mycategory/deleteApplyDelete',
		data:jsonData,
		success:function(data){
			if(data.status=="200"){
				$.msg("删除成功");
				setTimeout(function(){window.location.href="/gldata/mycategory/deleteApply";},1000);
			}else{
				$.err(data.msg);
				$("#deleteBtn").removeAttr("disabled");
			}
		}
	})
	
}

$(function(){
	
	$('#updateForm').bootstrapValidator({
        message: '输入错误，请重新输入'
    });
	
	$("#updateBtn").on("click",updateData);
	$("#deleteBtn").on("click",deleteData);
	
	
	
});