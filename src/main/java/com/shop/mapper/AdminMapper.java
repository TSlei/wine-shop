package com.shop.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.shop.entity.Admin;

@Mapper
public interface AdminMapper {

	Admin login(@Param("name")String name,@Param("password")String password);
	
}