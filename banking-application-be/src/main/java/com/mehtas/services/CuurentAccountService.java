package com.mehtas.services;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mehtas.controllers.request.TransferBalanceRequest;
import com.mehtas.models.Account;
import com.mehtas.models.Transaction;
import com.mehtas.models.TransactionType;

@Service
public class CuurentAccountService extends AccountService {	
	@Override
	public List<Transaction> sendMoney(TransferBalanceRequest transferBalanceRequest) {
		// TODO Auto-generated method stub
		List<Transaction> tr = new ArrayList<Transaction>();
        String fromAccountNumber = transferBalanceRequest.getFromAccountNumber();
        String toAccountNumber = transferBalanceRequest.getToAccountNumber();
        BigDecimal amount = transferBalanceRequest.getAmount();
        Account fromAccount = accountRepository.findByAccountNumberEquals(
                fromAccountNumber
        );
        Account toAccount = accountRepository.findByAccountNumberEquals(toAccountNumber);
        if(fromAccount.getCurrentLimit().compareTo(amount) == 1){
        	
            fromAccount.setCurrentLimit(fromAccount.getCurrentLimit().subtract(amount));
            accountRepository.save(fromAccount);
            toAccount.setCurrentBalance(toAccount.getCurrentBalance().add(amount));
            accountRepository.save(toAccount);
            Transaction transaction = transactionRepository.save(new Transaction(0L,fromAccountNumber,amount,new Timestamp(System.currentTimeMillis()),TransactionType.withdrawal.getType()));           
            transaction = transactionRepository.save(new Transaction(0L,toAccountNumber,amount,new Timestamp(System.currentTimeMillis()),TransactionType.deposit.getType()));
            tr.addAll(transactionRepository.findByAccountNumberEquals(fromAccountNumber));
            tr.addAll(transactionRepository.findByAccountNumberEquals(toAccountNumber));
        }
        return tr;
	}
}