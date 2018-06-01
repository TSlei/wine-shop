function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.id == 0){
		return;
	}
	var tab_index = $("#chanel_frame").attr("table-index");
//	console.log(treeNode);
	var form = $('<form target="chanel_frame" method="post"></form>');
	form.append('<input type="hidden" name="id" value="'+treeNode.id+'" />');
	form.append('<input type="hidden" name="name" value="'+treeNode.name+'" />');
	form.append('<input type="hidden" name="showName" value="'+treeNode.showName+'" />');
	form.append('<input type="hidden" name="code" value="'+treeNode.code+'" />');
	form.append('<input type="hidden" name="published" value="'+treeNode.published+'" />');
	if(tab_index==1){
		form.attr("action","/gldata/coreCategory/category-base-info");
	}else if(tab_index==2){
		form.attr("action","/gldata/coreCategory/category-info");
	}else if(tab_index==3){
		form.attr("action","/gldata/coreCategory/index-info");
	}
//	console.log(form);
	form.appendTo("body");
	form.submit();
	form.remove();
};
var curExpandNode = null;
function beforeExpand(treeId, treeNode) {
	var pNode = curExpandNode ? curExpandNode.getParentNode():null;
	var treeNodeP = treeNode.parentTId ? treeNode.getParentNode():null;
	var zTree = $.fn.zTree.getZTreeObj("treeDemo0");
	for(var i=0, l=!treeNodeP ? 0:treeNodeP.children.length; i<l; i++ ) {
		if (treeNode !== treeNodeP.children[i]) {
			zTree.expandNode(treeNodeP.children[i], false);
		}
	}
	while (pNode) {
		if (pNode === treeNode) {
			break;
		}
		pNode = pNode.getParentNode();
	}
	if (!pNode) {
		singlePath(treeNode);
	}

}
function singlePath(newNode) {
	if (newNode === curExpandNode) return;

    var zTree = $.fn.zTree.getZTreeObj("treeDemo0"),
            rootNodes, tmpRoot, tmpTId, i, j, n;

    if (!curExpandNode) {
        tmpRoot = newNode;
        while (tmpRoot) {
            tmpTId = tmpRoot.tId;
            tmpRoot = tmpRoot.getParentNode();
        }
        rootNodes = zTree.getNodes();
        for (i=0, j=rootNodes.length; i<j; i++) {
            n = rootNodes[i];
            if (n.tId != tmpTId) {
                zTree.expandNode(n, false);
            }
        }
    } else if (curExpandNode && curExpandNode.open) {
		if (newNode.parentTId === curExpandNode.parentTId) {
			zTree.expandNode(curExpandNode, false);
		} else {
			var newParents = [];
			while (newNode) {
				newNode = newNode.getParentNode();
				if (newNode === curExpandNode) {
					newParents = null;
					break;
				} else if (newNode) {
					newParents.push(newNode);
				}
			}
			if (newParents!=null) {
				var oldNode = curExpandNode;
				var oldParents = [];
				while (oldNode) {
					oldNode = oldNode.getParentNode();
					if (oldNode) {
						oldParents.push(oldNode);
					}
				}
				if (newParents.length>0) {
					zTree.expandNode(oldParents[Math.abs(oldParents.length-newParents.length)-1], false);
				} else {
					zTree.expandNode(oldParents[oldParents.length-1], false);
				}
			}
		}
	}
	curExpandNode = newNode;
}

function onExpand(event, treeId, treeNode) {
	curExpandNode = treeNode;
}
//频道树设置
var setting = {
	    data: {
	        simpleData: {
	            enable: true
	        }
	    },
	    callback: {
//	    	beforeExpand: beforeExpand,
//			onExpand: onExpand,
	        onClick: zTreeOnClick
	    },
	    view: {
	        fontCss: getFont
	    }
//	    ,  
//	    async: {  
//	        enable: true,//异步加载  
//	        url:"/gldata/coreCategory/query-core-category-list",  //请求地址，可用function动态获取   
//	        autoParam:["id=parentId"],//提交的节点参数，可用“id=xx”取请求提交时的别名  
//	        //otherParam:{"otherParam":"zTreeAsyncTest"},//提交的其他参数,json的形式  
//	        dataType:"json",//返回数据类型  
//	        type:"post",//请求方式  
//	        dataFilter: null//数据过滤  
//	        }
	};

getTree = function(){
	return $.fn.zTree.getZTreeObj("treeDemo0");
}

refreshTree = function(){
	loadTree(true);
}

$(document).ready(function () {

	loadTree(false);
    // chanel_frame 算高度
    $("#chanel_frame").height($(window).height() - 25);
    $("#treeDemo0").parent().height($(window).height() - 25);
    $(window).resize(function () {
        $("#chanel_frame").height($(window).height() - 25);
        $("#treeDemo0").parent().height($(window).height() - 25);
    });

});

function loadTree(needOpenNode){
	$.ajax({
		type : 'POST',
		url : "/gldata/coreCategory/query-core-category-list",
//		data : {parentId:0},
		success : function(result) {
			//console.log(result);
			if(result != null){
				result.push({
					  "id": 0,
					  "parentId": 0,
					  "pId": 0,
					  "name": "数据管理",
					  "showName": "数据管理",
					  "description": null,
					  "enName": "",
					  "enShowName": "",
					  "enDescription": null,
					  "priority": 0,
					  "dbCode": "",
					  "code": null,
					  "codeName": null,
					  "published": 1,
					  "status": 1,
					  "level": 0,
					  "open":true
					});
				//ztree调用
			    $.fn.zTree.init($("#treeDemo0"), setting, result);
			    var frame_Id_dom = $("#frameForm input[name='id']",window.frames["chanel_frame"].document);
			    var treeObj = $.fn.zTree.getZTreeObj("treeDemo0")
			    if(frame_Id_dom.length > 0){
			    	var treeId = frame_Id_dom.val();
			    	var node = treeObj.getNodeByParam("id", treeId, null);
					if(!!node){
						if(needOpenNode == true){
							treeObj.expandNode(node, true, true, true);
						}
						treeObj.selectNode(node);
						
					}
			    }else{
			    	$("#"+treeObj.getNodes()[0].children[0].tId+"_a").click();
			    }
			}else{
				$.err("获取失败");
			}
		}
    });
}