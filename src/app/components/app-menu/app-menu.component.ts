import { Component, OnInit } from '@angular/core';
import {IonMenu , IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonIcon, IonLabel} from '@ionic/angular/standalone'; 
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  imports: [IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
    IonItem, IonIcon, IonLabel, RouterLink],
})
export class AppMenuComponent {

  constructor() {
  }

}
