import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Station } from '../interfaces/Station';
import { TrainResponse } from '../interfaces/train-details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = '/api/v1.0';

  constructor() { }

  async getStations(): Promise<Station[]> {

    try {
      const response = await await firstValueFrom(this._http.get<any>('assets/jsons/stations_en.json'));
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

  async searchSeat(data: any): Promise<TrainResponse> {
    const pathExtension = 'web/bookings/search-trips-v2';
    return this._getRequestValue(data, pathExtension);
  }

  private async _getRequestValue(data: any, pathExtension: string): Promise<TrainResponse> {
    const url = `${this._baseUrl}/${pathExtension}`;
    console.log('Request URL:', url);
    console.log('Request Data:', data);
    return lastValueFrom(this._http.get<any>(url, { params: data }));
  }
}
