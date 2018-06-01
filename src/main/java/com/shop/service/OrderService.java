package com.shop.service;

import java.util.List;

import com.shop.entity.Order;

public interface OrderService {
	
	List<Order> listOrder(String startTime, String endTime);
	
	Integer insertOrder(Order order);
	
    Integer deleteOrder(Integer orderId);
    
    Order getOrderById(Integer orderId);
    
    Integer updateOrder(Order order);
    
}
