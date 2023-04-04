import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomizerService {
  // Variables pour les options de personnalisation
  dir: any = 'ltr'; // Valeur possible rtl pour aligner à droite
  dark: boolean = true; // Valeur possible true pour un thème sombre
  minisidebar: boolean = false; // Valeur possible true pour une barre latérale réduite
  horizontal: boolean = false; // Valeur possible true pour une disposition horizontale
  currentTheme: string = 'orangeTheme'; // Valeur possible orangeTheme, blueTheme, greenTheme, purpleTheme, indigoTheme, redTheme
  fixedTopbar: boolean = true; // Valeur possible true pour une barre de navigation fixe

  // Sujets observables pour les options de personnalisation
  darkState = new Subject();
  public darktoggleState$ = this.darkState.asObservable();

  horizontalState = new Subject();
  public horizontaltoggle = this.horizontalState.asObservable();

  constructor() {}

  // Méthode pour basculer entre un thème clair et sombre
  toggleDark() {
    this.dark = !this.dark;
    this.darkState.next(this.dark);
  }

  // Méthode pour basculer entre une disposition verticale et horizontale
  toggleHorizontal() {
    this.horizontal = !this.horizontal;
    this.horizontalState.next(this.horizontal);
  }

  // Méthode pour définir le thème actuel
  setCurrentTheme(cvalue: any) {
    this.currentTheme = cvalue;
  }
}
