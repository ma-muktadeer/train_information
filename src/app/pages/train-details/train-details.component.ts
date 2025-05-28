import { isPlatformBrowser, Location } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { map, Observable, startWith } from 'rxjs';
import { Station } from '../../../interfaces/Station';
import { ApiService } from '../../../services/api.service';
import { StationsService } from '../../../services/stations.service';
import { TrainDetailsViewComponent } from '../train-details-view/train-details-view.component';

@Component({
  selector: 'app-train-details',
  imports: [TrainDetailsViewComponent],
  templateUrl: './train-details.component.html',
  styleUrl: './train-details.component.scss'
})
export class TrainDetailsComponent {
  isShow = signal<boolean>(false);

  options = signal<Station[]>([]);
  filteredFormStarions!: Observable<Station[]>;
  filteredDestinationStations!: Observable<Station[]>;
  trainForm: FormGroup<any> = new FormGroup({
    from_city: new FormControl('', [Validators.required]),
    to_city: new FormControl('', [Validators.required]),
    date_of_journey: new FormControl('', [Validators.required]),
    seat_class: new FormControl('S_CHAIR', [Validators.required]),
  });

  min: Date = new Date();
  max: Date = new Date(new Date().setDate(new Date().getDate() + 10));
  searchData = signal<any>({});

  constructor(
    private readonly _apiService: ApiService,
    private readonly _router: Router,
    private readonly _stationService: StationsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private location: Location,
    private dialog: MatSnackBar
  ) {

    // Initialization logic can go here
    var trainData: any = this._router.getCurrentNavigation()?.extras.state;
    debugger
    if (trainData?.trainForm) {
      this.isShow.update(() => true);
      this.trainForm.patchValue(trainData.trainForm)
      this.getStations();
    }
    else {
      if (isPlatformBrowser(platformId)) {
        this.location.back();
      }
    }
  }

  ngOnInit() {
    this.buildOptions();
    if (this.isShow()) {
      this.searchTrainsInfo();
    }
  }

  async searchTrainsInfo() {
    console.log(this.trainForm.value);
    console.log('date is', this.trainForm.get('date_of_journey')!.value);
    if (!this.trainForm.valid) {
      this.dialog.open('অনুগ্রহ করে সব ফিল্ড পূরণ করুন।', 'বন্ধ করুন', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn'],
      });
      return;
    }
    else {

      const dateObj = DateTime.fromMillis(this.trainForm.get('date_of_journey')!.value.ts);
      const date_of_journey = dateObj.toFormat('dd-MMM-yyyy');
      console.log('date_of_journey', date_of_journey);

      const data = {
        from_city: this.trainForm.get('from_city')!.value,
        to_city: this.trainForm.get('to_city')!.value,
        date_of_journey: date_of_journey,
        seat_class: this.trainForm.get('seat_class')!.value,
      };

      this.searchData.update(() => data);

      try {
        const value = await this._apiService.searchSeat(data);
        console.log('value', value);
        // এখান থেকে data UI তে পাঠান
      } catch (error) {
        console.error('API Error:', error);
        // ইউজারকে কিছু দেখান যেমন:
        this.dialog.open('সার্ভার থেকে ডেটা আনতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।', 'বন্ধ করুন', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      }
    }
  }

  buildOptions() {
    this.filteredFormStarions = this.trainForm.get('from_city')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.trainForm.get('to_city')!.value || ''))
    );
    this.filteredDestinationStations = this.trainForm.get('to_city')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.trainForm.get('from_city')!.value || ''))
    );
  }
  private _filter(value: string, selected: string): Station[] {
    const filterValue = value.toLowerCase();
    return this.options().filter(option => option.name.toLowerCase().includes(filterValue) && option.name.toLowerCase() !== selected.toLowerCase());
  }

  async getStations() {
    this.options.set(await this._stationService.getStations());
  }
}
