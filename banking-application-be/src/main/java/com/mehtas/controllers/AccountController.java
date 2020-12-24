package com.mehtas.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mehtas.controllers.request.AccountStatementRequest;
import com.mehtas.controllers.request.TransferBalanceRequest;
import com.mehtas.models.Account;
import com.mehtas.models.AccountStatement;
import com.mehtas.models.AccountType;
import com.mehtas.models.Transaction;
import com.mehtas.services.CuurentAccountService;
import com.mehtas.services.SavingAccountService;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    
	@Autowired
    private CuurentAccountService currentAccountService;
	
	@Autowired
    private SavingAccountService savingAccountService;
    
    @PostMapping(value = "/create")
    public List<Account> create(@RequestBody Account account) {
    	currentAccountService.save(account);
        return currentAccountService.findAll();
    }

    @GetMapping(value = "/all")
    public List<Account> all() {
        return currentAccountService.findAll();
    }

    @PostMapping(value = "/sendmoney")
    public List<Transaction> sendMoney(
            @RequestBody TransferBalanceRequest transferBalanceRequest ) {   
    	Account account = currentAccountService.findByAccountNumber(transferBalanceRequest.getFromAccountNumber());
        if(account.getAccountType() == AccountType.savings)
        	return savingAccountService.sendMoney(transferBalanceRequest);
        else
        	return  currentAccountService.sendMoney(transferBalanceRequest);
    }
    
    @PostMapping(value = "/statement")
    public AccountStatement getStatement(
            @RequestBody AccountStatementRequest accountStatementRequest){
        return  currentAccountService.getStatement(accountStatementRequest.getAccountNumber());
    }        
}