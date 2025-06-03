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

  constructor(
    private fetchApiData: UserRegistrationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
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
}
