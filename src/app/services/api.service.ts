import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Station } from '../interfaces/Station';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private readonly _http = inject(HttpClient);

  constructor() { }

  getStations(): Observable<Station[]> {
    // *** CRITICAL CHANGE: Use this.http.get() instead of global fetch() ***
    return this._http.get<any[]>('/assets/jsons/stations.json').pipe(
      map(data => {
        // Ensure 'data' is an array before mapping
        if (!Array.isArray(data)) {
          console.warn('Expected an array from stations.json, but received:', data);
          return []; // Return empty array or throw an error
        }

        const stations: Station[] = data.map((station: any, index: number) => ({
          id: index, // Assigning index as ID, common if JSON lacks a unique ID
          name: this._nameFilter(station), // Apply the name filter
          value: station // Assuming 'value' exists in your JSON
        }));
        return stations;
      }),
      catchError(error => {
        // Log the error for debugging
        console.error('Error fetching stations:', error);
        // Re-throw a more specific error for the component to handle
        // Using throwError(() => new Error(...)) is the modern RxJS way
        return throwError(() => new Error(`Failed to load station data from /assets/jsons/stations.json. Details: ${error.message || error.statusText || 'Unknown error'}`));
      })
    );
  }
  
  private _nameFilter(name: string): string {
    return name.replace(/'/g, '');
  }
}
