import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEventsComponent } from './product-events.component';

describe('ProductEventsComponent', () => {
  let component: ProductEventsComponent;
  let fixture: ComponentFixture<ProductEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
