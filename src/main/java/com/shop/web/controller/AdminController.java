package com.shop.web.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.shop.entity.Admin;
import com.shop.service.AdminService;
import com.shop.utils.AdminUtils;
import com.shop.utils.CookieUtil;

@Controller
@RequestMapping(value="/shop")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@RequestMapping("/index")
	public ModelAndView loginPage(){
		ModelAndView model = new ModelAndView("basic/item/login");
		return model;
	}
	
	@RequestMapping("/login")
	@ResponseBody
	public Integer login(HttpServletRequest request, HttpServletResponse response, String name, String password){
//		Admin admin = adminService.login(name, password);
		Admin admin = new Admin(name, password);
		if(admin != null){
			String uuid = UUID.randomUUID().toString();
			CookieUtil.addCookie(response, CookieUtil.LOGIN_COOKIE_KEY, uuid, 30000);
			request.getSession().setAttribute(uuid, admin);
			return 1;
		}
		return 0;
	}
	
	@RequestMapping("/logout")
	@ResponseBody
	public ModelAndView logout(HttpServletRequest request, HttpServletResponse response){
		ModelAndView model = new ModelAndView("/basic/item/login");
		CookieUtil.removeCookie(response, CookieUtil.LOGIN_COOKIE_KEY);
		request.getSession().invalidate();
		return model;
	}
	
	@RequestMapping("/getAllDate")
	@ResponseBody
	public JSONObject getAllDate(Integer yearNum){
//		JSONObject selectMonthTheSales = orderService.selectMonthTheSales(yearNum);
		JSONObject selectMonthTheSales = null;
		return selectMonthTheSales;
	}
}
