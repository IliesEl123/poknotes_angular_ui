import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../../core/models/player.model';
import { Note } from '../../core/models/note.model';
import { Observable, concat, of } from 'rxjs';
import { PlayerService } from 'src/app/core/services/player.service';
import { first, map } from 'rxjs/operators';
import { Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/core/services/note.service';

// Interface pour les données d'un joueur
export interface PlayerData {
  pseudo: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  content?: string;
  searchText: string;
  notes: Note[] = [];

  players$: Observable<Player[]>;
  filteredPlayers$: Observable<Player[]> = new Observable<Player[]>();
  player: Player;

  constructor(
    public dialog: MatDialog,
    private playerService: PlayerService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {}

  // A redécouper en composants

  // Fonction pour afficher tous les joueurs
  allPlayers() {
    this.players$ = this.playerService.getPlayersList();
  }

  // Fonction pour vider la liste de joueurs
  emptyPlayersList() {
    this.players$ = undefined;
  }

  // Fonction pour chercher un joueur par son pseudo
  searchPlayer() {
    if (this.searchText) {
      this.filteredPlayers$ = this.playerService.getPlayersByPseudoContaining(
        this.searchText
      );
    } else {
      this.filteredPlayers$ = this.players$;
    }
  }

  // Fonction pour ajouter un joueur à la liste des joueurs depuis la barre de recherche
  addPlayerToListSearch(playerPseudo: string) {
    this.playerService
      .getPlayersByPseudoContaining(playerPseudo)
      .pipe(first())
      .subscribe((player) => {
        if (!this.players$) {
          this.players$ = of(player);
        } else {
          this.players$ = this.players$.pipe(
            map((players) => {
              if (!players) {
                players = [];
              }
              if (!players.find((p) => p.pseudo === player[0].pseudo)) {
                players.push(player[0]);
              }
              return players;
            })
          );
        }
      });
  }

  // Fonction pour ajouter un joueur à la liste des joueurs
  addPlayerToList(player: Player) {
    if (!this.players$) {
      this.players$ = of([player]);
    } else {
      this.players$ = this.players$.pipe(
        map((players) => {
          // Vérifier si le joueur existe déjà dans la liste
          const playerIndex = players.findIndex(
            (p) => p.pseudo === player.pseudo
          );

          if (playerIndex === -1) {
            // Ajouter le joueur à la liste s'il n'existe pas déjà
            players.push(player);
          }

          return players;
        })
      );
    }
  }

  // Fonction pour retirer un joueur de la liste
  removePlayer(pseudo: string) {
    this.players$ = this.players$.pipe(
      map((players) => players.filter((player) => player.pseudo !== pseudo))
    );
  }

  // Fonction pour supprimer un joueur
  suppressPlayer(pseudo: string) {
    this.playerService.deletePlayer(pseudo).subscribe({
      next: () => {
        console.log(`Le joueur ${pseudo} a été supprimé avec succès`);
        this.removePlayer(pseudo);
      },
      error: console.error,
    });
  }

  // Ajouter une note à un joueur
  addNoteToPlayer(player: Player) {
    // Vérifier si le champ noteText est non vide avant de créer un objet Note
    if (player.noteText && player.noteText.trim() !== '') {
      const note: Note = {
        content: `- ${player.noteText}`,
        id: 0,
      };
      this.noteService.createNote(player.pseudo, note).subscribe((newNote) => {
        if (player.notes) {
          player.notes.push(newNote);
        } else {
          player.notes = [newNote];
        }
        player.noteText = ''; // Réinitialiser le champ de texte
      });
    }
  }

  // Mettre à jour une note
  updateNote = (player: Player, note: Note) => {
    this.noteService.updateNote(note.id, note).subscribe(
      (updatedNote) => {
        const noteIndex = player.notes.findIndex(
          (n) => n.id === updatedNote.id
        );
        player.notes[noteIndex] = updatedNote;
      },
      (error) => console.log(error)
    );
  };

  // Supprimer une note d'un joueur
  deleteNoteFromPlayer(player: Player, noteId: number) {
    this.noteService.deleteNote(noteId).subscribe(() => {
      // Supprimer la note du tableau de notes du joueur
      player.notes = player.notes.filter((note) => note.id !== noteId);
    });
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    obj.players = this.players$;
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log(result.event);
      console.log(result.player);
      if (result.event === 'Add') {
        this.addPlayerToList(result.player);
      }
    });
  }
}

// Composant pour le contenu de la boîte de dialogue pour ajouter un joueur
@Component({
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContentComponent {
  player: Player = new Player();

  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    // @Optional() est utilisé pour éviter une erreur si aucune donnée n'est transmise
    @Optional() @Inject(MAT_DIALOG_DATA) public data: PlayerData,
    public playerService: PlayerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Fonction pour ajouter un joueur
  addPlayer() {
    this.playerService.createPlayer(this.player).subscribe(
      () => {
        const result = { event: 'Add', player: this.player }; // Créer un objet avec la propriété "event" définie sur "Add"
        this.dialogRef.close(result); // Fermer la boîte de dialogue et renvoyer l'objet avec la propriété "event"
        this.snackBar.open('Joueur ajouté avec succès !', 'Fermer', {
          duration: 3000,
        });
      },
      (error) => {
        if (error.status === 500) {
          this.snackBar.open('Ce joueur existe déjà !', 'Fermer', {
            duration: 3000,
          });
        }
      }
    );
  }
}
