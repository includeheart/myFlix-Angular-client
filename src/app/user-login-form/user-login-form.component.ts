import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Login form component for user authentication.
 * 
 * Handles user login and displays notifications.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /** User login credentials */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @param fetchApiData Service for API requests
   * @param dialogRef Reference to the dialog opened
   * @param snackBar Angular Material snackbar for notifications
   * @param router Angular router for navigation
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void { }

  /** Attempts to log in the user and handles the result */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.Username);
        this.dialogRef.close();
        const snackBarRef = this.snackBar.open('Login successful!', 'OK', { duration: 2000 });
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
        this.router.navigate(['movies']);
      },
      (error) => {
        const errMsg = error?.error?.message || error?.error || 'Login failed. Please try again.';
        const snackBarRef = this.snackBar.open(errMsg, 'OK', { duration: 2000 });
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss();
        });
      }
    );
  }
}
