
	//批量浮动价格
	function batchFloatPrice(url)
	{
		var floatPrice = $("#floatPrice").val();
		var flag = true;
		if(floatPrice == undefined || floatPrice == '' || floatPrice == 0)
		{
			alert("请输入正确的浮动价格！");
			return false;
		}
		//全部全选
		var checkAllType = $("#checkAllType").val(); 
		if(checkAllType == 2)
		{
			if(confirm("确定要批量浮动价格吗？"))
			{
				var realUrl = url+"&floatPrice="+floatPrice+"&checkAllType="+2;
				toSubmitAndJumpPage(realUrl);
			}
			else
			{
				return false;
			}
		}
		else
		{
			var resourceArray = [];
			var selectRowCount = 0;
			$("#editabledatatable tr").each(function(i){
				
				if($(this).find("input[name='selectedCheckBox']").is(":checked"))
				{
					var res = {};
					var resourceId = $(this).find("input[name='selectedCheckBox']").attr("id");
					var items = $("#onboardItems_"+resourceId).text();
					var averageQty = $("#averageQty_"+resourceId).text();
					var onboardPrice = MyNumber.add(parseFloat($("#onboardPrice_"+resourceId).text()), floatPrice, 2);
					res.id = resourceId;
					res.items = items;
					res.averateQty = averageQty;
					res.price = onboardPrice;
					if (onboardPrice <= 1500) 
					{
						flag = false;
					}
					else
					{
						resourceArray.push(res);
					}
					selectRowCount++;
				}
			});
			
			if(selectRowCount == 0)
			{
				alert("请至少选中一行资源，再批量浮动价格！");
				return false;
			}
			else
			{
				if(flag)
				{
					if(confirm("确定要批量浮动价格吗？"))
					{
						$("#hiddenJsonInfo").val(JSON.stringify(resourceArray));
						toSubmitAndJumpPage(url);
					}
				}
				else
				{
					if(confirm("浮动价格后，小于等于1500的资源不会修改成功，确定要批量浮动价格吗？"))
					{
						$("#hiddenJsonInfo").val(JSON.stringify(resourceArray));
						toSubmitAndJumpPage(url);
					}
				}
			}	
		}
	}

	//批量定价
	function batchPrice(url)
	{
		var setPrice = $("#setPrice").val();
		
		if(setPrice == undefined || setPrice == '' || setPrice == 0 || setPrice <= 1500)
		{
			alert("请输入价格,不能小于等于1500！");
			return false;
		}	
		//全部全选
		var checkAllType = $("#checkAllType").val(); 
		if(checkAllType == 2)
		{
			if(confirm("确定要批量定价吗？"))
			{
				var realUrl = url+"&price="+setPrice+"&checkAllType="+2;
				toSubmitAndJumpPage(realUrl);
			}
			else
			{
				return false;
			}
		}
		else
		{
			var resourceArray = [];
			var selectRowCount = 0;
			$("#editabledatatable tr").each(function(i){
				
				if($(this).find("input[name='selectedCheckBox']").is(":checked"))
				{
					var res = {};
					var resourceId = $(this).find("input[name='selectedCheckBox']").attr("id");
					var items = $("#onboardItems_"+resourceId).text();
					var averageQty = $("#averageQty_"+resourceId).text();
					var onboardPrice = setPrice;
					res.id = resourceId;
					res.items = items;
					res.averateQty = averageQty;
					res.price = onboardPrice;
					resourceArray.push(res);
					selectRowCount++;
				}
			});
			
			if(selectRowCount == 0)
			{
				alert("请至少选中一行资源，再批量定价！");
				return false;
			}
			else
			{
				if(confirm("确定要批量定价吗？"))
				{
					$("#hiddenJsonInfo").val(JSON.stringify(resourceArray));
					toSubmitAndJumpPage(url);
				}
			}
		}
	}
	
	//批量定量
	function batchItems(url)
	{
		var setItems = $("#setItems").val();
		
		if(setItems == undefined || setItems == '' || setItems == 0)
		{
			alert("请输入正确的数量！");
			return false;
		}
		//全部全选
		var checkAllType = $("#checkAllType").val(); 
		if(checkAllType == 2)
		{
			if(confirm("确定要批量定量吗？"))
			{
				var realUrl = url+"&items="+setItems+"&checkAllType="+2;
				toSubmitAndJumpPage(realUrl);
			}
			else
			{
				return false;
			}
		}
		else
		{
			var resourceArray = [];
			var selectRowCount = 0;
			$("#editabledatatable tr").each(function(i){
				
				if($(this).find("input[name='selectedCheckBox']").is(":checked"))
				{
					var res = {};
					var resourceId = $(this).find("input[name='selectedCheckBox']").attr("id");
					var status = $("#status_"+resourceId).val();
					var relationType = $("#relationType_"+resourceId).val();
					if(status == 0 && relationType == 0)
					{
						//检查件数
						var items = setItems;
						//检查件重
						var averageQty = $("#averageQty_"+resourceId).text();
						//检查价格
						var onboardPrice = $("#onboardPrice_"+resourceId).text();
						
						res.id = resourceId;
						res.items = items;
						res.averateQty = averageQty;
						res.price = onboardPrice;
						resourceArray.push(res);
						selectRowCount++;
					}
				}
			});
			
			if(selectRowCount == 0)
			{
				alert("只能对下架状态的资源进行批量定量，请选择下架状态的资源！");
				return false;
			}
			else
			{
				if(confirm("确定要批量定量吗？"))
				{
					$("#hiddenJsonInfo").val(JSON.stringify(resourceArray));
					toSubmitAndJumpPage(url);
				}
			}
		}
	}
	
	//批量上架
	function batchOn(url)
	{
		var checkAllType = $("#checkAllType").val();
		if(checkAllType == 2)
		{
			if(confirm("确定要批量上架吗？"))
			{
				var realUrl = url+"&checkAllType="+2;
				toSubmitAndJumpPage(realUrl);
			}
			else
			{
				return false;
			}
		}
		else
		{
			var checkboxs = $("#editabledatatable").find("tbody").find("input[type='checkbox']");
			
			var flag = true ;
			var checkedCount = 0 ;
			
			var resourceArray = [];
			var oneLineTip = '';  
			
			$.each(checkboxs,function(index, item){
				
				if($(item).is(':checked'))
				{
					var rowNum = $(item).parents("tr").attr("id");
					var resourceId = $(item).attr("id");
					var status = $("#status_"+resourceId).val();
					
					if(status == 0)
					{
						var res = {};
						checkedCount++;
						
						//检查件数
						var onboardItems = $("#onboardItems_"+resourceId).text();
						//检查价格
						var onboardPrice = $("#onboardPrice_"+resourceId).text();
						//检查件重
						var averageQty = $("#averageQty_"+resourceId).text();
						
						if(onboardItems == undefined || onboardItems == null || onboardItems == '' || onboardItems <= 0)
						{
							
							oneLineTip = '第【'+rowNum+'】行件数不能为空,并且大于0';
							flag = false ;
							return false;
						}
						if(onboardPrice == undefined || onboardPrice == null || onboardPrice == '' || onboardPrice < 1500)
						{
							oneLineTip = '请输入第【'+rowNum+'】行价格（大于1500）';
							flag = false ;
							return false;
						}
						
						res.resourceId = resourceId;
						res.onboardPrice = onboardPrice;
						res.averageQty = averageQty;
						res.onboardItems = onboardItems;
						
						resourceArray.push(res);
					}	
					else
					{
						$(item).attr("checked", false);
					}	
				}	
			});
			
			if(!flag)
			{
				if(oneLineTip != '')
				{
					alert(oneLineTip);
				}
				
				return ;
			}
			else
			{
				if(checkedCount == 0)
				{
					alert("请选择一行未上架的资源进行操作！");
					return false;
				}
				else
				{
					if(confirm("确定要批量上架吗？"))
					{
						$("#hiddenJsonInfo").val(JSON.stringify(resourceArray));
						toSubmitAndJumpPage(url);
					}	
				}
			}
		}
		
	}
	
	
	//批量下架
	function batchOff(url)
	{
		var checkAllType = $("#checkAllType").val();
		if(checkAllType == 2)
		{
			if(confirm("确定要批量下架吗？"))
			{
				var realUrl = url+"&checkAllType="+2;
				toSubmitAndJumpPage(realUrl);
			}
			else
			{
				return false;
			}
		}
		else
		{
			var checkboxs = $("#editabledatatable").find("tbody").find("input[type='checkbox']");
			
			var checkedCount = 0 ;
			var resourceIds = [];
			
			$.each(checkboxs,function(index, item){
				
				if($(item).is(':checked'))
				{
					//检查资源状态
					var resourceId = $(item).attr("id");
					var status = $("#status_"+resourceId).val();
					
					if(status == 10)
					{
						resourceIds.push(resourceId);
						checkedCount++;
					}
					else
					{
						$(item).attr('checked',false);
					}	
				}	
			});
			
			if(checkedCount == 0)
			{
				alert("请选择一行已上架的资源进行操作！");
				return false;
			}
			else
			{
				if(confirm("确定要批量下架吗？"))
				{
					$("#hiddenJsonInfo").val(resourceIds);
					toSubmitAndJumpPage(url);
				}	
			}
		}
	}
	
	//批量删除
	function batchDelete(url)
	{
		var checkAllType = $("#checkAllType").val();
		if(checkAllType == 2)
		{
			if(confirm("确定要批量删除吗？"))
			{
				var realUrl = url+"&checkAllType="+2;
				toSubmitAndJumpPage(realUrl);
			}
			else
			{
				return false;
			}
		}
		else
		{
			var checkboxs = $("#editabledatatable").find("tbody").find("input[type='checkbox']");
			var checkedCount = 0 ;
			var resourceIds = [];
			$.each(checkboxs,function(index, item){
				if($(item).is(':checked'))
				{
					//检查资源状态
					var resourceId = $(item).attr("id");
					var status = $("#status_"+resourceId).val();
					if(status == 0)
					{
						resourceIds.push(resourceId);
						checkedCount++;
					}
					else
					{
						$(item).attr('checked',false);
					}	
				}	
			});
			if(checkedCount == 0)
			{
				alert("请选择一行未上架的资源进行操作！");
				return false;
			}
			else
			{
				if(confirm("确定要批量删除吗？"))
				{
					$("#hiddenJsonInfo").val(resourceIds);
					toSubmitAndJumpPage(url);
				}
			}
		}
		
	}
	
	//单个资源删除
	function singleDelete(url,resourceId)
	{
		if(resourceId == undefined || resourceId == null || resourceId == '')
		{
			return false;
		}
		if(confirm("确定要删除资源吗？"))
		{
			var realUrl = url+"&resourceId="+resourceId;
			toSubmitAndJumpPage(realUrl);
		}	
	}

	//单个资源下架
	function singleOff(url,resourceId)
	{
		if(resourceId == null || resourceId == '')
		{
			return false;
		}
		if(confirm("确定要下架吗？"))
		{
			var realUrl = url+"&resourceId="+resourceId;
			toSubmitAndJumpPage(realUrl);
		}
	}
	//单个资源上架
	function singleOn(url,resourceId)
	{
		var flag = true;
		var infoTip = "";
		if(resourceId == null || resourceId == "")
		{
			return false;
		}
		var onboardItems = $("#onboardItems_"+resourceId).text();
		var averageQty = $("#averageQty_"+resourceId).text();
		var onboardPrice = $("#onboardPrice_"+resourceId).text();
		
		if(onboardItems == null || onboardItems == "" || onboardItems <= 0)
		{
			infoTip = '件数不能为空,并且大于0';
			flag = false ;
		}
		if(onboardPrice == null || onboardPrice == "" || onboardPrice <= 1500)
		{
			infoTip = '价格不能为空,并且大于1500';
			flag = false ;
		}
		if(flag)
		{
			if(confirm("确定要上架吗？"))
			{
				var realUrl = url+"&resId="+resourceId+"&items="+onboardItems+"&averageQty="+averageQty+"&price="+onboardPrice;
				toSubmitAndJumpPage(realUrl);
			}
		}
		else
		{
			alert(infoTip);
			return false;
		}	
		
	}
	
	//分页查询
	function goPage(page)
	{
		$("#page").val(page);
		searchByParams();
	}
	// 清除当前条目
	function clearItemFilter(currentObj) {
		$(currentObj).parent().css("display", "none");
		var spanItem = $(currentObj).parent().parent().children(".sel1");
		var count = 0;
		//当前条件全部清除掉，则去掉清除全部按钮
		for(var i=0; i< spanItem.length; i++)
		{
			if($(spanItem[i]).css("display") == "none")
			{
				count++;
			}
		}
		if(spanItem.length == count)
		{
			$(".sel-clear").css("display","none");
		}
		// 判断是去掉哪一个条件(品名，规格，钢厂，仓库)
		var tipId = $(currentObj).attr("id").substring(0, $(currentObj).attr("id").length - 3);
		if (tipId == "category") {
			clearCategoryItem();
			$("#category").val("");
			$("#categoryInput").val("");
		} else if (tipId == "material") {
			clearMaterialItem();
			$("#material").val("");
			$("#materialInput").val("");
		} else if (tipId == "factory") {
			clearFactoryItem();
		} else if (tipId == "warehouse") {
			clearWarehouseItem();
		} else if (tipId == "inputTime") {
			$("#resource-time").val("");
		} else if (tipId == "thickness") {
			$("#startThickness").val("");
			$("#endThickness").val("");
		} else if (tipId == "width") {
			$("#startWidth").val("");
			$("#endWidth").val("");
		} else if (tipId == "length") {
			$("#startLength").val("");
			$("#endLength").val("");
		} else {
			$("#"+tipId).val("");;
		}
		searchByParams(1);
	}

	// 清除全部查询条件
	function clearAllFilter(currentObj) {
		$(currentObj).parent().children(".sel1").css("display", "none");
		// 清除全部，没有条件时隐藏清除全部按钮
		$(currentObj).css("display", "none");

		clearCategoryItem();
		clearMaterialItem();
		clearFactoryItem();
		clearWarehouseItem();

		$("#category").val("");
		$("#categoryInput").val("");
		$("#material").val("");
		$("#materialInput").val("");
		$("#packageNo").val("");
		$("#spec").val("");
		
		$("#startThickness").val("");
		$("#endThickness").val("");
		$("#startWidth").val("");
		$("#endWidth").val("");
		$("#startLength").val("");
		$("#endLength").val("");
		
		$("#resource-time").val("");

		searchByParams();
	}

	// 清除选择的所有品名
	function clearCategoryItem() {
		var selectCategorys = $("#selectCategorys").children("a");
		for (var i = 0; i < selectCategorys.length; i++) {
			$(selectCategorys[i]).removeClass("current");
		}
	}
	// 清除选择的所有材质
	function clearMaterialItem() {
		var selectMaterials = $("#selectMaterials").children("a");
		for (var i = 0; i < selectMaterials.length; i++) {
			$(selectMaterials[i]).removeClass("current");
		}
	}
	// 清除选择的所有品牌
	function clearFactoryItem() {
		var selectFactorys = $("#selectFactorys").children("div");
		for (var i = 0; i < selectFactorys.length; i++) {
			$(selectFactorys[i]).removeClass("current");
		}
	}
	// 清除选择的所有仓库
	function clearWarehouseItem() {
		var selectWarehouses = $("#selectWarehouses").children("div");
		for (var i = 0; i < selectWarehouses.length; i++) {
			$(selectWarehouses[i]).removeClass("current");
		}
	}
	//选中添加样式
	function clickItem(currentObj)
	{
		$(currentObj).toggleClass("current");
		searchByParams(1);
	}
	//根据条件查询
	function searchByParams(type) {
		$("#category").val("");
		$("#material").val("");
		$("#warehouse").val("");
		$("#factory").val("");
		var categoryNames = [];
		var materialNames = [];
		var warehouseNames = [];
		var factoryNames = [];
		// 拿到选择的所有品名
		$("#selectCategorys").children("a").each(function(){
			if ($(this).hasClass("current")){
				categoryNames.push($(this).text());
			}
		});
		// 拿到选择的所有材质
		$("#selectMaterials").children("a").each(function(){
			if ($(this).hasClass("current")){
				materialNames.push($(this).text());
			}
		});
		// 拿到选择的所有仓库
		$("#selectWarehouses").children("div").each(function(){
			if ($(this).hasClass("current")){
				warehouseNames.push($(this).children("div :first").html());
			}
		});
		// 拿到选择的所有品牌
		$("#selectFactorys").children("div").each(function(){
			if ($(this).hasClass("current")){
				factoryNames.push($(this).children("div :first").html());
			}
		});
		if (type == 1) {
			$("#category").val(categoryNames);
			$("#material").val(materialNames);
		}
		else
		{
			$("#category").val($("#categoryInput").val());
			$("#material").val($("#materialInput").val());
		}
		$("#warehouse").val(warehouseNames);
		$("#factory").val(factoryNames);
		$("#searchForm").submit();
	}
	
	//通过ajax的方式提交并且跳转页面
	function toSubmitAndJumpPage(url){
		$.ajax({
			url:url,
			data:$('#searchForm').serialize(),
			type:"post",
			dataType:"json",
			async:false,
			cache:false,
			success:function(responseText){
				if(responseText != null && responseText != "")
				{
					alert(responseText);
				}
				searchByParams(1);
			},
			error:function(){
				alert("程序发生错误，请联系管理员！");
			}
		});
	}
	
	function judgeValue(obj)
	{
		if(obj == undefined || obj == null || obj == '')
		{
			return false;
		}
		else if(obj > 0)
		{
			return true;
		}
		
		return false;
	}
	function formatInputNumForNormal(obj,num) {
		
		if(num == undefined || num == null)
			num = 2;
		
		if(num == 0)
		{
			obj.value = obj.value.replace(/[^\d]/g, ""); //清除“数字”和“.”以外的字符
			if(obj.value ==  undefined || obj.value==null || obj.value=="")
		    {
		        obj.value="0";
		    }
			var valss = parseInt(obj.value);
	    	obj.value = Math.round(valss*100)/100;
		}
		else
		{
			obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符 
		    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是.
		    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.  
		    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		    if(obj.value ==  undefined || obj.value==null || obj.value=="")
		    {
		        obj.value="0";
		    }
			
		    var tempStr = new String(obj.value);
		    if(tempStr.indexOf('.') == -1)
		    {
		    	var valss = parseInt(obj.value);
		    	obj.value = Math.round(valss * Math.pow(10, num)) / Math.pow(10, num) ;
		    }
		    else
		    {
		    	if(tempStr.length >= tempStr.indexOf('.')+(num+1))
				{
					var valss = parseFloat(obj.value).toFixed(num);
					obj.value = Math.round(valss * Math.pow(10, num)) / Math.pow(10, num) ;
				}
		    }	
		}
		
	}

	function formatInputNum(obj,num) {
		
		if(num == undefined || num == null)
			num = 2;
		
		if(num == 0)
		{
			obj.value = obj.value.replace(/[^\d]/g, ""); //清除“数字”和“.”以外的字符
			if(obj.value ==  undefined || obj.value==null || obj.value=="")
		    {
		        obj.value="0";
		    }
			var valss = parseInt(obj.value);
	    	obj.value = Math.round(valss*100)/100;
		}
		else
		{
			obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符 
		    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是.
		    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.  
		    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		    if(obj.value ==  undefined || obj.value==null || obj.value=="")
		    {
		        obj.value="0";
		    }
			
		    var tempStr = new String(obj.value);
		    if(tempStr.indexOf('.') == -1)
		    {
		    	var valss = parseInt(obj.value);
		    	obj.value = Math.round(valss * Math.pow(10, num)) / Math.pow(10, num) ;
		    }
		    else
		    {
		    	if(tempStr.length >= tempStr.indexOf('.')+(num+1))
				{
					var valss = parseFloat(obj.value).toFixed(num);
					obj.value = Math.round(valss * Math.pow(10, num)) / Math.pow(10, num) ;
				}
		    }	
		}
		
		//重新计算总量
		if(num === 0)
		{
			var qty = 0 ;
			var avgQty = $(obj).parent().next().find("input").val();
			
			if(obj.value > 0 && avgQty > 0 )
			{
				qty = MyNumber.mul(avgQty, obj.value);	
			}
			
			qty = parseFloat(qty).toFixed(4);
			
			$(obj).parent().next().next().text(qty);
			
		}	
		else if(num === 4)
		{
			var qty = 0 ;
			var items = $(obj).parent().prev().find("input").val();
			
			if(obj.value > 0 && items > 0 )
			{
				qty = MyNumber.mul(items, obj.value);	
			}
			
			qty = parseFloat(qty).toFixed(4);
			
			$(obj).parent().next().text(qty);
		}	
	}
	
	function fireOnMoneyFocus(obj)
	{
		if(obj.value == undefined || obj.value == null)
		{
			obj.value = '' ;
		}
		else
		{
			if(parseFloat(obj.value) == 0)
				obj.value = '' ;
			else
			{
			var oldValue = obj.value ;
			obj.focus();
			obj.value = oldValue ;
			}
		}
	}
	
	function fireOnMoneyBlur(obj, num)
	{
		if(obj.value == undefined || obj.value == null || obj.value == '')
		{
			obj.value = '0' ;
		}
		
		//格式化保留小数位数
		obj.value = parseFloat(obj.value).toFixed(num);
		
	}
	
	function checkInputMoney(obj) {
	    obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符 
	    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是.
	    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.  
	    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	    if(obj.value ==  undefined || obj.value==null || obj.value=="")
	    {
	        obj.value="0";
	    }
	    var tempStr = new String(obj.value);
	    if(tempStr.indexOf('.') != tempStr.length-1)
	    {
			if(tempStr.charAt(tempStr.indexOf('.')+1) != '0')
			{
	        	var valss = parseFloat(obj.value);
	        	obj.value = Math.round(valss*100)/100;
			}else if(tempStr.length >= tempStr.indexOf('.')+3)
			{
				var valss = parseFloat(obj.value);
	        	obj.value = Math.round(valss*100)/100;
			}
	    }
	   
	}
	
	function floatPriceOnBlur(obj, num)
	{
		if(obj.value == undefined || obj.value == null || obj.value == '')
		{
			obj.value = '0' ;
		}
		
		//格式化保留小数位数
		obj.value = parseFloat(obj.value).toFixed(num);
		
		if(obj.value == 0)
		{
			obj.value = '';
		}	
	}