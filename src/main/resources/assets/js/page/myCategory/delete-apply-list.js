   

function loadTableData(){
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=15;
  	$("#deleteApplyTable").pagination({
			url : "/gldata/mycategory/queryDeleteApplyTable",
			paramJson : jsonData,
			callback:function(){
				
			}
		});
	      
}

function countApply(){
	var applyTime = $("#applyTime").val()==""?null:$("#applyTime").val();
	var jsonData = {
			applyType:3,
			createTime:applyTime
	};
	
	$.ajax({
		type : 'POST',
		url : "/gldata/mycategory/countApply",
		data : jsonData,
	    success : function(result) {
	    	console.log(result);
		    if(result.status=="200"){
		    	$(".auditingCount").html(result.data.auditingCount);
		    	$(".auditedCount").html(result.data.auditedCount);
		    	$(".rejectCount").html(result.data.rejectCount);
		    }
	    }
	});
	
};

function getAllParam(){
	var name = $("#categoryName").val()==""?null:$("#categoryName").val();
	var applyStatus = $("#applyStatus").val()==""?null:$("#applyStatus").val();
	var applyTime = $("#applyTime").val()==""?null:$("#applyTime").val();
	var dbCode = $("#dbCode").val()==""?null:$("#dbCode").val();
	var categoryId = $("#categoryId").val()==""?null:$("#categoryId").val();
	var applyStatus = $("#applyStatus").val()==""?null:$("#applyStatus").val();
	var jsonData = {
			dbCode:dbCode,
			categoryId:categoryId,
			nameAndShowName:name,
			applyType:3,
			applyStatus:applyStatus,
			createTime:applyTime
	};
   return jsonData;
}

function batchImport(){
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
            	 uploadImportFile();
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

function uploadImportFile(){
	$.ajaxFileUpload
    ({
			type:"POST",
            url: '/gldata/mycategory/deleteApplyImport', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: "importFile", //文件上传域的ID
            dataType: 'json',
            success: function (result)  //服务器成功响应处理函数
            {   
            	
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
            			        	setTimeout(function(){deleteImportLog(fileId);},1000);
            			        	bootbox.hideAll();
            			        	location.reload();
            			        }
            			      },
            			      down: {
            			        label: "下载失败日志",
            			        className: "btn-primary",
            			        callback: function () {
            			        	if(fileId){
            			        		//downLoadReportIMG("http://192.168.200.191:8888/"+fileId);
            			        		//window.location.href = "http://192.168.200.191:8888/"+fileId;
            			        		window.location.href = "/gldata/io/download/log?fileId="+fileId+"&fileName=删除框架申请失败日志.xls";
            			        		setTimeout(function(){deleteImportLog(fileId);},1000);
            			        	}
            			        	bootbox.hideAll();
            			        }
            			      }
            			    }
            			  });
            	}else{
                   $.err(result.msg);            		
            	}
            	
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
            	$.err("文件上传失败");
            }
        })
   }


function deleteImportLog(fileId){
  	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/deleteFailLogFile",
		data : {"fileId":fileId},
		success : function(result) {
		}
    });
	
}

$(document).ready(function () {
	$("#dbCode").DBCodeSelect("list",null);
	countApply();
	loadTableData();
	$(".searchBtn").on("click",function(){
		loadTableData();
		countApply();
	});
    $(".downloadTemplate").on("click",function(){
    	window.location.href="/gldata/io/download/template?code=10003";
    });
    $("body").on("click", ".importApply",batchImport);
      
});
$("body").on("click","#resetBtn",function(){
	alert("1");
	$("#dbCode").DBCodeSelect("list",null);
})

$("body").on("keyup","#categoryId",function(){
	onlyNumber(this);
});
$("body").on("keyup","#categoryName",function(){
	remoePercent(this);
	remoeUnderLine(this);
});

$("#delete-reset").click(function(){
	window.location.href="/gldata/mycategory/deleteApply";
});
