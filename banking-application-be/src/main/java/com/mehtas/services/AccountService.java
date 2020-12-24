package com.mehtas.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.mehtas.controllers.request.TransferBalanceRequest;
import com.mehtas.models.Account;
import com.mehtas.models.AccountStatement;
import com.mehtas.models.Transaction;
import com.mehtas.repositories.AccountRepository;
import com.mehtas.repositories.TransactionRepository;

public abstract class AccountService {
	
	@Autowired
    protected AccountRepository accountRepository;

    @Autowired
    protected TransactionRepository transactionRepository;

    public Account save(Account account){
        accountRepository.save(account);
        return accountRepository.findByAccountNumberEquals(account.getAccountNumber());
    }

    public List<Account> findAll(){
        return accountRepository.findAll();
    }

    public Account findByAccountNumber(String accountNumber){
        Account account = accountRepository.findByAccountNumberEquals(accountNumber);
        return account;
    }
     
    public AccountStatement getStatement(String accountNumber) {
        Account account = accountRepository.findByAccountNumberEquals(accountNumber);
        return new AccountStatement(account.getCurrentBalance(),transactionRepository.findByAccountNumberEquals(accountNumber));
    }
    
    public List<Transaction> sendMoney(
            TransferBalanceRequest transferBalanceRequest
    ) {
    	List<Transaction> tr = new ArrayList<Transaction>();
         return tr;
    }

}