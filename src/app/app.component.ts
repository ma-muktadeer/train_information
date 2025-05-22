import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StationsService } from '../services/stations.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _stationsService = inject(StationsService);
  title = 'train_information';

  ngOnInit() {
  }

}
