function initDBCodeSelect(EL,type,initValue){
	if(typeof(DBCODES_OPTIONS) == "undefined"){
		DBCODES_OPTIONS = "";
		$.ajax({
			type : 'POST',
			url : "/gldata/getDBCodes",
//			data: JSON.stringify(charRequest),//将对象序列化成JSON字符串  
		    success : function(result) {
			    if(result.status=="200"){
			    	DBCODES_OPTIONS = "";
			    	if(type == "list"){
			    		DBCODES_OPTIONS = DBCODES_OPTIONS + "<option value=''>全部</option>" ;
			    	}else{
			    		DBCODES_OPTIONS = DBCODES_OPTIONS + "<option value=''></option>" ;
			    	}
			    	for (var i = 0; i < result.data.length; i++) {
			    		DBCODES_OPTIONS = DBCODES_OPTIONS + "<option value='"+result.data[i]+"'>"+result.data[i]+"</option>" ;
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
	EL.html(DBCODES_OPTIONS);
	if(!!initValue){
		EL.find("option[value='"+initValue+"']").attr("selected","selected");
	}
	EL.select2();
}

$(document).ready(function () {
	$.fn.DBCodeSelect = function(type,initValue){
		if (this.length == 0) {
			throw new Error("DBCodeSelect template element is not exist.");
		}
		if(this.length > 1){
			throw new Error("DBCodeSelect template element is not only one.");
		}
		if(!this.is("select")){
			throw new Error("DBCodeSelect template element is not a select DOM.");
		}
		initDBCodeSelect(this,type,initValue);
	}
});