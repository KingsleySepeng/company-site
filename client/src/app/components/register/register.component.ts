import { Component } from '@angular/core';
import {MockDataService} from '../../services/mock-data.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  companyName = '';
  registrationNo = '';
  fullName = '';
  email = '';
  password = '';
  message = '';

  constructor(private mockService: MockDataService, private router: Router) {}

  onRegister() {
    if (!this.companyName || !this.registrationNo || !this.fullName || !this.email || !this.password) {
      this.message = 'Please fill all fields.';
      return;
    }
    const newUser = this.mockService.registerCompany(
      this.companyName,
      this.registrationNo,
      this.fullName,
      this.email,
      this.password
    );
    this.message = 'Registration successful! You can now log in.';
    // Optionally redirect to login
    // this.router.navigate(['/login']);
  }
}
