import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainDetailsViewComponent } from './train-details-view.component';

describe('TrainDetailsViewComponent', () => {
  let component: TrainDetailsViewComponent;
  let fixture: ComponentFixture<TrainDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainDetailsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
