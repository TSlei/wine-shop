
var code = "";
var name = "";
var makerName = "";

//初始化表格
function initTableFunction(){
	 var jsonParam={
				pageSize:10,
				pageNum:1
			  };
		$("#initTable").pagination({
			url: "/shop/purchase/listTable",
			paramJson:jsonParam
		});	
	}

$(function(){
	initTableFunction();
});

$(".searchBtn").click(function(){
	var jsonParam={
			pageSize:10,
			pageNum:1
	};
	var status=$("#searchstatus").val();
	if(status == -1){
		status = null;
	}
	jsonParam.status = status;
	$("#initTable").pagination({
		url: "/shop/purchase/listTable",
		paramJson:jsonParam
	});
});


function addOrder(){
	var buyerName = $("#buyerName1").val().trim();
	$("#buyerName1").val(buyerName);
	var buyerPhone = $("#buyerPhone1").val().trim();
	$("#buyerPhone1").val(buyerPhone)
	var address = $("#address1").val().trim();
	$("#address1").val(address);
	var totalPrice = $("#totalPrice1").val().trim();
	$("#totalPrice1").val(totalPrice);
	var status = $("#status1").val().trim();
	$("#status1").val(status);
	
	if(buyerName == ""||buyerPhone == ""||address == ""||totalPrice == ""||status == "-1"){
		alert("请输入完整信息！");
		return;
	}
	
	var data = $("#xzyw").serialize();
	
	$.ajax({
		type:"POST",
		url: "/shop/item/addOrder",
		data:data,
		 success: function(msg){
		     if(msg == 1){
		    	 alert("添加成功!");
		    	 $('#myModal').modal("hide");
		    	 $("#xzyw")[0].reset();
		    	 initTableFunction();
		     }
		   }
	});
}

function deleteOrder(id){
	if(confirm('是否删除？？？')){
		$.ajax({
			type:"POST",
			url: "/shop/item/delOrder",
			data:{
				"orderId":id
			},
			 success: function(msg){
			     if(msg == 0){
			    	 alert("该订单下有商品,不能删除!");
			     }
			     if(msg == 1){
			    	 alert("删除成功!");
			    	 initTableFunction();
			     }
			   }
		});
	}
}

function showModal2(orderId){
	
	  $("#myModal2").modal("show");
	   $("#myModal2").on("shown.bs.modal",function(){
			$.ajax({
				type:"POST",
				url: "/shop/item/getOrder",
				data:{
					"orderId":orderId
				},
				 success: function(msg){
					 
					 $("#id2").val(msg.id);
					 $("#buyerName2").val(msg.buyerName);
					 $("#buyerPhone2").val(msg.buyerPhone);
					 $("#address2").val(msg.address);
					 $("#note2").val(msg.note);
					 $("#status2").val(msg.status);
					 $("#totalPrice2").val(msg.totalPrice);
					 
				 }
			});
		   
		   $("#myModal2").off("shown.bs.modal");
	 });
}

function updateOrder(){
	
	var buyerName = $("#buyerName2").val().trim();
	$("#buyerName2").val(buyerName);
	var buyerPhone = $("#buyerPhone2").val().trim();
	$("#buyerPhone2").val(buyerPhone)
	var address = $("#address2").val().trim();
	$("#address2").val(address);
	var totalPrice = $("#totalPrice2").val().trim();
	$("#totalPrice2").val(totalPrice);
	var status = $("#status2").val().trim();
	$("#status2").val(status);
	
	if(buyerName == ""||buyerPhone == ""||address == ""||totalPrice == ""||status == "-1"){
		alert("请输入完整信息！");
		return;
	}
	if(isNaN(totalPrice)){
		alert("金额只能输入数字!");
		return;
	}
	var data = $("#xgyw").serialize();
	
	$.ajax({
		type:"POST",
		url: "/shop/item/updateOrder",
		data:data,
		 success: function(msg){
		     if(msg == 1){
		    	 alert("修改成功!");
		    	 $('#myModal2').modal("hide");
		    	 $("#xgyw")[0].reset();
		    	 initTableFunction();
		     }else{
		    	 alert("修改失败!");
		     }
		   },
		   error:function(){
			   alert("添加失败，请检查输入的信息是否正确");
		   }
	});
}






