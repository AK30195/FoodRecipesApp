import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonList, IonItem, IonIcon } from '@ionic/angular/standalone';
import { UserDataService } from '../services/user-data-service/user-data-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule,
    IonList, IonItem]
})
export class SettingsPage {

  unitSetting: "metric" | "US" = "metric";

  constructor(private userData: UserDataService) { }

  async IonOneViewWillEnter() {
    const savedUnitSetting = await this.userData.get("unitSetting");
    if (savedUnitSetting === "metric" || savedUnitSetting === "US") {
      this.unitSetting = savedUnitSetting;
    }
  }

  async handleUnitSettingChange() {
    await this.userData.set("unitSetting", this.unitSetting);
  }

  

}
