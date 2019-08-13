import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployOptionsPage } from './deploy-options.page';

describe('DeployOptionsPage', () => {
  let component: DeployOptionsPage;
  let fixture: ComponentFixture<DeployOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployOptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
