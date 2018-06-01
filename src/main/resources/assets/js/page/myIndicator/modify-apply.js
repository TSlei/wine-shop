/* 新增申请 */
function getApplyEditParam(){
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
	
	//获取checkbox的选项
	$(".single-check-js").each(function(){
		var colName = $(this).attr("name");
		if($(this).prop("checked")){
			jsonData[colName] = colName;
		}else{
			jsonData[colName] = null;
		}
	});
    return jsonData;	
}

function loadApplyEditTableData(){
	var applyIndexVO = getApplyEditParam();
	applyIndexVO.pageNum = 1;
	applyIndexVO.pageSize =15;
  	$("#editApplyTable").pagination({
		url : "/gldata/myIndicator/queryEditApply",
		paramJson : applyIndexVO,
		callback : function(){
			
		}
	});
}

function reloadApplyEditData(){
	loadApplyEditTableData();
	countApplyEdit();
}

function countApplyEdit(){
	var jsonData = getApplyEditParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/myIndicator/countEditApply",
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
	reloadApplyEditData();
	$(".searchBtn").on("click",function(){
	    reloadApplyEditData();
	});
	$('.fn-toggle-box-wrap .fn-btn-toggle').on("click", function () {
        $(this).parents('.fn-toggle-box-wrap').find('.fn-toggle-box').slideToggle();
    });
    $('.fn-toggle-box-wrap .fn-btn-cancle').on("click", function () {
        $(this).parents('.fn-toggle-box-wrap').find('.fn-toggle-box').slideUp();
    });
    
    $(".select-all-js").on("click", function (event) {
    	if($(event.target).prop("checked")){
    		$(".all-checkboxs").find(".single-check-js").prop("checked", true);
    	}else{
    		$(".all-checkboxs").find(".single-check-js").prop("checked", false);
    	}
    });
    
    $(".update-table-js").on("click", function (event) {
    	loadApplyEditTableData();
    });
});

$("body").on("keyup","#indexCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#name",function(){
	remoePercent(this);
	remoeUnderLine(this);
});