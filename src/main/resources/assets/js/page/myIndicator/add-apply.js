/* 新增申请 */
function getAllParam(){
	var indexCode = $("#indexCode").val()==""?"":$("#indexCode").val();
	var nameAndShowName = $("#name").val()==""?"":$("#name").val();
	var dataType = $("#dataType").val()==""?"":$("#dataType").val();
	var applyStatus = $("#applyStatus").val();
	var startEndTime = $("#startEndTime").val();
	var jsonData = {
		indexCode:indexCode,
		nameAndShowName:nameAndShowName,
		dataType:dataType,
		applyStatus:applyStatus,
		startEndTime:startEndTime
	};
    return jsonData;	
}

function loadTableData(){
	var applyIndexVO = getAllParam();
	applyIndexVO.pageNum = 1;
	applyIndexVO.pageSize =15;
  	$("#myIndicatorAddTable").pagination({
		url : "/gldata/myIndicator/queryAddApply",
		paramJson : applyIndexVO,
		callback:function(){
			
		}
	});
}

function reloadData(){
	loadTableData();
	countAddApply();
}

function countAddApply(){
	var jsonData = getAllParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/myIndicator/countAddApply",
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

function returnAddPage(){
	location.href = "/gldata/myIndicator";
}

$(document).ready(function () {
	  reloadData();
	  $(".searchBtn").on("click",function(){
		  reloadData();
	  });
	  
	  //返回
	  $("body").delegate(".return-add-js","click", returnAddPage);
      
});

$("body").on("keyup","#indexCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#name",function(){
	remoePercent(this);
	remoeUnderLine(this);
});

