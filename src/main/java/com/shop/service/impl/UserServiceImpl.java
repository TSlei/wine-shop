package com.shop.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entity.User;
import com.shop.mapper.UserMapper;
import com.shop.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired 
	private UserMapper userMapper;
	@Override
	public User login(String name, String passWord) {
		return userMapper.login(name, passWord);
	}
	
}
