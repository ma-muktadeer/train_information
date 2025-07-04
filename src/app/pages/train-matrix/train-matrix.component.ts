import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { bounceInUpOnEnterAnimation, fadeInOnEnterAnimation, fadeInUpOnEnterAnimation, slideInLeftOnEnterAnimation } from 'angular-animations';
import { map, Observable, startWith } from 'rxjs';
import { Station } from '../../../interfaces/Station';
import { StationsService } from '../../../services/stations.service';


@Component({
  selector: 'app-train-matrix',
  imports: [
    FormsModule, // Required for ngModel
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatDividerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    // MatNativeDateModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './train-matrix.component.html',
  styleUrl: './train-matrix.component.scss',
  animations: [
    slideInLeftOnEnterAnimation({ anchor: 'left', delay: 100 }),
    slideInLeftOnEnterAnimation({ anchor: 'titleAnim', duration: 800 }),
    fadeInUpOnEnterAnimation({ anchor: 'formAnim', duration: 600, delay: 200 }),
    bounceInUpOnEnterAnimation({ anchor: 'btnAnim', delay: 600 }),
    fadeInOnEnterAnimation({ anchor: 'footerAnim', delay: 1000 })
  ]
})
export class TrainMatrixComponent {

  private readonly _stationService = inject(StationsService);
  options = signal<Station[]>([]);
  filteredFormStarions!: Observable<Station[]>;
  filteredDestinationStations!: Observable<Station[]>;
  iconName: string = 'train_icon';

  trainForm: FormGroup<any> = new FormGroup({
    from_city: new FormControl('', [Validators.required]),
    to_city: new FormControl('', [Validators.required]),
    date_of_journey: new FormControl('', [Validators.required]),
    seat_class: new FormControl('S_CHAIR', [Validators.required]),
  });

  min: Date = new Date();
  max: Date = new Date(new Date().setDate(new Date().getDate() + 10));
  constructor(private readonly _router: Router,
    private snack: MatSnackBar) {
    this.getStations();
  }
  async getStations() {
    this.options.set(await this._stationService.getStations());
  }

  ngOnInit() {
    this.buildOptions()
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
  async search() {

    if (this.trainForm.invalid) {
      this.snack.open('অনুগ্রহ করে সব ফিল্ড পূরণ করুন।', 'বন্ধ করুন', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn'],
      });
      return;
    }
    this._router.navigate(['/train-details/'], {
      state: {
        trainForm: this.trainForm.value,
      }
    });


  }

}
