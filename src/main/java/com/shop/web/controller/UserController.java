package com.shop.web.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shop.entity.User;
import com.shop.service.UserService;
import com.shop.utils.AdminUtils;

@Controller
@RequestMapping(value="/shop")
public class UserController {
	
	@Autowired
	private UserService userSerivce;
	
	@RequestMapping("/user")
	public ModelAndView userPage(){
		ModelAndView model = new ModelAndView("basic/item/user-list");
		return model;
	}
	
	@RequestMapping("/user/table")
	public ModelAndView userTable(HttpServletRequest request){
		List<User> userList = userSerivce.listUser(null, null);
		ModelAndView model = new ModelAndView("basic/item/user-list-table");
		model.addObject("userList", userList);
		return model;
	}
	
	@RequestMapping("/user/getUserById")
	@ResponseBody
	public User getUserById(Long id){
		
		return userSerivce.getUserById(id);
	}
	
	@RequestMapping("/user/insertUser")
	@ResponseBody
	public Integer insertUser(HttpServletRequest request, User user){
		user.setAdminId(AdminUtils.getCurrentAdmin(request).getId());
		user.setRestScore(0L);
		user.setCreateTime(new Date());
		Integer insertUser = userSerivce.insertUser(user);
		if(insertUser > 0){
			return 1;
		}
		return 0;
	}
	
	@RequestMapping("/user/updateUserById")
	@ResponseBody
	public Integer updateUserById(User user){
		
		return userSerivce.updateUser(user);
	}
	
	@RequestMapping("/user/deleteUserById")
	@ResponseBody
	public Integer deleteUserById(Long id){
		
		return userSerivce.deleteUser(id);
	}
	
}
