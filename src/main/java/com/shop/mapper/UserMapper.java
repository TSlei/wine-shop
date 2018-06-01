package com.shop.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shop.entity.User;

@Mapper
public interface UserMapper {
	
	List<User> listUser(String startTime, String endTime);
	
	Integer insertUser(User user);
	
    User getUserById(Integer id);
    
    User getUserByName(String name);
    
    Integer updateUser(User user);
    
}
