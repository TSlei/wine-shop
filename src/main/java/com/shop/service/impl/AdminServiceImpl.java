package com.shop.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entity.Admin;
import com.shop.mapper.AdminMapper;
import com.shop.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired 
	private AdminMapper adminMapper;
	
	@Override
	public Admin login(String name, String passWord) {
		return adminMapper.login(name, passWord);
	}
	
}
