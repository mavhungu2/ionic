import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCoinsPage } from './buy-coins.page';

describe('BuyCoinsPage', () => {
  let component: BuyCoinsPage;
  let fixture: ComponentFixture<BuyCoinsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyCoinsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCoinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
