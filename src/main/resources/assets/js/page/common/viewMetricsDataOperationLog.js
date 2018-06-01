function getAllParam(){
	var indexCode = $("#indexCode").val()==""?null:$("#indexCode").val();
	var indexDate = $("#indexDate").val()==""?null:$("#indexDate").val();
	var startIndexDate = null;
	var endIndexDate = null;
	var operateName = $("#operateName").val()==""?null:$("#operateName").val();
	var afterDescription = $("#afterDescription").val()==""?null:$("#afterDescription").val();
	var operationTime = $("#operationTime").val()==""?null:$("#operationTime").val();
	var startOperateTime = null;
	var endOperateTime = null;
	if(operationTime != null){
		startOperateTime = $.trim(operationTime.split("-")[0]).replace(/\//g,'-');
		endOperateTime = $.trim(operationTime.split("-")[1]).replace(/\//g,'-');
	}
	if(indexDate != null){
		startIndexDate = $.trim(indexDate.split("-")[0]).replace(/\//g,'-');
		endIndexDate = $.trim(indexDate.split("-")[1]).replace(/\//g,'-');
	}
//	var createTime = $("#createTime").val()==""?null:$("#createTime").val();//.replace(/\//g,'-');
	var jsonData = {indexCode:indexCode};
	jsonData["startIndexDate"]=startIndexDate;
	jsonData["endIndexDate"]=endIndexDate;
	jsonData["operateName"]=operateName;
	jsonData["afterDescription"]=afterDescription;
	jsonData["startOperateTime"]=startOperateTime;
	jsonData["endOperateTime"]=endOperateTime;
    return jsonData;	
}
function loadTableData(){
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=15;
  	$("#dataTable").pagination({
  			url : "/gldata/indexDataOperationLog-table",
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