import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homeservice } from './homeservice';

describe('Homeservice', () => {
  let component: Homeservice;
  let fixture: ComponentFixture<Homeservice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homeservice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homeservice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
