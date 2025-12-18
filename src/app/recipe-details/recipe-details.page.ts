import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpService } from '../services/http-service/http-service';
import { UserDataService } from '../services/user-data-service/user-data-service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {

  selectedRecipeID!: string;
  selectedRecipe = {};
  baseAPIUrl = "https://api.spoonacular.com/recipes/";
  apiKey = "70759a4f7911402abcc53d3c51d3b759"

  constructor(private httpService: HttpService, private userData: UserDataService) { }

  async ngOnInit() {
  }


  async loadRecipeDetails() {
    const res = await this.httpService.get({
      url: `${this.baseAPIUrl}${this.selectedRecipeID}/information?apiKey=${this.apiKey}`
    });
    this.selectedRecipe = res.data;
    console.log(this.selectedRecipe);
  }

}
