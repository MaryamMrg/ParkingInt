import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parkingplace } from './parkingplace';

describe('Parkingplace', () => {
  let component: Parkingplace;
  let fixture: ComponentFixture<Parkingplace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parkingplace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Parkingplace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
