package com.shop.entity;

import java.io.Serializable;
import java.util.Date;


public class Order implements Serializable{
	
	private static final long serialVersionUID = 1444553315477369627L;

	private Long id;
	
	private Long adminId;
    
    private String userName;
    
    private String vipCode;
    
    private String productName;
    
    private Double weight;
    
    private Double price;
    
    private String giftProductName;
    
    private Double giftprice;
    
    private Double giftWeight;
    
    private String remark;
    
    private String year;
    
    private String month;
    
    private String day;
    
    private Date createTime;

    /**报表用到*/
    private Integer countWeight;
    private String countPrice;
    private String date;
    
    

	public Integer getCountWeight() {
		return countWeight;
	}

	public void setCountWeight(Integer countWeight) {
		this.countWeight = countWeight;
	}

	public String getCountPrice() {
		return countPrice;
	}

	public void setCountPrice(String countPrice) {
		this.countPrice = countPrice;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Long getAdminId() {
		return adminId;
	}

	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getVipCode() {
		return vipCode;
	}

	public void setVipCode(String vipCode) {
		this.vipCode = vipCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getGiftProductName() {
		return giftProductName;
	}

	public void setGiftProductName(String giftProductName) {
		this.giftProductName = giftProductName;
	}

	public Double getGiftWeight() {
		return giftWeight;
	}

	public void setGiftWeight(Double giftWeight) {
		this.giftWeight = giftWeight;
	}

	public Double getGiftprice() {
		return giftprice;
	}

	public void setGiftprice(Double giftprice) {
		this.giftprice = giftprice;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
    
}