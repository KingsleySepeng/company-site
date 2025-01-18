import {Component, OnInit} from '@angular/core';
import {Company} from '../../models/company.model';
import {MockDataService} from '../../services/mock-data.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {dateTimestampProvider} from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  selector: 'app-compliance',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './compliance.component.html',
  styleUrl: './compliance.component.scss'
})
export class ComplianceComponent implements OnInit{
  company?: Company;
  message = '';
  fileName = '';

  constructor(private mockService: MockDataService) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('currentUserId');
    if (!userId) {
      this.message = 'Not logged in.';
      return;
    }
    const user = this.mockService.getUsers().find(u => u.id === userId);
    if (user && user.companyId) {
      this.company = this.mockService.getCompanyById(user.companyId);
    } else {
      this.message = 'No company found.';
    }
  }

  uploadAnnualReturn() {
    if (!this.company) return;
    if (!this.fileName) {
      this.message = 'Please enter a file name.';
      return;
    }
    this.mockService.uploadDocument(this.company.id, this.fileName, 'ANNUAL_RETURN',new Date().getFullYear());
    this.message = 'Annual Return uploaded successfully.';
    this.fileName = '';
  }

  uploadBeneficialOwnership() {
    if (!this.company) return;
    if (!this.fileName) {
      this.message = 'Please enter a file name.';
      return;
    }
    this.mockService.uploadDocument(this.company.id, this.fileName, 'BENEFICIAL_OWNERSHIP',new Date().getFullYear());
    this.message = 'Beneficial Ownership doc uploaded successfully.';
    this.fileName = '';
  }

  checkCipc() {
    if (!this.company) return;
    const result = this.mockService.checkCipcCompliance(this.company.id);
    this.message = result;
  }
}
