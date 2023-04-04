import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';
import { CustomizerService } from 'src/app/core/services/customizer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isDisabled = true;

  // Initialisation des champs du formulaire
  form: any = {
    username: null,
    password: null,
  };
  // Définition des variables liées à l'état de connexion
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  // Injection des services utilisés
  constructor(
    public customizer: CustomizerService, // Service de personnalisation de l'interface
    private authService: AuthService, // Service d'authentification
    private tokenStorage: TokenStorageService, // Service de gestion du token
    private router: Router // Service de navigation
  ) {}

  ngOnInit(): void {
    // Vérification de la présence d'un token de connexion au chargement de la page
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  // Fonction de soumission du formulaire de connexion
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken); // Sauvegarde du token de connexion
        this.tokenStorage.saveUser(data); // Sauvegarde des informations utilisateur
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/dashboard']); // Redirection vers la page de tableau de bord
      },
      error: (err) => {
        this.errorMessage = err.error.message; // Récupération du message d'erreur en cas d'échec de connexion
        this.isLoginFailed = true;
      },
    });
  }

  // Fonction de rafraîchissement de la page
  reloadPage(): void {
    window.location.reload();
  }
}
