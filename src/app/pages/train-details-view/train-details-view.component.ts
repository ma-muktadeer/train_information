import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-train-details-view',
  imports: [MatExpansionModule, ],
  templateUrl: './train-details-view.component.html',
  styleUrl: './train-details-view.component.scss'
})
export class TrainDetailsViewComponent {
  panelOpenState: boolean = false;
  isOpenAccordion= signal<boolean>(false);
  
  setOpenAccordion(bol: boolean) {
    this.isOpenAccordion.update(()=>bol);
  }
}
