package com.shop.service;

import com.github.pagehelper.PageInfo;
import com.shop.entity.User;
import com.shop.entity.request.RequestParam;

public interface UserService {
	
	PageInfo<User> listUser(RequestParam request);
	
	Integer insertUser(User user);
	
    User getUserById(Long id);
    
    User getUserByName(String name);
    
    Integer updateUser(User user);
    
    Integer deleteUser(Long id);
    
}
