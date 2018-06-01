package com.shop.mapper;

import org.apache.ibatis.annotations.Param;

import com.shop.entity.User;


public interface UserMapper {

	User login(@Param("name")String name,@Param("passWord")String passWord);
	
}