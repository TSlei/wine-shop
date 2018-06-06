package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entity.Order;
import com.shop.mapper.OrderMapper;
import com.shop.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private OrderMapper mapper;

	@Override
	public List<Order> listOrder(String startTime, String endTime) {
		return mapper.listOrder(startTime, endTime);
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

}
