import { Component, OnInit } from '@angular/core';
import {AccountService} from '../shared/account.service';
import {Router} from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public isFetching: boolean;

  constructor(private accountService: AccountService, private router: Router) { }

  onChange(type) {
    //console.log(this[type]);
  }

  onSubmit() {
    const { email, password } = this;

    const result = [
      !_.isUndefined(email) && email !== '',
      !_.isUndefined(password) && password !== ''
    ].every(el => el);

    if (result) {
      this.isFetching = true;
      this.accountService.login({ email, password })
        .subscribe(
          () => this.isFetching = false,
          () => this.isFetching = false
        );
    }
  }

  ngOnInit() {
    if (this.accountService.account) {
      this.router.navigate(['/']);
    }
  }

}
