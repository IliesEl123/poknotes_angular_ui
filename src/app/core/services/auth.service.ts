import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Options de la requête HTTP pour spécifier le type de contenu envoyé au serveur
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Base URL pour les appels à l'API d'authentification
  baseUrl = environment.baseUrl + 'api/auth/';

  constructor(private http: HttpClient) {}

  // Fonction pour se connecter à l'API avec un nom d'utilisateur et un mot de passe
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  // Fonction pour s'inscrire sur l'API avec un nom d'utilisateur, une adresse e-mail et un mot de passe
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
}
