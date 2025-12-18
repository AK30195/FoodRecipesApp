import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userStorage! : Storage;
  
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.userStorage = storage;
  }

  async set(key : string, value : any) {
    await this.userStorage?.set(key, value);
  }

  async get(key : string) {
    return await this.userStorage?.get(key);
  }

  async getSelectedRecipeID() {
    return await this.userStorage?.get("selectedRecipeID");
  }
}
