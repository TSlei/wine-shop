var orginValue = "";
$(document).ready(function() {
	$("body").on( 'change', "select[name='monitorType']", function(enevnt) {
		var _this = $(enevnt.target);
		selectMonitorSetting(_this, _this.val());
	});

	//是否自动更新  是否衍生指标
	$("body").on('click', "input[name='marketStatus'], input[name='deriveStatus']", function(enevnt) {
		var _this = $(enevnt.target);
		selectMarketStatus(_this, _this.val());
	});
	
	//指标状态 正常更新 停止更新
	$("body").on( 'click', "input[name='modifyStatus']", function(enevnt) {
		var _this = $(enevnt.target);
		selectModifyStatus(_this, _this.val());
	});
	
	initSelectOrSwitch();
});

function initSelectOrSwitch(){
	orginValue = $("input[name='modifyStatus']:checked").val();
	
	var marketStatus = $("input[name='marketStatus']:checked");
	selectMarketStatus(marketStatus, marketStatus.val());
	
	var deriveStatus =  $("input[name='deriveStatus']:checked");
	selectMarketStatus(deriveStatus, deriveStatus.val());
	
	var modifyStatus =  $("input[name='modifyStatus']:checked");
	selectModifyStatus(modifyStatus, modifyStatus.val());
	
	var monitorSetting = $("select[name='monitorType']");
	selectMonitorSetting(monitorSetting, monitorSetting.val());
}

//
function selectMarketStatus(_this, value){
	switch (value) {
	case "1":
		_this.parents('.fn-radio1-wrap').find('.fn-box').children('input').removeAttr('disabled');
		$("[name='monitorType']").find(".default-type-js").val(-1);
		$("[name='monitorType']").val(-1);
		$("[name='monitorType']").parents('.fn-select1-wrap').find('.fn-box').addClass('hidden');
		break;
	case "0":
		_this.parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled').val("");
		if($("[name='marketStatus']:checked").val() == 0 && $("[name='deriveStatus']:checked").val() == 0){
			$("[name='monitorType']").find(".default-type-js").val("");
		}
		break;
	default:
		_this.parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled').val("");
		if($("[name='marketStatus']:checked").val() == 0 && $("[name='deriveStatus']:checked").val() == 0){
			$("[name='monitorType']").find(".default-type-js").val("");
		}
		break;
	}
}

function selectModifyStatus(_this, value){
	switch (value) {
	case "1":
		if(orginValue == 1){
			$('.fn-radio2-hock-1').hide().find("input").attr("disabled", "disabled");
			$('.fn-radio2-hock-0').hide().find("input").attr("disabled", "disabled");
		}else if(orginValue == 0){
			$('.fn-radio2-hock-0').show().find("input").removeAttr("disabled"); //显示
			$('.fn-radio2-hock-1').hide().find("input").attr("disabled", "disabled"); //防止名称重复 form表单提交
		}
		break;
	case "0":
		if(orginValue == 1){
			$('.fn-radio2-hock-0').hide().find("input").attr("disabled", "disabled");
			$('.fn-radio2-hock-1').show().find("input").removeAttr("disabled");
		}else if(orginValue == 0){
			$('.fn-radio2-hock-1').hide().find("input").attr("disabled", "disabled");
			$('.fn-radio2-hock-0').hide().find("input").attr("disabled", "disabled");
		}
		break;
	default:
		break;
	}
}

//预警设置
function selectMonitorSetting(_this, value){
	switch (value) {
      case "":
    	  _this.parents('.fn-select1-wrap').find('.fn-box').addClass('hidden');
        break;
      case "2":
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(0).removeClass('hidden').siblings('.fn-box').addClass('hidden');
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(0).find("input").removeAttr("disabled");
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(1).find("input").attr("disabled", "disabled");
    	  
    	  $("input[name='marketStatus'][value=0]").prop("checked", true).parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled');
    	  $("input[name='deriveStatus'][value=0]").prop("checked", true).parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled');
    	  
        break;
      case "3":
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(0).removeClass('hidden').siblings('.fn-box').addClass('hidden');
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(0).find("input").removeAttr("disabled");
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(1).find("input").attr("disabled", "disabled");
    	  
    	  $("input[name='marketStatus'][value=0]").prop("checked", true).parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled');
    	  $("input[name='deriveStatus'][value=0]").prop("checked", true).parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled');
        break;
      case "1":
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(0).removeClass('hidden').siblings('.fn-box').addClass('hidden');
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(0).find("input").removeAttr("disabled");
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(1).find("input").attr("disabled", "disabled");
    	  
    	  $("input[name='marketStatus'][value=0]").prop("checked", true).parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled');
    	  $("input[name='deriveStatus'][value=0]").prop("checked", true).parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled');
    	break;
      case "0":
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(1).removeClass('hidden').siblings('.fn-box').addClass('hidden');
    	  _this.parents('.fn-select1-wrap').find('.fn-box').eq(1).find("input").removeAttr("disabled");
   	      _this.parents('.fn-select1-wrap').find('.fn-box').eq(0).find("input").attr("disabled", "disabled");
   	      
   	      $("input[name='marketStatus'][value=0]").prop("checked", true).parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled');
 	      $("input[name='deriveStatus'][value=0]").prop("checked", true).parents('.fn-radio1-wrap').find('.fn-box').children('input').attr('disabled','disabled');
        break;
      case "-1":
    	  _this.parents('.fn-select1-wrap').find('.fn-box').addClass('hidden');
        break;
      default:
        break;
	}
}

