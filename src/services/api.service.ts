import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Station } from '../interfaces/Station';
import { TrainResponse } from '../interfaces/train-details';
import { ITrainResponse } from '../interfaces/train-routs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _http = inject(HttpClient);
  // private readonly _baseUrl = '/api/v1.0';

  constructor() { }


// url = f"https://railspaapi.shohoz.com/v1.0/web/auth/sign-in"
//     payload = {"mobile_number": mobile_number, "password": password}

async login(payload : {mobile_number: string, password: string}): Promise<string>{

  const loginUri = '/api/v1.0/web/auth/sign-in';
  console.log('try to login ', payload);

return this._fatchToken(loginUri, payload);

}

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
    const pathExtension = '/api/v1.0/web/bookings/search-trips-v2';
    return this._getRequestValue(data, pathExtension);
  }

  async findTrainRouts(data: { departure_date_time: any; model: string; }): Promise<ITrainResponse> {
    debugger
    const pathExtension = '/api/v1.0/web/train-routes';
    return this._postRequestValue(JSON.stringify(data), pathExtension);
  }

  private async _postRequestValue(data: string, pathExtension: string): Promise<ITrainResponse> {
     const url = `${pathExtension}`;
    console.log('Request URL:', url);
    console.log('Request Data:', data);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as const
    };

    return lastValueFrom(this._http.post<ITrainResponse>(url, data, options))
      .then(response => {
        if (response.body) {
          return { ...response.body };
        }
        throw new Error('Empty response body');
      });
  }

   private async _fatchToken(loginUri: string, payload: { mobile_number: string; password: string; }): Promise<string> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as const,
    }
    return lastValueFrom(this._http.post<string>(loginUri, payload, options))
    .then(res=> {
      if(res.body){
        return res.body;
      }
      throw new Error('Empty response body');
    });
  }


  private async _getRequestValue(data: any, pathExtension: string): Promise<TrainResponse> {
    const url = `${pathExtension}`;
    console.log('Request URL:', url);
    console.log('Request Data:', data);
    return lastValueFrom(this._http.get<any>(url, { params: data }));
  }
}
