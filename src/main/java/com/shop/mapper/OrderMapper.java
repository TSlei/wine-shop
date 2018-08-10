package com.shop.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.shop.entity.Order;
import com.shop.entity.request.RequestParam;

@Mapper
public interface OrderMapper {

    int insertOrder(Order record);

    List<Order> listOrder(RequestParam request);
    
    Integer deleteOrder(@Param("id")Long id);
    
    Order getOrderById(@Param("id")Long id);
    
    Integer updateOrder(Order order);
    
    List<Order> selectMonthTheSales(@Param("dateType")String dateType);
}