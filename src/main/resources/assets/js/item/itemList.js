
var code = "";
var name = "";
var makerName = "";

//初始化表格
function initTableFunction(code,name,makerName){
	 var jsonParam={
				pageSize:10,
				pageNum:1,
				code:code,
				name:name,
				makerName:makerName
			  };
		$("#myTabContent").pagination({
			url: "/shop/item/listTable",
			paramJson:jsonParam
		});	
	}


function loadTable(){
	code = $("#code").val().trim();
	name = $("#name").val().trim();
	makerName = $("#makerName").val().trim();
	initTableFunction(code,name,makerName);
	code = "";
	name = "";
	makerName = "";
}

function clearTable(){
	initTableFunction(code,name,makerName);
}

function showModel(itemId){
	$('#myModal2').modal("show");
	
	$('#myModal2').on('shown.bs.modal', function () {
		$.ajax({
			type:"POST",
			url: "/shop/item/getItem",
			data:{
				"itemId":itemId
			},
			 success: function(msg){
				 
				 $("#id2").val(msg.id);
				 $("#code2").val(msg.code);
				 $("#makerName2").val(msg.makerName);
				 $("#name2").val(msg.name);
				 $("#price2").val(msg.price);
				 $("#num2").val(msg.num);
				 $("#detail2").val(msg.detail);
				 
			 }
		});
		
		$('#myModal2').off('shown.bs.modal');
	});
	
}

function addItem(){
	var code = $("#code1").val().trim();
	code = code.toUpperCase();
	$("#code1").val(code);
	var makerName = $("#makerName1").val().trim();
	$("#makerName1").val(makerName)
	var name = $("#name1").val().trim();
	$("#name1").val(name);
	var price = $("#price1").val().trim();
	$("#price1").val(price);
	var num = $("#num1").val().trim();
	$("#num1").val(num);
	
	if(code=='' || makerName =='' || name =='' ||price =='' ||num ==''){
		alert("输入信息不完整");
		return;
	}
	
	var data = $("#xzkc").serialize();
	
	$.ajax({
		type:"POST",
		url: "/shop/item/addItem",
		data:data,
		 success: function(msg){
		     if(msg == 0){
		    	 alert("商品编号已存在!");
		     }
		     if(msg == 1){
		    	 alert("添加成功!");
		    	 $('#myModal').modal("hide");
		    	 $("#xzkc")[0].reset();
		    	 initTableFunction();
		     }
		   }
	});
	
}

function updateItem(){
	var code = $("#code2").val().trim();
	code = code.toUpperCase();
	$("#code2").val(code);
	var makerName = $("#makerName2").val().trim();
	$("#makerName2").val(makerName)
	var name = $("#name2").val().trim();
	$("#name2").val(name);
	var price = $("#price2").val().trim();
	$("#price2").val(price);
	var num = $("#num2").val().trim();
	$("#num2").val(num);
	
	if(code=='' || makerName =='' || name =='' ||price =='' ||num ==''){
		alert("输入信息不完整");
		return;
	}
	
	if(isNaN(price)){
		alert("金额只能输入数字!");
		return;
	}
	
	var data = $("#xgkc").serialize();
	
	$.ajax({
		type:"POST",
		url: "/shop/item/updateItem",
		data:data,
		 success: function(msg){
		     if(msg == 0){
		    	 alert("商品编号已存在!");
		     }
		     if(msg == 1){
		    	 alert("修改成功!");
		    	 $('#myModal2').modal("hide");
		    	 $("#xgkc")[0].reset();
		    	 initTableFunction();
		     }
		   }
	});
	
}

function delItem(itemId){
	if(confirm('是否删除？？？')){
		$.ajax({
			type:"POST",
			url: "/shop/item/delItem",
			data:{
				"itemId":itemId
			},
			 success: function(msg){
			     if(msg == 0){
			    	 alert("该商品有订单存在,不能删除!");
			     }
			     if(msg == 1){
			    	 alert("删除成功!");
			    	 initTableFunction();
			     }
			   }
		});
	}
	
}

function check(ele,itemId){
	$.ajax({
		type:"POST",
		url: "/shop/item/getItem",
		data:{
			"itemId":itemId
		},
		 success: function(msg){
			 var detail = msg.detail;
			 if(detail == null || detail == ""){
				 detail ="无";
			 }
			 layer.tips("说明："+detail, ele, {
				  tips: [1, '#3595CC'],
				  time: 4000
				});
		 }
	});
}

$(function(){
	initTableFunction();
});