import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, 
  IonCardTitle, IonButton, IonItem } from '@ionic/angular/standalone';
import { HttpService } from 'src/app/services/http-service/http-service';
import { UserDataService } from 'src/app/services/user-data-service/user-data-service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardContent,IonCardHeader, IonCardTitle, IonButton, RouterLink, IonItem 
  ]
})
export class FavouritesPage {

  favouriteRecipes: any[] = [];

  constructor(private httpService: HttpService, private userData: UserDataService) { }

  async ionViewWillEnter() {
    this.favouriteRecipes = await this.userData.get("favRecipes");
  }

  // Handle click on 'Recipe Details' button to store selected recipe ID
  async handleRecipeDetailsClick(recipeID : string) {
    await this.userData.set("selectedRecipeID", recipeID)
  }
}
