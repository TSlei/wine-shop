package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
