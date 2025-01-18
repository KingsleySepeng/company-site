import {Component, OnInit} from '@angular/core';
import {Company} from '../../models/company.model';
import {MockDataService} from '../../services/mock-data.service';
import {ComplianceStatus} from '../../models/enums/compliance-status.enum';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-company-info',
  imports: [
    DatePipe,
    NgIf
  ],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss'
})
export class CompanyInfoComponent implements OnInit{
  company?: Company;
  message = '';

  constructor(private mockService: MockDataService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('currentUserId');
    if (!userId) {
      this.message = 'Not logged in. Please log in.';
      return;
    }

    // For the MVP: find user's company
    const user = this.mockService.getUsers().find(u => u.id === userId);
    if (user && user.companyId) {
      this.company = this.mockService.getCompanyById(user.companyId);
    } else {
      this.message = 'No company found for user.';
    }
  }

  get complianceStatus(): string {
    if (!this.company) return '';
    switch (this.company.complianceStatus) {
      case ComplianceStatus.COMPLIANT:
        return 'Compliant';
      case ComplianceStatus.NON_COMPLIANT:
        return 'Non-Compliant';
      case ComplianceStatus.PENDING:
        return 'Pending';
      default:
        return '';
    }
  }
}
