$(function(){
	//checkbox级联选中
	$('.select-all').click(function(){
		if($(this).is(':checked')){
			$('.select-single').prop('checked',true)
		}else{
			$('.select-single').prop('checked',false)
		}
	});
	$(".select-single").click(function(){               //checkBox点击事件
		 /** 判断每个二级选项是否全选中 **/
		 var ia = $(".select-single");//获取这组所有的二级input标签
		 var ial = ia.length;
		 var countChecked1=0;
		 for (var i = 0; i < ial; i++) {
		        if (ia[i].checked == true) {
		           countChecked1++;//获取checkbox被勾上的数量
		        }
		 }
		 if(ial == countChecked1){
			 $(".select-all").prop("checked", true);
		 }else{
			 $(".select-all").removeAttr("checked", false);
		 }
		 /** 结束标志   **/
	 });
})

/**选择类目*/
 function selectCategoryCallback(data,obj)
 {
	var categoryName = obj.id;
	
	if(categoryName)
	{
		var flag=categoryName.split("_")[1];
	}
	
  	for(var i = 0; i<data.length; i++)
	{
		$("#"+categoryName).val(data[i]["categoryName"]);
		$("#categoryId_"+flag).val(data[i]["categoryId"]);
	}
  	
	checkMatAndSpec(obj);
	
 }
  
 /**选择品牌*/
 function selectBrandCallback(data,obj)
 {
	var brandName=obj.id;
	if(brandName)
	{
		var flag=brandName.split("_")[1];
	}
	
  	for(var i = 0; i<data.length; i++)
	{
		$("#"+brandName).val(data[i]["brandName"]);
		$("#brandId_"+flag).val(data[i]["brandId"]);
	}
 }
  
/**选择材质*/
function selectMaterialCallback(data,obj)
{
	var materialName=obj.id;
	
	if(materialName)
	{
		var flag=materialName.split("_")[1];
	}
	
  	for(var i = 0; i<data.length; i++)
	{
		$("#"+materialName).val(data[i]["materialName"]);
		$("#materialId_"+flag).val(data[i]["materialId"]);
	}
}
  
/**选择规格*/
function selectSpecCallback(data,obj)
{
	var specName=obj.id;
	
	if(specName)
	{
		var flag=specName.split("_")[1];
	}
	
  	for(var i = 0; i<data.length; i++)
	{
		$("#"+specName).val(data[i]["specName"]);
		$("#specId_"+flag).val(data[i]["specId"]);
	}
 }
  
/**选择仓库*/
 function selectWarehouseCallback(data,obj)
 {
	var warehouseName=obj.id;
	
	if(warehouseName)
	{
		var flag=warehouseName.split("_")[1];
	}
	
	$("#"+warehouseName).val(data["warehouseName"]);
	$("#warehouseId_"+flag).val(data["warehouseCode"]);
 }
	
/**
 * 选择钢铁种类弹出框
 * @param level	（品种级别）
 * @param type	(1:多选   2：单选)
 * @param callback
 * @returns {Boolean}
 */
function selectCategory(level, type, callback,obj)
{
	var param = {};
	param.level = level;
	param.type = type;
	d = dialog({
        id: 'brand_choose_iframe',
        title: '选择钢铁种类',
		url: '/select/select_category.htm?level='+level,
        width:'670',
		height:'500',
		data:param,
        fixed:true,
		ok1:function(a)
		{
			var result=new Array();
				
			for(var i = 0 ; i < a.length ; i++)
			{
				var category={};
					
				category["categoryName"]=a[i].name;
				category["categoryId"]=a[i].id;
					
				result[i]=category;
			}
				
				
			callback(result,obj);
		}
	}); 
	Autofixed('#brand_choose_iframe',d)
    d.showModal();
    return false;
}

/**
 * 选择品牌产地弹出框
 * @param type （1：多选    2：单选）
 * @param callback（回调函数）
 */
function selectBrand(type, callback,obj)
{
	d = dialog({
		id: 'brand_choose_iframe',
		title: '选择品牌产地',
        url: '/brand/select_brand.htm',
        width:'670',
		height:'500',
		data: type,
        fixed:true,
		ok1:function(a)
		{
			var result=new Array();
			
			for(var i = 0 ; i < a.length ; i++)
			{
				var brand={};
				
				brand["brandName"]=a[i].name;
				brand["brandId"]=a[i].id;
				
				result[i]=brand;
			}
			
			
			callback(result,obj);
		}
	}); 
	//Autofixed('#brand_choose_iframe',d)
    d.showModal();
    return false;
}

/**
 * 选择钢铁种类材质弹出框
 * @param categoryCode	（品种编码）
 * @param type	（1：多选	2：单选）
 * @param callback	（回调函数）
 * @param flag（2：对应的二级品种下的材质		3：对应三级品种下的材质）
 * @returns {Boolean}
 */
function selectMaterial(categoryCode, type, callback,flag,obj)
{
	var param = {};
	param.categoryCode = categoryCode;
	param.type = type;
	d = dialog({
        id: 'material_choose_iframe',
        title: '选择钢铁种类材质',
		url: '/select/select_material.htm?categoryCode='+categoryCode + "&flag=" + flag,
        width:'670',
		height:'500',
		data:param,
        fixed:true,
		ok1:function(a)
		{
			var result=new Array();
			
			for(var i = 0 ; i < a.length ; i++)
			{
				var material={};
				
				material["materialName"]=a[i].name;
				material["materialId"]=a[i].id;
				
				result[i]=material;
			}
			
			
			callback(result,obj);
		}
	}); 
	Autofixed('#brand_choose_iframe',d)
    d.showModal();
    return false;
}

/**
 * 
 * @param categoryCode
 * @param type
 * @param callback
 * @returns {Boolean}
 */
function selectSpec(categoryCode, type, callback, flag,obj)
{
	var param = {};
	param.categoryCode = categoryCode;
	param.type = type;
	d = dialog({
        id: 'material_choose_iframe',
        title: '选择钢铁种类规格',
        url: '/select/select_spec.htm?categoryCode='+categoryCode + "&flag=" + flag,
        width:'670',
		height:'500',
		data:param,
        fixed:true,
		ok1:function(a)
		{
			var result=new Array();
			
			for(var i = 0 ; i < a.length ; i++)
			{
				var spec={};
				
				spec["specName"]=a[i].name;
				spec["specId"]=a[i].id;
				
				result[i]=spec;
			}
			
			
			callback(result,obj);
		}
	}); 
	Autofixed('#brand_choose_iframe',d)
    d.showModal();
    return false;
}

/**
 * 选择仓库
 */
function selectWarehouse(callback,obj)
{
	d = dialog({
		id: 'warehouse_choose_iframe',
		title: '选择仓库',
		url: '/select/select_warehouse.htm',
		width:'670',
		height:'410',
		fixed:'scrolling',
	}); 

	Autofixed('#warehouse_choose_iframe',d)
	d.showModal();

	d.addEventListener('close', function () {
		if(this.returnValue != undefined && this.returnValue != null)
		{
			var warehouse={};
			warehouse["warehouseName"]=this.returnValue.name;
			warehouse["warehouseId"]=this.returnValue.id;
			warehouse["warehouseCode"]=this.returnValue.code;
			callback(warehouse,obj);
		}
	});

	return false;
};

/**
 * 在选择规格材质之前,必须先选择品种
 */
function validate(obj){
	var id=obj.id;
		
	if(id)
	{
		var flag=id.split("_")[1];
	}
		
	var category = $("#categoryName_"+flag).val();
	
	if(category == null || category == "")
	{
		alert("请先选择品名!");
		return false;
	}
	else
	{
		return true;
	}
		
}

/**
 * 清空
 */
function clean()
{
	var shopId = $("#shopId").val();
	location.href = "/inventory/related_resource_manage.htm?shopId="+shopId;
}

/**
 * 判断规格材质是否为标准的规格材质
 */
function checkMatAndSpec(obj)
{
	var shopId = $("#shopId").val();
	var objId = obj.id;
	$tr = $("#"+objId).closest("tr");
    var categoryName = $tr.find("input[name='categoryName']").val();
    var materialAlias = $tr.find("font[name='materialAliasName']").text();
    var specAlias = $tr.find("font[name='specAliasName']").text();
    var standardCategoryCode = $tr.find("input[name='categoryId']").val();
        
    var docCategoryCode = $tr.find("input[name='categoryId']")
    var docMatAliasName = $tr.find("font[name='materialAliasName']");
	var docMatName = $tr.find("input[name='materialName']");
	var docMatCode = $tr.find("input[name='materialCode']")
	var docSpecAliasName = $tr.find("font[name='specAliasName']");
	var docSpecName = $tr.find("input[name='specName']");
	var docSpecCode = $tr.find("input[name='specCode']")
		
    if(standardCategoryCode)
    {
        	$.ajax({
                 type:"post",
                 data:{"categoryCode":standardCategoryCode,"materialName":materialAlias,"specName":specAlias,"shopId":shopId},
                 async:false,
                 url: "/inventory/material_and_spec_query.htm", 
                 dataType:"json",
                 success: function(result){
                	 var obj = eval('('+result+')');
        			 var data = obj['data'];
        			 if(data.materialCode){
        				 docMatAliasName.attr("color","");
        				 docMatName.removeAttr("onclick");
        				 docMatName.val(data.materialName);
        				 docMatCode.val(data.materialCode);
        			 }
        			 else
        			 {
        				 docMatAliasName.attr("color","red");
        				 docMatName.attr("onclick","if(validate(this)) selectMaterial('"+standardCategoryCode+"',2,selectMaterialCallback,3,this)");
        				 docMatName.val("");
        				 docMatCode.val("");
        			 }
        			  
        			if(data.specCode){
        				  docSpecAliasName.attr("color","");
        				  docSpecName.removeAttr("onclick");
        				  docSpecName.val(data.specName);
        				  docSpecCode.val(data.specCode);
        			}
        			else
         			{
        				  docSpecAliasName.attr("color","red");
        				  docSpecName.attr("onclick","if(validate(this)) selectSpec('"+standardCategoryCode+"',2,selectSpecCallback,3,this)");
        				  docSpecName.val("");
        				  docSpecCode.val("");
         			}
        		}
        	})
		}
	
}

/**
 * 提交之前进行数据处理
 */
function submit()
{
	var resourceArray = [];
	var categoryFlag = true;
	var materialFlag = true;
	var specFlag = true;
	var factoryFlag = true;
	var warehouseFlag = true;
	
	$("#simpledatatable tr").each(function(i){
		if($(this).find("input[name='selectedCheckBox']").is(":checked"))
		{
			var res = {};
					
			//非标资源原始三级品种编码
			var categoryCode = $(this).find("input[name='thirdCategoryCode']").val();
			//平台标准三级品种编码
			var standardCategoryCode = $(this).find("input[name='categoryId']").val();
			//平台标准品名
			var categoryName = $(this).find("input[name='categoryName']").val();
			//将非标资源的原始品名作为所选择的平台标准资源品名的别名
			var categoryAlias = $(this).find("font[name='categoryAliasName']").text();
			
			//非标资源的原始材质编码
			var materialCode = $(this).find("input[name='materialCode']").val();
			//平台标准材质编码
			var standardMaterialCode = $(this).find("input[name='materialId']").val();
			//平台标准材质名称
			var materialName = $(this).find("input[name='materialName']").val();
			//将非标资源的原始材质名称作为所选择的的平台标准资源材质名称的别名
			var materialAlias = $(this).find("font[name='materialAliasName']").text();
			
			//非标资源原始规格编码
			var specCode = $(this).find("input[name='specCode']").val();
			//平台标准规格编码
			var standardSpecCode = $(this).find("input[name='specId']").val();
			//平台标准规格名称
			var specName = $(this).find("input[name='specName']").val();
			//将非标资源的原始规格名称作为所选择的的平台标准资源规格名称的别名
			var specAlias = $(this).find("font[name='specAliasName']").text();
			
			//非标资源原始钢厂编码
			var factoryCode = $(this).find("input[name='factoryCode']").val();
			//平台标准钢厂编码
			var standardFactoryCode = $(this).find("input[name='brandId']").val();
			//平台标准钢厂名称
			var factoryName = $(this).find("input[name='brandName']").val();
			//将非标资源的原始钢厂名称作为所选择的的平台标准资源钢厂名称的别名
			var factoryAlias = $(this).find("font[name='factoryAliasName']").text();
			
			//非标资源原始仓库编码
			var warehouseCode = $(this).find("input[name='warehouseCode']").val();
			//平台标准仓库编码
			var standardWarehouseCode = $(this).find("input[name='warehouseId']").val();
			//平台标准仓库名称
			var warehouseName = $(this).find("input[name='warehouseName']").val();
			//将非标资源的原始仓库名称作为所选择的的平台标准资源仓库名称的别名
			var warehouseAlias = $(this).find("font[name='warehouseAliasName']").text();
			
			//资源Id		
			var id = $(this).find("input[name='id']").val();
			//附加信息
			var demand = $(this).find("input[name='demand']").val();
			
			//品名非标
			if(!categoryCode)
			{
				if(!standardCategoryCode)
				{
					categoryFlag = false;
				}
				
				res.categoryAlias = categoryAlias;
				res.standardCategoryCode = standardCategoryCode;
				res.categoryName = categoryName;
			}
			
			//材质非标
			if(!materialCode)
			{
				if(!standardMaterialCode)
				{
					materialFlag = false;
				}
				
				res.materialAlias = materialAlias;
				res.standardMaterialCode = standardMaterialCode;
				res.materialName = materialName;
			}
			else
			{
				res.materialAlias = materialAlias;
				res.materialCode = materialCode;
				res.materialName = materialName;
			}
			
			//规格非标
			if(!specCode)
			{
				if(!standardSpecCode)
				{
					specFlag = false;
				}
				
				res.specAlias = specAlias;
				res.standardSpecCode = standardSpecCode;
				res.specName = specName;
			}
			else
			{
				res.specAlias = specAlias;
				res.specCode = specCode;
				res.specName = specName;
			}
			
			//钢厂非标
			if(!factoryCode)
			{
				if(!standardFactoryCode)
				{
					factoryFlag = false;
				}
						
				res.factoryAlias = factoryAlias;
				res.standardFactoryCode = standardFactoryCode;
				res.factoryName = factoryName;
			}
			
			// 仓库非标
			if(!warehouseCode)
			{
				if(!standardWarehouseCode)
				{
					warehouseFlag = false;
				}
				
				res.warehouseAlias = warehouseAlias;
				res.warehouseName = warehouseName;
				res.standardWarehouseCode = standardWarehouseCode;
			}
			
			res.demand = demand;
			res.id = id;
			resourceArray.push(res);
		}
	});
	//提交之前进行验证
	if(resourceArray.length != 0 && categoryFlag && materialFlag && specFlag && factoryFlag && warehouseFlag)
	{
		$("#hiddenJsonInfo").val(JSON.stringify(resourceArray));
		$("#relatedForm").submit();
	}
	else
	{
		alert("请选择要进行操作的资源并保证数据完整");
	}
}

