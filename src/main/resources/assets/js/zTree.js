(function() {
    mysteelData = {
    	treeId : "",
    	setting : "",
    	jsonData : "",	
    	searchNodeList : [],
        init: function() {
            this.bindEvent();
            this.keyUp();
        },
        logic: {
        	
        },
        bindEvent: function() {
        	$(".search-btn-js").bind("click", this.searchNode);
        },
        
        initZtree: function(ele,setting,jsonData) {
        	mysteelData.treeId = ele;
        	mysteelData.setting = setting;
        	mysteelData.jsonData = jsonData;
        	setting.view = {
        	  fontCss: mysteelData.setHighlight // 高亮一定要设置，setHighlight是自定义方法
        	}
        	var tree = $.fn.zTree.init($("#" + ele), setting, jsonData);
        	return tree;
        },
        
		searchNode : function (e) {			
			var value = $.trim($(".search-value-js").val());
			if(value == ""){
				alert("请输入需要搜索的信息");
				return false;
			}
			
			var lastValue = "";
			var zTree = $.fn.zTree.getZTreeObj(mysteelData.treeId);
		
			//var allNodes = mysteelData.getAllNodes(zTree);
			mysteelData.updateNodes(false, mysteelData.searchNodeList, mysteelData.treeId, false);
			zTree.setting.view.expandSpeed = "";
			//zTree.expandAll(false);
			zTree.setting.view.expandSpeed = "fast";
			var keyType = "name";
			if ($(".search-value-js").hasClass("empty")) {
				value = "";
			}
			if (value === ""){
				return;
			}
			if (lastValue === value) return;
			lastValue = value;
			
			mysteelData.searchNodeList = zTree.getNodesByParamFuzzy(keyType, value);
			//更新高亮
			mysteelData.updateNodes(true, mysteelData.searchNodeList, mysteelData.treeId, true);
		},
		
		/**
		 * 搜索内容高亮
		 */
		updateNodes : function(highlight, nodeList, treeId, isExpand) {
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			for( var i=0, l=nodeList.length; i<l; i++) {
				nodeList[i].highlight = highlight;
				zTree.updateNode(nodeList[i]);
				if(isExpand){//是否展开
					zTree.expandNode(nodeList[i].getParentNode(),true,false);
				}
			}
		},
		
		/**
		 * 键盘 enter 键
		 */
		keyUp : function(){
			$("body").on("keydown",".search-value-js", function(event){
				if(event.keyCode==13){
					$(".search-btn-js").trigger("click");
				}
			});	
		},
		
		setHighlight : function (treeId, treeNode) {
		  if(treeNode.highlight){
			  return {color:"#A60000", "font-weight":"bold"};
	      }else if(treeNode.disable === true){
	    	  return {'color':'#ccc'};
	      }else{
	    	  return {color:"#333", "font-weight":"normal"};
	      }
  	    },
  	    
  	    focusKey : function (e) {
			if ($(e.target).hasClass("empty")) {
				$(e.target).removeClass("empty");
			}
		},
		blurKey : function (e) {
			if ($(e.target).value === "") {
				$(e.target).addClass("empty");
			}
		},
		
		getAllNodes : function (zTree){
			var nodes1 = zTree.getNodes();
			var nodes2 = zTree.transformToArray(nodes1);
			return nodes2;
		}
		
    };

	$(function(){
		mysteelData.init();
		$("body").on("keydown", ".search-value-js",function(event){
			if(event.keyCode==13){
				$(".search-btn-js").click();
			}
		});
	});
	
})();