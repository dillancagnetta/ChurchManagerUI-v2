import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getItem(key: string): Observable<string | null> {
    const data = localStorage.getItem(key);
    if (data) {
      return of(data);
    }
    return of(null);
  }

  setItem(key: string, data: string): Observable<string> {
    localStorage.setItem(key, data);
    return of(data);
  }

  removeItem(key: string): Observable<boolean> {
    localStorage.removeItem(key);
    return of(true);
  }
}
