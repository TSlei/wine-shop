package com.shop.entity;

import java.io.Serializable;

import org.joda.time.DateTime;

public class ScoreRecord implements Serializable{
	
	private static final long serialVersionUID = 9006194155186213884L;
	
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
	
	private DateTime createTime;
	
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

	public DateTime getCreateTime() {
		return createTime;
	}

	public void setCreateTime(DateTime createTime) {
		this.createTime = createTime;
	}
	
}
