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
	        url:"/gldata/auditingCategory/poi/query-category-auditing-tree",  //请求地址，可用function动态获取   
	        autoParam:["id=parentId"],//提交的节点参数，可用“id=xx”取请求提交时的别名  
	        otherParam:{"applyType":"2"},//提交的其他参数,json的形式    
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
	var categoryId = $("#categoryId").val()==""?null:$("#categoryId").val();
	var name = $("#name").val()==""?null:$("#name").val();
	var creatorName = $("#creatorName").val()==""?null:$("#creatorName").val();
	var createTime = $("#createTime").val()==""?null:$("#createTime").val();
	var applyStatus = $("#applyStatus").val()==""?null:$("#applyStatus").val();
	var jsonData = {
			categoryId:categoryId,
			nameAndShowName:name,
			creatorName:creatorName,
			createTime:createTime,
			applyStatus:applyStatus
	};
	
    return jsonData;	
}

function loadZtreeData(){
	$.ajax({
		type : 'get',
		url : "/gldata/auditingCategory/poi/query-category-auditing-tree",
		data : {
			"applyType":2,//2 代表修改
			"parentId":0
		},
	    success : function(result) {
		    zNodes1 = result
		    var topNode = {id:"0",pId:null,name:"数据管理",isParent:true,open:true,nocheck:true}
		    zNodes1.unshift(topNode);
		    $.fn.zTree.init($("#treeDemo1"), setting, zNodes1);
	    }
	});
}

function loadTableData(catoId){
	var jsonData = getAllParam();
	jsonData['pageNum']=1;
	jsonData['pageSize']=15;
	if(catoId!=null&&catoId!=undefined){
		jsonData['parentId']=catoId;
	}
	jsonData['applyType']=2;
  	$("#editAuditTable").pagination({
			url : "/gldata/auditingCategory/poi/queryEditTaskTable",
			paramJson : jsonData,
			callback:function(){
				
			}
		});
	      
}

function loadCount(){
	$.ajax({
		type : 'get',
		url : "/gldata/auditingCategory/poi/count-auditing-category",
	    success : function(result) {
		    if(result.status=="200"){
		    	$("#addAduitNum").html("新增审核（"+result.data.increasedCount+"）");
		    	$("#editAduitNum").html("修改审核（"+result.data.modifyCount+"）");
		    	$("#delAduitNum").html("删除审核（"+result.data.removeCount+"）");
		    }
	    }
	});
}

function checkedInput(type){
	var auditingCategoryVOs = new Array();
	var checkboxs = $("#editAuditTable").find("[type='checkbox']:checked");
	for (var i = 0; i < checkboxs.length; i++) {
		var id = $(checkboxs[i]).attr("id");
		var applyStatus = $(checkboxs[i]).attr("applyStatus");
		var taskId = $(checkboxs[i]).attr("data-id");
		if(id != null && id != ""){
			if(type=="pass"){
				if(applyStatus==0){
					applyStatus = 10;
				}else if(applyStatus==10){
					applyStatus=20;
				}
				var auditingCategoryVO={
						id:id,
						applyStatus:applyStatus,
						applyType:2,
						taskId:taskId
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
						applyType:2,
						taskId:taskId
				};
				auditingCategoryVOs.push(auditingCategoryVO);
			}
			
		}
	}
	return auditingCategoryVOs;
}

function pass(){
	debugger
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
	        			url : "/gldata/auditingCategory/poi/audit-some-category",
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
	debugger
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
	        			url : "/gldata/auditingCategory/poi/audit-some-category",
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
        
        
        
        


$("body").on("keyup","#categoryId",function(){
	onlyNumber(this);
});
$("body").on("keyup","#name",function(){
	remoePercent(this);
	remoeUnderLine(this);
});
$("body").on("keyup","#creatorName",function(){
	remoePercent(this);
	remoeUnderLine(this);
});