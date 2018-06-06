package com.shop.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.shop.entity.User;
import com.shop.entity.request.RequestParam;

@Mapper
public interface UserMapper {
	
	List<User> listUser(@Param("request")RequestParam requestParam);
	
	Integer insertUser(User user);
	
    User getUserById(Long id);
    
    User getUserByName(String name);
    
    Integer updateUser(User user);
    
    Integer deleteUser(@Param("id")Long id);
    
}
