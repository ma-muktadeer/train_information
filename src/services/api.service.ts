import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { Station, TrainScearchPayload } from '../interfaces/Station';
import { TrainResponse } from '../interfaces/train-details';
import { ITrainResponse } from '../interfaces/train-routs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _token: string = 'token';

  private readonly _http = inject(HttpClient);
  // private readonly _baseUrl = '/api/v1.0';
  private sessionStore: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this._checkPlatform();
  }

  private _checkPlatform() {
    if (isPlatformBrowser(this.platformId)) {
      this.sessionStore = window.sessionStorage;
    }
  }
  // url = f"https://railspaapi.shohoz.com/v1.0/web/auth/sign-in"
  //     payload = {"mobile_number": mobile_number, "password": password}

  async login(payload: { mobile_number: string, password: string }): Promise<string> {

    const loginUri = '/api/v1.0/web/auth/sign-in';
    console.log('try to login ', payload);

    try {
      const token = await this._fetchToken(loginUri, payload);
      this.sessionStore.setItem(this._token, token);
      return token;
    } catch (error) {
      throw this._handleLoginError(error);
    }

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

  async searchSeat(data: TrainScearchPayload): Promise<TrainResponse> {
    const pathExtension = '/api/v1.0/web/bookings/search-trips-v2';
    try {
      return this._getRequestValue(data, pathExtension);
    } catch (error) {
      throw this._handleLoginError(error);
    }
  }

  async findTrainRouts(data: { departure_date_time: any; model: string; }): Promise<ITrainResponse> {
    debugger
    const pathExtension = '/api/v1.0/web/train-routes';
    try {
      return this._postRequestValue(JSON.stringify(data), pathExtension);
    } catch (error) {
      throw this._handleLoginError(error);
    }
  }

  private async _postRequestValue(data: string, pathExtension: string): Promise<ITrainResponse> {
    const url = `${pathExtension}`;
    console.log('Request URL:', url);
    console.log('Request Data:', data);
    const options = {
      ...this._buildSecHeader(),
      observe: 'response' as const
    };

    return lastValueFrom(this._http.post<ITrainResponse>(url, data, options)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw this._transformHttpError(err);
        })
      ))
      .then((response: HttpResponse<ITrainResponse>) => {
        if (response.body) {
          return response.body;
        }
        throw new Error('Empty response body');
      });
  }

  private async _fetchToken(
    url: string,
    payload: { mobile_number: string; password: string }
  ): Promise<string> {
    const cpayload = {
      ...payload,
      cft_response: "0.Cvuj7WdTEVpy0k9NLfWH3LD0k3L6qIKulju1y8fjkmeGH5rqFJcmGeAwAuOiDnCiqusW8kOhe5bj-CP0UJk1prhat6Nb3qhksAPTQP7Y3MzBlJBpMer1zR1c4UXRa3mXX5ybTwai-kcGniH9niToooT9nJSErnKZs5s1VLZA2dcgIuiaeNBda6BniaLJnrkdaGKcJDnrw8p0x0tqjT6FUYzu9MUbj_BLQ7yq_QAcoitoBbtuJOPsrUnLaqngCsu8AW_cVIVcFT-4Kh_yZncl81V0PHNhtFLHHf3l4e3BJ4Mvjlv749cbgW7H701VCCOFU0jk5ipzV91lLrEhFGe-cHlErXYAMH_StnN0cQIkEynHQCEzqOjVnwPYXLZYqXU1pNIuIMrHFpcRNtpMFbDOTCrJq8NL518oCozk9z5iZVEaVqRN1D9_ys6-63ZoEHHGH7-mK9uaEJSkFOFhMAA0Z1iG3_0tpdZiSPn0E-WpbSCfaSYQf9yxkNs8_SJyLhw4FZGumR5I60bNOur6oWmgruZlxwtTMjIJVHS_G3DJONyv8RAF4ckibaAOI8gqyUE2WP8jmQxFhLqN02IWKUL1Nl7JgTSMBsPiDq6vikHA0Bzz8llLs6kAuAs_0aeWB5VB6uhuGEv1hO1lso6Rr8MpRMczJaWg8OqUU8v-3lVvT7SruN3oAdkMhXI18q7rOykMmIeMBTYnuKyL69bx1z8HAo6Tsmcbo-p4NvcY4EW2_-Xcj5nLQqnC8CzH4WIaQEyTuoK0qP0lB7yFjmwMldmVIIYaK4tNabMuA9BBgNz-XIykfMVMYj_v_toASGW-9h0UvsnmyNt0m7-J8kQCUAl25wmjg7RWc-_P36YAe8DRV1K84Cwss7t6Q-q5LN-O_I4m73mIRILs0tbhrVikDUMwqsfNObsBv1T07BdALVZUhOY.SNMaKfkFlFKZt8_4i2fUiw.f87e360c850fbc65419d9ca835369dbcc500983b340b17e5c19b4553f18bce14"
    };
    const options = this._buildHeader();
    const response$ = this._http.post<ApiResponse>(url, cpayload, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw this._transformHttpError(error);
        })
      );
    const response = await lastValueFrom(response$);
    debugger
    return response.data?.token;
  }

  private _buildHeader(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
  }

  private _buildSecHeader(): { headers: HttpHeaders } {
    const baseHeaders = this._buildHeader();
    const token = this.getTokenSafely();

    if (token) {
      baseHeaders.headers = baseHeaders.headers.set('Authorization', `Bearer ${token}`);
    }

    return baseHeaders;
  }

  getTokenSafely(): string | null {
    try {
      return this.sessionStore?.getItem(this._token) ?? null;
    } catch (e) {
      console.error('Token access failed:', e);
      return null;
    }
  }
  private _transformHttpError(error: HttpErrorResponse): Error {
    if (error.status === 0) {
      // Network error (no internet, CORS, etc.)
      return new Error('Network error. Please check your connection.');
    }
    debugger
    switch (error.status) {
      case 400:
        throw {
          status: error.status,
          message: error.error?.message || 'Invalid request format.',
          originalError: error // পুরো error টা রাখুন (যদি দরকার হয়)
        };
      case 401:
      case 403:
        this.removeToken();
        throw {
          status: error.status,
          code: error.error?.error?.code || 'AUTH_ERROR',
          message: 'Invalid credentials.',
          originalError: error
        };
      case 404:
        throw {
          status: error.status,
          message: 'API endpoint not found.',
          originalError: error
        };
      case 500:
        throw {
          status: error.status,
          message: 'Server error. Try again later.',
          originalError: error
        };
      default:
        throw {
          status: error.status,
          message: `Unexpected error (${error.status}).`,
          originalError: error
        };
    }
  }
  removeToken() {
    this.sessionStore.removeItem(this._token);
  }

  private _handleLoginError(error: unknown): Error {
    if (error instanceof Error) {
      return error; // Already transformed
    }
    return new Error('Unknown login error.');
  }


  private async _getRequestValue(data: any, pathExtension: string): Promise<TrainResponse> {
    const url = `${pathExtension}`;
    console.log('Request URL:', url);
    console.log('Request Data:', data);
    const option = this._buildSecHeader();
    return lastValueFrom(this._http.get<any>(url, { params: data, headers: option.headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw this._transformHttpError(error);
        })
      )
    ).then(res => res);
  }
}
interface ApiResponse {
  data: {
    token: string;
    nid_validated?: number;
    message: string;
    user?: any;
  };
  extra?: any;
}
