function displayResult(item, val, text) {
    $('#price1').val(val);
}
$(function(){
	$.ajax({
		type:"post",
		url:"/shop/item/queryLikeName",
		success:function(msg){
			$('#itemCode1').typeahead({
		        source: msg,
		        val: 'price',
		        itemSelected: displayResult
		    });
		}
		});
	
	
	
})

function addOrderDetail(){
	var itemCode = $("#itemCode1").val().trim();
	$("#itemCode1").val(itemCode);
	var number = $("#number1").val().trim();
	$("#number1").val(number)
	var price = $("#price1").val().trim();
	$("#price1").val(price);
	
	if(itemCode == ""|| number == ""|| price == ""){
		alert("请输入完整信息！");
		return;
	}
	
	if(isNaN(number)){
		alert("数量只能输入数字");
		return;
	}
	if(isNaN(price)){
		alert("售价只能输入数字");
		return;
	}
	
	var data = $("#tjsp").serialize();
	
	$.ajax({
		type:"POST",
		url: "/shop/item/addOrderDetail",
		data:data,
		 success: function(msg){
			 if(msg == 0){
				 alert("商品编号不存在，请联系管理员！");
			 }else{
				 if(msg == 5){
					 alert("商品库存不足,请联系管理员维护库存");
				 }
				 alert("添加成功！");
				 $("#myModal").modal("hide");
				 $("#tjsp")[0].reset();
				 location.reload();
			 }
		   }
	});
}


function deleteOrderDetail(id){
	if(confirm('是否删除？？？')){
		$.ajax({
			type:"POST",
			url: "/shop/item/deleteOrderDetail",
			data:{
				"id":id
			},
			 success: function(msg){
				if(msg == 1){
					alert("删除成功");
					location.reload();
				}else{
					alert("异常");
				}
			 }
		});
	}
}
