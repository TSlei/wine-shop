$(
	function(){
		loadMemerPage();
	}	
)
function loadMemerPage(){
	var jsonData={
	}
	
	$("#record").pagination({
		url:"/admin/list/suppliesadmin",
		paramJson:jsonData
	})
}


$(document).delegate(".changeStatusBtn","click",function(e){
	var target=$(e.target); 
	var id=target.attr("id");
	
	var blockStatus=target.attr("status");
	if(blockStatus==0){
		closeAdmin(target);
	}else{
		openAdmin(target);
	}

 });

  function closeAdmin(target){
	  var supplierId=target.attr("id");
	   if(!supplierId) return;
	   var jsonData={
		 supplierId:supplierId   
	   };
		$.ajax({
			type:'post',
			url:"/admin/suppliesadmin/closeAdmin",
			data:jsonData,
		    success:function(result){
		    	if(result.status=="ok"){
		    		    $.msg(operateSuccTips);
	                	setTimeout(function(){window.location.reload();},1000);
				}else{
				   $.err(operateFailedTips);
	            }
			}
				
		})
	  
  }

  function openAdmin(target){
	  var supplierId=target.attr("id");
	   if(!supplierId) return;
	   var jsonData={
		 supplierId:supplierId   
	   };
		$.ajax({
			type:'post',
			url:"/admin/suppliesadmin/openAdmin",
			data:jsonData,
		    success:function(result){
		    	if(result.status=="ok"){
		    		$.msg(operateSuccTips);
		    		setTimeout(function(){ window.location.reload();},1000);
		    		
				}else{
				   $.err(operateFailedTips);
	            }
			}
				
		})
	  
}