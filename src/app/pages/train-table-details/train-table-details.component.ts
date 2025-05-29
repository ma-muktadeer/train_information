import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Train } from '../../../interfaces/train-details';
import { ITrainResponse } from '../../../interfaces/train-routs';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-train-table-details',
  imports: [MatTableModule, MatButtonModule, MatExpansionModule, MatProgressSpinnerModule],
  templateUrl: './train-table-details.component.html',
  styleUrl: './train-table-details.component.scss'
})
export class TrainTableDetailsComponent implements OnChanges {
  @Input({ required: true }) trainInfo!: Train;
  @Input({ required: true }) serchigValue = signal<any>(null);
  @Input({ required: true }) isOpenComponent!: string;
  // @Input({ required: true }) isOpenComponent = signal<string>(null);
  isLoading= signal<boolean>(false);

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
      this.isLoading.update(()=> true);
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
      this.isLoading.update(()=> false);
      // এখান থেকে data UI তে পাঠান
      this.trainStationList.update(() => value);
    } catch (error) {
      console.error('API Error:', error);
      this.isLoading.update(()=> false);
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
