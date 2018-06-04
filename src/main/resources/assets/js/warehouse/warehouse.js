
	//仓库选择
	function choosewarehouse(obj)
	{
		var whTabTRs = $("#warehouseTable").find('tr');
		var trParentOfobj = $(obj).parent().parent().get(0);
		var curTrNum = -1;
	
		//寻找是哪一行仓库按钮被触发 将行号 保存到dialog的data中，方便返回仓库信息时往表格 对应行 添加数据
		for(var i = 0 ; i < whTabTRs.length ; i++)
		{
			var curTr = whTabTRs[i];
			if( curTr == trParentOfobj)
			{
			curTrNum = i;
			break;
			}
		}
	
		d = dialog({
			id: 'warehouse_choose_iframe',
			title: '选择仓库',
			url: '/select/select_warehouse.htm',
			width:'670',
			height:'410',
			fixed:'scrolling',
			data:curTrNum
		}); 
	
		Autofixed('#warehouse_choose_iframe',d)
		d.showModal();
	
		d.addEventListener('close', function () {
	
			if(this.returnValue != undefined && this.returnValue != null)
			{
			//从仓库选择弹框 选择确定的返回数据
			var warehouseInfo = this.returnValue ;
			
			var warehouseIds=$("input[name=ware_id]");
			for(var i=0;i<warehouseIds.length;i++)
			{
				if(warehouseIds[i].value==warehouseInfo.id )
				{
					return;
				}
			}
	
				if(this.data > 0)
				{
					var whTabTRs = $("#warehouseTable").find('tr');
					var curTr = whTabTRs[curTrNum];
					var curTrTds = $(curTr).find('td');
					
					
					// 用仓库名称替换原有的 选择仓库按钮
					$(curTrTds[1]).text(warehouseInfo.name);  
					$(curTr).find('input[name=ware_name]')[0].value = warehouseInfo.name ;
					
					//设置仓库联系电话
					if(warehouseInfo.phone != undefined && warehouseInfo.phone != null)
					{
						$(curTr).find('input[name=ware_contact]')[0].value = warehouseInfo.phone ;
					}
				
					
					//出库费用
					if(warehouseInfo.library_fee != undefined && warehouseInfo.library_fee != null)
					{
						$(curTr).find('input[name=library_fee]')[0].value = warehouseInfo.library_fee;
					}
				
					
					//设置仓库传真号码
					if(warehouseInfo.fax != undefined && warehouseInfo.fax != null)
					{
						$(curTr).find('input[name=ware_fax]')[0].value = warehouseInfo.fax ;
					}
				
					
					//设置仓库地址
					if(warehouseInfo.address != undefined && warehouseInfo.address != null)
					{
						$(curTr).find('input[name=ware_address]')[0].value = warehouseInfo.address ;
					}
				
					
					//转货权费
					if(warehouseInfo.right_fee != undefined && warehouseInfo.right_fee != null)
					{
						$(curTr).find('input[name=right_fee]')[0].value = warehouseInfo.right_fee;
					}
					
					
					//仓库备注
					if(warehouseInfo.ware_remark != undefined && warehouseInfo.ware_remark != null)
					{
						$(curTr).find('input[name=ware_remark]')[0].value = warehouseInfo.ware_remark;
					}
				
					
					//设置仓库Id
					if(warehouseInfo.id != undefined && warehouseInfo.id != null)
					{
						$(curTr).find('input[name=ware_id]')[0].value = warehouseInfo.id ;
					}
					
				}
			}
		});
	
		return false;
	};

	//新增一行仓库info
	function addWarehouseInfo()
	{
	var $tr =  $("<tr></tr>");
		
		var $td1 = $('<td><select name="delivery_method"><option value="1">库提</option><option value="2">厂提</option></select></td>');
		var $td2 = $('<td><a href="javascript:;" class="btn" data-bb="warehouseSelect" onclick="choosewarehouse(this);">仓库</a></td>');
		var $td3 = $('<td> <input name="ware_contact" onblur="checkPhone(this)" class="form-control" type="text" ></td>')
		var $td4 = $('<td> <input name="library_fee"  onblur="checkNumber(this)" class="form-control" type="text" ></td>')
		var $td5 = $('<td> <input name="ware_fax" onblur="checkPhone(this)" class="form-control" type="text" ></td>')
		var $td6 = $('<td> <input name="ware_address"  class="form-control" type="text" ></td>')
		var $td7 = $('<td> <input name="right_fee" onblur="checkNumber(this)"  class="form-control" type="text"></td>')
		var $td8 = $('<td> <input name="ware_remark" class="form-control" type="text" ></td>')
		var $td9 = $('<td class="span32"><input name="ware_id"  type="hidden"  value=""><input name="ware_name"  type="hidden" value=""><a href="javascript:;" class="add" onclick="addWarehouseInfo()">新增</a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="del" onclick="delWarehouseLine(this)">删除</a></td>')
		
		$tr.append($td1);
		$tr.append($td2);
		$tr.append($td3);
		$tr.append($td4);
		$tr.append($td5);
		$tr.append($td6);
		$tr.append($td7);
		$tr.append($td8);
		$tr.append($td9);
		
		$("#warehouseTable").append($tr);
	};
	
	//删除一行仓库Info
	function delWarehouseLine(obj)
	{
		var curTr = $(obj).closest('tr');
		$(curTr).remove();
		
		if($("#warehouseTable").find('tr').length == 1)
		{
			addWarehouseInfo();
		}

	}
	
	function selectCategory(level, type, callback)
	{
		var param = {};
		param.level = level;
		param.type = type;
		d = dialog({
            id: 'brand_choose_iframe',
            title: '选择品牌产地',
			url: '/category/select_category.html?level='+level,
            width:'670',
			height:'500',
			data:param,
            fixed:true,
			ok1:function(a)
			{
				var result=new Array();
				
				var categoryName = '';
				var categoryId = '';
				for(var i = 0 ; i < a.length ; i++)
				{
					categoryName += a[i].name + '  ';
					categoryId += a[i].id + '  ';
					
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
