import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSaveComponent } from './order-save.component';

describe('OrderSaveComponent', () => {
  let component: OrderSaveComponent;
  let fixture: ComponentFixture<OrderSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
