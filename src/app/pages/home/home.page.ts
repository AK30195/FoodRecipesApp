import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http-service/http-service';
import { UserDataService } from '../../services/user-data-service/user-data-service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonInput,
  IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonMenuButton, IonButtons, IonSelect, 
  IonSelectOption} from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonButtons, CommonModule, FormsModule, RouterLink, IonHeader, IonToolbar,
     IonTitle, IonContent, IonButton, IonList, IonItem, IonInput, IonCard, IonCardHeader,
      IonCardContent, IonCardTitle, IonMenuButton, IonSelect, IonSelectOption],
})
export class HomePage {
  // Tracks user input for ingredient search
  searchString: string = "";
  // Holds user's selected dietary preferences
  dietaryPrefs: string[] = [];
  // Holds recipes returned from API based on search
  listedRecipes: any[] = [];
  // Holds user's max cook time preference
  maxCookTime: number | null = null; // in minutes
  // Base API URL for ingredient search
  baseAPIUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=70759a4f7911402abcc53d3c51d3b759";
  // Variable to indicate if a search has been performed
  hasSearched: boolean = false;

  constructor(private httpService: HttpService, private userData: UserDataService) {}

  // Search recipes based on user input
  async searchRecipes() {
    // Generate search params for ingredients entered by user
    const ingredientSearchParams = this.parseSearchInput(this.searchString);

    // Generate dietary preference params for API request
    let dietarySearchParams = '';
    if(this.dietaryPrefs.length > 0) {
      dietarySearchParams = `&diet=${this.dietaryPrefs.join(',')}`
    };

    // Generate max cook time param for API request
    let maxCookTimeParam = '';
    if(this.maxCookTime !== null) {
      maxCookTimeParam = `&maxReadyTime=${this.maxCookTime}`;
    }
    // Combine all search params
    const searchParams = `${ingredientSearchParams}${dietarySearchParams}${maxCookTimeParam}`;

    // Make API request with generated search params
    const res = await this.httpService.get(
      {url: `${this.baseAPIUrl}${searchParams}`}
    );

    // Store returned recipes for display
    this.listedRecipes = res.data.results;
    this.hasSearched = true;
  }

  // Converts user search input into params for API requests
  parseSearchInput(ingredients: string) : string {
    let ingredientArray = ingredients
      .toLowerCase() // Convert to lowercase for consistency
      .split(/[,\s]+/) // Split by comma or space to separate ingredients
      .map(word => word.replace(/[^a-z]/g, '')) // remove non-letters
      .filter(Boolean); // Check word isn't blank after processing

    // Join separated ingredient words as search params for url
    return `&query=${ingredientArray.join(' ')}`;
  }

  // Handle click on 'Recipe Details' button to store selected recipe ID
  async handleRecipeDetailsClick(recipeID : string) {
    await this.userData.set("selectedRecipeID", recipeID)
  }
}
