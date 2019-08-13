import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployComposePagePage } from './deploy-compose-page.page';

describe('DeployComposePagePage', () => {
  let component: DeployComposePagePage;
  let fixture: ComponentFixture<DeployComposePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployComposePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployComposePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
