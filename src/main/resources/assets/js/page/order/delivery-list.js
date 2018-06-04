$(function(){
	
	loadPageData();
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
		loadPageData();	
	});
	$("#myTabContent").delegate("#allCheckBox","click",changeAllCheckBox);
	$("#myTabContent").delegate(".orderCheckBox","click",changeCheckBox);
	$("#myTabContent").delegate(".sendGoodsBtn","click",updateGoods);
	$("#myTabContent").delegate(".sendBatchGoodsBtn","click",updateBatchGoods)
});
function updateBatchGoods(){
	var checkedNum=$("#myTabContent .active .orderCheckBox:checked").length;
	if(checkedNum==0){
		$.err(noOrderCheckedTips);
		return;
	};
	var orderId="";
	$("#myTabContent .active .orderCheckBox:checked").each(function(){
		var id=$(this).val();
		if(orderId==""){
			orderId+=id;
		}else{
			orderId+=","+id;
		}
	});
   var jsonData={
	 orderId:orderId
   }
	$.ajax({
		type : 'POST',
		url : "/delivery/batch/goods",
		data : jsonData,
		success : function(result) {
			if(result=="ok"){
			  $.msg(deliverySuccTips);
			  setTimeout(function(){window.location.reload();},1000);
		    }else{
		    	$.err(deliveryFailedTips);
		    }			
		}
	});
  
}
function updateGoods(e){
	var orderId = $(e.currentTarget).parents(".form-group").attr("data");
	var v = $(this).val();
	if(!orderId) return;
	var jsonData={
		orderId:orderId	
	};
	$.ajax({
		type : 'POST',
		url : "/delivery/goods",
		data : jsonData,
		success : function(result) {
			if(result=="ok"){
			  $.msg(deliverySuccTips);
			  setTimeout(function(){window.location.reload();},1000);
		    }else if(result=="noOrder"){
		    	$.err(noOrderTips);
		    }else{
		    	$.err(deliveryFailedTips);
		    }			
		}
	});
	
	
}

function changeAllCheckBox(){
	if($(this).is(':checked')){
		$(this).parents(".tab-content").find(".orderCheckBox").prop("checked",true);
	    }else{
	    $(this).parents(".tab-content").find(".orderCheckBox").prop("checked",false);
	  }
	
}
function changeCheckBox(){
	var checkNum=$(this).parents(".tab-content").find(".orderCheckBox:checked").length;
	var totalNum=$(this).parents(".tab-content").find(".orderCheckBox").length;
	$(this).parents(".tab-content").find("#allCheckBox").prop("checked",checkNum==totalNum);
	
}
function loadPageData(){
	 var status=$("#myTab li.active").attr("data");
	 var jsonData={
			 pageSize:5,
			 pageNum:1,
			 status:status
		};
	   console.log(jsonData);
		$("#table"+status).pagination({
			url:"/delivery/list",
			paramJson:jsonData
		})
}