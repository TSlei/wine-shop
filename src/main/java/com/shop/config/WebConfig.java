package com.shop.config;

import java.util.Properties;

import org.apache.ibatis.plugin.Interceptor;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.pagehelper.PageHelper;

/**
 * 
 * @ClassName: WebConfig
 * @author 张磊
 */
@Configuration
public class WebConfig {

	/**
	 * 注册 拦截器
	 */
//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {
//		InterceptorRegistration ir = registry.addInterceptor(new PageInterceptor());
//		// 配置拦截的路径
//		ir.addPathPatterns(Urls.PROJECT+Urls.POI+"/**");
//		// 配置不拦截的路径
//		 ir.excludePathPatterns(Urls.PROJECT+Urls.IO+"/**");
//	}

	/**
	 * 分页配置
	 */
	@Bean
	public PageHelper getPageHelper() {
		PageHelper pageHelper = new PageHelper();
		Properties properties = new Properties();
		properties.setProperty("helperDialect", "mysql");
		properties.setProperty("reasonable", "true");
		properties.setProperty("supportMethodsArguments", "true");
		properties.setProperty("params", "count=countSql");
		pageHelper.setProperties(properties);
		// 添加插件
		new SqlSessionFactoryBean().setPlugins(new Interceptor[] { pageHelper });
		return pageHelper;
	}

	/**
	 * 加载过滤器
	 *
	 */
//	@Bean
//	public FilterRegistrationBean myFilterRegistration() {
//		FilterRegistrationBean registration = new FilterRegistrationBean();
//		registration.setFilter(new HttpServletRequestWrapperFilter());
//		registration.addUrlPatterns(Urls.PROJECT+Urls.POI+"/*");
//		registration.addInitParameter("paramName", "paramValue");
//		registration.setName("httpServletRequestWrapperFilter");
//		registration.setOrder(1);
//		return registration;
//	}


//	/**
//	 * 附件上传配置
//	 *
//	 * @Title: multipartResolver
//	 */
//    @Bean(name = "multipartResolver")
//    public MultipartResolver multipartResolver()
//    {
//        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
//         resolver.setDefaultEncoding("UTF-8");
//      // resolveLazily属性启用是为了推迟文件解析，以在在UploadAction中捕获文件大小异常
//       /* resolver.setResolveLazily(true);*/
//         resolver.setMaxInMemorySize(40960);
//      // 上传文件大小 5M 5*1024*1024
//        resolver.setMaxUploadSize(10 * 1024 * 1024);
//        return resolver;
//    }


}
