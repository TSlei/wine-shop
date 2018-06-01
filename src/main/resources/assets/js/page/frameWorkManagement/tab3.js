function exportSort(){
	var tree = window.parent.getTree();
	var node = tree.getNodeByParam("id", $("#categoryId").val(), null);
	console.log(node);
	if(node.pId == 0){
		top.$.err("一及框架无法导出指标排序!");
		return;
	}
	var url = "/gldata/coreCategory/io/export-index-order";
    var form = $("<form></form>").attr("action", url).attr("method", "post");
    var categoryId = $("#categoryId").val()==""?null:$("#categoryId").val();
	var indexCode = $("#indexCode").val()==""?null:$("#indexCode").val();
	var indexName = $("#indexName").val()==""?null:$("#indexName").val();
	var published = $("#published").val()==""?null:$("#published").val();
	var creatorId = $("#creatorId").val()==""?null:$("#creatorId").val();
	var createTime = $("#createTime").val()==""?null:$("#createTime").val();//.replace(/\//g,'-');
	var jsonData = {};
	if(!!categoryId){
		form.append($("<input></input>").attr("type", "hidden").attr("name", "categoryId").attr("value", categoryId));
	}
	if(!!categoryId){
		form.append($("<input></input>").attr("type", "hidden").attr("name", "indexCode").attr("value", indexCode));
	}
	if(!!indexName){
		form.append($("<input></input>").attr("type", "hidden").attr("name", "indexNameAndShowName").attr("value", indexName));
	}
	if(!!published){
		form.append($("<input></input>").attr("type", "hidden").attr("name", "published").attr("value", published));
	}
	if(!!creatorId){
		form.append($("<input></input>").attr("type", "hidden").attr("name", "creatorId").attr("value", creatorId));
	}
	if(!!createTime){
		form.append($("<input></input>").attr("type", "hidden").attr("name", "createTime").attr("value", createTime));
	}
	
	form.appendTo('body').submit().remove();
}

function getAllParam(){
	var categoryId = $("#categoryId").val()==""?null:$("#categoryId").val();
	var indexCode = $("#indexCode").val()==""?null:$("#indexCode").val();
	var indexName = $("#indexName").val()==""?null:$("#indexName").val();
	var published = $("#published").val()==""?null:$("#published").val();
	var creatorId = $("#creatorId").val()==""?null:$("#creatorId").val();
	var createTime = $("#createTime").val()==""?null:$("#createTime").val();//.replace(/\//g,'-');
	var jsonData = {};
	jsonData["categoryId"] = categoryId;
	jsonData["indexCode"] = indexCode;
	jsonData["indexNameAndShowName"] = indexName;
	jsonData["published"] = published;
	jsonData["creatorId"] = creatorId;
	jsonData["createTime"] = createTime;
    return jsonData;	
}
function loadTableData(){
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=15;
//	console.log(jsonData);
  	$("#dataTable").pagination({
  			url : "/gldata/coreCategory/index-info-table",
			paramJson : jsonData,
			callback:function(){
				checkAllCheckBox();
			}
		});
	      
}
//查询按钮
$("body").on("click","#searchBtn",function(){
	loadTableData();
});
//tab点击
$("body").on("click",".tabbable .nav.nav-tabs li:not(.active) a",function(){
	$("#frameForm").attr("action",$(this).attr("url"));
	$("#frameForm").submit();
});
//批量 前端显示/隐藏
$("body").on("click", ".publishedBtn", function () {
  var now_table = $(this).parents('body').find('.fn-check-all-table').eq($('.fn-pass-all').index(this));
  var ckeck = $(now_table).find('.checkbox input:checked');
  var published = $(this).data("published");
  var title = "确定前端显示";
  var message = "确定前端显示";
  var showMsg = "前端显示";
  if(published == "0"){
	  title="确定前端隐藏";
	  message = "确定前端隐藏";
	  showMsg = "前端隐藏";
  }
  if (ckeck.length > 0) {
//    ckeck.parents('tr').find('.fn-f-show-hock').text('前端显示');
	  
	  bootbox.dialog({
	      message: message,
	      title: title,
	      className: "modal-inverse fn-sm",
	      buttons: {
	        success: {
	          label: "确定",
	          className: "btn-primary",
	          callback: function () {
	        	  var coreCategoryIndexLIst = new Array();
	        	  ckeck.each(function(i,e){
	        		  coreCategoryIndexLIst.push({indexId:$(e).val(),published : published});
	        	  });
	        		$.ajax({
	        			type : 'POST',
	        			url : "/gldata/coreCategory/change-index-published",
	        			data: JSON.stringify(coreCategoryIndexLIst),//将对象序列化成JSON字符串  
	        		    dataType:"json",
	        		    contentType : 'application/json;charset=utf-8', //设置请求头信息  
	        		    success : function(result) {
	        			    if(result.status=="200"){
	        			    	top.$.msg(showMsg+"成功");
	        			    	$("#dataTable").pagination("refresh");
	        			    }else{
	        			    	top.$.err(result.msg);
	        			    }
	        		    },
	        		    error : function(){
	        		    	top.$.err("系统异常");
	        		    }
	        		});
	          }
	        },
	        cancel: {
	          label: "取消",
	          className: "btn-primary"

	        }
	      }
	    });
  } else {
    fnCheckAllDisplay();
  }
});
/** 导出排序*/
$("body").on("click","#exportSort",function(){
	exportSort();
});


function batchImport(flag){
	var title = "批量排序";
	var label = "确定导入";
	if(flag == "relation"){
		title = "批量关联";
		label = "确定导入";
	}
    bootbox.dialog({
        message: $("#input-append-modal").html(),
        title: title,
        className: "modal-inverse fn-sm",
        buttons: {
          success: {
            label: label,
            className: "btn-primary",
            callback: function () {
              var fnFile = $('.fn-fileCover').val();
              var excelFile = /^.*\.(?:xls|xlsx)$/i;
              if (fnFile == '' || fnFile == null || !excelFile.test(fnFile)) {
            	 top.$.err("请选择 excel 格式文件!");
            	 return false;
              } else {
            	 uploadImportFile(flag);
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

function uploadImportFile(flag){
	var url = "/gldata/coreCategory/io/import-index-order";
	if(flag == "relation"){
		url="/gldata/coreCategory/io/import-category-index-relation";
	}
	$.ajaxFileUpload
    ({
			type:"POST",
            url: url, //用于文件上传的服务器端请求地址
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
            		   if(succ * 1 > 0 && flag == "sort"){
            			   $("#dataTable").pagination("refresh");
            		   }
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
            			        }
            			      }
//            		  ,
//            			      down: {
//            			        label: "下载失败日志",
//            			        className: "btn-primary",
//            			        callback: function () {
//            			        	if(fileId){
//            			        		//downLoadReportIMG("http://192.168.200.191:8888/"+fileId);
//            			        		//window.location.href = "http://192.168.200.191:8888/"+fileId;
//            			        		window.location.href = "/gldata/io/download/log?fileId="+fileId+"&fileName=批量失败日志.xls";
//            			        		setTimeout(function(){deleteImportLog(fileId);},1000);
//            			        	}
//            			        	bootbox.hideAll();
//            			        }
//            			      }
            			    }
            			  });
            	}else{
                   top.$.err(result.msg);            		
            	}
            	
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
            	top.$.err("文件上传失败");
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
$("body").on("click", "#importSort",function(){
	batchImport("sort");	
});
$("body").on("click", "#importRelation",function(){
	batchImport("relation");	
});


$(document).ready(function () {
	$('#chanel_frame', window.parent.document).attr("table-index",3);
	$("#creatorId").adminSelect("list",null);
	loadTableData();
});

function checkAllCheckBox(){
	if($(".objId").length == $(".objId:checked").length && $(".objId").length != 0){
		$("#selectAll").prop('checked', 'true');
	}else{
		$("#selectAll").removeAttr('checked');
	}
//	$(v).prop('checked', 'true');
}

$("body").on("click", ".objId",function(){
	checkAllCheckBox();	
});
$("body").on("click", "#selectAll",function(){
	if ($(this).is(':checked')) {
		$(".objId").prop('checked', 'true');
		$(".objId").attr('check', '1');
	}else{
		$(".objId").removeAttr('checked');
		$(".objId").removeAttr('check');
	}
});

$("body").on("keyup","#indexCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#indexName",function(){
	remoePercent(this);
	remoeUnderLine(this);
});
$("body").on("click","#resetBtn",function(){
	$("#indexCode").val("");
	$("#indexName").val("");
	$("#published").val("");
	$("#createTime").val("");
	$("#creatorId").adminSelect("list",null);
	loadTableData();
})