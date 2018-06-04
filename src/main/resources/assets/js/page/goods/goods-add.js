
$(function(){
	$("#addItemForm").delegate("input[type=file]","change",uploadItemPic);
	$("#addItemForm").delegate(".imgArea","click",choosePic);
	$("#addItemForm").delegate(".glyphicon-remove","click",removePic);
	$("#categoryId").on("change",changeCategoryName);
	$("#brandId").on("change",changeBrandName);
	$("#tagId").on("change",changeTagName);
	$("#supplierCompanyId").on("change",changeSupplierName);
	$(".saveBtn").on("click",function(){addGoods(false)});
	$(".saveOnlineBtn").on("click",function(){addGoods(true)});
	$("#mpriceTemp").on("blur",function(){calculatePrice();});
	$("body").delegate(".skuCustomCode","blur",getRandomCode);
	$(".sizeArea").delegate(".checkMpriceTemp","blur",calculateCheckMPrice);
	$(".sizeArea").delegate(".checkNum","blur",checkInputNum);
	$(".sizeArea").delegate(".canDefault[type='radio']","click",changeCanDefault);
	$("#skuCustomCode").on("blur",getRandomCode);
	$(".canMutiParam").on("change",changeParam);
	$("body").delegate(".sizeArea input[type=checkbox]","click",changeParamValue);
	initFormValidation();
	initHtml();
	$("#tagId").on("click",function(){
		$("#treeContent").toggle();
	})
	
});
function changeCanDefault(){
	$(".sizeArea .canDefault").each(function(){
		$(this).parents("td").find(".canDefaultValue").val("0");
		$(this).prop("checked",false);
	});
	$(this).parents("td").find(".canDefaultValue").val("1");
	$(this).prop("checked",true);
	
	
}
function checkInputNum(e){
	var target = $(e.currentTarget);
	var v = $(this).val();
	var regexp=new RegExp(/^[1-9]*[1-9][0-9]*$/);
	if(!v){return;}
	if(!regexp.test(v)){
		$.err("库存格式错误");
		target.parent().addClass("has-error");
		return;	
	}else{
		target.parent().removeClass("has-error");
	}
}
function calculateCheckMPrice(e){
	var target = $(e.currentTarget);
	var parent=$(e.currentTarget).parents("tr");
	
	//var deliveryWay=$("input[name='deliveryWay']:checked").val();
	
	var importRate=$("#importRate").val();
	var consumptionRate=$("#consumptionRate").val();
	var vatRate=$("#vatRate").val();
	var totalRate=Number(importRate)+Number(consumptionRate)+Number(vatRate);

	
	var v = parent.find(".checkMpriceTemp").val();
	var r= new RegExp("\\d+(\\.\\d+)?$");
	if(!v){
		target.parents("tr").find(".checkMpriceTemp").parent().addClass("has-error");
		$.err("德国价格式错误");
		return;	
	}
	if(!v||!r.test(v)){
		parent.find(".checkMpriceTemp").parent().addClass("has-error");
		$.err("德国价格式错误");
		return;	
	}else{
		parent.find(".checkMpriceTemp").parent().removeClass("has-error");
	}
	parent.find(".checkMpriceTemp").siblings(".checkMprice").val(parseInt(Number(v)*100));
    
	var isDefault = parent.find(".canDefaultValue").val()==1;
	if(isDefault){
		$(".singleParam  #mprice").val(parseInt(Number(v)*100));
		$(".singleParam  #mpriceTemp").val(v);
	}
	
	
	
	var jsonData={
			mprice:v,
		    totalRate:totalRate
		};
		$.ajax({
			type : 'POST',
			url : "/goods/calculatePrice",
			data : jsonData,
			success : function(result) {
				target.parents("tr").find(".checkBuyPriceTemp").val(result.buyPrice);
				target.parents("tr").find(".checkBuyPrice").val(parseInt(Number(result.buyPrice)*100));
				target.parents("tr").find(".checkBuyPrice").attr("logisticsPriceTemp",result.logisticsPrice);
				target.parents("tr").find(".checkBuyPrice").attr("logisticsPrice",parseInt(Number(result.logisticsPrice)*100));
				$("#logisticsPriceTemp").val(result.logisticsPrice);
				$("#logisticsPrice").val(parseInt(Number(result.logisticsPrice)*100));
				
			}
		});
	
	
}
function calculatePrice(){
	if($(".canMutiParam:checked").val()==0){//单规规格
		loadSimplePrice();
	 }else{//多规格
			$(".sizeArea .sonnenjahrTable tr").each(function(e){
				var target = $(this);
				var mprice = target.find(".checkMpriceTemp").val();
				if(mprice){
					var importRate=$("#importRate").val();
					var consumptionRate=$("#consumptionRate").val();
					var vatRate=$("#vatRate").val();
					var totalRate=Number(importRate)+Number(consumptionRate)+Number(vatRate);
					loadMutiPrice(target,mprice,totalRate);
				}
			});
		 
	 }	
	}

function loadSimplePrice(){
	var v = $("#mpriceTemp").val();
	var r= new RegExp("\\d+(\\.\\d+)?$");
	if(!v){
		$.err("德国价不能为空");
		return;	
	}
	if(!v||!r.test(v)){
		$.err("德国价格式错误");
		return;	
	}
	$("#mprice").val(parseInt(Number(v)*100));
	
	
	var importRate=$("#importRate").val();
	var consumptionRate=$("#consumptionRate").val();
	var vatRate=$("#vatRate").val();
	var totalRate=Number(importRate)+Number(consumptionRate)+Number(vatRate);
 
	 
	if(!mprice){
		$.err("请填写德国价");
		target.val("获取价格");
		return;	
	} 
	var jsonData={
		mprice:v,
		totalRate:totalRate
	};
	$.ajax({
		type : 'POST',
		url : "/goods/calculatePrice",
		data : jsonData,
		success : function(result) {
			
			$("#buyPrice").val(parseInt(Number(result.buyPrice)*100));
			$("#buyPriceTemp").val(result.buyPrice);
			$("#logisticsPrice").val(parseInt(Number(result.logisticsPrice)*100));
			$("#logisticsPriceTemp").val(result.logisticsPrice);
			$('#addItemForm').data('bootstrapValidator').updateStatus("logisticsPriceTemp","VALID",null);
			$('#addItemForm').data('bootstrapValidator').updateStatus("buyPriceTemp","VALID",null);
		}
	});
	
	
}

function loadMutiPrice(target,v,totalRate){
	var jsonData={
			mprice:v,
			totalRate:totalRate
		};
		$.ajax({
			type : 'POST',
			url : "/goods/calculatePrice",
			data : jsonData,
			success : function(result) {
				target.find(".checkBuyPriceTemp").val(result.buyPrice);
				target.find(".checkBuyPrice").val(parseInt(Number(result.buyPrice)*100));
				$('#addItemForm').data('bootstrapValidator').updateStatus("logisticsPriceTemp","VALID",null);
				$('#addItemForm').data('bootstrapValidator').updateStatus("buyPriceTemp","VALID",null);
			}
		});
	
}

function changeParamValue(e){
	var result = getParamResult();
	console.log(result);
	var data=result.data;
	var status=result.status;
	var dataLength=data.length;
	if(status==true){
		if(dataLength==1){
			drawLevel1(data);
		}else if(dataLength==2){
			drawLevel2(data);
		}else if(dataLength==3){
			drawLevel3(data);
		}else if(dataLength==4){
			drawLevel4(data);
		}
		
	}else{
		$(".sizeArea table").html("");
	}
	
}
function drawLevel1(data){
	var firstGroup =data[0];
	var firstName=firstGroup.name;
	var firstData=firstGroup.value;
	var firstLength=firstData.length;
	var tableEL="<thead><tr><td class='group-title'>"+firstName+"</td><td>是否默认</td><td>德国价(€)</td><td>购买价(¥)</td><td>库存</td><td>SKU编码</td></tr>";
	for(var i=0;i<firstLength;i++){
		var trEL="<tr>";
		var paramObj = {
		};
		paramObj[firstName]=firstData[i];
		trEL+="<td>"+firstData[i]+"</td>"
		trEL+="<td><input type='hidden' class='form-control ruleName'  name='itemMutiParamList["+i+"].ruleName' value='"+JSON.stringify(paramObj)+"'>"+
			"<input type='hidden' name='itemMutiParamList["+i+"].canDefault'  value='0' class='canDefaultValue'><label class='radio-inline'><input type='radio' class='canDefault px' name='paramRadio' ><span class='text'>是</span></label></td>";
	   trEL+="<td><input type='text' class='form-control checkMpriceTemp'> <input type='hidden' class='form-control checkMprice' name='itemMutiParamList["+i+"].mPrice'></td>";
	   trEL+="<td><input type='text' class='form-control checkBuyPriceTemp' readonly><input type='hidden' class='checkBuyPrice'   name='itemMutiParamList["+i+"].buyPrice'></td>";
	   trEL+="<td><input type='text' class='form-control checkNum'  name='itemMutiParamList["+i+"].num'></td>";
	   trEL+="<td><div class='input-group'><input type='hidden' class='form-control skuCode'  name='itemMutiParamList["+i+"].skuCode'>" +
			"<input type='text' class='form-control skuCustomCode' ><span class='input-group-addon skuRandomCode'></span></div></td>";
		trEL+="</tr>";
		tableEL+=trEL;
	}
	$(".sizeArea table").html(tableEL);
}

function drawLevel2(data){
	var firstGroup =data[0];
	var firstName=firstGroup.name;
	var firstData=firstGroup.value;
	var firstLength=firstData.length;
	var secondGroup=data[1];
	var secondName=secondGroup.name;
	var secondData=secondGroup.value;
	var secondLength=secondData.length;
	
	var itemIndex=0;
	var tableEL="<thead><tr><td class='group-title'>"+firstName+"</td><td class='group-title'>"+secondName+"</td><td>是否默认</td><td>德国价(€)</td><td>购买价(¥)</td><td>库存</td><td>SKU编码</td></tr>";
	for(var i=0;i<firstLength;i++){
		
		for(var j=0;j<secondLength;j++){
			var trEL="<tr>";
			if(j==0){
				trEL+="<td rowspan='"+secondLength+"'>"+firstData[i]+"</td>";
			}
			var paramObj = {
			
			};
			paramObj[firstName]=firstData[i];
			paramObj[secondName]=secondData[j];
	
			trEL+="<td>"+secondData[j]+"</td>"
			trEL+="<td><input type='hidden' class='form-control ruleName'  name='itemMutiParamList["+itemIndex+"].ruleName' value='"+JSON.stringify(paramObj)+"'>"+
	 			"<input type='hidden' name='itemMutiParamList["+itemIndex+"].canDefault'  value='0' class='canDefaultValue'><label class='radio-inline'><input type='radio' class='canDefault px' name='paramRadio' ><span class='text'>是</span></label></td>";
			trEL+="<td><input type='text' class='form-control checkMpriceTemp'> <input type='hidden' class='form-control checkMprice' name='itemMutiParamList["+itemIndex+"].mPrice'></td>";
			trEL+="<td><input type='text' class='form-control checkBuyPriceTemp' readonly><input type='hidden' class='checkBuyPrice'   name='itemMutiParamList["+itemIndex+"].buyPrice'></td>";
			trEL+="<td><input type='text' class='form-control checkNum'  name='itemMutiParamList["+itemIndex+"].num'></td>";
			trEL+="<td><div class='input-group'><input type='hidden' class='form-control skuCode'  name='itemMutiParamList["+itemIndex+"].skuCode'>" +
					"<input type='text' class='form-control skuCustomCode' ><span class='input-group-addon skuRandomCode'></span></div></td>";
			trEL+="</tr>";
			tableEL+=trEL;
			itemIndex++;
		}
		
	}
	$(".sizeArea table").html(tableEL);
}

function drawLevel3(data){
	var firstGroup =data[0];
	var firstName=firstGroup.name;
	var firstData=firstGroup.value;
	var firstLength=firstData.length;
	
	var secondGroup=data[1];
	var secondName=secondGroup.name;
	var secondData=secondGroup.value;
	var secondLength=secondData.length;
	
	var thirdGroup=data[2];
	var thirdName=thirdGroup.name;
	var thirdData=thirdGroup.value;
	var thirdLength=thirdData.length;
	
	var itemIndex=0;
	var firstItemNum=thirdLength*secondLength;
	
	var tableEL="<thead><tr><td class='group-title'>"+firstName+"</td><td class='group-title'>"+secondName+"</td><td class='group-title'>"+thirdName+"</td><td>是否默认</td><td>德国价(€)</td><td>购买价(¥)</td><td>库存</td><td>SKU编码</td></tr>";
	for(var i=0;i<firstLength;i++){
		
		for(var j=0;j<secondLength;j++){
			
			for(var k=0;k<thirdLength;k++){
				
				var trEL="<tr>";
				if(k==0&&j==0){
					trEL+="<td rowspan='"+firstItemNum+"'>"+firstData[i]+"</td>";
				}
				if(k==0){
					trEL+="<td rowspan='"+thirdLength+"'>"+secondData[j]+"</td>";
				}
				var paramObj = {
						
				};
				paramObj[firstName]=firstData[i];
				paramObj[secondName]=secondData[j];
				paramObj[thirdName]=thirdData[k];
				trEL+="<td>"+thirdData[k]+"</td>";
				trEL+="<td><input type='hidden' class='form-control ruleName'  name='itemMutiParamList["+itemIndex+"].ruleName' value='"+JSON.stringify(paramObj)+"'>"+
	 			"<input type='hidden' name='itemMutiParamList["+itemIndex+"].canDefault'  value='0' class='canDefaultValue'><label class='radio-inline'><input type='radio' class='canDefault px' name='paramRadio' ><span class='text'>是</span></label></td>";
			    trEL+="<td><input type='text' class='form-control checkMpriceTemp'> <input type='hidden' class='form-control checkMprice' name='itemMutiParamList["+itemIndex+"].mPrice'></td>";
		    	trEL+="<td><input type='text' class='form-control checkBuyPriceTemp' readonly><input type='hidden' class='checkBuyPrice'   name='itemMutiParamList["+itemIndex+"].buyPrice'></td>";
			    trEL+="<td><input type='text' class='form-control checkNum'  name='itemMutiParamList["+itemIndex+"].num'></td>";
			    trEL+="<td><div class='input-group'><input type='hidden' class='form-control skuCode'  name='itemMutiParamList["+itemIndex+"].skuCode'>" +
					"<input type='text' class='form-control skuCustomCode' ><span class='input-group-addon skuRandomCode'></span></div></td>";
			    trEL+="</tr>";
			    tableEL+=trEL;
				itemIndex++;
				
			}
			
		}
		
	}
	$(".sizeArea table").html(tableEL);
}

function drawLevel4(data){
	var firstGroup =data[0];
	var firstName=firstGroup.name;
	var firstData=firstGroup.value;
	var firstLength=firstData.length;
	
	var secondGroup=data[1];
	var secondName=secondGroup.name;
	var secondData=secondGroup.value;
	var secondLength=secondData.length;
	
	var thirdGroup=data[2];
	var thirdName=thirdGroup.name;
	var thirdData=thirdGroup.value;
	var thirdLength=thirdData.length;
	
	var fourthGroup=data[3];
	var fourthName=fourthGroup.name;
	var fourthData=fourthGroup.value;
	var fourthLength=fourthData.length;
	
	var itemIndex=0;
	var firstItemNum=thirdLength*secondLength*fourthLength;
	var secondItemNum=thirdLength*fourthLength;
	
	var tableEL="<thead><tr><td class='group-title'>"+firstName+"</td><td class='group-title'>"+secondName+"</td><td class='group-title'>"+
	thirdName+"</td><td class='group-title'>"+fourthName+"</td><td>是否默认</td><td>德国价(€)</td><td>购买价(¥)</td><td>库存</td><td>SKU编码</td></tr>";
	
	for(var i=0;i<firstLength;i++){
		
		for(var j=0;j<secondLength;j++){
			
			for(var k=0;k<thirdLength;k++){
				
				for(var m=0;m<fourthLength;m++){
					var trEL="<tr>";
					if(k==0&&j==0&&m==0){
						trEL+="<td rowspan='"+firstItemNum+"'>"+firstData[i]+"</td>";
					}
					if(k==0&&m==0){
						trEL+="<td rowspan='"+secondItemNum+"'>"+secondData[j]+"</td>";
					}
					
					if(m==0){
						trEL+="<td rowspan='"+fourthLength+"'>"+thirdData[k]+"</td>";
					}
					
					trEL+="<td>"+fourthData[m]+"</td>";
					
					var paramObj = {
							
					};
					paramObj[firstName]=firstData[i];
					paramObj[secondName]=secondData[j];
					paramObj[thirdName]=thirdData[k];
					paramObj[fourthName]=fourthData[m];
					
					trEL+="<td><input type='hidden' class='form-control ruleName'  name='itemMutiParamList["+itemIndex+"].ruleName' value='"+JSON.stringify(paramObj)+"'>"+
		 			"<input type='hidden' name='itemMutiParamList["+itemIndex+"].canDefault'  value='0' class='canDefaultValue'><label class='radio-inline'><input type='radio' class='canDefault px' name='paramRadio' ><span class='text'>是</span></label></td>";
				    trEL+="<td><input type='text' class='form-control checkMpriceTemp'> <input type='hidden' class='form-control checkMprice' name='itemMutiParamList["+itemIndex+"].mPrice'></td>";
			    	trEL+="<td><input type='text' class='form-control checkBuyPriceTemp' readonly><input type='hidden' class='checkBuyPrice'   name='itemMutiParamList["+itemIndex+"].buyPrice'></td>";
				    trEL+="<td><input type='text' class='form-control checkNum'  name='itemMutiParamList["+itemIndex+"].num'></td>";
				    trEL+="<td><div class='input-group'><input type='hidden' class='form-control skuCode'  name='itemMutiParamList["+itemIndex+"].skuCode'>" +
						"<input type='text' class='form-control skuCustomCode' ><span class='input-group-addon skuRandomCode'></span></div></td>";
				    trEL+="</tr>";
				    tableEL+=trEL;
					itemIndex++;
					
			}
		  }	
		}
		
	}
	$(".sizeArea table").html(tableEL);
}
var globalParam=null;
function getParamResult(){
	var result = new Object();
	var data=[];
	result.data=data;
	var groupNum = $(".sizeArea .paramGroup").length;
	globalParam=new Object();
	$(".sizeArea .paramGroup").each(function(event){
		var groupValue =$(this).attr("data");
		var paramValue=[];
		$(this).find("input[type=checkbox]:checked").each(function(e){
			var v=$(this).val();
			paramValue.push(v);
		});
		if(paramValue.length>0){
			var groupObj=new Object();
			groupObj.name=groupValue;
			groupObj.value=paramValue;
			data.push(groupObj);
			globalParam[groupValue]=paramValue;
		}
		
	});
	if(data.length==groupNum){
		result.status=true;
	}else{
		result.status=false;
	}
	return result;
}
function changeParam(e){
	var v = $(this).val();
	if(v==0){
		$(".singleParam").show();
		$(".multipleParam").hide();
	}else{
		$(".singleParam").hide();
		$(".multipleParam").show();
	}
	
}
function getRandomCode(e){
	var target=$(e.currentTarget);
	var skuCustomCode=target.val();
	var skuRandomCode=target.siblings(".skuRandomCode").html();
	if(skuRandomCode){
		target.siblings(".skuCode").val(skuCustomCode+skuRandomCode);
		return;
	}
	if(skuCustomCode){
		target.parents("tr").addClass("hasValue");
		var jsonData={
			skuCode:skuCustomCode
		};
		$.ajax({
			type : 'POST',
			url : "/goods/getSkuRandomCode",
			data : jsonData,
			success : function(result) {
				target.siblings(".skuCode").val(skuCustomCode+result);
				target.siblings(".skuRandomCode").html(result);
				}
		});
	}
	
	
}


function changeTagSelect(e){
	return ;
}
function initHtml(){

	 $("input[name='deliveryWay']").on("change",function(){
		 var v=$(this).val();
		 if(v==1){
			 $(".row.bscRow").removeClass("hidden");
			 calculatePrice();
		 }else{
			 $(".row.bscRow").addClass("hidden");
			 $("#logisticsPrice").val(0);
			 $(".bscRow .form-group input[type=text]").each(function(){
				$(this).val(""); 
			 });
		 }
	 }) ;
		   $('#gitemDesc').summernote({
	        height: 200,
			lang:'de-DE',
		    toolbar: [
	            ['style', ['style']],
	            ['font', ['bold', 'underline', 'clear']],
	            ['fontname', ['fontname']],
	            ['color', ['color']],
	            ['para', ['ul', 'ol', 'paragraph']],
	            ['table', ['table']],
	            ['view', ['fullscreen', 'codeview', 'help']]
	         ],
			  callbacks: {
				  onChange: function(contents, $editable) {
			 $("#gitemDesc").html(contents);
	         }
			}
	      });
		  $("#citemDesc").summernote({
	        height: 200,
			lang:'zh-CN',
			 toolbar: [
	        ['style', ['style']],
	        ['font', ['bold', 'underline', 'clear']],
	        ['fontname', ['fontname']],
	        ['color', ['color']],
	        ['para', ['ul', 'ol', 'paragraph']],
	        ['table', ['table']],
	        ['view', ['fullscreen', 'codeview', 'help']]
	      ],
		   callbacks: {
			   onChange: function(contents, $editable) {
			  $("#citemDesc").html(contents);
	         }
		   }	 
	      });
	
	
}
function checkInputValue(){
	  var isActive=true;
	  $('#addItemForm').data('bootstrapValidator').validate();
	  isActive=$("#addItemForm").data('bootstrapValidator').isValid();
	  var imgNum=$(".displayArea .imgArea").length;
	  if(imgNum==0){
		  $(".noPicError").show();
		  $(".noPicError").parents(".form-group").addClass("has-error");
		  isActive=false;
	  }else{
		  $(".noPicError").hide();
		  $(".noPicError").parents(".form-group").removeClass("has-error");
		 var activeNum=$(".displayArea .imgArea.selected").length;
		 if(activeNum==0){
			  $(".noDefaultPicError").show();
			  $(".noDefaultPicError").parents(".form-group").addClass("has-error");
			 isActive=false;
		 }else{
			  $(".noDefaultPicError").hide();
			  $(".noDefaultPicError").parents(".form-group").removeClass("has-error");
		 }
		  
	  }
	  return isActive;
} 
function addGoods(isOnline){
	var isActive=checkInputValue();
	if(!isActive) return;
	
	if($(".canMutiParam:checked").val()==1){//多规格
		var trTarget = $(".sizeArea .canDefault:checked").parents("tr");
		$(".singleParam #mprice").val(trTarget.find(".checkMprice").val());
		$(".singleParam #buyPrice").val(trTarget.find(".checkBuyPrice").val());
		$(".singleParam #num").val(trTarget.find(".checkNum").val());
		$("#logisticsPrice").val(trTarget.find(".checkBuyPrice").attr("logisticsPrice"));
		$("#logisticsPriceTemp").val(trTarget.find(".checkBuyPrice").attr("logisticsPriceTemp"));
		$(".singleParam .skuCode").val(trTarget.find(".skuCode").val());
		$(".singleParam .skuCustomCode").val(trTarget.find(".skuCustomCode").val());
		$(".singleParam .skuRandomCode").html(trTarget.find(".skuRandomCode").html());	
	}
	changePicIndex();
	var jsonData=$("#addItemForm").serialize();
	if(isOnline){
		jsonData+="&status=0";
	}else{
		jsonData+="&status=1";
	}
	var paramData=loadGoodsParameter();
	if(!$.isEmptyObject(globalParam)){
		jsonData+="&paramData="+JSON.stringify(globalParam);
	}
	
	var categoryArray = $('#categoryTree').jstree().get_checked(true);
	if(categoryArray.length==0){
		$.err("请选择商品标签");
		return;
	}else{
		var index=0;
		for(var i=0;i<categoryArray.length;i++){
			var obj=categoryArray[i];
			console.log(obj);
			if(obj.children.length>0||obj.id.length==5){
				continue;
			}
			var id=obj.data.id;
			var type=obj.data.type;
			var text=obj.text;
			var parentCode=obj.parent;
			jsonData+="&itemTagList["+index+"].tagId="+id+"&itemTagList["+index+"].tagName="+text
			+"&itemTagList["+index+"].parentCode="+parentCode+"&itemTagList["+index+"].type="+type;
			index++;
		}
	 }
	
	console.log(jsonData);
	$.ajax({
		type : 'POST',
		url : "/goods/add",
		data : jsonData,
		success : function(result) {
			if(result.status=="ok"){
				$.msg(saveSuccTips);
				setTimeout(function(){window.location.href="/goods/list";},1000);
			}else{
			   $.err(saveFailedTips);
			}
		}
	});
	
	
}
function changeBrandName(e){
	var text=$("#brandId").find("option:selected").text();
	$("#brandName").val(text);
}

function changeSupplierName(e){
	var text=$("#supplierCompanyId").find("option:selected").text();
	$("#supplierCompanyName").val(text);
}
function changeTagName(e){
	var text=$("#tagId").find("option:selected").text();
	$("#tagName").val(text);
}
function changeCategoryName(e){
	var target = $(e.currentTarget);
	var v = target.val();
	var text=$("#categoryId").find("option:selected").text();
	var code=$("#categoryId").find("option:selected").attr("data");
	var parentCategoryId=$("#categoryId").find("option:selected").parents("optgroup").attr("id");
	if(v==""){
		$(".sizeArea").html("");
	}else{
		$("#categoryName").val(text);
		$("#categoryCode").val(code);
		$("#parentCategoryId").val(parentCategoryId);
		var jsonData={
			categoryId:v	
		};
		$.ajax({
			type : 'POST',
			url : "/parameter/select",
			data : jsonData,
			success : function(result) {
			  $(".sizeArea").html(result);
			}
		});
	}
	var categoryCode = $("#categoryId").find("option:selected").attr("parentCode");
	reloadBrand(categoryCode);
	reloadTag(categoryCode);
}
function reloadTag(categoryCode){
	$("#tagId").val("");
	var jsonData={
			categoryCode:categoryCode	
		};
		$.ajax({
			type : 'POST',
			url : "/tags/loadTagByCategory",
			data : jsonData,
			success : function(result) {
				console.log(result);
				$.jstree.defaults.checkbox.three_state=true;
				$.jstree.defaults.checkbox.tie_selection=false;
				$.jstree.destroy ();
				$('#categoryTree').jstree({
										'core' : {
											'data' : result,
											'check_callback':true,
											'multiple': true
										},
										"plugins" : ["checkbox"]
				});
				$("#categoryTree").on("check_node.jstree", function (e, data) {
					changeTagContent();
					});
				$("#categoryTree").on("uncheck_node.jstree", function (e, data) {
					changeTagContent();
					});
			
				 
			}
		});
}
function changeTagContent(){
	var categoryArray = $('#categoryTree').jstree().get_checked(true);
	var labelEl="";
	for(var i=0;i<categoryArray.length;i++){
		var obj=categoryArray[i];
		if(obj.children.length>0||obj.id.length==5){
			continue;
		}
		if(labelEl==''){
			labelEl+=obj.text;
		}else{
			labelEl+="、"+obj.text;
		}
	}
	$("#tagId").val(labelEl);
	
}
function reloadBrand(categoryCode){
	var jsonData={
			categoryCode:categoryCode	
		};
		$.ajax({
			type : 'POST',
			url : "/brands/loadBrandByCategory",
			data : jsonData,
			success : function(result) {
				$("#brandId").html(result);
			}
		});
}
function removePic(e){
	e.stopPropagation();
	var target = $(e.currentTarget).parents(".imgArea");
	target.remove();
}
function choosePic(e){
	var target = $(e.currentTarget);
	$(".imgArea").each(function(){
		$(this).removeClass("selected");
		$(this).find(".canDefault").val(0);
	});
	target.addClass("selected");
	target.find(".canDefault").val(1);
	$(".noPicError").hide();
	$(".noDefaultPicError").hide();
}
function  uploadItemPic(e){
	var targetFile = $(e.currentTarget);
	  $.ajaxFileUpload({  
	        url:'/goods/pic/upload',  
	        secureuri:false,  
	        fileElementId:"originalUpload",//file标签的id  
	        dataType: 'json',//返回数据的类型  
	        data:null,//一同上传的数据  
	        success: function (result) {
	        	console.log(result);
	        	if(result.status=="ok"){
	        		var fileId=result.fileId;
	        		var fileName=result.fileName;
	        		var target = $("#imgBak .imgArea").clone();
	        		$(".displayArea").append(target);
	        		target.find(".name").val(fileName);
	        		target.find(".imagePath").val(fileId);
	        		target.find("img").attr("src",imgUrl+"/"+fileId);
	        		$(".displayArea").append(target);
	        		$(".noPicError").hide();
	        		$(".noDefaultPicError").hide();
	        	}else{
	        		$.err("图片上传失败");
	        	}
	        	targetFile.val("");
	          }
	  });
	  
  }

function changePicIndex(){
	  $(".displayArea .imgArea").each(function(i){
			var target =$(this);
			target.find("input[type='hidden']").each(function(e){
				var hiddenName=$(this).attr("name").replace(/[+\d+]/,i);
				$(this).attr("name",hiddenName)
			});
		});
}

function loadGoodsParameter(){
	var resultObj=new Object();
	$(".radioArea input[type='radio']:checked").each(function(e){
		var value =$(this).val();
		var name=$(this).attr("group");
		resultObj[name]=value;
	});
	return resultObj;
}
