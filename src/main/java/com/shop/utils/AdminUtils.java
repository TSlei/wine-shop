package com.shop.utils;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

import com.shop.entity.Admin;

public class AdminUtils {

	public static Admin getCurrentAdmin(HttpServletRequest request){
		
		String key = CookieUtil.getCookieValue(request, CookieUtil.LOGIN_COOKIE_KEY);
		if(StringUtils.isEmpty(key)){
			return null;
		}
		return (Admin)request.getSession().getAttribute(key);
	}
}
