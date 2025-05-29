import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainTableDetailsComponent } from './train-table-details.component';

describe('TrainTableDetailsComponent', () => {
  let component: TrainTableDetailsComponent;
  let fixture: ComponentFixture<TrainTableDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainTableDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainTableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
