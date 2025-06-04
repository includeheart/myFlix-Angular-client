import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Displays and manages the user's profile, including editing user info
 * and managing favorite movies.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  /** User profile data */
  user: any = {};
  /** Whether the profile is in edit mode */
  editable: boolean = false;
  /** Stores updated user data during editing */
  updatedUser: any = {};
  /** List of user's favorite movies */
  favoriteMovies: any[] = [];

  /**
   * @param fetchApiData Service for API requests
   * @param snackBar Angular Material snackbar for notifications
   * @param router Angular router for navigation
   */
  constructor(
    private fetchApiData: UserRegistrationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /** Loads user profile and favorite movies on initialization */
  ngOnInit(): void {
    this.getUserProfile();
    this.getFavoriteMovies();
  }

  /** Fetches the user's profile data */
  getUserProfile(): void {
    const username = localStorage.getItem('user');
    if (!username) return;
    this.fetchApiData.getUser(username).subscribe((resp) => {
      this.user = resp;
      this.updatedUser = { ...resp };
    });
  }

  /** Enables edit mode for the profile */
  enableEdit(): void {
    this.editable = true;
    this.updatedUser = { ...this.user };
    if (this.updatedUser.Birthday) {
      this.updatedUser.Birthday = this.updatedUser.Birthday.slice(0, 10);
    }
  }

  /** Saves the updated profile data */
  saveProfile(): void {
    const username = localStorage.getItem('user');
    if (!username) return;
    if (this.updatedUser.Birthday && this.updatedUser.Birthday.length === 10) {
      this.updatedUser.Birthday = new Date(this.updatedUser.Birthday).toISOString();
    }

    this.fetchApiData.editUser(username, this.updatedUser).subscribe((resp) => {
      this.user = resp;
      this.editable = false;
      this.snackBar.open('Profile updated!', 'OK', { duration: 2000 });
    }, (error) => {
      this.snackBar.open('Update failed.', 'OK', { duration: 2000 });
    });
  }

  /** Cancels editing and restores original profile data */
  cancelEdit(): void {
    this.editable = false;
    this.updatedUser = { ...this.user };
  }

  /** Navigates back to the movies page */
  goBack(): void {
    this.router.navigate(['movies']);
  }

  /** Fetches the user's favorite movies */
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

  /**
   * Removes a movie from the user's favorites.
   * @param movieId ID of the movie to remove
   */
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

  /** Returns the formatted birthday string for display */
  get formattedBirthday(): string {
    if (!this.updatedUser.Birthday) return '';
    return this.updatedUser.Birthday.slice(0, 10);
  }
}
