package com.shop.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

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
	public ModelAndView userTable(){
//		userSerivce.l
		ModelAndView model = new ModelAndView("basic/item/user-list-table");
		return model;
	}
	
	
	
}
