import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homeaboutus } from './homeaboutus';

describe('Homeaboutus', () => {
  let component: Homeaboutus;
  let fixture: ComponentFixture<Homeaboutus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homeaboutus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homeaboutus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
