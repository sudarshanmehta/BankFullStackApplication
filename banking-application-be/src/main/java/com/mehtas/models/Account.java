package com.mehtas.models;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long accountId; 

	String accountNumber;

    BigDecimal currentBalance;
    
    AccountType accountType;
        
    BigDecimal currentLimit;    
    
   
	public BigDecimal getCurrentLimit() {
		return currentLimit;
	}

	public void setCurrentLimit(BigDecimal currentLimit) {
		this.currentLimit = currentLimit;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public Long getAccountId() {
  		return accountId;
  	}

  	public void setAccountId(Long accountId) {
  		this.accountId = accountId;
  	}

  	public String getAccountNumber() {
  		return accountNumber;
  	}

  	public void setAccountNumber(String accountNumber) {
  		this.accountNumber = accountNumber;
  	}

  	public BigDecimal getCurrentBalance() {
  		return currentBalance;
  	}

  	public void setCurrentBalance(BigDecimal currentBalance) {
  		this.currentBalance = currentBalance;
  	}


}