package com.shop.service.impl;

import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shop.entity.Order;
import com.shop.entity.request.RequestParam;
import com.shop.mapper.OrderMapper;
import com.shop.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderMapper mapper;

	@Override
	public PageInfo<Order> listOrder(RequestParam request) {
		int pageSize = request.getPageSize();;
		int currentPageNum = request.getPageNum();
		PageHelper.startPage(currentPageNum, pageSize, true);
		List<Order> orders = mapper.listOrder(request);
		return new PageInfo<Order>(orders);
	}

	@Override
	public Integer insertOrder(Order order) {
		return mapper.insertOrder(order);
	}

	@Override
	public Integer deleteOrder(Long id) {
		return mapper.deleteOrder(id);	
	}

	@Override
	public Order getOrderById(Long id) {
		return mapper.getOrderById(id);
	}

	@Override
	public Integer updateOrder(Order order) {
		return mapper.updateOrder(order);
	}

	@Override
	public JSONObject selectMonthTheSales(String type,String num) {
		String[] monthDate = getLast12Months(type);
		Arrays.sort(monthDate);
		List<Order> list = mapper.selectMonthTheSales(type);
		
		JSONObject obj = new JSONObject();
		JSONArray arrayX = new JSONArray();
		JSONArray arrayY = new JSONArray();
		JSONArray arrayZ = new JSONArray();
		Integer totalPrice = 0;
		Integer totalWeight = 0;
		for (String string : monthDate) {
			arrayX.add(string);
			boolean flag = true;
			for (Order order : list) {
				if((num+"-"+string).equals(order.getDate())){
					arrayY.add(order.getCountPrice());
					arrayZ.add(order.getCountWeight());
					totalPrice += Integer.parseInt(order.getCountPrice());
					totalWeight += order.getCountWeight();
					flag = false;
				}
			}
			if(flag){
				arrayY.add(0);
				arrayZ.add(0);
			}
		}
		arrayX.add("总计");
		arrayY.add(totalPrice);
		arrayZ.add(totalWeight);
		obj.put("arrayX", arrayX);
		obj.put("arrayY", arrayY);
		obj.put("arrayZ", arrayZ);
		return obj;
	}

	/** 
     * 获取最近12个月，经常用于统计图表的X轴 
     */  
    public static String[] getLast12Months(String type){  
    	String[] strArr = null;
    	switch (type) {
		case "month":
			strArr = new String[]{"01","02","03","04","05","06","07","08","09","10","11","12"};
			break;

		default:
			break;
		}
        return strArr; 
         
    }
    
    public static String formatT(Integer i){
    	if(i!=null && i.toString().length() == 1){
    		return "0"+i;
    	}else{
    		return i.toString();
    	}
    }
}
