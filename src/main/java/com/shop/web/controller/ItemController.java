package com.shop.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shop.service.OrderService;
import com.shop.service.ScoreRecordService;


@Controller
@RequestMapping(value="/shop")
public class ItemController {

	@Autowired
	private OrderService orderSerivce;
	
	@Autowired
	private ScoreRecordService scoreRecordService;
	
	
	@RequestMapping(value="/item/list")
	public ModelAndView toItemList(){
		ModelAndView model = new ModelAndView("/basic/item/item-list");
		return model;
		
	}
	
	
}
