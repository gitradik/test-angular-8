import {Component, OnInit} from '@angular/core';
import {AccountService} from './Shared/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public isFetching: boolean;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    if (!this.accountService.account) {
      this.isFetching = true;
      const access = localStorage.getItem('access');
      setTimeout(() => {
        this.accountService.getAccount(access)
          .subscribe(() => {
            this.isFetching = false;
          }, () => {
            this.isFetching = false;
          });
      }, 0);
    }
  }
}
