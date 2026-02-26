import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homegcc } from './homegcc';

describe('Homegcc', () => {
  let component: Homegcc;
  let fixture: ComponentFixture<Homegcc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homegcc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homegcc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
