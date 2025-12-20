import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // Ionic Storage instance
  private userStorage! : Storage;
  // Promise to track storage creation before use
  private ready: Promise<void>;
  
  constructor(private storage: Storage) {
    this.ready =  this.init();
  }

  // Initialises Ionic Storage
  private async init() {
    const storage = await this.storage.create();
    this.userStorage = storage;
  }

  // Sets a key-value pair in storage
  async set(key : string, value : any) {
    await this.ready;
    await this.userStorage?.set(key, value);
  }

  // Gets a value by key from storage
  async get(key : string) {
    await this.ready;
    return await this.userStorage?.get(key);
  }

  // Gets selected recipe ID from storage
  async getSelectedRecipeID() {
    return await this.get("selectedRecipeID");
  }

  // Gets selected unit system from storage
  async getSelectedUnitSystem() {
    return await this.get("unitSetting");
  }

  // Sets theme setting in storage and applies it
  async setThemeSetting(theme: "light" | "dark") {
    await this.set("themeSetting", theme);
    this.applyThemeSetting(theme);
  }

  // Applies theme setting to DOM
  applyThemeSetting(theme: "light" | "dark") {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  // Adds a recipe to favourites
  async addRecipeToFavourites(recipeID: number, recipeTitle: string, recipeImage: string) {
    const newRecipe = {
      id: recipeID,
      title: recipeTitle,
      image: recipeImage
    }

    let favRecipes = await this.get("favRecipes");

    if(!favRecipes) {
      this.set("favRecipes", [newRecipe])
    } else {
      this.set("favRecipes", [...favRecipes, newRecipe])
    } 
  }

  // Deletes a recipe from favourites
  async deleteRecipeFromFavourites(recipeID: string) {
    const favRecipes = await this.get("favRecipes");

    const updatedRecipes = favRecipes.filter(
      (recipe: { id: number; }) => recipe.id !== parseInt(recipeID)
    );
    this.set("favRecipes", updatedRecipes);
  }
  
  // Checks if a recipe is in favourites
  async isRecipeAFavourite(recipeID : string) : Promise<boolean> {
    const favRecipes = await this.get("favRecipes");

    if(favRecipes) {
      return favRecipes.some((recipe: { id: number; }) => recipe.id === parseInt(recipeID));
    }

    return false;
  }
}
