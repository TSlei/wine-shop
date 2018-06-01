/* 删除申请  */
function getRemoveApplyParam(){
	var indexCode = $("#indexCode").val()==""?"":$("#indexCode").val();
	var nameAndShowName = $("#name").val()==""?"":$("#name").val();
	var dataType = $("#dataType").val()==""?"":$("#dataType").val();
	var applyStatus = $("#applyStatus").val();
	var startEndTime = $("#startEndTime").val();
	var applyType = 3; //第三个tab
	var jsonData = {
			indexCode:indexCode,
			nameAndShowName:nameAndShowName,
			dataType:dataType,
			applyStatus:applyStatus,
			startEndTime:startEndTime,
			applyType : applyType
	};
    return jsonData;	
}

function loadRemoveApplyTableData(){
	var applyIndexVO = getRemoveApplyParam();
	applyIndexVO.pageNum = 1;
	applyIndexVO.pageSize = 15;
  	$("#removeTable").pagination({
		url : "/gldata/myIndicator/queryDeleteApply",
		paramJson : applyIndexVO,
		callback : function(){
			
		}
	});
}

function loadRemoveApplyData(){
	countRemoveApply();
	loadRemoveApplyTableData();
}

function countRemoveApply(){
	var jsonData = getRemoveApplyParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/myIndicator/countDeleteApply",
		data : jsonData,
		success : function(result) {
			if(result.status=="200"){
				var dataObj = result.data;
				var countAddApplyHtml = '<strong>统计：';
				if(dataObj['awaitApplyIndex']!==undefined){
					countAddApplyHtml+="待审核("+dataObj['awaitApplyIndex']+")，"
				}
				if(dataObj['rejectApplyIndex']!==undefined){
					countAddApplyHtml+="驳回("+dataObj['rejectApplyIndex']+")，"
				}
				if(dataObj['passApplyIndex']!==undefined){
					countAddApplyHtml+="审核通过("+dataObj['passApplyIndex']+")"
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
	loadRemoveApplyData();
	$(".searchBtn").on("click",function(){
		loadRemoveApplyData();
	});
});	 
$("body").on("keyup","#indexCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#name",function(){
	remoePercent(this);
	remoeUnderLine(this);
});