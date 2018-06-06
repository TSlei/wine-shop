package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shop.entity.User;
import com.shop.entity.request.RequestParam;
import com.shop.mapper.UserMapper;
import com.shop.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired 
	private UserMapper userMapper;

	@Override
	public PageInfo<User> listUser(RequestParam request) {
		int pageSize = request.getPageSize();;
		int currentPageNum = request.getPageNum();
		PageHelper.startPage(currentPageNum, pageSize, true);
		List<User> users = userMapper.listUser(request);
		return new PageInfo<User>(users);
	}

	@Override
	public Integer insertUser(User user) {

		Integer result = userMapper.insertUser(user);
		return result;
	}

	@Override
	public User getUserById(Long id) {
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

	@Override
	public Integer deleteUser(Long id) {
		return userMapper.deleteUser(id);
	}
	
	
}
