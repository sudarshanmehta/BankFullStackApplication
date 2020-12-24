package com.mehtas.models;

public enum TransactionType {
	deposit("deposit"),withdrawal("withdrawal");
	
	private String type;
	
	private TransactionType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}	
}
