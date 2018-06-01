package com.shop.service.impl;

import java.util.List;

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
	public List<User> listUser(String startTime, String endTime) {
		List<User> users = userMapper.listUser(startTime, endTime);
		return users;
	}

	@Override
	public Integer insertUser(User user) {
		Integer result = userMapper.insertUser(user);
		return result;
	}

	@Override
	public User getUserById(Integer id) {
		User user = userMapper.getUserById(id);
		return user;
	}

	@Override
	public User getUserByName(String name) {
		User user = userMapper.getUserByName(name);
		return user;
	}

	@Override
	public Integer updateUser(User user) {
		Integer result = userMapper.updateUser(user);
		return result;
	}
	
	
}
