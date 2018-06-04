$(document).ready(function() {
    
	 if(functionIds){
		 var functionArray = functionIds.split(",");
		 for(var i=0;i<functionArray.length;i++){
             $(".functionId option[value='"+functionArray[i]+"']").attr("selected","true");			 
		 }
		 
		 
	 }
	
	 $('.functionId').SumoSelect({
		   csvDispCount: 10,
	       captionFormat: '已经选择{0}个菜单'
		 });
	 $(".superAdmin").on("change",function(){
			var v =$(this).val();
		    if(v==0){
		    	$(".openMenuList").addClass("hidden");
		    }else{
		    	$(".openMenuList").removeClass("hidden");
		    }
		});
	 initValidationForm();
});



$("#updateBtn").on("click",updateAdmin)
function updateAdmin(){
	var bootstrapValidator = $("#updateForm").data('bootstrapValidator');
	bootstrapValidator.validate();
	
	if(!bootstrapValidator.isValid()){
		return false;
	}
	var id=$("#supplierId").val();
	var name=$("#name").val();
	var realName=$("#realName").val();
	var password=$("#password").val();
	var functionId = $(".functionId").val().toString();
	var superAdmin = $(".superAdmin:checked").val();
	var jsonData={
		id:id,
		name:name,
		realName:realName,
		password:password,
		superAdmin:superAdmin,
		functionId:functionId
	}
	$.ajax({
		url:'/admin/suppliesadmin/modify',
		type:'POST',
		data:jsonData,
		success:function(result){
			if(result.status=="ok"){
                $.msg(updateSuccTips);
                setTimeout(function(){window.location.reload();},1000);
			}else{
			   $.err(updateFailedTips);
            }
		}
	})
}