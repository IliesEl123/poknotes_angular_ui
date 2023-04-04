import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private baseUrl = environment.baseUrl + 'api/players'; // URL de base de l'API pour les joueurs
  private notesUrl = '/notes'; // Sous-URL pour les notes

  constructor(private http: HttpClient) {}

  // Récupère toutes les notes associées à un joueur par son pseudo
  getNotesByPlayer(pseudo: string): Observable<any> {
    const url = `${this.baseUrl}/${pseudo}${this.notesUrl}`;
    return this.http.get(url);
  }

  // Crée une nouvelle note pour un joueur par son pseudo
  createNote(pseudo: string, note: Note): Observable<Note> {
    const url = `${this.baseUrl}/${pseudo}${this.notesUrl}`;
    return this.http.post<Note>(url, note);
  }

  // Met à jour une note existante par son id
  updateNote(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`${environment.baseUrl}api/notes/${id}`, note);
  }

  // Supprime une note existante par son id
  deleteNote(id: number): Observable<any> {
    const url = `${environment.baseUrl}api/notes/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
