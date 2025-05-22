import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainMatrixComponent } from './train-matrix.component';

describe('TrainMatrixComponent', () => {
  let component: TrainMatrixComponent;
  let fixture: ComponentFixture<TrainMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainMatrixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
