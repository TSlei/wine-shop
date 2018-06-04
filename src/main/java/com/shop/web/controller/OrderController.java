package com.shop.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping(value="/shop")
public class OrderController {

//	@Autowired
//	private ItemService itemService;
//	@Autowired
//	private OrderService orderSerivce;
//	@Autowired
//	private OrderDetailService orderDetailService;
	
	
	@RequestMapping(value="/order")
	public ModelAndView toOrderPage(){
		ModelAndView model = new ModelAndView("basic/item/order-list");
		return model;
		
	}
	
//	@RequestMapping(value="/item/listTable")
//	public ModelAndView toItemListTable(Item item,Integer pageNum,Integer pageSize){
//		ModelAndView model = new ModelAndView("/basic/item/item-list-table");
//		PageHelper.startPage(pageNum, pageSize);
//		List<Item> list = itemService.listItem(item);
//		PageInfo<Item> pageInfo = new PageInfo<Item>(list);
//		model.addObject("result", pageInfo);
//		return model;
//	}
//	
//	//add item
//	@RequestMapping(value="/item/addItem")
//	@ResponseBody
//	public Integer addItem(Item item){
//		Long createTime = System.currentTimeMillis();
//		item.setCreateTime(createTime);
//		item.setUpdateTime(createTime);
//		Integer i = itemService.addItem(item);
//		return i;
//	}
//	
//	//delete item
//	@RequestMapping(value="/item/delItem")
//	@ResponseBody
//	public Integer delItem(Integer itemId ){
//		Integer i = itemService.deleteItem(itemId);
//		return i;
//	}
//	
//	//get item by itemId
//	@RequestMapping(value="/item/getItem")
//	@ResponseBody
//	public Item getItem(Integer itemId){
//		Item item =  itemService.getItem(itemId);
//		return item;
//	}
//	
//	//update item
//	@RequestMapping(value="/item/updateItem")
//	@ResponseBody
//	public Integer updateItem(Item item){
//		Long createTime = System.currentTimeMillis();
//		item.setUpdateTime(createTime);
//		Integer i =  itemService.updateItem(item);
//		return i;
//	}
//	
	@RequestMapping(value="/purchase/list")
	public ModelAndView toPurchaseList(){
		ModelAndView model = new ModelAndView("/basic/item/purchase-list");
		return model;
	}
//	
//	@RequestMapping(value="/purchase/listTable")
//	public ModelAndView toPurchaseListTable(Integer pageNum,Integer pageSize,Integer status){
//		ModelAndView model = new ModelAndView("/basic/item/purchase-list-table");
//		PageHelper.startPage(pageNum, pageSize);
//		List<Order> list = orderSerivce.listOrder(status);
//		PageInfo<Order> pageInfo = new PageInfo<Order>(list);
//		model.addObject("result", pageInfo);
//		return model;
//	}
//	
//	//add order
//	@RequestMapping(value="/item/addOrder")
//	@ResponseBody
//	public Integer addOrder(Order order){
//		Long createTime = System.currentTimeMillis();
//		order.setCreateTime(createTime);
//		order.setUpdateTime(createTime);
//		Integer i = orderSerivce.insertOrder(order);
//		return i;
//	}
//	//delete order
//	@RequestMapping(value="/item/delOrder")
//	@ResponseBody
//	public Integer delOrder(Integer orderId ){
//		Integer i = orderSerivce.deleteOrder(orderId);
//		return i;
//	}
//		
//	//get Order by OrderId
//	@RequestMapping(value="/item/getOrder")
//	@ResponseBody
//	public Order getOrder(Integer orderId){
//		Order order =  orderSerivce.getOrderById(orderId);
//		return order;
//	}
//		
//	//update order
//	@RequestMapping(value="/item/updateOrder")
//	@ResponseBody
//	public Integer updateOrder(Order order){
//		Long createTime = System.currentTimeMillis();
//		order.setUpdateTime(createTime);
//		Integer i = orderSerivce.updateOrder(order); 
//		return i;
//	}
//	
//	@RequestMapping(value="/purchase/listDetail")
//	public ModelAndView toPurchaseListDetail(Integer orderId){
//		ModelAndView model = new ModelAndView("/basic/item/purchase-list-detail");
//		List<OrderDetail> list = orderDetailService.listOrderDetail(orderId);
//		model.addObject("result", list);
//		model.addObject("orderId", orderId);
//		return model;
//	}
//	
//	//add orderDetail
//	@RequestMapping(value="/item/addOrderDetail")
//	@ResponseBody
//	public Integer addOrderDetail(OrderDetail orderDetail){
//		Integer i = orderDetailService.insertOrderDetail(orderDetail);
//		return i;
//	}
//	
//	//deleteOrderDetail
//	@RequestMapping(value="/item/deleteOrderDetail")
//	@ResponseBody
//	public Integer deleteOrderDetail(Integer id){
//		Integer i = orderDetailService.deleteOrderDetail(id);
//		return i;
//	}
//	@RequestMapping(value="/item/queryLikeName")
//	@ResponseBody
//	public JSONArray queryLikeName(String makerName){
//		JSONArray array = new JSONArray();
//		Item item = new Item();
//		item.setMakerName(makerName);
//		List<Item> list = itemService.listItem(item);
//		for (Item item2 : list) {
//			JSONObject obj = new JSONObject();
//			obj.put("name", item2.getCode());
//			obj.put("price", item2.getPrice());
//			array.add(obj);
//		}
//		return array;
//	}
	
}
