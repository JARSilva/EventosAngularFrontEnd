import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetalheComponent } from './event-detalhe.component';

describe('EventDetalheComponent', () => {
  let component: EventDetalheComponent;
  let fixture: ComponentFixture<EventDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
