function batchImport(url, name, applyType){
    bootbox.dialog({
        message: $("#input-append-modal").html(),
        title: "批量导入",
        className: "modal-inverse fn-sm",
        buttons: {
          success: {
            label: "确定导入",
            className: "btn-primary",
            callback: function () {
              var fnFile = $('.fn-fileCover').val();
              var excelFile = /^.*\.(?:xls|xlsx)$/i;
              if (fnFile == '' || fnFile == null || !excelFile.test(fnFile)) {
            	 $.err("请选择 excel 格式文件!");
            	 return false;
              } else {
            	 uploadImportFile(url, name, applyType);
            	 return false;
              }
            }
          },
          cancel: {
            label: "取消返回",
            className: "btn-primary"
          }
        }
      });
};


function uploadImportFile(url, name, applyType){
	$.ajaxFileUpload({
		type:"POST",
        url: url, // 用于文件上传的服务器端请求地址
        secureuri: false, // 是否需要安全协议，一般设置为false
        fileElementId: "importFile", // 文件上传域的ID
        data : {
        	applyType : applyType
        },
        dataType: 'json',
        success: function (result){// 服务器成功响应处理函数   
        	
	    	if(result.status=='200'){
			   var succ = result.data.succNum;
			   var fail = result.data.failNum;
			   var message = '导入成功<strong class="red">'+succ+'</strong>条，导入失败<strong class="red">'+fail+'</strong>';
			   var fileId = result.data.fileId;
			   bootbox.hideAll();
			   bootbox.dialog({
				    message: message,
				    title: "确定结果:",
				    className: "modal-inverse fn-sm",
				    buttons: {
				      success: {
				        label: "确定",
				        className: "btn-primary",
				        callback: function () {
				        	setTimeout(function(){deleteImportLog(fileId);},500);
				        }
				      },
				      down: {
				        label: "下载失败日志",
				        className: "btn-primary",
				        callback: function () {
				        	if(fileId){
				        		window.location.href = "/gldata/io/download/log?fileId="+fileId+"&fileName=" + name + ".xls";
				        		setTimeout(function(){deleteImportLog(fileId);},500);
				        	}
				        }
				      }
				    }
			   });
		     }else{
		         $.err(result.msg);            		
		     }
	    },
	    error: function (data, status, e){// 服务器响应失败处理函数
	    	$.err("文件上传失败");
	    }
    });
}

var downLoadFile = function (options) {  
    var config = $.extend(true, { method: 'post' }, options);  
    var $iframe = $('<iframe id="down-file-iframe" />');  
    var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');  
    $form.attr('action', config.url);  
    for (var key in config.data) {  
        $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');  
    }  
    $iframe.append($form);  
    $(document.body).append($iframe);  
    $form[0].submit();  
    $iframe.remove();  
};


function deleteImportLog(fileId){
  	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/deleteFailLogFile",
		data : {"fileId":fileId},
		success : function(result) {
			window.location.reload();
		}
    });
}

/**
 * 我的指标申请- 导出指标
 * @returns
 */
function exportAddApply(){
	var jsonData = getAllParam();
	downLoadFile({url:'/gldata/myIndicator/io/exportAddApply', data:jsonData});  
}

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

$(document).ready(function() {
	//新增指标申请导入
	$(".batch-add-import").on('click', function(){
		batchImport("/gldata/myIndicator/batchImport", "新增指标批量导入失败日志表", 1);
	});
	//新增指标申请模板下载
	$(".down-add-template").on("click", function(){
	    window.location.href="/gldata/io/download/template?code=10004";
	});
	
	
	//修改指标申请模板上传
	$(".batch-modify-import").on("click", function(){
		batchImport("/gldata/myIndicator/batchImport", "修改指标批量导入失败日志表", 2);
	});
	//修改指标申请模板下载
	$(".down-modify-template").on("click", function(){
	    window.location.href="/gldata/io/download/template?code=10005";
	});
	
	//删除指标申请模板上传
	$(".batch-remove-import").on("click", function(){
		batchImport("/gldata/myIndicator/batchImport", "删除指标批量导入失败日志表", 3);
	});
	//删除指标申请模板下载
	$(".down-remove-template").on("click", function(){
	    window.location.href="/gldata/io/download/template?code=10006";
	});
	
	//删除指标数据申请模板下载
	$(".down-remove-data-template").on("click", function(){
	    window.location.href="/gldata/io/download/template?code=10007";
	});
	//删除指标数据申请模板上传
	$(".batch-remove-data-import").on("click", function(){
		batchImport("/gldata/myIndicator/batchImport", "删除指标数据批量导入失败日志表", 4);
	});
	
	//我的指标申请-导出指标
	$(".export-index-data").on("click", function(){
		exportAddApply();
	});
	
});
