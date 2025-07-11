import { ParalalRequestService } from './../../../services/paralal-request.service';
import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Train, TrainResponse } from '../../../interfaces/train-details';
import { IRouteStation, ITrainResponse } from '../../../interfaces/train-routs';
import { ApiService } from '../../../services/api.service';
import { NgClass } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from '@angular/material/badge';
import { TrainScearchPayload } from '../../../interfaces/Station';
import { ProgressService } from '../../../services/progress.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-train-table-details',
  imports: [MatTableModule, MatButtonModule,
    MatExpansionModule, MatProgressSpinnerModule,
    NgClass, MatIconModule,
    MatBadgeModule, MatProgressBarModule],
  templateUrl: './train-table-details.component.html',
  styleUrl: './train-table-details.component.scss'
})
export class TrainTableDetailsComponent implements OnChanges {
  @Input({ required: true }) trainInfo!: Train;
  @Input({ required: true }) serchigValue = signal<any>(null);
  @Input({ required: true }) isOpenComponent!: string;
  // @Input({ required: true }) isOpenComponent = signal<string>(null);
  isLoading = signal<boolean>(true);
  isSerching = signal<boolean>(true);

  trainStationList = signal<ITrainResponse>(null);

  displayedColumns = ['fromTo', 'Parbatipur', 'Fulbari', 'BiramPur', 'Joypurhat', 'Joypurhat1', 'Joypurhat2', 'Joypurhat3', 'Akkelpur', 'Santahar', 'Ahsanganj', 'Natore', 'Muladuli', 'Ibrahimabad'];
  dataSource = [
    {
      fromTo: 'Joypurhat',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '৳65', Natore: '৳95', Muladuli: '', Ibrahimabad: ''
    },
    {
      fromTo: 'Santahar',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '৳55', Ibrahimabad: ''
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
  ];

  daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  constructor(private readonly _apiService: ApiService,
    private dialog: MatSnackBar,
    private readonly _paralalService: ParalalRequestService,
    public progressService: ProgressService
  ) { }


  ngOnInit() {
    console.log('train name', this.trainInfo.trip_number);

    if (this.isOpenComponent !== this.trainInfo.trip_number) {
      return;
    }
    // this.findTrainRouts();
    this.progressService.state$.subscribe(state => {
      this.isSerching.update(() => state.status === 'loading');
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const cng = changes['isOpenComponent'];
    if (cng && !cng.firstChange && this.isOpenComponent === this.trainInfo.trip_number) {
      this.isLoading.update(() => true);

      this.findTrainRouts();
    }
  }

  get progressState() {
    return this.progressService.state.value;
  }

  async findTrainRouts() {
    try {
      const data = {
        "departure_date_time": this.serchigValue().date_of_journey,
        "model": this.trainInfo.train_model,
      }
      const value = await this._apiService.findTrainRouts(data);
      console.log('value', value);
      this.isLoading.update(() => false);
      // এখান থেকে data UI তে পাঠান
      this.trainStationList.update(() => value);
      await this._buildTrainStationGroup(value.data.routes);

      this.sendRequest();
    } catch (error) {
      console.error('API Error:', error);
      this.isLoading.update(() => false);
      // ইউজারকে কিছু দেখান যেমন:
      this.dialog.open('সার্ভার থেকে ডেটা আনতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।', 'বন্ধ করুন', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn'],
      });
    }
  }
  results;
  requests;
  responseValue: Map<string, TrainResponse[]> = new Map<string, TrainResponse[]>();
  async sendRequest() {
    debugger
    if (this.stationGroupList.size === 0) {
      return;
    }
    try {
      this.stationGroupList.forEach(async (value, key) => {
        await this._paralalService.searchSeatsWithLoadManagement(
          { key: key, requests: value },
          (data: TrainResponse[], key: string) => {
            this._buildResponseValue(data, key);

          },
          5,
          300
        );
      })
    } catch (error) {
      console.error('Search error:', error);
    }

  }
  private _buildResponseValue(data: TrainResponse[], key: string) {
    if (this.responseValue.has(key)) {
      const extDt = this.responseValue.get(key);
      this.responseValue.set(key, [...extDt!, ...data]);
    } else {
      this.responseValue.set(key, data);
    }
    console.log(`getting data for key ${key}`, data);
    console.log(`all response value`, this.responseValue);

  }
  stationGroupList: Map<string, TrainScearchPayload[]> = new Map<string, TrainScearchPayload[]>();
  private async _buildTrainStationGroup(routes: IRouteStation[]) {
    console.log('routs list', routes);

    routes.forEach((route, index) => {
      const key = route.city;
      let stationList: TrainScearchPayload[] = [];
      routes.forEach((stattion, idx) => {
        if (index < idx) {
          stationList.push({
            from_city: key,
            to_city: stattion.city,
            date_of_journey: this.serchigValue().date_of_journey,
            seat_class: this.serchigValue().seat_class,
          });
        }
      });
      if (index < (routes.length - 1)) {
        this.stationGroupList.set(key, stationList);
      }
    });

    console.log('stationGroupList', this.stationGroupList);

  }
  getDisplayedColumns() {
    return this.displayedColumns.filter(col => col !== 'fromTo');
  }

}
