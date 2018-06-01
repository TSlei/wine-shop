var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onNodeClick
    },
    view: {
        fontCss: getFont
    }/*,  
    async: {  
        enable: true,//异步加载  
        url:"/gldata/getCategoryTree",  //请求地址，可用function动态获取   
        autoParam:["id=parentId"],//提交的节点参数，可用“id=xx”取请求提交时的别名  
        //otherParam:{"otherParam":"zTreeAsyncTest"},//提交的其他参数,json的形式  
        dataType:"json",//返回数据类型  
        type:"get",//请求方式  
        dataFilter: null//数据过滤  
        }*/
};

function onNodeClick(e, treeId, treeNode) {
	var selectedAll = $("#selectedAll").val();
	if(selectedAll == "false" || selectedAll == "" || typeof selectedAll == "undefined" ){
		if(!treeNode.isParent){
			selectedNode(treeId, treeNode);
		}
	}else{
		selectedNode(treeId, treeNode);
	}
}

function selectedNode(treeId, treeNode){
	var zTree = $.fn.zTree.getZTreeObj("categoryZtree");
	zTree.expandNode(treeNode);
	var data = treeNode.getPath();
	var fnLength = data.length;
	var fnName = '';
	for (i = 0; i < fnLength; i++) {
		if (i == 0) {
			fnName = fnName + data[i].name;
		} else {
			fnName = fnName + ' / ' + data[i].name;
		}
	}
	$('.select-category-area').text(fnName).attr({
		"treeId" : treeNode.id,
		"treeName" : treeNode.name,
		"dbCode" : treeNode.dbCode
	});
}

$(document).ready(function() {
	$.ajax({
		type : 'POST',
		url : "/gldata/getCategoryTree",
		data : {/*parentId:"0"*/},
		success : function(result) {
			if(result != null){
				var topNode = {id:"0",pId:null,name:"数据管理",isParent:true,open:true,nocheck:true}
				result.unshift(topNode);
				mysteelData.initZtree("categoryZtree", setting, result);
			}else{
				$.err(result.msg);
			}
		}
    });
});