import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentsPage } from './deployments.page';

describe('DeploymentsPage', () => {
  let component: DeploymentsPage;
  let fixture: ComponentFixture<DeploymentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
