
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
			userName:$("#name").val().trim(),
			startTime:"2018-06-06",
			endTime:"2018-06-07"
		};
	 
		$("#myTabContent").pagination({
			url: "/shop/user/table",
			paramJson:jsonParam
		});	
	}



function addUser(){
	
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

//修改回显
function showUpdateInfo(adminId){

	$('#myModal2').modal("show");
	
	$('#myModal2').on('shown.bs.modal', function () {
		$.ajax({
			type:"POST",
			url: "/shop/user/getUserById",
			data:{
				"id":adminId
			},
			 success: function(data){
				 $("#update-id").val(data.id);
				 $("#update-userName").val(data.userName);
				 $("#update-sex").val(data.sex);
				 $("#update-mobile").val(data.mobile);
				 $("#update-vipCode").val(data.vipCode);
				 $("#update-remark").val(data.remark);
			 },
			 dataType:"json"
		});
		
		$('#myModal2').off('shown.bs.modal');
	});
	
}

function updateUser(){
	
	var userName = $("#update-userName").val().trim();
	$("#update-userName").val(userName);	
	var sex = $("#update-sex").val().trim();
	$("#update-sex").val(sex);
	var mobile = $("#update-mobile").val().trim();
	$("#update-mobile").val(mobile);
	var vipCode = $("#update-vipCode").val().trim();
	$("#update-vipCode").val(vipCode);
	
	if(userName=='' || vipCode ==''){
		alert("输入信息不完整");
		return;
	}
	
	var data = $("#xgkc").serialize();
	
	$.ajax({
		type:"POST",
		url: "/shop/user/updateUserById",
		data:data,
		 success: function(msg){
		     if(msg == 0){
		    	 alert("修改失败!");
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
			url: "/shop/user/deleteUserById",
			data:{
				"id":itemId
			},
			 success: function(msg){
			     if(msg == 0){
			    	 alert("删除失败!");
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


