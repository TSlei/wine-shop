 function getAsyncUrl(treeId, treeNode) {
    console.log(treeNode);
    var code  = treeNode.code;
    return "/gldata/mydata/queryAuditCategoryTree";
};  

  var setting = {
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        onClick: nodeOnClick
      },
      view: {
        fontCss: getFont
      },
      async: {  
          enable: true,//异步加载  
          url:getAsyncUrl,  //请求地址，可用function动态获取   
          autoParam:['code'],//提交的节点参数，可用“id=xx”取请求提交时的别名  
          //otherParam:{"otherParam":"zTreeAsyncTest"},//提交的其他参数,json的形式  
          dataType:"json",//返回数据类型  
          type:"post",//请求方式  
          dataFilter: null//数据过滤  
          }
      
    };
    
function nodeOnClick(event, treeId, treeNode){
	//console.log(treeNode.code);
	loadTableData();
}
function selectRootNode(){
	var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
	var node = treeObj.getNodeByParam("id", "0");
	treeObj.selectNode(node);
}
function loadCategoryTree(){
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/queryAuditCategoryTree",
		data : null,
		success : function(result) {
			$.fn.zTree.init($("#categoryTree"), setting, result);
			selectRootNode();
		}
    });
}
function getAllParam(){
	var indexSourceType = $("#indexSourceType").val()==""?null:$("#indexSourceType").val();
	var operationType = $("#operationType").val()==""?null:$("#operationType").val();
	var dataType = $("#dataType").val()==""?null:$("#dataType").val();
	var monitorStatus = $("#monitorStatus").val()==""?null:$("#monitorStatus").val();
	var status = $("#status").val()==""?null:$("#status").val();
	var indexCode = $("#indexCode").val();
	var indexName = $("#indexName").val();
	var marketCode = $("#marketCode").val();
	var categoryCode = getSelectedCode();
	var adminName = $("#adminName").val();
	var jsonData = {
			indexSourceType:indexSourceType,
			operationType:operationType,
			dataType:dataType,
			monitorStatus:monitorStatus,
			status:status,
			indexCode:indexCode,
			indexName:indexName,
			marketCode:marketCode,
			categoryCode:categoryCode,
			adminName:adminName
	};
	
    return jsonData;	
}

function getSelectedCode(){
	var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
	if(treeObj){
		var selectedNodes = treeObj.getSelectedNodes(true);
		var selectedNode = selectedNodes[0];
		return selectedNode.code;
	}else{
       return null;		
	}
	
}

function loadTableData(){
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=50;
  	$("#auditTable").pagination({
			url : "/gldata/mydata/queryTaskAuditTable",
			paramJson : jsonData,
			callback:function(){
				 $('#allCheck').removeAttr('checked');
			}
		});
}

function passTask(){
	var target = $(this).parents("tr");
	var taskId = target.attr("data-id");
	if(!taskId){
		return;
	}
	  bootbox.dialog({
		    message: '<i class="fa fa-warning red margin-right-10 margin-left-30" style="font-size:36px; vertical-align:middle;"></i> 该数据超出预警，是否通过？',
		    title: "确定通过",
		    className: "modal-inverse fn-sm",
		    buttons: {
		      success: {
		        label: "确定",
		        className: "btn-primary",
		        callback: function () {
		        	var jsonArray = new Array();
		        	jsonArray.push(taskId);
		        	$.ajax({
		        		type : 'POST',
		        		url : "/gldata/mydata/batchPassTask",
		        		data : {"idList":jsonArray},
		        		success : function(result) {
		        			if(result.status=='200'){
		        				bootbox.hideAll();
		        				loadTableData();
		        			}else{
		        				$.err(result.msg);
		        			}
		        		}
		            });
		        	return false;
		        }
		      },
		      cancel: {
		        label: "取消",
		        className: "btn-primary"
		      }
		    }
		  });
	  
}
function rejectedTask(){
	var target = $(this).parents("tr");
	var taskId = target.attr("data-id");
	if(!taskId){
		return;
	}
	  bootbox.dialog({
		    message: '确定驳回该选项',
		    title: "确定驳回",
		    className: "modal-inverse fn-sm",
		    buttons: {
		      success: {
		        label: "确定",
		        className: "btn-primary",
		        callback: function () {
		        	var jsonArray = new Array();
		        	jsonArray.push(taskId);
		        	$.ajax({
		        		type : 'POST',
		        		url : "/gldata/mydata/batchRejectTask",
		        		data : {"idList":jsonArray},
		        		success : function(result) {
		        			if(result.status=='200'){
		        				bootbox.hideAll();
		        				loadTableData();
		        			}else{
		        				$.err(result.msg);
		        			}
		        		}
		            });
		        	return false;
		        }
		      },
		      cancel: {
		        label: "取消",
		        className: "btn-primary"
		      }
		    }
		  });
	  
}

function batchRejectedTask(){
	var taskIds = getAllChecked();
	if(taskIds.length==0){
		$.err("请选择要驳回的记录！");
		return;
	}
	
	bootbox.dialog({
	    message: '确定批量驳回所选项',
	    title: "确定批量驳回",
	    className: "modal-inverse fn-sm",
	    buttons: {
	      success: {
	        label: "确定",
	        className: "btn-primary",
	        callback: function () {
	        	$.ajax({
	        		type : 'POST',
	        		url : "/gldata/mydata/batchRejectTask",
	        		data : {"idList":taskIds},
	        		success : function(result) {
	        			if(result.status=='200'){
	        				bootbox.hideAll();
	        				loadTableData();
	        			}else{
	        				$.err(result.msg);
	        			}
	        		}
	            });
	        	return false;
	        }
	      },
	      cancel: {
	        label: "取消",
	        className: "btn-primary"
	      }
	    }
	  });
}

function batchPassTask(){
	var taskIds = getAllChecked();
	if(taskIds.length==0){
		$.err("请选择要通过的记录！");
		return;
	}
	
	bootbox.dialog({
	    message: '确定批量通过所选项',
	    title: "确定批量通过",
	    className: "modal-inverse fn-sm",
	    buttons: {
	      success: {
	        label: "确定",
	        className: "btn-primary",
	        callback: function () {
	        	$.ajax({
	        		type : 'POST',
	        		url : "/gldata/mydata/batchPassTask",
	        		data : {"idList":taskIds},
	        		success : function(result) {
	        			if(result.status=='200'){
	        				bootbox.hideAll();
	        				loadTableData();
	        			}else{
	        				$.err(result.msg);
	        			}
	        		}
	            });
	        	return false;
	        }
	      },
	      cancel: {
	        label: "取消",
	        className: "btn-primary"
	      }
	    }
	  });
}


function getAllChecked(){
	var taskIds = new Array();
	$("tr .taskCheck.activeCheck:checked").each(function(e,i){
		var taskId = $(this).attr("data-id");
		if(taskId){
			taskIds.push(taskId);
		}
	});
	
   return taskIds;
}

$(document).ready(function () {
  loadTableData();
  loadCategoryTree();
  $("#auditTable").delegate(".rejectedBtn","click",rejectedTask);
  $("#auditTable").delegate(".passBtn","click",passTask);
  $(".batchPassBtn").on("click",batchPassTask);
  $(".batchRejectBtn").on("click",batchRejectedTask);
  $(".searchBtn").on("click",loadTableData);
  $('#allCheck').click(function () {
	  if ($(this).is(':checked')) {
	    $(this).parents('body').find('#auditTable').find('.taskCheck').each(function (i, v) {
	    		$(v).prop('checked', 'true');
	    });
	  } else {
		  $(this).parents('body').find('#auditTable').find('.taskCheck').removeAttr('checked');
	  }
	});
  
  $(".resetBtn").on("click",function(){
	  window.location.reload();
  });
  
  $("body").delegate(".taskCheck","click",function(){
	 var num = $("#auditTable .taskCheck").length;
	 var checkedNum =  $("#taskTable .taskCheck:checked").length;
	 if(num==checkedNum){
		 $('#allCheck').prop('checked', 'true');
	 }else{
		 $('#allCheck').removeAttr('checked');
	 }
	  
  });
});


$("body").on("keyup","#adminName",function(){
	remoePercent(this);
	remoeUnderLine(this);
});
$("body").on("keyup","#indexCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#indexName",function(){
	remoePercent(this);
	remoeUnderLine(this);
});
$("body").on("keyup","#marketCode",function(){
	remoePercent(this);
});