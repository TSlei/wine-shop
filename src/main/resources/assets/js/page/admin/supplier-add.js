$(document).ready(function() {
	
	 $('.functionId').SumoSelect({
		   csvDispCount: 10,
	       captionFormat: '已经选择{0}个菜单'
		 });
	
	 initFormValidation();

});

$(".superAdmin").on("change",function(){
	var v =$(this).val();
    if(v==0){
    	$(".openMenuList").addClass("hidden");
    }else{
    	$(".openMenuList").removeClass("hidden");
    }
});

$("#add").on("click",function(){addAdmin();})
function addAdmin(){
	var bootstrapValidator = $("#addForm").data('bootstrapValidator');
	bootstrapValidator.validate();
	
	if(!bootstrapValidator.isValid()){
		return false;
	}
	
	var name=$("#name").val();
	var password=$("#password").val();
	var realName=$("#realName").val();
	var status=0;
	var superAdmin = $(".superAdmin:checked").val();
	var functionId = null;
	if($(".functionId").val()){
	  functionId=$(".functionId").val().toString();
	}
	
	var jsonData={
		name:name,
		password:password,
		realName:realName,
		status:status,
		superAdmin:superAdmin,
		functionId:functionId
	}
	$.ajax({
		url:'/admin/suppliesadmin/add',
		type:'POST',
		data:jsonData,
		success:function(result){
			if(result.status=="ok"){
                $.msg(saveSuccTips);
                setTimeout(function(){window.location.href="/admin/suppliesadmin";},1000);
			}else{
			   $.err(saveFailedTips);
            }
		}
	})
}