import { Location } from '@angular/common';
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

  @Input({ required: true }) trainDetails = signal<TrainResponse>(null);
  @Input({ required: true }) serchigValue = signal<any>(null);
  panelOpenState: boolean = false;
  // isOpendTrainName = signal<string>(null);
  isOpendTrainName: string;

  constructor(readonly _location: Location) {

  }

  ngOnInit() {
    console.log(this.trainDetails());

  }
  setOpenAccordion(trainName: string) {
    this.isOpendTrainName = trainName;
    // this.isOpendTrainName.update(() => trainName);
  }

  back() {
    console.log('click to back');

    this._location.back()
  }

  //request example
  apiUrl = 'https://your-api-url';

  stations = [
    [{ from_city: 'Chilahati', to_city: 'Domar' }, { from_city: 'Chilahati', to_city: 'Nilphamari' }],
    [{ from_city: 'Domar', to_city: 'Nilphamari' }],
    [{ from_city: 'Nilphamari', to_city: 'Saidpur' }]
  ];

  fetchTrainData() {
    const requests = this.stations.flatMap(group =>
      group.map(station =>
        fetch(`${this.apiUrl}?from=${station.from_city}&to=${station.to_city}`)
      )
    );

    return Promise.all(requests)
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => console.log('Train Data:', data))
      .catch(error => console.error('Error fetching train data:', error));
  }



}
