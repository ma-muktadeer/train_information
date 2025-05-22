import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js';
import { Station } from './interfaces/Station';
import { MaterialModule } from './material.module';
import { StationsService } from './services/stations.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly _stationsService = inject(StationsService);
  title = 'train_info';
  st: Station[] = [];

  ngOnInit() {
    // this.st = this._stationsService.getStations();
  }
  readFile() {
    this.st = this._stationsService.getStations();
  }
}
