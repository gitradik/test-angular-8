import { Component, OnInit } from '@angular/core';
import {AccountService} from '../Shared/account.service';
import {delay} from 'rxjs/operators';
import _ from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public isFetching: boolean;

  constructor(private accountService: AccountService, private router: Router) {
  }

  onChange(type) {
    //console.log(this[type]);
  }

  onSubmit() {
    const {email, password} = this;

    const result = [
      !_.isUndefined(email) && email !== '',
      !_.isUndefined(password) && password !== ''
    ].every(el => el);

    if (result) {
      this.isFetching = true;
      this.accountService.createAccount({email, password})
        .pipe(delay(500))
        .subscribe(() => {
          this.isFetching = false;
        }, () => {
          this.isFetching = false;
        });
    }
  }

  ngOnInit() {
  }

}
