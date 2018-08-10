package com.shop.service;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.shop.entity.Order;
import com.shop.entity.request.RequestParam;

public interface OrderService {
	
	PageInfo<Order> listOrder(RequestParam request);
	
	Integer insertOrder(Order order);
	
    Integer deleteOrder(Long orderId);
    
    Order getOrderById(Long orderId);
    
    Integer updateOrder(Order order);
    
    JSONObject selectMonthTheSales(String type,String num);
    
}
