package com.shop.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shop.entity.User;
import com.shop.service.UserService;

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
		request.setAttribute("userList", userList);
		ModelAndView model = new ModelAndView("basic/item/user-list-table");
		return model;
	}
	
	@RequestMapping("/getUserById")
	@ResponseBody
	public User userList(Integer id){
		
		return userSerivce.getUserById(id);
	}
	
	@RequestMapping("/insertUser")
	@ResponseBody
	public Integer insertUser(User user){
		Integer insertUser = userSerivce.insertUser(user);
		if(insertUser > 0){
			return 1;
		}
		return 0;
	}
	
	
	
}
