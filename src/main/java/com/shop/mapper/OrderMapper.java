package com.shop.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.shop.entity.Order;

@Mapper
public interface OrderMapper {

    int insertOrder(Order record);

    List<Order> listOrder(@Param("startTime")String startTime, @Param("endTime")String endTime);
    
    Integer deleteOrder(@Param("id")Integer id);
    
    Order getOrderById(@Param("id")Integer id);
    
    Integer updateOrder(Order order);
    
}