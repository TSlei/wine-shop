/**
 * 我的数据
 */

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
          url:"/gldata/mydata/queryCategoryTree",  //请求地址，可用function动态获取   
          autoParam:['code'],//提交的节点参数，可用“id=xx”取请求提交时的别名  
          //otherParam:{"otherParam":"zTreeAsyncTest"},//提交的其他参数,json的形式  
          dataType:"json",//返回数据类型  
          type:"post",//请求方式  
          dataFilter: null//数据过滤  
         }
    };

    
$(function(){
    $("#dataFrame").height($(window).height() - 25);
    $("#categoryTree").parent().height($(window).height() - 25);
    $(window).resize(function () {
        $("#dataFrame").height($(window).height() - 25);
        $("#treeDemo0").parent().height($(window).height() - 25);
    });
	
});
function nodeOnClick(event, treeId, treeNode){
	//console.log(treeNode.code);
	reloadData();
}

function countTaskTotal(){
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/countTaskTotal",
		data : null,
	    success : function(result) {
		    if(result.status=="200"){
		    	$(".totalTask").html(result.data);
		    }
	    }
	});
	
};

function countTaskHistoryTotal(){
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/countTaskHistoryTotal",
		data : null,
	    success : function(result) {
		    if(result.status=="200"){
		    	$(".totalTaskHistory").html(result.data);
		    }
	    }
	});
	
};

function countTaskByDataType(){
	var jsonData = getAllParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/countTaskByDataType",
		data : jsonData,
		success : function(result) {
			if(result.status=="200"){
				var dataObj = result.data;
				var dataTypeHtml = '';
				if(dataObj['日']!==undefined){
					dataTypeHtml+="<span class='primary'>日指标</span>"+dataObj['日']+"条；"
				}
				if(dataObj['周']!==undefined){
					dataTypeHtml+="<span class='primary'>周指标</span>"+dataObj['周']+"条；"
				}
				if(dataObj['旬']!==undefined){
					dataTypeHtml+="<span class='primary'>旬指标</span>"+dataObj['旬']+"条；"
				}
				if(dataObj['月']!==undefined){
					dataTypeHtml+="<span class='primary'>月指标</span>"+dataObj['月']+"条；"
				}
				if(dataObj['季']!==undefined){
					dataTypeHtml+="<span class='primary'>季指标</span>"+dataObj['季']+"条；"
				}
				if(dataObj['半年']!==undefined){
					dataTypeHtml+="<span class='primary'>半年指标</span>"+dataObj['半年']+"条；"
				}
				if(dataObj['年']!==undefined){
					dataTypeHtml+="<span class='primary'>年指标</span>"+dataObj['年']+"条；"
				}
				$(".dataTypeNum").html(dataTypeHtml);
			}else{
			  $.err(result.msg);	
			}
		}
    });
}


function countTaskByOperation(){
	
	var jsonData = getAllParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/countTaskByOperation",
		data : jsonData,
		success : function(result) {
			if(result.status=="200"){
				var dataObj = result.data;
				var operationHtml = '';
				if(dataObj['手动']!==undefined){
					operationHtml+="<span class='primary'>手动</span>"+dataObj['手动']+"条；"
				}
				if(dataObj['自动']!==undefined){
					operationHtml+="<span class='primary'>自动</span>"+dataObj['自动']+"条；"
				}
				if(dataObj['衍生公式']!==undefined){
					operationHtml+="<span class='primary'>衍生公式</span>"+dataObj['衍生公式']+"条；"
				}
				$(".operationNum").html(operationHtml);
			}else{
			  $.err(result.msg);	
			}
		}
    });
}

function countTaskByIndexSource(){
	
	var jsonData = getAllParam();
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/countTaskByIndexSource",
		data : jsonData,
		success : function(result) {
			if(result.status=="200"){
				var dataObj = result.data;
				var indexSourceHtml = '';
				if(dataObj['钢联指标']!==undefined){
					indexSourceHtml+="<span class='primary'>钢联指标</span>"+dataObj['钢联指标']+"条；"
				}
				if(dataObj['隆众网指标']!==undefined){
					indexSourceHtml+="<span class='primary'>隆众网指标</span>"+dataObj['隆众网指标']+"条；"
				}
				if(dataObj['其他外部指标']!==undefined){
					indexSourceHtml+="<span class='primary'>其他外部指标</span>"+dataObj['其他外部指标']+"条；"
				}
				$(".indexSourceNum").html(indexSourceHtml);
			}else{
			  $.err(result.msg);	
			}
		}
    });
}

function getAllParam(){
	var indexSourceType = $("#indexSourceType").val()==""?null:$("#indexSourceType").val();
	var operationType = $("#operationType").val()==""?null:$("#operationType").val();
	var dataType = $("#dataType").val()==""?null:$("#dataType").val();
	var monitorStatus = $("#monitorStatus").val()==""?null:$("#monitorStatus").val();
	var status = $("#status").val()==""?"0,3":$("#status").val();
	var indexCode = $("#indexCode").val();
	var indexName = $("#indexName").val();
	var marketCode = $("#marketCode").val();
	var categoryCode = getSelectedCode();
	var jsonData = {
			indexSourceType:indexSourceType,
			operationType:operationType,
			dataType:dataType,
			monitorStatus:monitorStatus,
			status:status,
			indexCode:indexCode,
			indexName:indexName,
			marketCode:marketCode,
			categoryCode:categoryCode
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


function getSelectedCategory(){
	var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
	if(treeObj){
		var selectedNodes = treeObj.getSelectedNodes(true);
		var selectedNode = selectedNodes[0];
		if(selectedNode.categoryId){
			return selectedNode.categoryId;
		}else{
			return null;
		}
	}else{
       return null;		
	}
	
}




function loadTableData(){
	
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=50;
  	$("#taskTable").pagination({
			url : "/gldata/mydata/queryTaskTable",
			paramJson : jsonData,
			callback:function(){
				$('#allCheck').removeAttr('checked');
			}
		});
	      
}



function selectRootNode(){
	var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
	var node = treeObj.getNodeByParam("id", "0");
	treeObj.selectNode(node);
}

function applyTask(){
	var target = $(this).parents("tr");
	var currDataValue  = $(this).val();
	var taskId = target.attr("taskId");
	if(!taskId||!currDataValue){
		return;
	}
	
	if(!checkNumber(currDataValue)){
		$.err("待录入数据格式错误");
		return;
	}
	
	var jsonData = {
		taskId:taskId,
		currDataValue:currDataValue
	};
	
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/applyTask",
		data : jsonData,
		success : function(result) {
			if(result.status=='200'){
				var obj = result.data;
				var monitorStatus = obj.monitorStatus;
				var monitorValue = obj.monitorValue;
				var monitorType = obj.monitorType;
				if(monitorStatus==1){
					target.addClass("red");
					target.find(".commitTaskBtn").show();
					target.find(".deleteTaskBtn").show();
					target.find(".storageTaskBtn").hide();
					target.find("label").show();
				}else{
					target.removeClass("red");
					target.find(".commitTaskBtn").hide();
					target.find(".deleteTaskBtn").hide();
					target.find(".storageTaskBtn").show();
					target.find("label").hide();
					target.find("label").find('.taskCheck').removeAttr('checked');
				}
				if(-1==monitorType){
				  target.find(".monitorValue").html("");
				}else if(0==monitorType){
				  target.find(".monitorValue").html(monitorValue);	
				}else if(1==monitorType||2==monitorType||3==monitorType){
					target.find(".monitorValue").html(formatPercent(monitorValue));
				}
				
			}else{
				$.err(result.msg);
			}
		}
    });
	
}

function formatPercent(value){
	if(null==value){
        return "";		
	}else{
		return Number(Number(value)*100).toFixed(2) + '%';
	}
}

function modifyTask(){
	var target = $(this).parents("tr");
	var currDataDesc  = $(this).val();
	var taskId = target.attr("taskId");
	if(!taskId||!currDataDesc){
		return;
	}
	var jsonData = {
		id:taskId,
		currDataDesc:currDataDesc
	};
	
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/modifyTask",
		data : jsonData,
		success : function(result) {
			if(result.status=='200'){
			}else{
				$.err(result.msg);
			}
		}
    });
}


function loadCategoryTree(){
	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/queryCategoryTree",
		data : null,
		success : function(result) {
			$.fn.zTree.init($("#categoryTree"), setting, result);
			selectRootNode();
		}
    });
}

function reloadData(){
	 loadTableData();
	 countTaskByDataType();
	 countTaskByIndexSource();
	 countTaskByOperation();
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
function uploadImportFile(){
	$.loading.start();
	$.ajaxFileUpload
    ({
			type:"POST",
            url: '/gldata/mydata/imporTask', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: "importTaskFile", //文件上传域的ID
            dataType: 'json',
            success: function (result)  //服务器成功响应处理函数
            {    
            	$.loading.end();
            	if(result.status=='200'){
            		   var total = result.data.totalNum;
            		   var fail = result.data.failNum;
            		   var succ = total-fail;
            		   var message = '导入成功<strong class="red">'+succ+'</strong>条，导入失败<strong class="red">'+fail+'</strong>';
            		   var fileId = result.data.fileId;
            		   //'导入成功<strong class="red">20</strong>条，预警<strong class="red">2</strong>条<br/>导入失败1条'
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
            			        	bootbox.hideAll();
    		        				reloadData();
    		        				countTaskTotal();
    		        				countTaskHistoryTotal();
            			        }
            			      },
            			      down: {
            			        label: "下载失败日志",
            			        className: "btn-primary",
            			        callback: function () {
            			        	if(fileId){
            			        		//downLoadReportIMG("http://192.168.200.191:8888/"+fileId);
            			        		window.location.href = "/gldata/io/download/log?fileId="+fileId+"&fileName=导入任务失败日志.xls";
            			        		setTimeout(function(){deleteImportLog(fileId);},1000)
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




function downLoadReportIMG(imgPathURL) {
         
        //如果隐藏IFRAME不存在，则添加
        if (!document.getElementById("IframeReportImg"))
            $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" onload="doSaveAsIMG();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");
        if (document.all.IframeReportImg.src != imgPathURL) {
            //加载图片
            document.all.IframeReportImg.src = imgPathURL;
        }
        else {
            //图片直接另存为
        	doSaveAsIMG();  
        }
    }

function doSaveAsIMG() {
    if (document.all.IframeReportImg.src != "about:blank"){
    	document.getElementById("IframeReportImg").contentWindow.document.execCommand("SaveAs");        
    }
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
$(document).ready(function () {
    
	 loadCategoryTree();
	 reloadData();
      // 新增按钮
      $("body").on("click", ".fn-add", function () {
        var addHtml = $(this).parents('tr').clone();
        addHtml.find('.fn-form-a1').html('<input class="form-control fn-date copyDate text-align-center" type="text" readonly style="min-width:90px;">')
        addHtml.find(".operationArea").html('<a href="javascript:void(0)" class="btn btn-link btn-sm  copyTempTaskBtn">提交</a><a href="javascript:void(0)" class="btn btn-link btn-sm  deleteTempTaskBtn">删除</a>');
        addHtml.find(".currDataValue").removeClass("currDataValue").addClass("currTempDataValue");
        addHtml.find(".currDataDesc").removeClass("currDataDesc").addClass("currTempDataDesc");
        addHtml.removeClass("red");
        addHtml.find(".copyTempTaskBtn").hide();
        addHtml.find("label").remove();
        var taskId = addHtml.attr("taskId");
        addHtml.removeAttr("taskId");
        addHtml.attr("parentTaskId",taskId);
        $(this).parents('tr').after(addHtml);
        $('.fn-popover').popover();
      })
      
      $(".searchBtn").on("click",function(){
    	  reloadData();
      });
      $(".resetBtn").on("click",function(){
    	  setTimeout(function(){reloadData();},500);
      });
      $("#taskTable").delegate(".currDataValue","blur",applyTask);
      $("#taskTable").delegate(".currDataDesc","blur",modifyTask);
      $("#taskTable").delegate(".storageTaskBtn","click",storageTask);
      $("#taskTable").delegate(".deleteTaskBtn","click",deleteTask);
      $("#taskTable").delegate(".commitTaskBtn","click",commitTask);
      $("body").delegate(".batchCommitTaskBtn","click",batchCommitTask);
      $("body").delegate(".batchDeleteTaskBtn","click",batchDeleteTask);
      
      $('#allCheck').click(function () {
    	  if ($(this).is(':checked')) {
    	    $(this).parents('body').find('#taskTable').find('.taskCheck').each(function (i, v) {
    	    	    if($(v).parents("label").is(':hidden')){
    	    	    	$(v).removeAttr("checked");
    	    	    }else{
    	    	    	$(v).prop('checked', 'true');
    	    	    }
    	    });
    	  } else {
    		  $(this).parents('body').find('#taskTable').find('.taskCheck').removeAttr('checked');
    	  }
    	});
      
      
      
      $("body").delegate(".taskCheck","click",function(){
    	 var num = $("#taskTable .taskCheck").length;
    	 var checkedNum =  $("#taskTable .taskCheck:checked").length;
    	 if(num==checkedNum){
    		 $('#allCheck').prop('checked', 'true');
    	 }else{
    		 $('#allCheck').removeAttr('checked');
    	 }
    	  
      });
      $(".downloadTemplate").on("click",function(){
      	window.location.href="/gldata/io/download/template?code=10009";
      }); 
      
   // 批量导入
      $("body").on("click", ".batchImportBtn",batchImport);
      
      $("body").delegate(".deleteTempTaskBtn","click",function(e){
    	 var target = $(e.currentTarget).parents("tr");
    	 var taskId =target.attr("taskId");
    	 if(taskId){
    		    var jsonData = {
    		    	taskId:taskId	
    		    };
    			$.ajax({
    				type : 'POST',
    				url : "/gldata/mydata/removeTask",
    				data : jsonData,
    				success : function(result) {
    					 if(result.status=="200"){
    						 target.remove();
    					 }else{
    						 $.err(result.msg);
    					 }
    				  }
    				});
    	 }else{
    		 target.remove();
    	 }
    	 
      });
      
      $("body").delegate(".copyTempTaskBtn","click",copyTask);
      $("body").delegate(".currTempDataValue","blur",function(e){
    	  var target = $(e.currentTarget).parents("tr");
    	  calculateMonitor(target);
      });
      
      
      $("body").on("mousedown", ".copyDate", function (e) {
    	  var target = $(this).parents("tr");
    	  $(this).daterangepicker({
    	    "format": 'YYYY-MM-DD',
    	    "singleDatePicker": true,
    	    'applyClass': 'btn-primary',
    	    'cancelClass': 'btn-primary',
    	    "startDate": moment(),
    	    "endDate": moment()
    	  }, function (start, end, label) {
    			//console.log(start.format("YYYY-MM-DD"));
    			//copyTask(target);
    		});
    	  
    	  $(this).on('apply.daterangepicker',function(ev, picker) {
    		  var target = $(this).parents("tr");
    		  calculateMonitor(target);
          });
    	});
      
      
});


function calculateMonitor(target){
	var taskId = target.attr("parentTaskId");
	var date = target.find(".copyDate").val();
	var currDataValue = target.find(".currTempDataValue").val();
	if(!taskId){
		return;
	}
	if(!date){
		return;
	}
	
	if(!currDataValue){
		return;
	}
	
	var jsonData = {
		taskId:taskId,
		currDataDate:date,
		currDataValue:currDataValue
	}
	
  	$.ajax({
		type : 'POST',
		url : "/gldata/mydata/calculateMonitor",
		data : jsonData,
		success : function(result) {
			if(result.status=='200'){
				var obj = result.data;
				var monitorStatus = obj.monitorStatus;
				var monitorValue = obj.monitorValue;
				var monitorType = obj.monitorType;
				if(monitorStatus==1){
					target.addClass("red");
					target.find(".copyTempTaskBtn").html("通过");
				}else{
					target.removeClass("red");
					target.find(".copyTempTaskBtn").html("提交");
				}
				target.find(".copyTempTaskBtn").show();
				if(-1==monitorType){
					  target.find(".monitorValue").html("");
					}else if(0==monitorType){
					  target.find(".monitorValue").html(monitorValue);	
					}else if(1==monitorType||2==monitorType||3==monitorType){
						target.find(".monitorValue").html(formatPercent(monitorValue));
					}
			}else{
				$.err(result.msg);
			}
		}
    });
	
}

/**
 * 复制创建任务
 * @param target
 * @returns
 */
function copyTask(e){
	var target = $(e.currentTarget).parents("tr");
	var taskId = target.attr("parentTaskId");
	var date = target.find(".copyDate").val();
	var currDataValue = target.find(".currTempDataValue").val();
	var currDataDesc = target.find(".currTempDataDesc").val();
	if(!taskId){
		return;
	}
	if(!date){
		$.err("待录入日期不能为空");
		return;
	}
	if(!currDataValue){
		$.err("待录入数据不能为空");
		return;
	}
	
	var jsonData = {
		taskId:taskId,
		currDataDate:date,
		currDataValue:currDataValue,
		currDataDesc:currDataDesc
	}
	
	if(target.hasClass("red")){
		 
		  bootbox.dialog({
			    message: '<i class="fa fa-warning red margin-right-10 margin-left-30" style="font-size:36px; vertical-align:middle;"></i> 该数据超出预警，是否通过？',
			    title: "确定通过",
			    className: "modal-inverse fn-sm",
			    buttons: {
			      success: {
			        label: "确定",
			        className: "btn-primary",
			        callback: function () {
			        	
			          	$.ajax({
			        		type : 'POST',
			        		url : "/gldata/mydata/copyTask",
			        		data : jsonData,
			        		success : function(result) {
			        			if(result.status=='200'){
			        				target.remove();
			        			}else{
			        				$.err(result.msg);
			        			}
			        		}
			            });
			          	bootbox.hideAll();
			        	return false;
			        }
			      },
			      cancel: {
			        label: "取消",
			        className: "btn-primary"
			      }
			    }
			  });
		
		
	}else{
		
		
		  bootbox.dialog({
			    message: '<i class="fa fa-info-circle yellow margin-right-10 margin-left-30" style="font-size:36px; vertical-align:middle;"></i> 确定提交数据？',
			    title: "确定提交",
			    className: "modal-inverse fn-sm",
			    buttons: {
			      success: {
			        label: "确定",
			        className: "btn-primary",
			        callback: function () {
			           	$.ajax({
			        		type : 'POST',
			        		url : "/gldata/mydata/copyTask",
			        		data : jsonData,
			        		success : function(result) {
			        			if(result.status=='200'){
			        				target.remove();
			        			}else{
			        				$.err(result.msg);
			        			}
			        		}
			            });
			        	bootbox.hideAll();
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
	

	
}


function deleteTask(){
	var target = $(this).parents("tr");
	var taskId = target.attr("taskId");
	if(!taskId){
		return;
	}
	  bootbox.dialog({
		    message: '确定删除该选项',
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
		        		url : "/gldata/mydata/batchDeleteTask",
		        		data : {"idList":jsonArray},
		        		success : function(result) {
		        			if(result.status=='200'){
		        				bootbox.hideAll();
		        				reloadData();
		        				countTaskTotal();
		        				countTaskHistoryTotal();
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

function batchCommitTask(){
	var taskIds = getAllMonitorChecked();
	var categoryId = getSelectedCategory();
	if(taskIds.length==0){
		$.err("请选择超过预警的任务！");
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
	        		url : "/gldata/mydata/batchCommitTask",
	        		data : {
	        			"idList":taskIds,
	        		    "taskCategoryId":categoryId	
	        		},
	        		success : function(result) {
	        			if(result.status=='200'){
	        				bootbox.hideAll();
	        				reloadData();
	        				countTaskTotal();
	        				countTaskHistoryTotal();
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

function batchDeleteTask(){
	var taskIds = getAllChecked();
	if(taskIds.length==0){
		$.err("请选择要删除的任务！");
		return;
	}
	
	bootbox.dialog({
	    message: '确定批量删除所选项',
	    title: "确定批量删除",
	    className: "modal-inverse fn-sm",
	    buttons: {
	      success: {
	        label: "确定",
	        className: "btn-primary",
	        callback: function () {
	        	$.ajax({
	        		type : 'POST',
	        		url : "/gldata/mydata/batchDeleteTask",
	        		data : {"idList":taskIds},
	        		success : function(result) {
	        			if(result.status=='200'){
	        				bootbox.hideAll();
	        				reloadData();
	        				countTaskTotal();
	        				countTaskHistoryTotal();
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


function commitTask(){
	var target = $(this).parents("tr");
	var taskId = target.attr("taskId");
	if(!taskId){
		return;
	}
	
	var currDateValue = target.find(".currDataValue").val();
	if(!currDateValue){
		return;
	}
	
	var categoryId = getSelectedCategory();

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
			        		url : "/gldata/mydata/batchCommitTask",
			        		data : {"idList":jsonArray,
			        			     "taskCategoryId":categoryId},
			        		success : function(result) {
			        			if(result.status=='200'){
			        				bootbox.hideAll();
			        				reloadData();
			        				countTaskTotal();
			        				countTaskHistoryTotal();
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

function storageTask(){
	
	var target = $(this).parents("tr");
	var taskId = target.attr("taskId");
	var currDataValue = target.find(".currDataValue").val();
	if(!taskId){
		return;
	}
	
	if(!currDataValue){
		$.err("待录入数据不能为空");
		return;
	}
	
	if(!checkNumber(currDataValue)){
		$.err("待录入数据格式错误");
		return;
	}
	
	
	  bootbox.dialog({
		    message: '<i class="fa fa-info-circle yellow margin-right-10 margin-left-30" style="font-size:36px; vertical-align:middle;"></i> 确定提交数据？',
		    title: "确定提交",
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
		        		url : "/gldata/mydata/storageTask",
		        		data : {taskId:taskId},
		        		success : function(result) {
		        			if(result.status=='200'){
		        				bootbox.hideAll();
		        				reloadData();
		        				countTaskTotal();
		        				countTaskHistoryTotal();
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

function getAllMonitorChecked(){
	var taskIds = new Array();
	$("tr.red .taskCheck:checked").each(function(e,i){
		var taskId = $(this).attr("taskId");
		if(taskId){
			taskIds.push(taskId);
		}
	});
	
   return taskIds;
}

function getAllChecked(){
	var taskIds = new Array();
	$("tr .taskCheck:checked").each(function(e,i){
		var taskId = $(this).parents("tr").attr("taskId");
		if(taskId){
			taskIds.push(taskId);
		}
	});
	
   return taskIds;
}

function checkNumber(obj) {
	
	  if($.trim(obj)==""){
		  return false;
	  }
	  if("-"==obj){
		  return true;
	  }
	  
	  if(obj.length>8){
		  return false;
	  }
	  
	  var reg = /^[-|0-9]+.?[0-9]*$/;
	  if (reg.test(obj)) {
	    return true;
	  }
	  return false;
}



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