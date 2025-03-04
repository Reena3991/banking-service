import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from './account.service'; // Adjust path as necessary
import { Account } from './account.model'; // Adjust path as necessary
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];

  displayedColumns: string[] = ['accountHolderName', 'balance', 'actions'];
  transactionHistory: any[] = [];
  selectedAccountId: number | null = null;
    accountHolderName: string = '';
    balance: number = 0;
  constructor(private accountService: AccountService, private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }

  getAccounts(): void {
    this.http.get<any[]>('/api/accounts').subscribe(data => {
      this.accounts = data;
    });
  }
  openCreateAccountDialog(): void {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.createAccount(result);
        this.accountService.getAccounts().subscribe((data) => {
              this.accounts = data;
         });
        }
    });
  }

    debit(accountId: number): void {
      const amount = prompt("Enter the amount to debit:");
      if (amount) {
        this.accountService.debit(amount, accountId).subscribe((data) => {
        this.getAccounts();
         });
      }
    }

    credit(accountId: number): void {
      const amount = prompt("Enter the amount to credit:");
      if (amount) {
        this.accountService.credit(amount, accountId).subscribe((data) => {
                 this.getAccounts();
        });
      }
    }

    viewStatement(accountId: number): void {
      this.selectedAccountId = accountId;
      this.http.get<any[]>(`/api/accounts/${accountId}/transactions`).subscribe(data => {
        this.transactionHistory = data;
      });
    }
}
