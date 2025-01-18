import { Component } from '@angular/core';
import {User} from '../../models/user.model';
import {MockDataService} from '../../services/mock-data.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private mockService: MockDataService, private router: Router) {}

  onLogin() {
    const user: User | undefined = this.mockService.login(this.email, this.password);
    if (user) {
      // Store user in session (dummy approach)
      sessionStorage.setItem('currentUserId', user.id);
      this.router.navigate(['/company-info']);
    } else {
      this.message = 'Invalid credentials.';
    }
  }
}
