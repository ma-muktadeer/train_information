import { inject, Injectable } from '@angular/core';
import { Station } from '../interfaces/Station';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  private readonly _api = inject(ApiService);
  private _stations: any;

  constructor() {
    this.readStations();
    
  }
  readStations() {
   if (!this._stations) {
      this._stations = this._api.getStations();
    }
  }

  getStations(): Station[] {
    try {
      debugger
      const stations = this._stations;
      if (stations) {
        return stations;
      } else {
        this.readStations();
        return this._stations;  

      }
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  }

}
