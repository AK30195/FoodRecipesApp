import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { settingsOutline, heartOutline, homeOutline} from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, AppMenuComponent],
})
export class AppComponent {
  constructor() {
    addIcons({settingsOutline, heartOutline, homeOutline});
  }
}
