import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  location: Location;

  constructor(location: Location) { this.location = location; }

  ngOnInit() {
    const prodId = this.location.path().split('/')[2];
  }
}
