import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
    AsyncPipe, 
  ],
  templateUrl: './train-matrix.component.html',
  styleUrl: './train-matrix.component.scss'
})
export class TrainMatrixComponent {
  private readonly _stationService= inject(StationsService);
  myControl = new FormControl('');
  options= signal<Station[]>([]);
  filteredOptions!: Observable<Station[]>;
  
  constructor() {
    this.getStations();
  }
 async getStations() {
    this.options.set(await this._stationService.getStations());
    console.log('stations list is',this.options());
    
  }

  ngOnInit() {
    debugger
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }
  private _filter(value: string): Station[] {
    const filterValue = value.toLowerCase();
    return this.options().filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
