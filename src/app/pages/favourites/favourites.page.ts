import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, 
  IonCardTitle, IonButton, IonItem, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { UserDataService } from 'src/app/services/user-data-service/user-data-service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardContent,IonCardHeader, IonCardTitle, IonButton, RouterLink, IonItem, IonMenuButton 
  ]
})
export class FavouritesPage {

  favouriteRecipes: any[] = [];

  constructor( private userData: UserDataService) { }

  // Load favourite recipes from user data service when entering view
  async ionViewWillEnter() {
    this.favouriteRecipes = await this.userData.get("favRecipes");
  }

  // Handle click on 'Recipe Details' button to set selected recipe ID for details page
  async handleRecipeDetailsClick(recipeID : string) {
    await this.userData.set("selectedRecipeID", recipeID)
  }
}
