import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gcc } from './gcc';

describe('Gcc', () => {
  let component: Gcc;
  let fixture: ComponentFixture<Gcc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gcc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gcc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
