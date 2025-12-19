import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonButton, 
  IonCardSubtitle, IonList, IonListHeader, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { HttpService } from '../../services/http-service/http-service';
import { UserDataService } from '../../services/user-data-service/user-data-service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent,
    IonCardTitle, IonCardHeader, CommonModule, FormsModule, IonCardSubtitle, IonListHeader, IonItem, IonIcon]
})
export class RecipeDetailsPage {
  // Local variable to hold selected recipe ID
  selectedRecipeID!: string;
  // Object to hold selected recipe details
  selectedRecipe: any = {};
  // Local variable to hold selected unit system
  selectedUnitSystem!: "metric" | "US";

  // Used for API string literal in loadRecipeDetails()
  baseAPIUrl = "https://api.spoonacular.com/recipes/";
  apiKey = "70759a4f7911402abcc53d3c51d3b759"

  // Base url for loading ingredient images. Used in html template
  ingredientImagesBaseUrl = "https://spoonacular.com/cdn/ingredients_100x100/";

  constructor(private httpService: HttpService, private userData: UserDataService) { }

  async ionViewWillEnter() {
    // Get selected recipe ID from user data service and assign to local variable
    this.selectedRecipeID = await this.userData.getSelectedRecipeID();
    // Get selected setting for unit measures for recipe ingredients
    this.selectedUnitSystem = await this.userData.getSelectedUnitSystem();
    
    // Log to console if no selected recipe ID found
    if(!this.selectedRecipeID) {
      console.error("No selected recipe ID found in user data.");
      return;
    }

    // If no user selected unit system default to metric
    if(!this.selectedUnitSystem) {
      this.selectedUnitSystem = "metric";
    }

    await this.loadRecipeDetails();
  }

  // Load details for selected recipe from API
  async loadRecipeDetails() {
    const res = await this.httpService.get({
      url: `${this.baseAPIUrl}${this.selectedRecipeID}/information?apiKey=${this.apiKey}`
    });
    this.selectedRecipe = res.data;
    console.log(this.selectedRecipe);
  }

}
