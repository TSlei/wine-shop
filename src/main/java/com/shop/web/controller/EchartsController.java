package com.shop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value="/shop")
public class EchartsController {
	
	@RequestMapping("/echarts")
	public ModelAndView loginPage(){
		ModelAndView model = new ModelAndView("basic/echarts/echarts-page");
		return model;
	}
}
