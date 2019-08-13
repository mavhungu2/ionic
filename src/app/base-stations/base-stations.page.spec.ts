import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStationsPage } from './base-stations.page';

describe('BaseStationsPage', () => {
  let component: BaseStationsPage;
  let fixture: ComponentFixture<BaseStationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseStationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseStationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
