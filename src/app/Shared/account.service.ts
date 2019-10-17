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
    if (path) {
      this.router.navigate([path]);
    }
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

  login({email, password}) {
    return this.http.post<Account>(baseUrl + 'login', {email, password})
      .pipe(tap(acc => {
        this.account = acc;
        this.error = null;
        this.setAccessAndRedirect(acc.token, '/');
      }, err => {
        this.error = err.error;
        this.account = null;
      }));
  }

  getAccount(access: string) {
    const {url} = this.router;
    return this.http.get<Account>(baseUrl + 'getAccount', {
      headers: {access_token: access}
    })
      .pipe(tap(acc => {
        this.account = acc;
        this.error = null;

        let path = null;
        if (url.includes('sign-up') || url.includes('sign-in')) {
          path = '/';
        }
        this.setAccessAndRedirect(acc.token, path);
      }, err => {
        this.error = err.error;
        this.account = null;

        if (typeof this.error !== 'undefined' && this.error.name === 'Unregistered') {
          if (url.includes('sign-up')) {
            return;
          }
          this.router.navigate(['/sign-in']);
        } else if (typeof this.error === 'undefined' && !url.includes('sign-up')) {
          this.router.navigate(['/sign-in']);
        } else {
          if (err.name === 'HttpErrorResponse' && url.includes('sign-up')) {
            return;
          }
          this.router.navigate(['/sign-in']);
        }
      }));
  }
}
