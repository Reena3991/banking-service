import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../account-list/account.service';
import { Account } from '../account-list/account.model';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
})
export class CreateAccountDialogComponent {
  accountHolderName: string = '';
  balance: number = 0;

  constructor(
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    private accountService: AccountService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.accountHolderName && this.balance != null) {
      const newAccount: Account = { accountHolderName: this.accountHolderName, balance: this.balance };

      this.accountService.createAccount(newAccount).subscribe(
        (account) => {
          this.dialogRef.close(account);
        },
        (error) => {
          console.error('Error creating account:', error);
        }
      );
    }
  }
}
