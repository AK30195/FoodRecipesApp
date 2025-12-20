import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, 
  IonList, IonItem, IonIcon, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { UserDataService } from '../../services/user-data-service/user-data-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule,
    IonList, IonItem, IonMenuButton]
})
export class SettingsPage {
  // Variable to hold the selected unit setting
  unitSetting: "metric" | "US" = "metric";
  // Variable to hold the selected theme setting
  themeSetting: "light" | "dark" = "light";


  constructor(private userData: UserDataService) { }

  // Load the saved user settings when the view is about to enter
  async ionViewWillEnter() {
     this.unitSetting =
    (await this.userData.get("unitSetting")) ?? "metric";

    this.themeSetting =
    (await this.userData.get("themeSetting")) ?? "light";

  }
  
  // Handle changes to the unit setting
  async handleUnitSettingChange() {
    await this.userData.set("unitSetting", this.unitSetting);
  }

  async handleThemeSettingChange() {
    await this.userData.setThemeSetting(this.themeSetting);
  }


}
