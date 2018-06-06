package com.shop.entity.request;

import java.io.Serializable;

/**
 * @author zhanglei
 * @date 2018-04-26
 */
public class RequestParam implements Serializable{

    private static final long serialVersionUID = -730694196186287551L;

    /**
     * 通过id搜索
     */
    private Long id;
    
    /**
     * 通过名称搜索
     */
    private String name;
    
    /**
     * 开始时间
     */
    private String startTime;

    /**
     * 结束时间
     */
    private String endTime;

    /**
     * 分页-页数
     */
    private Integer pageNum;

    /**
     * 分页-条数,默认10条
     */
    private Integer pageSize;
    
    /**
     * 排序字段名(总发布量: totalPublishCount, 总阅读量: totalReadCount), 默认：id
     */
    private String sortName;
    
    /**
     * 排序类型（desc, asc）
     */
    private String sortType;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}


	public String getSortName() {
		return sortName;
	}

	public void setSortName(String sortName) {
		this.sortName = sortName;
	}

	public String getSortType() {
		return sortType;
	}

	public void setSortType(String sortType) {
		this.sortType = sortType;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

}
