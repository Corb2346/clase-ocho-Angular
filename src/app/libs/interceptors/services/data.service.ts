import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public localStorage$: Observable<any>;
  public session$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  constructor() { 

    this.localStorage$ = this.session$.pipe(
      tap( (session) => {
        console.log(session);
        localStorage.setItem('Session',JSON.stringify(session));
      })
    )
    this.localStorage$.subscribe();
  }

  
}
