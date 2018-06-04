function MyNumber(){
	
}

//除法函数，用来得到精确的除法结果 
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。 
//调用：accDiv(arg1,arg2) 
//返回值：arg1除以arg2的精确结果 
function accDiv(arg1,arg2){ 
  var t1=0,t2=0,r1,r2; 
  try{t1=arg1.toString().split(".")[1].length;}catch(e){} ;
  try{t2=arg2.toString().split(".")[1].length;}catch(e){} ;
  with(Math){ 
      r1=Number(arg1.toString().replace(".","")) ;
      r2=Number(arg2.toString().replace(".","")) ;
      return (r1/r2)*pow(10,t2-t1); 
  } 
} 

//除法
MyNumber.div=function(arg1,arg2){
	return accDiv(arg1,arg2);
};

//乘法函数，用来得到精确的乘法结果 
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。 
//调用：accMul(arg1,arg2) 
//返回值：arg1乘以arg2的精确结果 
function accMul(arg1,arg2) 
{ 
  var m = 0,s1 = (new Number(arg1)).toString(),s2 = (new Number(arg2)).toString();   
  try{m+=s1.split(".")[1].length;}catch(e){} ;
  try{m+=s2.split(".")[1].length;}catch(e){} ;
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) ;
} 

//乘法
MyNumber.mul = function (arg1,arg2){ 
  return accMul(arg1, arg2); 
}; 

//乘法函数，用来得到精确的乘法结果 
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。 
//调用：accMul(arg1,arg2) 
//返回值：arg1乘以arg2的精确结果 
function accMul2(arg1,arg2,arg3) 
{ 
var m = 0,s1 = (new Number(arg1)).toString(),s2 = (new Number(arg2)).toString(),s3=(new Number(arg3)).toString(); 
try{m+=s1.split(".")[1].length;}catch(e){} ;
try{m+=s2.split(".")[1].length;}catch(e){} ;
try{m+=s3.split(".")[1].length;}catch(e){} ;
return Number(s1.replace(".",""))*Number(s2.replace(".",""))*Number(s3.replace(".",""))/Math.pow(10,m) ;
} 

//浮点数乘法，第三个参数可确定保留几位小数
MyNumber.mul2 = function (arg1,arg2,arg3){ 
return accMul2(arg1, arg2,arg3); 
}; 

//多个数据相乘
function accMuls(args)
{
	var m=0;
	var s='';
	var data=1;
	for (var i=0;i<args.length;i++)
	{
		s=args[i].toString();
		try{m+=s.split(".")[1].length;}catch(e){} ;
		data = data*Number(s.replace(".",""));
	}
	
	return data/Math.pow(10, m);
}

//多数乘法
MyNumber.muls = function (args){ 
	  return accMuls(args); 
}; 
	
//加法函数，用来得到精确的加法结果 
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
//调用：accAdd(arg1,arg2) 
//返回值：arg1加上arg2的精确结果 
function accAdd(arg1,arg2){ 
  var r1,r2,m,r3,r4,precision; 
  try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}; 
  try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;} ;
  m=Math.pow(10,Math.max(r1,r2)) ;
  precision=Math.max(r1,r2);
  r3=(arg1*m+arg2*m)/m ;
  r4=r3.toFixed(precision);
  return r4;
} 

//加法 	  第三个参数可确定保留几位小数
MyNumber.add = function (arg1,arg2,precision){
	arg1 = parseFloat(arg1).toFixed(4);
	arg2 = parseFloat(arg2).toFixed(4);
  return accAdd(accPrecision(arg1,precision),accPrecision(arg2,precision)); 
}; 


//减法函数，用来得到精确的加法结果 
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
//调用：accAdd(arg1,arg2) 
//返回值：arg1加上arg2的精确结果 
function accMinus(arg1,arg2){ 
	var r1,r2,m,r3,precision,r4,r5; 
	r3=accMul(-1,arg2);
	try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}; 
	try{r2=r3.toString().split(".")[1].length;}catch(e){r2=0;} ;
	//m=Math.pow(10,Math.max(r1,r2)) ;
	m=Math.pow(10,Math.max(r1,r2));
	precision=Math.max(r1,r2);
	r4=(arg1*m+r3*m)/m;
	r5=r4.toFixed(precision);
	return r5;
}

//减法 	第三个参数可确定保留几位小数
MyNumber.minus = function (arg1,arg2,precision){ 
	arg1 = parseFloat(arg1).toFixed(4);
	arg2 = parseFloat(arg2).toFixed(4);
  return accMinus(accPrecision(arg1,precision),accPrecision(arg2,precision)); 
}; 

//需要四舍五入保留精度
function accPrecision(arg1,precision){
	//return arg1.toFixed(precision);
	var r;
	r=Math.round(accMul(arg1,Math.pow(10, precision)))/Math.pow(10, precision);
	
	return r.toFixed(precision);
}

MyNumber.precision=function(arg1,precision){
	return accPrecision(parseFloat(arg1),precision);
};

MyNumber.precision2=function(arg1,precision){
	return accPrecision2(parseFloat(arg1),precision);
};

//不要四舍五入
function accPrecision2(arg1,precision){
	//return arg1.toFixed(precision);
	var r;
	r=Math.floor(accMul(arg1,Math.pow(10, precision)))/Math.pow(10, precision);
	
	return r.toFixed(precision);
}