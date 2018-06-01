var applyVo = null;
function getRemoveApplyDetail(){
	var indexCode = $("#indexCode").val();
	$(".searchBtn").attr("disabled", "disabled");
	loading.start();
	$.ajax({
		type : 'POST',
		url : "/gldata/myIndicator/getDetailByCode",
		data : {
			indexCode : indexCode
		},
		success : function(result) {
			$(".searchBtn").removeAttr("disabled");
			loading.end();
			if(result.status=="200"){
				applyVo = result.data;
				if(typeof applyVo != "undefined" && applyVo != null){
					setApplyDetailData(applyVo);
				}
			}else{
			    $.err(result.msg);	
			}
		}
	});
}

function setApplyDetailData(applyVo){
	$("[name='categoryName']").text(applyVo.categoryName);
	$("[name='categoryId']").text(applyVo.categoryId);
	$("[name='categoryPath']").text(applyVo.categoryPath);
	$("[name='name']").text(applyVo.name);
	$("[name='showName']").text(applyVo.showName);
	$("[name='enName']").text(applyVo.enName);
	$("[name='enShowName']").text(applyVo.enShowName);
	$("[name='unitName']").text(applyVo.unitName); //指标单位
	$("[name='dataTypeName']").text(applyVo.dataTypeName); //指标单位
	$("[name='dataRetainName']").text(applyVo.dataRetainName); //	保留小数位数
	$("[name='indexSourceTypeName']").text(applyVo.indexSourceTypeName); //	指标来源 
	
	var monitorType = applyVo.monitorType;
	if(monitorType == 0){
		$("[name='monitorSetting']").text("区间 " + applyVo.monitorLower + "~" + applyVo.monitorHigher);
	}else if(monitorType == 1){
		$("[name='monitorSetting']").text("同比 " + applyVo.monitorLower + "%"  + "~" + applyVo.monitorHigher + "%" );
	}else if(monitorType == 2){
		$("[name='monitorSetting']").text("环比 " + applyVo.monitorLower + "%"   + "~" + applyVo.monitorHigher + "%" );
	}
	var marketStatus = applyVo.marketStatus;
	if(marketStatus == 0){
		$("[name='marketStatus']").text("否");
	}else{
		$("[name='marketStatus']").text("是");
		$("[name='marketCode']").text(applyVo.marketCode);
	}
	
	var deriveStatus  = applyVo.marketStatus;
	if(deriveStatus == 0){
		$("[name='deriveStatus']").text("否");
	}else{
		$("[name='deriveStatus']").text("是");
		$("[name='deriveFormula']").text(applyVo.deriveFormula);
	}
	$("[name='sourceId']").text(applyVo.sourceId);
	$("[name='sourceName']").text(applyVo.sourceName);
	$("[name='sourceUrl']").text(applyVo.sourceUrl);
	$("[name='description']").text(applyVo.description);
	$("[name='enDescription']").text(applyVo.enDescription);
	$("[name='dataMark']").text(applyVo.dataMark);
	$("[name='enDataMark']").text(applyVo.enDataMark);
	
//	var applyReason =  applyVo.applyReason;
//	if(applyReason != null){
//		$("[name='applyReason']").text(applyVo.applyReason);
//	}
	
	$("[name='modifyStatusName']").text(applyVo.modifyStatusName);
	$("[name='modifyStatus']").text(applyVo.modifyStatus);
}

/**
 * 新增删除申请
 * @returns
 */
function addRemoveApply(){
	applyVo.applyType = 3;
	applyVo.applyReason = $("[name='applyReason']").val();
	$('.remove-apply-form').bootstrapValidator('validate');
	if ($('.remove-apply-form').data('bootstrapValidator').isValid()) {
		$(".save-remove-apply-js").attr("disabled", "disabled");
		loading.start();
		$.ajax({
			type : 'POST',
			url : "/gldata/myIndicator/saveAddDeleteApply",
			data : applyVo,
			success : function(result) {
				$(".save-remove-apply-js").removeAttr("disabled");
				loading.end();
				if(result.status=="200"){
					$.msg("申请删除指标成功！");
					backRemoveIndex();
				}else{
				    $.err(result.msg);	
				}
			}
		});
	}
}

/**
 * 编辑删除申请
 * @returns
 */
function saveEditDeleteApply(){
	var applyIndexVO = {
		id : $("#indexId").val(),	
		applyReason : $("#applyReason").val(),
		applyType : 3 //删除申请修改
	}
	$('.remove-apply-form').bootstrapValidator('validate');
	if ($('.remove-apply-form').data('bootstrapValidator').isValid()) {
		$(".save-remove-edit-js").attr("disabled", "disabled");
		loading.start();
		$.ajax({
			type : 'POST',
			url : "/gldata/myIndicator/saveEditDeleteApply",
			data : applyIndexVO,
			success : function(result) {
				$(".save-remove-edit-js").removeAttr("disabled");
				loading.end();
				if(result.status == "200"){
					$.msg("修改成功！");
					backRemoveIndex();
				}else{
				    $.err(result.msg);	
				}
			}
		});
	}
}

function deleteRemoveApply(){
	$(".delete-remove-js").attr("disabled", "disabled")
	bootbox.dialog({
		message : '确定删除该选项',
		title : "确定删除",
		className : "modal-inverse fn-sm",
		buttons : {
			success : {
				label : "确定",
				className : "btn-primary",
				callback : function() {
					$.ajax({
						type : 'POST',
						url : "/gldata/myIndicator/saveDeleteDeleteApply",
						data : {
							id : $("#indexId").val()
						},
						success : function(result) {
							$(".delete-remove-js").removeAttr("disabled");
							loading.end();
							if(result.status == "200"){
								$.msg("删除成功！");
								setTimeout(function(){
									backRemoveIndex();
								},500);
							}else{
							    $.err(result.msg);	
							}
						}
					});
				}
			},
			cancel : {
				label : "取消",
				className : "btn-primary"
			}
		}
	});
}

/**
 * 返回首页
 * 
 * @returns
 */
function backRemoveIndex(){
	location.href = "/gldata/myIndicator/toPageDeleteApply";
}

$(document).ready(function () {
	$('.remove-apply-form').bootstrapValidator({
		message : '输入错误，请重新输入'
	});
      
	$(".save-remove-apply-js").on("click", addRemoveApply);
	$(".save-remove-edit-js").on("click", saveEditDeleteApply);
	$(".delete-remove-js").on("click", deleteRemoveApply);
	$(".searchBtn").on("click", getRemoveApplyDetail);
});