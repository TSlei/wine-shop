/**
 * 选择钢铁种类弹出框
 * @param level	（品种级别）
 * @param type	(1:多选   2：单选)
 * @param callback
 * @returns {Boolean}
 */
function selectCategory(level, type, callback)
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
				
				
				callback(result);
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
function selectBrand(type, callback)
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
			
			
			callback(result);
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
function selectMaterial(categoryCode, type, callback,flag)
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
			
			
			callback(result);
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
function selectSpec(categoryCode, type, callback, flag)
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
			
			
			callback(result);
		}
	}); 
	Autofixed('#brand_choose_iframe',d)
    d.showModal();
    return false;
}

/**
 * 选择仓库
 */
function selectWarehouse(callback)
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
		//从仓库选择弹框 选择确定的返回数据
			
			var warehouse={};
			warehouse["warehouseName"]=this.returnValue.name;
			warehouse["warehouseId"]=this.returnValue.id;
			warehouse["warehouseCode"]=this.returnValue.code;
			warehouse["cityCode"]=this.returnValue.cityCode;
			callback(warehouse);
		}
	});

	return false;
};

/**
 * 选择城市
 */
function selectCity(type, callback)
{
	d = dialog({
		id: 'city_choose_iframe',
		title: '选择城市',
		url: '/select/select_city.htm',
        width:'670',
		height:'500',
		data: type,
        fixed:true,
		ok1:function(a)
		{
			var result=new Array();
			
			for(var i = 0 ; i < a.length ; i++)
			{
				var city={};
				
				city["cityName"]=a[i].name;
				city["cityId"]=a[i].id;
				
				result[i]=city;
			}
			
			
			callback(result);
		}
	}); 
	Autofixed('#brand_choose_iframe',d)
    d.showModal();
    return false;
}


/**
 * 选择管理员
 * 初始化显示 <input type="text" id="inputId" name="someName" value="someAdminId" text="someAdminName"/>
 * demo $(function(){selectAdmin('inputId')})
 * 
 */
function selectAdmin(inputId)
{
	$('#'+inputId).select2({
		placeholder: "请选择管理员",
		initSelection:function(element,callback)
					{  
						var idValue=$(element).val();
						var textValue=$(element).attr("text");
						if(idValue!=''&&textValue!='')
						{
	         				callback({id:idValue,text:textValue});
				   		} 
	        		},
		width:200,
	  	minimumInputLength: 1,
	  	maximumInputLength:100,
	  	ajax: {
	    	url: "/select/select_admin.htm",
			type:'post',
	    	dataType: 'json',
			delay:250,
	    	data: function(params) {
	      		return {'name':params};
	    	},
			results: function (data) {
				var admins=$.parseJSON(data);
				var result={};
				result["results"]=admins;
				return result;
			},
			cache: true
	  	}
	});
}



