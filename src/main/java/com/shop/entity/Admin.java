package com.shop.entity;

public class Admin {
	
	private Long id;
	
    private String name;
    
    private String password;
    
    private String status;
    
    

	public Admin() {
		super();
	}
	
	public Admin(String name, String password) {
		super();
		this.name = name;
		this.password = password;
	}



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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
    
}
