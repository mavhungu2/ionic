import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBaseStationsPage } from './my-base-stations.page';

describe('MyBaseStationsPage', () => {
  let component: MyBaseStationsPage;
  let fixture: ComponentFixture<MyBaseStationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBaseStationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBaseStationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
