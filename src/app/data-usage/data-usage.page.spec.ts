import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUsagePage } from './data-usage.page';

describe('DataUsagePage', () => {
  let component: DataUsagePage;
  let fixture: ComponentFixture<DataUsagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataUsagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUsagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
