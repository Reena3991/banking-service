package com.bankingservice.service;

import com.bankingservice.model.Account;
import com.bankingservice.model.Transaction;
import com.bankingservice.repository.AccountRepository;
import com.bankingservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    public Account createAccount(Account account) {
        account.setBalance(0.0); // Set initial balance to 0
        return accountRepository.save(account);
    }

    public Account debit(Long accountId, Integer amount) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient funds");
        }

        account.setBalance(account.getBalance() - amount);
        Transaction transaction = new Transaction(account, amount, "Debit", "Debited amount: " + amount);
        transactionRepository.save(transaction);
        return accountRepository.save(account);
    }

    public Account credit(Long accountId, Integer amount) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new RuntimeException("Account not found"));

        account.setBalance(account.getBalance() + amount);
        Transaction transaction = new Transaction(account, amount, "Credit", "Credited amount: " + amount);
        transactionRepository.save(transaction);
        return accountRepository.save(account);
    }

    public List<Transaction> getTransactionHistory(Long accountId) {
        return transactionRepository.findByAccount_Id(accountId);
    }
}