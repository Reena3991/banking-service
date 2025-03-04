import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8090/api/accounts';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, account);
  }

  debit(amount: string, accountId: any): Observable<Account> {
    return this.http.post<Account>(this.baseUrl+"/"+accountId+"/debit?amount="+amount, amount);
  }

  credit(amount: string, accountId: any): Observable<Account> {
    return this.http.post<Account>(this.baseUrl+"/"+accountId+"/credit?amount="+amount, amount);
  }
}
