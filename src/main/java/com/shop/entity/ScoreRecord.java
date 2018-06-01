package com.shop.entity;

import java.io.Serializable;
import java.util.Date;

import org.joda.time.DateTime;

public class ScoreRecord implements Serializable{
	
	private static final long serialVersionUID = 9006194155186213884L;
	
	private Long id;
	
	private Long adminId;
	
	/**
	 * 对应订单id
	 */
	private Long orderId;

	/**
	 * 积分变化
	 */
	private Long score;
	
	/**
	 * 积分抵消金额
	 */
	private Double discount;
	
	/**
	 * 备注
	 */
	private String remark;
	
	private Date createTime;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAdminId() {
		return adminId;
	}

	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Long getScore() {
		return score;
	}

	public void setScore(Long score) {
		this.score = score;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
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
