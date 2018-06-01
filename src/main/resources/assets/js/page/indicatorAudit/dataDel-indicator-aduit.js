var zNodes1 = null;
var ztreeId = null;

//频道树设置
var setting = {
	    data: {
	        simpleData: {
	            enable: true
	        }
	    },
	    callback: {
	        onClick: zTreeOnClick
	    },
	    view: {
	        fontCss: getFont
	    },  
	    async: {  
	        enable: true,//异步加载  
	        url:"/gldata/indicatorAudit/poi/queryApplyDeleteDataTree",  //请求地址，可用function动态获取   
	        autoParam:["id=parentId"],//提交的节点参数，可用“id=xx”取请求提交时的别名  
	        //otherParam:{"otherParam":"zTreeAsyncTest"},//提交的其他参数,json的形式  
	        dataType:"json",//返回数据类型  
	        type:"get",//请求方式  
	        dataFilter: null//数据过滤  
	        }
	};

function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.id==0){
		return false;
	}
	ztreeId = treeNode.id;
	loadTableData(ztreeId);
};
function getFont(treeId, node){
//	if(node.published == 1){
//		return {color:"#FF0000"};
//	}
}
function getAllParam(){
	var indexCode = $("#indexCode").val()==""?null:$("#indexCode").val();
	var indexName = $("#indexName").val()==""?null:$("#indexName").val();
	var applyStatus = $("#applyStatus").val()==""?null:$("#applyStatus").val();
	var creatorName = $("#creatorName").val()==""?null:$("#creatorName").val();
	var createTimeStr = $("#createTime").val()==""?null:$("#createTime").val();
	var jsonData = {
			indexCode:indexCode,
			indexName:indexName,
			applyStatus:applyStatus,
			creatorName:creatorName,
			createTimeStr:createTimeStr
	};
	
    return jsonData;	
}

function loadZtreeData(){
	$.ajax({
		type : 'get',
		url : "/gldata/indicatorAudit/poi/queryApplyDeleteDataTree",
		data : {
			"applyType":3, //3 代表删除
			"parentId":0
		},
	    success : function(result) {
		    zNodes1 = result;
		    var topNode = {id:"0",pId:null,name:"数据管理",isParent:true,open:true,nocheck:true}
		    zNodes1.unshift(topNode);
		    $.fn.zTree.init($("#treeDemo0"), setting, zNodes1);
	    }
	});
}

function loadTableData(catoId){
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=15;
	if(catoId!=null&&catoId!=undefined){
		jsonData['categoryId']=catoId;
	}
  	$("#dataDelAuditTable").pagination({
			url : "/gldata/indicatorAudit/poi/queryDataDelAuditTable",
			paramJson : jsonData,
			callback:function(){
				
			}
		});
	      
}

function loadCount(){
	$.ajax({
		type : 'get',
		url : "/gldata/indicatorAudit/poi/countIndicatorCategory",
	    success : function(result) {
	    	if(result.status=="200"){
		    	$("#addAuditNum").html("新增审核（"+result.data.addCountNum+"）");
		    	$("#editAuditNum").html("修改审核（"+result.data.editCountNum+"）");
		    	$("#delAuditNum").html("删除审核（"+result.data.delCountNum+"）");
		    	$("#dataDelAuditNum").html("数据删除审核（"+result.data.dataDelCountNum+"）");
		    }
	    }
	});
}

function checkedInput(type){
	var auditingCategoryVOs = new Array();
	var checkboxs = $("#dataDelAuditTable").find("[type='checkbox']:checked");
	for (var i = 0; i < checkboxs.length; i++) {
		var id = $(checkboxs[i]).attr("id");
		var applyStatus = $(checkboxs[i]).attr("applyStatus");
		var taskId = $(checkboxs[i]).attr("data-id");
		var indexCode = $(checkboxs[i]).attr("indexCode");
		var dateList = $(checkboxs[i]).attr("dateList").replace(/\//g,'-').replace(/至/g,'$').replace(/ /g,'');
		if(id != null && id != "" && taskId != null && taskId != ""){
			if(type=="pass"){
				if(applyStatus==0){
					applyStatus = 10;
				}else if(applyStatus==10){
					applyStatus=20;
				}
				var auditingCategoryVO={
						id:id,
						applyStatus:applyStatus,
						taskId:taskId,
						indexCode:indexCode,
						dateList:dateList
				};
				auditingCategoryVOs.push(auditingCategoryVO);
			}
			
			if(type=="reject"){
				if(applyStatus==0){
					applyStatus = 11;
				}else if(applyStatus==10){
					applyStatus=21;
				}
				var auditingCategoryVO={
						id:id,
						applyStatus:applyStatus,
						taskId:taskId,
						indexCode:indexCode,
						dateList:dateList
				};
				auditingCategoryVOs.push(auditingCategoryVO);
			}
			
		}
	}
	return auditingCategoryVOs;
}

function pass(){
	var auditingCategoryVOs = checkedInput("pass");
	if(auditingCategoryVOs == null || auditingCategoryVOs == ""){
		fnCheckAllTip();
		return false;
	}
	bootbox.dialog({
	      message: '<form action="" class="fn-fail-form"><div class="form-group"><textarea id="passReviewReason" class="form-control" rows="3" name="驳回理由"></textarea></div></form>',
	      title: "备注：",
	      className: "modal-inverse fn-sm",
	      buttons: {
	        success: {
	          label: "确定",
	          className: "btn-primary",
	          callback: function () {
	        	  var reviewReason = $("#passReviewReason").val();
	        	  for (var i = 0; i < auditingCategoryVOs.length; i++) {
	        		  auditingCategoryVOs[i]['reviewReason']=reviewReason
	        	  }
	        		$.ajax({
	        			type : 'POST',
	        			url : "/gldata/indicatorAudit/poi/indicatorDataDelSomeCategory",
	        			data: JSON.stringify(auditingCategoryVOs),//将对象序列化成JSON字符串  
	        		    dataType:"json",
	        		    contentType : 'application/json;charset=utf-8', //设置请求头信息  
	        		    success : function(result) {
	        			    if(result.status=="200"){
	        			    	location.reload();
	        			    }else{
	        			    	$.err(result.msg);
	        			    }
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
};

function reject(){
	var auditingCategoryVOs = checkedInput("reject");
	if(auditingCategoryVOs == null || auditingCategoryVOs == ""){
		fnCheckAllTip();
		return false;
	}
	bootbox.dialog({
		message: '<form action="" class="fn-fail-form"><div class="form-group"><textarea id="rejectReviewReason" class="form-control" rows="3" name="驳回理由" required data-bv-notempty-message="请填写必填项目"></textarea></div></form>',
	    title: '驳回理由<span class="red">*</span>：',
	    className: "modal-inverse fn-sm",
	    buttons: {
	      success: {
	        label: "确定",
	        className: "btn-primary",
	        callback: function () {
	          $('.fn-fail-form').bootstrapValidator('validate');
	          if ($('.fn-fail-form').data('bootstrapValidator').isValid()) {
	        	  var reviewReason = $("#rejectReviewReason").val();
	        	  for (var i = 0; i < auditingCategoryVOs.length; i++) {
	        		  auditingCategoryVOs[i]['reviewReason']=reviewReason
	        	  }
	        		$.ajax({
	        			type : 'POST',
	        			url : "/gldata/indicatorAudit/poi/indicatorDataDelSomeCategory",
	        			data: JSON.stringify(auditingCategoryVOs),//将对象序列化成JSON字符串  
	        		    dataType:"json",
	        		    contentType : 'application/json;charset=utf-8', //设置请求头信息  
	        		    success : function(result) {
	        			    if(result.status=="200"){
	        			    	location.reload();
	        			    }else{
	        			    	$.err(result.msg);
	        			    }
	        		    }
	        		});
	          	} else {
		            return false;
		          }
	        }
	        },
	        cancel: {
	          label: "取消",
	          className: "btn-primary"

	        }
	      }
	    });
};

$(document).ready(function () {
    loadZtreeData();
    loadCount();
    loadTableData(null);
    $("#searchBtn").click(function(){
    	loadTableData(null);	
    });
    $("#batchAgreedBtn").click(pass);
    $("#batchRejectedBtn").click(reject);
});
        
        
        
        
$("body").on("keyup","#indexCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#indexName",function(){
	remoePercent(this);
	remoeUnderLine(this);
});
$("body").on("keyup","#creatorName",function(){
	remoePercent(this);
	remoeUnderLine(this);
});
//$("body").on("keyup","#sourceName",function(){
//	remoePercent(this);
//});
//$("body").on("keyup","#sourceUrl",function(){
//	remoePercent(this);
//});