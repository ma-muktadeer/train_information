import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // config = inject(APP_CONFIG);
  title = 'train_information';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
    private readonly _apiService: ApiService, private readonly _rout: Router
  ) {
    this.setMatIcons();
    //  console.log(this.config);

  }

  ngOnInit() {
    if (!this._apiService.getTokenSafely()) {
      this._rout.navigate(['/login']);

    } else {
      console.log('Ok');

    }
  }


setMatIcons() {
  this.matIconRegistry.addSvgIcon(
    'train_icon',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/train.svg')
  );
  this.matIconRegistry.addSvgIcon(
    'taka_icon',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/attach_money.svg')
  );
  this.matIconRegistry.addSvgIcon(
    'calendar_icon',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar_month.svg')
  );
  this.matIconRegistry.addSvgIcon(
    'event_icon',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/event_available.svg')
  );
  this.matIconRegistry.addSvgIcon(
    'feedback_icon',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/voice_chat.svg')
  );
  this.matIconRegistry.addSvgIcon(
    'search_icon',
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg')
  );
}

}
