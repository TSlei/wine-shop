function initAdminSelect(EL,type,initValue){
	if(typeof(ADMIN_OPTIONS) == "undefined"){
		ADMIN_OPTIONS = "";
		$.ajax({
			type : 'POST',
			url : "/gldata/getAdmins",
//			data: JSON.stringify(charRequest),//将对象序列化成JSON字符串  
		    success : function(result) {
			    if(result.status=="200"){
			    	ADMIN_OPTIONS = "";
			    	if(type == "list"){
			    		ADMIN_OPTIONS = ADMIN_OPTIONS + "<option value=''>全部</option>" ;
			    	}else{
			    		ADMIN_OPTIONS = ADMIN_OPTIONS + "<option value=''></option>" ;
			    	}
			    	for (var i = 0; i < result.data.length; i++) {
			    		ADMIN_OPTIONS = ADMIN_OPTIONS + "<option value='"+result.data[i].id+"'>"+result.data[i].dpname+"</option>" ;
					} 
			    	dealDom(EL,type,initValue);
			    }else{
			    	$.err(result.msg);
			    }
		    },
		    error : function(){
		    	$.err("人员选择加载数据异常");
		    }
		});
	}else{
		dealDom(EL,type,initValue);
	}
}
function dealDom(EL,type,initValue){
	EL.html(ADMIN_OPTIONS);
	if(!!initValue){
		EL.find("option[value='"+initValue+"']").attr("selected","selected");
	}
	EL.select2();
}

$(document).ready(function () {
	$.fn.adminSelect = function(type,initValue){
		if (this.length == 0) {
			throw new Error("AdminSelect template element is not exist.");
		}
		if(this.length > 1){
			throw new Error("AdminSelect template element is not only one.");
		}
		if(!this.is("select")){
			throw new Error("AdminSelect template element is not a select DOM.");
		}
		initAdminSelect(this,type,initValue);
	}
});