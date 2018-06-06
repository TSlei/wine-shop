
// 初始化
$(function(){
	initTableFunction();
});

// 重新加载
function loadTable(){
	initTableFunction();
}

// 重置加载
function clearTable(){
	$("#code").val("");
	$("#name").val("")
	initTableFunction();
}

// 展示分页列表
function initTableFunction(){
	 var jsonParam={
			pageSize:10,
			pageNum:1,
			adminId:$("#code").val().trim(),
			userName:$("#name").val().trim()
		};
	 
		$("#myTabContent").pagination({
			url: "/shop/user/table",
			paramJson:jsonParam
		});	
	}






function updateUser(adminId){
	$('#myModal2').modal("show");
	
	$('#myModal2').on('shown.bs.modal', function () {
		$.ajax({
			type:"POST",
			url: "/shop/user/getUserById",
			data:{
				"id":adminId
			},
			 success: function(data){
				 alert(data);
			 },
			 dataType:"json"
		});
		
		$('#myModal2').off('shown.bs.modal');
	});
	
}

	function addUser(){
		alert("11");
		var userName = $("#userName").val().trim();
		$("#userName").val(userName);
		
		var sex = $("#sex").val().trim();
		$("#sex").val(sex);
		
		var mobile = $("#mobile").val().trim();
		$("#mobile").val(mobile);
		
		var vipCode = $("#vipCode").val().trim();
		$("#vipCode").val(vipCode);
		
	
	if(userName=='' || vipCode ==''){
		alert("输入信息不完整");
		return;
	}
	
	var data = $("#xzkc").serialize();
	
	$.ajax({
		type:"POST",
		url: "/shop/user/insertUser",
		data:data,
		 success: function(msg){
		     if(msg == 0){
		    	 alert("用户名已存在!");
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


