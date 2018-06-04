package com.shop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value="/shop")
public class IntegralController {

	@RequestMapping("/integral")
	public ModelAndView integralPage(){
		ModelAndView model = new ModelAndView("basic/item/integral-list");
		return model;
	}
}
