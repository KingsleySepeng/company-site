// src/app/services/mock-data.service.ts

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';
import { Document } from '../models/documents.model';
import { Role } from '../models/enums/role.enum';
import { ComplianceStatus } from '../models/enums/compliance-status.enum';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private users: User[] = [];
  private companies: Company[] = [];
  private documents: Document[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Create a dummy admin
    this.users.push({
      id: 'U001',
      email: 'king.sepeng@gmail.com',
      password: 'admin',
      role: Role.ADMIN,
      fullName: 'System Administrator'
    });

    // Create a dummy user (registered company)
    this.users.push({
      id: 'U002',
      email: 'dave.crothall@gmail.com',
      password: 'admin123',
      role: Role.USER,
      fullName: 'John Doe',
      companyId: 'C001'
    });

    // Create a company for John
    this.companies.push({
      id: 'C001',
      name: 'Sample Corp',
      registrationNo: '2023/123456/07',
      createdAt: new Date('2023-01-10'),
      complianceStatus: ComplianceStatus.PENDING,
      annualReturnUploaded: false,
      beneficialOwnershipUploaded: false
    });

    // No documents yet for dummy data
    this.documents = [];
  }

  // 1. Authentication
  login(email: string, password: string): User | undefined {
    return this.users.find(u => u.email === email && u.password === password);
  }

  // 2. Register new company & user
  registerCompany(companyName: string, registrationNo: string, fullName: string, email: string, password: string): User {
    const newCompanyId = 'C' + (this.companies.length + 1).toString().padStart(3, '0');
    const newCompany: Company = {
      id: newCompanyId,
      name: companyName,
      registrationNo,
      createdAt: new Date(),
      complianceStatus: ComplianceStatus.PENDING,
      annualReturnUploaded: false,
      beneficialOwnershipUploaded: false
    };
    this.companies.push(newCompany);

    const newUserId = 'U' + (this.users.length + 1).toString().padStart(3, '0');
    const newUser: User = {
      id: newUserId,
      email,
      password,
      role: Role.USER,
      fullName,
      companyId: newCompanyId
    };
    this.users.push(newUser);
    return newUser;
  }

  // 3. Get user's company
  getCompanyById(companyId: string): Company | undefined {
    return this.companies.find(c => c.id === companyId);
  }

  getUsers(): User[] {
    return this.users;
  }

  // 4. Upload documents
  uploadDocument(companyId: string, fileName: string, docType: 'ANNUAL_RETURN' | 'BENEFICIAL_OWNERSHIP',year:number): void {
    const newDoc: Document = {
      id: 'D' + (this.documents.length + 1).toString().padStart(3, '0'),
      companyId,
      name: fileName,
      type: docType,
      uploadDate: new Date(),
      year
    };
    this.documents.push(newDoc);

    // Also mark the company's relevant flags
    const comp = this.getCompanyById(companyId);
    if (comp) {
      if (docType === 'ANNUAL_RETURN') comp.annualReturnUploaded = true;
      if (docType === 'BENEFICIAL_OWNERSHIP') comp.beneficialOwnershipUploaded = true;
      this.updateComplianceStatus(comp);
    }
  }

  // 5. Check compliance
  private updateComplianceStatus(company: Company): void {
    if (company.annualReturnUploaded && company.beneficialOwnershipUploaded) {
      company.complianceStatus = ComplianceStatus.COMPLIANT;
    } else {
      company.complianceStatus = ComplianceStatus.NON_COMPLIANT;
    }
  }

  // 6. Dummy method to "call CIPC API"
  checkCipcCompliance(companyId: string): string {
    // For the MVP, just return a string
    const comp = this.getCompanyById(companyId);
    if (!comp) return 'Company not found.';
    return `CIPC check for ${comp.name}: Status = ${comp.complianceStatus}`;
  }

  getDocumentsForCompanyAndYear(companyId: string, year: number): Document[] {
    return this.documents.filter(
      d => d.companyId === companyId && d.year === year
    );
  }

}
