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
	$("[name='categoryName']").text(applyVo.categoryName); //
	$("[name='categoryId']").text(applyVo.categoryId);
	$("[name='categoryPath']").text(applyVo.categoryPath);
	$("[name='name']").text(applyVo.name); //name
	$("[name='showName']").text(applyVo.showName); //showName
	$("[name='enName']").text(applyVo.enName); //enName
	$("[name='enShowName']").text(applyVo.enShowName); //enShowName
	
	var applyReason =  applyVo.applyReason;
	if(applyReason != null){
		$("[name='applyReason']").text(applyVo.applyReason);
	}
}

/**
 * 新增删除数据申请
 * @returns
 */
function addRemoveDataApply(){
	applyVo.applyType = 4;
	applyVo.applyReason = $("[name='applyReason']").val();
	applyVo.indexCode = $("#indexCode").val();
	applyVo.indexName = applyVo.name;
	applyVo.categoryCodeName = applyVo.categoryName;
	applyVo.indexShowName = applyVo.showName;
	applyVo.indexEnName = applyVo.enName;
	applyVo.indexEnShowName = applyVo.enShowName;
	var details = new Array();
	$(".fn-date1-r-s").each(function(){
		details.push($(this).val().replace(/\s+/g, "").replace("-","$")); //去掉空格
	});
	applyVo.dateDetials = details;
	$('.remove-data-apply-form').bootstrapValidator('validate');
	if ($('.remove-data-apply-form').data('bootstrapValidator').isValid()) {
		$(".add-remove-data-js").attr("disabled", "disabled");
		loading.start();
		$.ajax({
			type : 'POST',
			url : "/gldata/myIndicator/saveAddDataDeleteApply",
			dataType : "json",  
		    contentType : 'application/json;charset=utf-8', //设置请求头信息
			data : JSON.stringify(applyVo),
			success : function(result) {
				$(".add-remove-data-js").removeAttr("disabled");
				loading.end();
				if(result.status=="200"){
					$.msg("申请删除指标数据成功！");
					setTimeout(function(){
						backRemoveDataIndex();
					},500);
				}else{
				    $.err(result.msg);	
				}
			}
		});
	}
}

/**
 * 编辑删除数据申请
 * @returns
 */
function saveEditDeleteDataApply(){
	var applyDeleteDataVo = {
		applyReason : $("[name='applyReason']").val(),
		indexCode : $("#indexCode").text().trim(),
		applyId : $("#applyId").val(),
		id : $("#applyId").val(),
		indexId : $("#indexId").val(),
		applyStatus:0
	};
	var details = new Array();
	$(".fn-date1-r-s").each(function(){
		details.push($(this).val().replace(/\s+/g, "").replace("-","$")); //去掉空格
	});
	applyDeleteDataVo.dateDetials = details;
	$('.remove-data-apply-form').bootstrapValidator('validate');
	if ($('.remove-data-apply-form').data('bootstrapValidator').isValid()) {
		$(".update-remove-edit-js").attr("disabled", "disabled");
		loading.start();
		$.ajax({
			type : 'POST',
			url : "/gldata/myIndicator/saveEditDataDeleteApply",
			dataType : "json",  
		    contentType : 'application/json;charset=utf-8', //设置请求头信息
			data : JSON.stringify(applyDeleteDataVo),
			success : function(result) {
				$(".update-remove-edit-js").removeAttr("disabled");
				loading.end();
				if(result.status == "200"){
					$.msg("申请删除指标数据成功！");
					setTimeout(function(){
						backRemoveDataIndex();
					},500);
				}else{
				    $.err(result.msg);	
				}
			}
		});
	}
}

/**
 * 删除--数据删除申请
 * @returns
 */
function removeEditDeleteDataApply(){
	bootbox.dialog({
		message : '确定删除该选项',
		title : "确定删除",
		className : "modal-inverse fn-sm",
		buttons : {
			success : {
				label : "确定",
				className : "btn-primary",
				callback : function() {
					var applyIndexVO = {
						id : $("#applyId").val(),	
						applyStatus : $("#applyStatus").val() //删除申请修改
					}
					$(".remove-remove-edit-js").attr("disabled", "disabled");
					loading.start();
					$.ajax({
						type : 'POST',
						url : "/gldata/myIndicator/deleteDataDeleteApply",
						data : applyIndexVO,
						success : function(result) {
							$(".remove-remove-edit-js").removeAttr("disabled");
							loading.end();
							if(result.status == "200"){
								$.msg("修改成功！");
								setTimeout(function(){
									backRemoveDataIndex();
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
 * @returns
 */
function backRemoveDataIndex(){
	location.href = "/gldata/myIndicator/toPageDataDeleteApply";
}

$(document).ready(function () {
	$('.remove-data-apply-form').bootstrapValidator({
		message : '输入错误，请重新输入'
	});
      
	$(".add-remove-data-js").on("click", addRemoveDataApply); //新增保存
	$(".update-remove-edit-js").on("click", saveEditDeleteDataApply); //编辑保存
	$(".remove-remove-edit-js").on("click", removeEditDeleteDataApply); //编辑删除
	$(".searchBtn").on("click", getRemoveApplyDetail);

	$('.remove-data-apply-form').bootstrapValidator({
		message : '输入错误，请重新输入'
	});
	
	//时间选择控件
    $("body").on("mousedown", ".fn-date1-r-s", function () {
      $(this).daterangepicker({
        "alwaysShowCalendars": true,
        'applyClass': 'btn-primary',
        'cancelClass': 'btn-primary',
        "opens": "right",
        'ranges': {
          '今天': [moment(), moment()],
          '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          '最近7日': [moment().subtract(6, 'days'), moment()],
          '最近30日': [moment().subtract(29, 'days'), moment()]
        },
        "startDate": moment(),
        "endDate": moment(),
      })
    });
	
	$('body').on('apply.daterangepicker', '.fn-date1-r-s',function(ev, picker) {
		bvFnDate($(this).attr('name'));
	});
	var bvFnDate = function(a) {
		var thisName = a;
		var bootstrapValidatorUP = $("form").data('bootstrapValidator');
		bootstrapValidatorUP.updateStatus(thisName,'NOT_VALIDATED').validateField(thisName);
	}

	var fnIndex = 0;
	function eachRoleNameAdd() {
		$('input').each(function() {
			var roleName = $(this).attr('name');
			$(this).parents('form').bootstrapValidator("addField", roleName);
		});
	}
	
	function eachRoleNameMinus() {
		$(this).parents('.fn-con-add').find('input').each(function() {
			var roleName = $(this).attr('name');
			$(this).parents('form').bootstrapValidator("removeField", roleName);
		});
	}

	// 新加内容
	function fnConAdd(thisNode, addHtml) {
		$(thisNode).siblings('.fn-btn-con-minus').show();
		var fnParent = $(thisNode).parents('.fn-con-add');
		fnParent.after(addHtml);
		eachRoleNameAdd();
	}
	// 减去内容
	function fnConMinus(thisNode) {
		var fnParent = $(thisNode).parents('.fn-con-add');
		var fnLength = fnParent.siblings().length;
		if (fnLength == 1) {
			fnParent.siblings().find('.fn-btn-con-minus')
					.hide();
		}
		fnParent.remove();
		eachRoleNameMinus();
		$('#bv-btn-submit').removeAttr('disabled');
	}

	// 新增 Modal Trade
	$("body").on("click", ".fn-con-add-date .fn-con-add .fn-btn-con-add", function () {
        var _this = this;
        fnIndex++;
        var addHtml = '<div class="row fn-con-add"><div class="ol-lg-4 col-md-4 col-sm-6 col-xs-6 form-group"><input class="form-control fn-date1-r-s fn-date" readonly type="text" name="选择删除日期' + fnIndex + '" required></div><div class="col-lg-8 col-md-8 col-sm-6 col-xs-6"><a class="btn btn-ico fn-btn-con-add"><span class="fa fa-plus-square"></span></a> <a class="btn btn-ico fn-btn-con-minus" ><span class="fa fa-minus-square"></span></a></div></div>';
        fnConAdd(_this, addHtml);
    });

	$("body").on("click", ".fn-con-add-date .fn-con-add .fn-btn-con-minus", function() {
		var _this = this;
		fnConMinus(_this);
	});
});