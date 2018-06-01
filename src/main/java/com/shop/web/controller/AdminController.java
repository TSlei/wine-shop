package com.shop.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shop.entity.Admin;
import com.shop.service.AdminService;

@Controller
@RequestMapping(value="/shop")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@RequestMapping("/index")
	public ModelAndView loginPage(){
		ModelAndView model = new ModelAndView("/basic/item/login");
		return model;
	}
	
	@RequestMapping("/login")
	@ResponseBody
	public Integer login(HttpServletRequest request,String name,String passWord){
		Admin admin = adminService.login(name, passWord);
		if(admin != null){
			request.getSession().setAttribute("LOGIN_USER", admin);
			return 1;
		}
		return 0;
	}
	@RequestMapping("/logout")
	@ResponseBody
	public ModelAndView logout(HttpServletRequest request){
		ModelAndView model = new ModelAndView("/basic/item/login");
		request.getSession().invalidate();
		return model;
	}
	
}
