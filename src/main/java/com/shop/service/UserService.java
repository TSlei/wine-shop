package com.shop.service;

import java.util.List;

import com.shop.entity.User;

public interface UserService {
	
	List<User> listUser(String startTime, String endTime);
	
	Integer insertUser(User user);
	
    User getUserById(Long id);
    
    User getUserByName(String name);
    
    Integer updateUser(User user);
    
    Integer deleteUser(Long id);
    
}
