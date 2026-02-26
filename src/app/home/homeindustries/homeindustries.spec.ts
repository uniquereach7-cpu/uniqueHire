import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homeindustries } from './homeindustries';

describe('Homeindustries', () => {
  let component: Homeindustries;
  let fixture: ComponentFixture<Homeindustries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homeindustries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homeindustries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
