import {Component, OnInit} from '@angular/core';
import {MockDataService} from '../../services/mock-data.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Company} from '../../models/company.model';
import {Document} from '../../models/documents.model';
@Component({
  selector: 'app-compliance-history',
  imports: [
    DatePipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './compliance-history.component.html',
  styleUrl: './compliance-history.component.scss'
})
export class ComplianceHistoryComponent implements OnInit {
  company?: Company;
  message = '';
  startYear = 2020; // for example, or fetch from company creation date
  endYear = new Date().getFullYear();

  years: number[] = [];
  // We'll store a list of objects describing the compliance for each year
  complianceByYear: {
    year: number;
    annualReturn?: Document;
    beneficialOwnership?: Document;
    annualReturnStatus: 'green' | 'red';
    beneficialStatus: 'green' | 'red';
  }[] = [];

  constructor(private mockService: MockDataService) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('currentUserId');
    if (!userId) {
      this.message = 'Not logged in.';
      return;
    }
    const user = this.mockService.getUsers().find(u => u.id === userId);
    if (user && user.companyId) {
      this.company = this.mockService.getCompanyById(user.companyId);
      if (this.company) {
        // For demonstration, let's say the startYear is the year of creation
        this.startYear = this.company.createdAt.getFullYear();
        // Build an array of years from startYear to endYear
        for (let y = this.startYear; y <= this.endYear; y++) {
          this.years.push(y);
        }
        this.generateComplianceHistory();
      } else {
        this.message = 'No company found.';
      }
    } else {
      this.message = 'No company found for user.';
    }
  }

  generateComplianceHistory(): void {
    if (!this.company) return;

    this.complianceByYear = this.years.map(year => {
      // get docs for the year
      const docs = this.mockService.getDocumentsForCompanyAndYear(this.company!.id, year);

      const annualReturnDoc = docs.find(d => d.type === 'ANNUAL_RETURN');
      const beneficialDoc = docs.find(d => d.type === 'BENEFICIAL_OWNERSHIP');

      return {
        year,
        annualReturn: annualReturnDoc,
        beneficialOwnership: beneficialDoc,
        annualReturnStatus: annualReturnDoc ? 'green' : 'red',
        beneficialStatus: beneficialDoc ? 'green' : 'red'
      };
    });
  }
}
