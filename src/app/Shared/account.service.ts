import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Account from '../interfaces/account.interface';
import Error from '../interfaces/error.interface';
import baseUrl from '../api/baseUrl';
import {tap, catchError} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService {

  public account: Account = null;
  public error: Error = null;

  constructor(private http: HttpClient) {
  }

  createAccount({email, password}) {
    return this.http.post<Account>(baseUrl + 'createAccount', {email, password})
      .pipe(tap(acc => {
        this.account = acc;
      }, err => {
        this.error = err.error;
      }));
  }
}
