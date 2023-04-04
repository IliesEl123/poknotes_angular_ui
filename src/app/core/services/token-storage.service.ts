import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token'; // clé pour stocker le jeton d'authentification
const USER_KEY = 'auth-user'; // clé pour stocker les informations de l'utilisateur connecté

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear(); // supprime toutes les données stockées en session
    window.location.reload(); // recharge la page pour que les changements prennent effet
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY); // supprime la clé si elle existe déjà
    window.sessionStorage.setItem(TOKEN_KEY, token); // stocke le jeton d'authentification dans la session
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY); // récupère le jeton d'authentification depuis la session
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY); // supprime la clé si elle existe déjà
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user)); // stocke les informations de l'utilisateur connecté dans la session
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY); // récupère les informations de l'utilisateur connecté depuis la session
    if (user) {
      return JSON.parse(user); // retourne les informations de l'utilisateur connecté sous forme d'objet JSON
    }
    return {}; // retourne un objet vide si les informations de l'utilisateur n'existent pas dans la session
  }
}
