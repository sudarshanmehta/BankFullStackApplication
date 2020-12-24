package com.mehtas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mehtas.models.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	Account findByAccountNumberEquals(String accountNumber);
}
