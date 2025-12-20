import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userStorage! : Storage;
  private ready: Promise<void>;
  
  constructor(private storage: Storage) {
    this.ready =  this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.userStorage = storage;
  }

  async set(key : string, value : any) {
    await this.ready;
    await this.userStorage?.set(key, value);
  }

  async get(key : string) {
    await this.ready;
    return await this.userStorage?.get(key);
  }

  async getSelectedRecipeID() {
    return await this.get("selectedRecipeID");
  }

  async getSelectedUnitSystem() {
    return await this.get("unitSetting");
  }

  async setThemeSetting(theme: "light" | "dark") {
    await this.set("themeSetting", theme);
    this.applyThemeSetting(theme);
  }

  applyThemeSetting(theme: "light" | "dark") {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

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

  async deleteRecipeFromFavourites(recipeID: string) {
    const favRecipes = await this.get("favRecipes");

    const updatedRecipes = favRecipes.filter(
      (recipe: { id: number; }) => recipe.id !== parseInt(recipeID)
    );
    this.set("favRecipes", updatedRecipes);
  }
  
  async isRecipeAFavourite(recipeID : string) : Promise<boolean> {
    const favRecipes = await this.get("favRecipes");

    if(favRecipes) {
      return favRecipes.some((recipe: { id: number; }) => recipe.id === parseInt(recipeID));
    }

    return false;
  }
}
