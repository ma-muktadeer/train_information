import { Component, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TrainResponse } from '../../../interfaces/train-details';
import { TrainTableDetailsComponent } from "../train-table-details/train-table-details.component";

@Component({
  selector: 'app-train-details-view',
  imports: [MatExpansionModule, TrainTableDetailsComponent],
  templateUrl: './train-details-view.component.html',
  styleUrl: './train-details-view.component.scss'
})
export class TrainDetailsViewComponent {
  @Input({required: true}) trainDetails= signal<TrainResponse>(null);
  panelOpenState: boolean = false;
  isOpenAccordion= signal<boolean>(false);
  
  setOpenAccordion(bol: boolean) {
    this.isOpenAccordion.update(()=>bol);
  }
}
