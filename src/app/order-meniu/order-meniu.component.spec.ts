import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMeniuComponent } from './order-meniu.component';

describe('OrderMeniuComponent', () => {
  let component: OrderMeniuComponent;
  let fixture: ComponentFixture<OrderMeniuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMeniuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMeniuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
