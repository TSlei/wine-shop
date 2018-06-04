package com.shop.utils;  
  
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;  
  
 
//@Component 
public class PropertiesUtil {  
      
    @Value("${}")
    private String url;  
      
    public void getUrl(){  
        System.out.println("url = " + url);  
    }  
  
}
  
  
  
  
  
