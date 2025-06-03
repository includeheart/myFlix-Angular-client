import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  editable: boolean = false;
  updatedUser: any = {};
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: UserRegistrationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavoriteMovies();
  }

  getUserProfile(): void {
    const username = localStorage.getItem('user');
    if (!username) return;
    this.fetchApiData.getUser(username).subscribe((resp) => {
      this.user = resp;
      this.updatedUser = { ...resp };
    });
  }

  enableEdit(): void {
    this.editable = true;
    this.updatedUser = { ...this.user };
  }

  saveProfile(): void {
    const username = localStorage.getItem('user');
    if (!username) return;
    this.fetchApiData.editUser(username, this.updatedUser).subscribe((resp) => {
      this.user = resp;
      this.editable = false;
      this.snackBar.open('Profile updated!', 'OK', { duration: 2000 });
    }, (error) => {
      this.snackBar.open('Update failed.', 'OK', { duration: 2000 });
    });
  }

  cancelEdit(): void {
    this.editable = false;
    this.updatedUser = { ...this.user };
  }

  goBack(): void {
    this.router.navigate(['movies']);
  }

  getFavoriteMovies(): void {
    const username = localStorage.getItem('user');
    if (!username) return;
    this.fetchApiData.getUser(username).subscribe((user) => {
      this.fetchApiData.getAllMovies().subscribe((movies) => {
        this.favoriteMovies = movies.filter((movie: any) =>
          user.FavoriteMovies.includes(movie._id)
        );
      });
    }, (error) => {
      this.snackBar.open('Failed to load favorite movies.', 'OK', { duration: 2000 });
    });
  }

  removeFromFavorites(movieId: string): void {
    const username = localStorage.getItem('user');
    if (!username) return;
    this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);
      this.snackBar.open('Removed from favorites.', 'OK', { duration: 2000 });
    }, (error) => {
      this.snackBar.open('Failed to remove favorite.', 'OK', { duration: 2000 });
    });
  }
}
