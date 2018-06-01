function categoryTreeCall(id,name,path,dbCode){
	getCategoryById(id);
	
}

function getCategoryById(categoryId){
	var jsonData = {
		categoryId:categoryId	
	};
	
	$.ajax({
		type : 'POST',
		url:'/gldata/mycategory/getCategoryById',
		data:jsonData,
		success:function(result){
			 if(result.status=="200"){
				 var category = result.data;
				 $("#name").val(category.name);
				 $('#addForm').data('bootstrapValidator').updateStatus("name","VALID",null);  
				 $("#categoryId").val(category.id);
				 $(".categoryIdStr").html(category.id);
				 $("#dbCode").val(category.dbCode);
				 $(".dbCodeStr").html(category.dbCode);
				 $("#enName").val(category.enName);
				 $(".enNameStr").html(category.enName);
				 $("#showName").val(category.showName);
				 $(".showNameStr").html(category.showName);
				 $("#enShowName").val(category.enShowName);
				 $(".enShowNameStr").html(category.enShowName);
				 $("#enShowName").val(category.enShowName);
				 $(".enShowNameStr").html(category.enShowName);
				 $("#published").val(category.published);
				 if(0==category.published){
					 $(".publishedStr").html("前端隐藏");
				 }else{
					 $(".publishedStr").html("前端显示");	 
				 }
			 }else{
				 $.err(result.msg);
			 }
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
			url:'/gldata/mycategory/deleteApplyAdd',
			data:jsonData,
			success:function(data){
				if(data.status=="200"){
					$.msg("新增成功");
					setTimeout(function(){window.location.href="/gldata/mycategory/deleteApply";},1000);
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