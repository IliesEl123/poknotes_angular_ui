import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavService {
  // BehaviorSubject qui permet de suivre la dernière URL visitée
  public currentUrl = new BehaviorSubject<any>(undefined);

  constructor(private router: Router) {
    // Souscrit à tous les événements de routage pour détecter la fin d'une navigation
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Met à jour la dernière URL visitée avec l'URL de la navigation récemment terminée
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }
}
