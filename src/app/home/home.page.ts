import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../services/http-service/http-service';
import { UserDataService } from '../services/user-data-service/user-data-service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonInput, IonIcon,
  IonCard, IonCardHeader, IonCardContent, IonCardTitle
 } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
     IonList, IonItem, IonInput, IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardTitle
  ],
})
export class HomePage {

  searchString: string = "";
  listedRecipes: any[] = [];
  baseAPIUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=70759a4f7911402abcc53d3c51d3b759";

  constructor(private httpService: HttpService, private userData: UserDataService) {
    
  }

  async searchByIngredients() {
    const ingredientSearchParams = this.parseSearchInput(this.searchString);
    const res = await this.httpService.get({url: `${this.baseAPIUrl}${ingredientSearchParams}`});
    this.listedRecipes = res.data.results;
  }

  // Converts user search input into params for API requests
  parseSearchInput(ingredients: string) : string {
    let ingredientArray = ingredients
      .toLowerCase() 
      .split(/[,\s]+/) // Split by comma or space
      .map(word => word.replace(/[^a-z]/g, '')) // remove non-letters
      .filter(Boolean);

    return `&query=${ingredientArray.join(' ')}`;
  }
}
