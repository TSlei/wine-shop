package com.shop.tools;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class VelocityTool {
	public static final BigDecimal HUNDRED = new BigDecimal(100);
	public static String getTime(Long time){
		if(time==null){
			return "";
		}
		DateTime dt=new DateTime(time);
		return dt.toString("yyyy-MM-dd HH:ss:mm");
	}
	public static String replaceAreas(String areas){
		if(StringUtils.isBlank(areas)){
			return null;
		}
		return areas.replace("/", ",");
	}
	public static List<String> getAreas(String areas){
		if(StringUtils.isBlank(areas)){
			return null;
		}
		return Arrays.asList(areas.split("/"));
	}

	 public static String divideThousand(Object num){
		 if (num != null) {
	            DecimalFormat df = new DecimalFormat("##0.00");
	            double d = new BigDecimal(num.toString()).divide(new BigDecimal(1000)).doubleValue();
	            return df.format(d);
	        }
	        return "0.00";
	 }
	
	public static JSONArray formatParamData(String paramData){
		if("".equals(paramData)){
			return null;
		}
		JSONArray resultArray = new JSONArray();
		JSONObject data = JSONObject.parseObject(paramData);
		 Set<String> keySet = data.keySet();
		 for(String key : keySet){
			 String value=data.getString(key);
			 JSONObject obj = new JSONObject();
			 obj.put("name", key);
			 obj.put("value", value);
			 resultArray.add(obj);
		 }
		 return resultArray;
	} 
	
	 public static String formatMoney(Object money) {
	        if (money != null) {
	            DecimalFormat df = new DecimalFormat("##0.00");
	            double d = new BigDecimal(money.toString()).divide(HUNDRED).doubleValue();
	            return df.format(d);
	        }
	        return "0.00";
	    }
	 public static String getWeightVolumeRate(int weight,int volume){
		 if(weight==0||volume==0){
			 return "0.00";
		 }
		 DecimalFormat df = new DecimalFormat("##0.00");
		 double result =(double)(weight)/((double)(volume)*166.5);
		 return df.format(result);
	 }
	 public static String getDivisionValue(int a,int b){
		 if(a==0){
			 return "0";
		 }
		 if(b==0){
			 return "--";
		 }
		 DecimalFormat df = new DecimalFormat("##0.00");
		 double d = (double)a/(double)b;
         //double d = new BigDecimal(a).divide(new BigDecimal(b)).doubleValue();
         return df.format(d);
	 }
	 public static String getCurrentDateStr(){
			DateTime currentDate = new DateTime(System.currentTimeMillis());
			return currentDate.toString("yyyyMMddHH");
		}
	 
	 
	 /** 
	     * 获取最近12个月，经常用于统计图表的X轴 
	     */  
	    public static String[] getLast12Months(Integer yearNum){  
	    	String[] last12Months = new String[12];  
	        if(yearNum == null){
		        Calendar a=Calendar.getInstance();
		        int j = a.get(Calendar.YEAR);
		        for(int i=0; i<12; i++){  
		        	last12Months[i] = j+""+ formatT((i + 1));
		        }  
	        }else{
		        for(int i=0; i<12; i++){  
		        	last12Months[i] = yearNum+""+ formatT((i + 1));
		        }
	        }
	        return last12Months; 
	         
	    } 
	    
	    public static String formatT(Integer i){
	    	if(i!=null && i.toString().length() == 1){
	    		return "0"+i;
	    	}else{
	    		return i.toString();
	    	}
	    }
}
