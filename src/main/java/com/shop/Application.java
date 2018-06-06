package com.shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.shop.interceptors.LoginInterceptors;


@SpringBootApplication(scanBasePackages = {"com.shop"})
public class Application extends WebMvcConfigurerAdapter {

	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(Application.class);
		springApplication.run(args);
	}
	
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/");
    }
	
	@Bean
	public LoginInterceptors getLoginInterceptor() {
	    return new LoginInterceptors();
	}
	
	/** 拦截器 */
	public void addInterceptors(InterceptorRegistry registry) {
	    registry.addInterceptor(getLoginInterceptor()).addPathPatterns("/shop/**").excludePathPatterns("/shop/index", "/shop/login");
	}
}