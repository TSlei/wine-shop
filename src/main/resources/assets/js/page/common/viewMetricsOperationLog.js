function getAllParam(){
	var indexCode = $("#indexCode").val()==""?null:$("#indexCode").val();
	var operateName = $("#operateName").val()==""?null:$("#operateName").val();
	var content = $("#content").val()==""?null:$("#content").val();
	var reason = $("#reason").val()==""?null:$("#reason").val();
	var operationTime = $("#operationTime").val()==""?null:$("#operationTime").val();
	var startOperateTime = null;
	var endOperateTime = null;
	if(operationTime != null){
		startOperateTime = $.trim(operationTime.split("-")[0]).replace(/\//g,'-');
		endOperateTime = $.trim(operationTime.split("-")[1]).replace(/\//g,'-');
	}
//	var createTime = $("#createTime").val()==""?null:$("#createTime").val();//.replace(/\//g,'-');
	var jsonData = {indexCode:indexCode};
	jsonData["operateName"] = operateName;
	jsonData["content"] = content;
	jsonData["reason"] = reason;
	jsonData["startOperateTime"] = startOperateTime;
	jsonData["endOperateTime"] = endOperateTime;
    return jsonData;	
}
function loadTableData(){
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=15;
  	$("#dataTable").pagination({
  			url : "/gldata/indexOperationLog-table",
			paramJson : jsonData,
			callback:function(){
				
			}
		});
	      
}
//查询按钮
$("body").on("click","#searchBtn",function(){
	loadTableData();
});
$(document).ready(function () {
	loadTableData();
});

//重置刷新页面
$("#reloads").click(function(){
	
	$(".form-horizontal")[0].reset();
	
	loadTableData();
});