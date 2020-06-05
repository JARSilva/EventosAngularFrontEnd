import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHouseSaveComponent } from './show-house-save.component';

describe('ShowHouseSaveComponent', () => {
  let component: ShowHouseSaveComponent;
  let fixture: ComponentFixture<ShowHouseSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHouseSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHouseSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
