/**
 * 检查是否输入数据
 */	
function checkInputByNull(id, message) {

	if(document.getElementById(id).value == "" || document.getElementById(id).value == null){
		document.getElementById(id).focus();	
		throw new Error(message);
	}
}

/**
 * 检查输入两个数据是否一致
 */	
function checkInputByUnequalValue(id1, id2, message) {

	if(document.getElementById(id1).value != document.getElementById(id2).value){	
		document.getElementById(id2).focus();
		throw new Error(message);
	}
}

/**
 * 设置字符串的trim函数
 */	
String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 检查是否输入数据并提示消息
 */	
function alertInputByNull(id, message) {

	if(document.getElementById(id).value == "" || document.getElementById(id).value == null){
		alert(message);
		document.getElementById(id).focus();	
		return false;
	}
	return true;
}

/**
 * 检查输入两个数据是否一致并提示消息
 */	
function alertInputByUnequalValue(id1, id2, message) {

	if(document.getElementById(id1).value != document.getElementById(id2).value){	
		alert(message);
		document.getElementById(id2).focus();
		return false;
	}
	return true;
}

/*
 * 是否包含中文
 */	
function checkChinese(str){

	if (escape(str).indexOf("%u")!=-1){
		 return true;
	} 
	
	return false;  
}

/*
 * 按回车键提交表单
 */
function keypress(form0){

	if(event.keyCode==13||event.keyCode==42)
	{
		checkAndSubmit();
	}
}

/*
 * 判断正整数
 */
function checkRate(input){

    var re =  /^[1-9]+[0-9]*]*$/; //判断正整数    /^[0-9]+.?[0-9]*$/;  判断字符串是否为数字
         
     if (!re.test(input)){
     
        return true;
     }
} 

/*
 *  反选
 */
function revCheck(form)
{ 
	for (var i=0;i<form.elements.length;i++) 
	{ 
		var e=form.elements[i]; 
		if (e.type=='checkbox') 
		e.checked=!e.checked; 
	} 
}


/*
 * 检查是否选中记录，如果没选中，给于提示，如果选中，返回拼装好的id
 */   
function checkSelect(checkName){

	var checkArray = document.getElementsByName(checkName);
	var JID = null;
	var j = 0;
	
	//判断多条记录
	for (var i=0;i<checkArray.length;i++){
	
		if (checkArray[i].checked == true){
			   j = j +1;
			   
			   if(j == 1){
			     JID = checkArray[i].value;
			   } else {
			     JID = JID + ';' + checkArray[i].value;
			     }	 
		  }
	}	
	
	if(i == 0)	  //判断一条记录
	  {
	     if (checkArray.checked == true)
		 {
		    JID =  checkArray.value;
			j = 1;
		 }
		 else
		 {
		
		   return null;
		 }		    
	  }	 
	
	if( j >= 1 )
	{ 
		return JID;	
	}
	else
	{
		
		return null;
	}
}
	
	