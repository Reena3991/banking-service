package com.bankingservice.controller;

import com.bankingservice.model.Account;
import com.bankingservice.model.Transaction;
import com.bankingservice.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAccounts();
    }

    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @PostMapping("/{accountId}/debit")
    public Account debit(@PathVariable Long accountId, @RequestParam Integer amount) {
        return accountService.debit(accountId, amount);
    }

    @PostMapping("/{accountId}/credit")
    public Account credit(@PathVariable Long accountId, @RequestParam Integer amount) {
        return accountService.credit(accountId, amount);
    }

    @GetMapping("/{accountId}/transactions")
    public List<Transaction> viewStatement(@PathVariable Long accountId) {
        return accountService.getTransactionHistory(accountId);
    }
}