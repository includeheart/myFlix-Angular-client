import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Displays a list of movies and provides actions for viewing details,
 * genres, directors, and adding movies to favorites.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /** Array of movies fetched from the API */
  movies: any[] = [];

  /**
   * @param fetchApiData Service for API requests
   * @param router Angular router for navigation
   * @param dialog Angular Material dialog service
   * @param snackBar Angular Material snackbar for notifications
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  /** Fetches movies on component initialization */
  ngOnInit(): void {
    this.getMovies();
  }

  /** Fetches all movies from the API */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /** Navigates to the user's profile page */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Opens a dialog displaying genre information.
   * @param genre Genre data to display
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: genre,
      width: '300px'
    });
  }

  /**
   * Opens a dialog displaying director information.
   * @param director Director data to display
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: director,
      width: '300px'
    });
  }

  /**
   * Opens a dialog displaying movie details.
   * @param movie Movie data to display
   */
  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: movie,
      width: '400px'
    });
  }

  /**
   * Adds a movie to the user's favorites.
   * @param movieId ID of the movie to add
   */
  addToFavorites(movieId: string): void {
    const username = localStorage.getItem('user');
    if (!username) return;
    this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(() => {
      this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });
    });
  }
}