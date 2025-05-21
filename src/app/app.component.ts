import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js';
import { MaterialModule } from './material.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'train_info';
}
