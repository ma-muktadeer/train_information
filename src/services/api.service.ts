import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Station } from '../interfaces/Station';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private readonly _http = inject(HttpClient);

  constructor() { }

  async getStations(): Promise<Station[]> {
    // const response = await fetch('assets/jsons/stations_en.json');

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    // const data = await response.json();
    // return data.map((station: any, index: number) => ({
    //   id: index++,
    //   name: this._nameFilter(station),
    //   value: station,
    // }));

    try {
      // const response = await this._http.get<Station[]>('assets/jsons/stations_en.json').toPromise();
      const response = await await firstValueFrom(this._http.get<any>('assets/jsons/stations_en.json'));
      console.log('Response:', response);
      if (response) {
        return response.stations.map((station: any, index: number) => ({
          id: index++,
          name: this._nameFilter(station),
          value: station,
        }));
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }

  }

  private _nameFilter(name: string): string {
    return name.replace(/'/g, '');
  }
}
