/* 数据删除申请  */
function getRemoveDataApplyParam(){
	var indexCode = $("#indexCode").val()==""?"":$("#indexCode").val();
	var indexName = $("#name").val()==""?"":$("#name").val();
	var dataType = $("#dataType").val()==""?"":$("#dataType").val();
	var applyStatus = $("#applyStatus").val();
	var createTimeStr = $("#startEndTime").val();
	var jsonData = {
		indexCode:indexCode,
		indexName:indexName,
		dataType:dataType,
		applyStatus:applyStatus,
		createTimeStr:createTimeStr
	};
    return jsonData;	
}

function loadRemoveDataApplyTableData(){
	var applyIndexVO = getRemoveDataApplyParam();
	applyIndexVO.pageNum = 1;
	applyIndexVO.pageSize = 15;
  	$("#removeDataApplyTable").pagination({
		url : "/gldata/myIndicator/queryDataDeleteApply",
		paramJson : applyIndexVO,
		callback : function(){
			
		}
	});
}

function loadRemoveDataApplyData(){
	countRemoveDataApply();
	loadRemoveDataApplyTableData();
}

function countRemoveDataApply(){
	var jsonData = getRemoveDataApplyParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/myIndicator/countDataDeleteApply",
		data : jsonData,
		success : function(result) {
			if(result.status=="200"){
				var dataObj = result.data;
				var countAddApplyHtml = '<strong>统计：';
				if(dataObj['awaitCount']!==undefined){
					countAddApplyHtml+="待审核("+dataObj['awaitCount']+")，"
				}
				if(dataObj['passCount']!==undefined){
					countAddApplyHtml+="驳回("+dataObj['rejectCount']+")，"
				}
				if(dataObj['rejectCount']!==undefined){
					countAddApplyHtml+="审核通过("+dataObj['passCount']+")"
				}
				countAddApplyHtml+='</strong>'
				$(".countAddApply").html(countAddApplyHtml);
			}else{
			  $.err(result.msg);	
			}
		}
    });
}


$(document).ready(function () {
	loadRemoveDataApplyData();
	$(".searchBtn").on("click",function(){
		loadRemoveDataApplyData();
	});
});
$("body").on("keyup","#indexCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#name",function(){
	remoePercent(this);
	remoeUnderLine(this);
});