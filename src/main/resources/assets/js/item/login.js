
function login(){
	var name = $("#name").val();
	var password = $("#password").val();
	// 登录请求
	$.ajax({
		url:"/shop/login",
		type:"post",
		data:{
			name:name,
			password:password
		},
		success:function(data){
			alert(data);
		},
		dataType:"json"
	});
}