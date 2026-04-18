import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Favorites {
  // key
  private key = 'favoriteHomes'; // this key is our local storage

  getFavorites(): any[] {
    // store array of favorite homes that user chooses
    const data = localStorage.getItem(this.key); // grab that key
    return data ? JSON.parse(data) : [];
  }

  // isFavorite(home: )
}
