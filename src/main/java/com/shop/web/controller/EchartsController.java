package com.shop.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.shop.service.OrderService;

@Controller
@RequestMapping(value="/shop")
public class EchartsController {
	
	@Autowired
	private OrderService orderService;
	@RequestMapping("/echarts")
	public ModelAndView loginPage(){
		ModelAndView model = new ModelAndView("basic/echarts/echarts-page");
		return model;
	}
	
	
	@RequestMapping("/echarts/getAllDate")
	@ResponseBody
	public JSONObject getAllDate(String type,String num){
		JSONObject selectMonthTheSales = orderService.selectMonthTheSales(type, num);
		return selectMonthTheSales;
	}
}
