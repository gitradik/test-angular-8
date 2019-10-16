import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Account from '../interfaces/account.interface';
import Error from '../interfaces/error.interface';
import baseUrl from '../api/baseUrl';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AccountService {

  public account: Account = null;
  public error: Error = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  setAccessAndRedirect(token: string, path: string) {
    localStorage.setItem('access', token);
    this.router.navigate([path]);
  }

  createAccount({email, password}) {
    return this.http.post<Account>(baseUrl + 'createAccount', {email, password})
      .pipe(tap(acc => {
        this.account = acc;
        this.error = null;

        this.setAccessAndRedirect(acc.token, '/');
      }, err => {
        this.error = err.error;
        this.account = null;
      }));
  }

  getAccount() {
    return this.http.get<Account>(baseUrl + 'getAccount', {
      headers: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJybWluenAxN0BnbWFpbC5jb20iLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNTcxMjI2MTQ4LCJleHAiOjE1NzEyMzMzNDh9.PP0GW5NUE7q51DojL02kceWTjxWKLKbK0DWJfy3eZ5I'
      }
    })
      .pipe(tap(acc => {
        this.account = acc;
        this.error = null;

        this.setAccessAndRedirect(acc.token, '/');
      }, err => {
        this.error = err.error;
        this.account = null;

        if (err.error.name === 'Unregistered') {
          this.router.navigate(['/sign-up']);
        }
      }));
  }
}
