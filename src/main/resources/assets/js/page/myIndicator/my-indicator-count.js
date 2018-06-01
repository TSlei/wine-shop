/* 我的指标统计  */
function getIndicationParam(){
	var indexSourceType = $("#indexSourceType").val();
	var operationType = $("#operationType").val();
	var dataType = $("#dataType").val();
	var modifyStatus = $("#modifyStatus").val();
	var published = $("#published").val();
	var code = $("#code").val();
	var name = $("#name").val();
	var marketCode = $("#marketCode").val();
	var indexLastAdmin = $("#creatorName").val();
	var searchCondition = {
		indexSourceType :	indexSourceType,
		operationType : operationType,
		dataType : dataType,
		modifyStatus : modifyStatus,
		published : published,
		code : code,
		name : name,
		marketCode : marketCode,
		indexLastAdmin : indexLastAdmin
	};
    return searchCondition;	
}

function loadMyIndicatorTable(){
	var coreIndexAndExtendVO = getIndicationParam();
	coreIndexAndExtendVO.pageNum = 1;
	coreIndexAndExtendVO.pageSize = 15;
  	$("#myIndicatorTable").pagination({
		url : "/gldata/myIndicator/queryMyIndicatorCountTable",
		paramJson : coreIndexAndExtendVO,
		callback : function(){
			
		}
	});
}

function myIndicatorCount(){
	var jsonData = getIndicationParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/myIndicator/countMyIndicatorCount",
		data : jsonData,
		success : function(result) {
			if(result.status=="200"){
				//key:countByDataType 根据指标指标频度统计
				//key:countByIndexSourceType 根据指标来源统计
				//key:countByOperationType 根据指标类型统计
				var dataObj = result.data;
				var totalNum = 0;
				$(".statistics-num-js").text("");
				if(dataObj.countByIndexSourceType != undefined){
					for(var i = 0; i < dataObj.countByIndexSourceType.length; i++){
						totalNum += parseInt(dataObj.countByIndexSourceType[i].indexSourceTypeCount);
						$("[name='"+ dataObj.countByIndexSourceType[i].indexSourceTypeName + "']").text(dataObj.countByIndexSourceType[i].indexSourceTypeCount + "条");
					}
				}
				if(dataObj.countByDataType != undefined){
					for(var i = 0; i < dataObj.countByDataType.length; i++){
						$("[name='"+ dataObj.countByDataType[i].dataTypeName + "']").text(dataObj.countByDataType[i].dataTypeCount + "条");
					}
				}
				if(dataObj.countByOperationType != undefined){
					for(var i = 0; i < dataObj.countByOperationType.length; i++){
						$("[name='"+ dataObj.countByOperationType[i].operationTypeName + "']").text(dataObj.countByOperationType[i].operationTypeCount + "条");
					}
				}
				$(".totalNum").text(totalNum);
			}else{
			  $.err(result.msg);	
			}
		}
    });
}

function loadMyIndicator(){
	myIndicatorCount();
	loadMyIndicatorTable();
}

$(document).ready(function () {
	loadMyIndicator();
	$(".searchBtn").on("click",function(){
		loadMyIndicator();
	});
});
$("body").on("keyup","#code",function(){
	remoePercent(this);
});
$("body").on("keyup","#name",function(){
	remoePercent(this);
	remoeUnderLine(this);
});
$("body").on("keyup","#marketCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#creatorName",function(){
	remoePercent(this);
	remoeUnderLine(this);
});