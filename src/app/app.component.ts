import {Component, OnInit} from '@angular/core';
import {AccountService} from './Shared/account.service';
import {delay} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public isFetching: boolean;

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    if (!this.accountService.account) {
      this.isFetching = true;
      this.accountService.getAccount()
        .pipe(delay(500))
        .subscribe(() => {
          this.isFetching = false;
        }, () => {
          this.isFetching = false;
        });
    }
  }
}
