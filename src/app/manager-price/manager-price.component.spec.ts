import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPriceComponent } from './manager-price.component';

describe('ManagerPriceComponent', () => {
  let component: ManagerPriceComponent;
  let fixture: ComponentFixture<ManagerPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
