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
        url:"/gldata/indicatorAudit/poi/queryCategoryIndicatorTree",  //请求地址，可用function动态获取   
        autoParam:["id=parentId"],//提交的节点参数，可用“id=xx”取请求提交时的别名  
        otherParam:{"applyType" : "2"},//提交的其他参数,json的形式
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
	var name = $("#name").val()==""?null:$("#name").val();
	var creatorName = $("#creatorName").val()==""?null:$("#creatorName").val();
	var createTime = $("#createTime").val()==""?null:$("#createTime").val();
	var applyStatus = $("#applyStatus").val()==""?null:$("#applyStatus").val();
	var jsonData = {
			indexCode:indexCode,
			nameAndShowName:name,
			creatorName:creatorName,
			startEndTime:createTime,
			applyStatus:applyStatus
	};
    return jsonData;	
}

function getFilterParam(paramObj){
	var size=9;
	var checkboxs = $("#checkboxdib").find("[type='checkbox']");
	for (var i = 0; i < checkboxs.length; i++) {
		var param = $(checkboxs[i]).attr("id");
		if(param !=undefined){
			if($(checkboxs[i]).is(':checked')){
				paramObj[param]=param;
				if(param == "explainStopPar" || param == "modifyTimeNameStopPar" || param == "modifyTimeNameStarPar" || param == "explainStarPar" || param == "monitorSetting" || param == "dataTypeNamePar" ){
					size=size+1;
				}else{
					size=size+2;
				}
			}else{
				paramObj[param]=null;
			}
		}
	}
	paramObj['size']=size;
    return paramObj;
}

function loadZtreeData(){
	$.ajax({
		type : 'get',
		url : "/gldata/indicatorAudit/poi/queryCategoryIndicatorTree",
		data : {
			"applyType":2,//2 代表修改
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
	jsonData = getFilterParam(jsonData);
  	$("#editAuditTable").pagination({
			url : "/gldata/indicatorAudit/poi/queryEditAuditTable",
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
	var params = new Array();
	var checkboxs = $("#editAuditTable").find("[type='checkbox']:checked");
	for (var i = 0; i < checkboxs.length; i++) {
		var id = $(checkboxs[i]).attr("id");
		var applyStatus = $(checkboxs[i]).attr("applyStatus");
		var taskId = $(checkboxs[i]).attr("data-id");
		if(id != null && id != "" && taskId != null && taskId != ""){
			if(type=="pass"){
				if(applyStatus==0){
					applyStatus = 10;
				}else if(applyStatus==10){
					applyStatus=20;
				}
				var param={
						id:id,
						applyStatus:applyStatus,
						applyType:2,
						taskId:taskId
				};
				params.push(param);
			}
			
			if(type=="reject"){
				if(applyStatus==0){
					applyStatus = 11;
				}else if(applyStatus==10){
					applyStatus=21;
				}
				var param={
						id:id,
						applyStatus:applyStatus,
						applyType:2,
						taskId:taskId
				};
				params.push(param);
			}
			
		}
	}
	return params;
}

function pass(){
	var params = checkedInput("pass");
	if(params == null || params == ""){
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
	        	  var reason = $("#passReviewReason").val();
	        	  for (var i = 0; i < params.length; i++) {
	        		  params[i]['reason']=reason
	        	  }
	        		$.ajax({
	        			type : 'POST',
	        			url : "/gldata/indicatorAudit/poi/indecatorSomeCategory",
	        			data: JSON.stringify(params),//将对象序列化成JSON字符串  
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
	var params = checkedInput("reject");
	if(params == null || params == ""){
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
	        	  var reason = $("#rejectReviewReason").val();
	        	  for (var i = 0; i < params.length; i++) {
	        		  params[i]['reason']=reason
	        	  }
	        		$.ajax({
	        			type : 'POST',
	        			url : "/gldata/indicatorAudit/poi/indecatorSomeCategory",
	        			data: JSON.stringify(params),//将对象序列化成JSON字符串  
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
    
    $("#filterBtn").click(function(){
    	loadTableData(null);	
    });
    
    $('.fn-toggle-box-wrap .fn-btn-toggle').click(function () {
      $(this).parents('.fn-toggle-box-wrap').find('.fn-toggle-box').slideToggle();
    });
    $('.fn-toggle-box-wrap .fn-btn-cancle').click(function () {
      $(this).parents('.fn-toggle-box-wrap').find('.fn-toggle-box').slideUp();
    });

    $("#checkAll").click(function(){
    	var checkboxs = $("#checkboxdib").find("[type='checkbox']");
    	if($(this).is(":checked")){
    		for (var i = 0; i < checkboxs.length; i++) {
    			var param = $(checkboxs[i]).attr("id");
    			if(param !="checkAll"){
    				$(checkboxs[i]).prop("checked",true);
    				}
    			}
    	}else{
    		for (var i = 0; i < checkboxs.length; i++) {
    			var param = $(checkboxs[i]).attr("id");
    			if(param !="checkAll"){
    				$(checkboxs[i]).prop("checked",false);
    				}
    			}
    		}
    });
    
});
        
        
        
        
$("body").on("keyup","#indexCode",function(){
	remoePercent(this);
});
$("body").on("keyup","#name",function(){
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