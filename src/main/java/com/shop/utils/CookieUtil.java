package com.shop.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

public class CookieUtil {

	public static final String LOGIN_COOKIE_KEY = "SHOP_LOGIN_CODE"; 
	
	/**
	* 添加cookie
	* 
	* @param response
	* @param name
	* @param value
	* @param maxAge
	*/
	public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
		
		if(StringUtils.isEmpty(name)){
			return;
		}
		
		Cookie cookie = new Cookie(name, value);
		cookie.setPath("/");
		if (maxAge > 0) {
			cookie.setMaxAge(maxAge);
		}
		response.addCookie(cookie);
	}
	
	/**
	* 删除cookie
	* 
	* @param response
	* @param name
	*/
	public static void removeCookie(HttpServletResponse response, String name) {
		
		if(StringUtils.isEmpty(name)){
			return;
		}
		
		Cookie uid = new Cookie(name, null);
		uid.setPath("/");
		uid.setMaxAge(0);
		response.addCookie(uid);
	}

	/**
	* 获取cookie值
	* 
	* @param request
	* @return
	*/
	public static String getCookieValue(HttpServletRequest request,String cookieName) {

		Cookie cookies[] = request.getCookies();
		
		if(null == cookies || cookies.length == 0){
			return null;
		}
		
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(cookieName)) {
				return cookie.getValue();
			}
		}
		
		return null;
	}
}
