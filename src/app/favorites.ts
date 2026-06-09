import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Favorites {
  private key = 'favoriteHomes';

  getFavorites(): any[] {
    const data = localStorage.getItem(this.key); 
    return data ? JSON.parse(data) : [];
  }
}
