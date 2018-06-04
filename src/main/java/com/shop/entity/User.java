package com.shop.entity;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable {
	
	private static final long serialVersionUID = -4586850641697959L;

	private Long id;
	
	private Long adminId;
	
	private String userName;
    
    private String sex;
    
    private String mobile;
    
    private String vipCode;
    
    private String remark;
    
    private Long restScore;
    
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getVipCode() {
		return vipCode;
	}

	public void setVipCode(String vipCode) {
		this.vipCode = vipCode;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Long getRestScore() {
		return restScore;
	}

	public void setRestScore(Long restScore) {
		this.restScore = restScore;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}