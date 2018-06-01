
function updateData(){
	var flag =  $("#updateForm").data('bootstrapValidator').validate().isValid();
	if(flag){
		var jsonData = $("#updateForm").serialize();
	
		$("#updateBtn").attr("disabled","true");
		$.ajax({
    		type : 'POST',
			url:'/gldata/mycategory/modifyApplyEdit',
			data:jsonData,
			success:function(data){
				if(data.status=="200"){
					$.msg("修改成功");
					setTimeout(function(){window.location.href="/gldata/mycategory/modifyApply";},1000);
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
		url:'/gldata/mycategory/modifyApplyDelete',
		data:jsonData,
		success:function(data){
			if(data.status=="200"){
				$.msg("删除成功");
				setTimeout(function(){window.location.href="/gldata/mycategory/addApply";},1000);
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