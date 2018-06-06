package com.shop.service;

import java.util.List;

import com.shop.entity.User;
import com.shop.entity.request.RequestParam;

public interface UserService {
	
	List<User> listUser(RequestParam request);
	
	Integer insertUser(User user);
	
    User getUserById(Long id);
    
    User getUserByName(String name);
    
    Integer updateUser(User user);
    
    Integer deleteUser(Long id);
    
}
