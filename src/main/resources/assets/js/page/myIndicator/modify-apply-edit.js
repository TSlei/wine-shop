var applyVo = null;
function returnModifyApplyPage() {
	location.href = "/gldata/myIndicator/toPageEditApply";
}

function getApplyIndexDetail() {
	var indexCode = $("#getApplyIndexInput").val();
	$("#getApplyIndexBtn").attr("disabled", "disabled");
	loading.start();
	$.ajax({
		type : 'POST',
		url : "/gldata/myIndicator/getIndexDetail",
		data : {
			indexCode : indexCode
		},
		success : function(result) {
			$("#getApplyIndexBtn").removeAttr("disabled");
			loading.end();
			if(result.status=="200"){
				applyVo = result.data;
				if(typeof applyVo != "undefined" && applyVo != null){
					setNameAttr(applyVo);
				}
			}else{
			    $.err(result.msg);	
			}
		}
	});
}

function setNameAttr(applyVo){
	//$("#applyStatusImg").attr("src", "/gldata/assets/img/apply-" + applyVo.applyStatus + ".png");
	if(applyVo.monitorType == 2){
		$(".monitor1").removeClass("hidden");
		$(".monitor2").addClass("hidden");
	}else if(applyVo.monitorType == 0 || applyVo.monitorType == 1){
		$(".monitor1").addClass("hidden");
		$(".monitor2").removeClass("hidden");
	}
	$(".index-attr-js").each(function(){
		var attrName = $(this).attr("name");
		if($(this).is("input")){
			if($(this).attr("type") == "radio"){
				$(":radio[name='" + attrName + "'][value='" + applyVo[attrName] + "']").prop("checked", "checked");
			}else{
				$(this).val(applyVo[attrName]);
			}
		}else if($(this).is("select")){
			$(this).val(applyVo[attrName])
			if(attrName == 'unitId' || attrName == 'sourceId'){
				$(this).select2()	
			}
		}
	});
	initSelectOrSwitch();
};

function singleModifySave(){
	$('.modify-apply-edit-form').bootstrapValidator('validate');
	if ($('.modify-apply-edit-form').data('bootstrapValidator').isValid()) {
		var applyIndexVO = $(".modify-apply-edit-form").serialize();
		$(".single-modify-save-js").attr("disabled", "disabled");
		loading.start();
		$.ajax({
			type : 'POST',
			url : "/gldata/myIndicator/saveAddEditApply",
			data : applyIndexVO,
			success : function(result) {
				$(".single-modify-save-js").removeAttr("disabled");
				loading.end();
				if(result.status=='200'){
					$.msg("修改成功!");
					setTimeout(function(){
						returnModifyApplyPage();//跳转到首页
					},500);
				}else{
					$.err(result.msg);
				}
			}
	    });
	}
	
}

function selectCallBack(){
	$('.modify-apply-edit-form').data('bootstrapValidator').updateStatus("modifyTimeName","VALID",null);
}

$(document).ready(function() {
	$("body").on("click", "#getApplyIndexBtn", function() {
		getApplyIndexDetail();
	});
	
	$("body").on("click", ".return-modify-apply-js", function(){
		returnModifyApplyPage();
	});
	
	$("body").on("click", ".single-modify-save-js", function(){
		singleModifySave();
	});

	$('.modify-apply-edit-form').bootstrapValidator({
		message : '输入错误，请重新输入',
		excluded : [ ':disabled', ':hidden', ':not(:visible)' ],// 排除无需验证的控件，比如被禁用的或者被隐藏的
		fields : {
			monitorLower : {
				validators : {
					regexp : {
						regexp : /^(\-|\+)?\d+(\.\d+)?$/,
						message : '预警值必须大于0'
					},
					stringLength: {
                        max: 8,
                        message: '长度不能大于8位'
                    },
                    
                    callback: {
		                message: '后面预警值必须大于前面值',
		                callback: function(value, validator) {
	                    	var higherValue = $("input[name='monitorHigher']:visible").val();//获得另一个的值
	                        if (eval(higherValue) <= eval(value)) {
	                            return false;
	                        }else{
	                        	validator.updateStatus("monitorLower", validator.STATUS_VALID, 'callback');
	                        	validator.updateStatus("monitorHigher", validator.STATUS_VALID, 'callback');
	                            return true;
	                        }
	                    }
		            }
				}
			},
	
			monitorHigher : {
				validators : {
					regexp : {
						regexp : /^(\-|\+)?\d+(\.\d+)?$/,
						message : '预警值必须大于0'
					},
					stringLength: {
                        max: 8,
                        message: '长度不能大于8位'
                    },
					callback: {
						message: '后面预警值必须大于前面值',
						callback: function(value, validator) {
	                    	var lowerValue = $("input[name='monitorLower']:visible").val();//获得另一个的值
	                        if (eval(lowerValue) >= eval(value)) {
	                            return false;
	                        }else{
	                        	validator.updateStatus("monitorLower", validator.STATUS_VALID, 'callback');
	                        	validator.updateStatus("monitorHigher", validator.STATUS_VALID, 'callback');
	                            return true;
	                        }
	                    }
		            }
				}
			}
		}
	});
});