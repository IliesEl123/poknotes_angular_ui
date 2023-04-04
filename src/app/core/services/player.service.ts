import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  Observable,
  catchError,
  concat,
  forkJoin,
  map,
  of,
  switchMap,
  toArray,
} from 'rxjs';
import { NoteService } from './note.service';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private baseUrl = environment.baseUrl + 'api/players'; // URL de base de l'API pour les joueurs

  constructor(private http: HttpClient, private noteService: NoteService) {}

  // Récupère un joueur par son pseudo
  getPlayer(pseudo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${pseudo}`);
  }

  // Crée un joueur
  createPlayer(player: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, player);
  }

  // Met à jour un joueur
  updatePlayer(pseudo: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${pseudo}`, value);
  }

  // Supprime un joueur
  deletePlayer(pseudo: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${pseudo}`, {
      responseType: 'text',
    });
  }

  // Récupère la liste des joueurs
  getPlayersList(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      switchMap((players) => {
        // Créer un tableau d'observables pour chaque joueur
        const playerObservables: Observable<any>[] = players.map((player) =>
          // Récupérer les notes du joueur
          this.noteService.getNotesByPlayer(player.pseudo).pipe(
            map((notes) => {
              // Ajouter les notes au joueur
              player.notes = notes;
              return player;
            }),
            catchError((error) => {
              console.error(error);
              return of(player);
            })
          )
        );
        // Concaténer les observables en un seul observable contenant la liste complète de joueurs
        return concat(...playerObservables).pipe(toArray());
      }),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  // Récupère la liste des joueurs dont le pseudo contient une chaîne de caractères
  getPlayersByPseudoContaining(pseudo: string): Observable<any> {
    return this.http.get<Player[]>(`${this.baseUrl}/search/${pseudo}`).pipe(
      switchMap((players) => {
        const playerObservables: Observable<Player>[] = players.map(
          (player) => {
            return this.addNotesToPlayer(player);
          }
        );
        return forkJoin(playerObservables);
      }),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  addNotesToPlayer(player: Player): Observable<any> {
    return this.noteService.getNotesByPlayer(player.pseudo).pipe(
      map((notes) => {
        player.notes = notes;
        return player;
      })
    );
  }
}
