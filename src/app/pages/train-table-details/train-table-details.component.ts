import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Train } from '../../../interfaces/train-details';
import { ITrainResponse } from '../../../interfaces/train-routs';
import { ApiService } from '../../../services/api.service';
import { NgClass } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-train-table-details',
  imports: [MatTableModule, MatButtonModule, MatExpansionModule, MatProgressSpinnerModule, NgClass, MatIconModule, MatBadgeModule],
  templateUrl: './train-table-details.component.html',
  styleUrl: './train-table-details.component.scss'
})
export class TrainTableDetailsComponent implements OnChanges {
  @Input({ required: true }) trainInfo!: Train;
  @Input({ required: true }) serchigValue = signal<any>(null);
  @Input({ required: true }) isOpenComponent!: string;
  // @Input({ required: true }) isOpenComponent = signal<string>(null);
  isLoading = signal<boolean>(false);

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

  // You would typically have an array of station objects
  // stations = [
  //   {
  //     name: 'Dhaka',
  //     type: 'origin',
  //     arrival: '---',
  //     departure: '11:30 am',
  //     halt: '---',
  //     duration: '---'
  //   },
  //   {
  //     name: 'Biman_Bandar',
  //     type: 'intermediate',
  //     arrival: '11:53 am',
  //     departure: '11:58 am',
  //     halt: '5 min',
  //     duration: '23 min'
  //   },
  //   {
  //     name: 'Gafaragon',
  //     type: 'intermediate', // Or 'destination' if it's the last one
  //     arrival: '01:45 pm',
  //     departure: '01:47 pm',
  //     halt: '2 min',
  //     duration: '1 h 47 min'
  //   }
  //   // ... more stations
  // ];
  constructor(private readonly _apiService: ApiService,
    private dialog: MatSnackBar
  ) { }


  ngOnInit() {
    console.log('train name', this.trainInfo.trip_number);

    if (this.isOpenComponent !== this.trainInfo.trip_number) {
      return;
    }
    // this.findTrainRouts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const cng = changes['isOpenComponent'];
    if (cng && !cng.firstChange && this.isOpenComponent === this.trainInfo.trip_number) {
      this.isLoading.update(() => true);
      debugger
      this.findTrainRouts();
    }
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
  getDisplayedColumns() {
    return this.displayedColumns.filter(col => col !== 'fromTo');
  }

}
