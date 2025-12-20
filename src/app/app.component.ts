import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { settingsOutline, heartOutline, homeOutline} from 'ionicons/icons';
import { UserDataService } from './services/user-data-service/user-data-service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, AppMenuComponent],
})
export class AppComponent implements OnInit {
  constructor(private userData: UserDataService) {
    addIcons({settingsOutline, heartOutline, homeOutline});
  }

  async ngOnInit() {
    const theme = await this.userData.get("themeSetting");
    if(theme) {
      this.userData.applyThemeSetting(theme);
    }
  }
}
