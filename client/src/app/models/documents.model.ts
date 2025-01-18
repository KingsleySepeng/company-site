// src/app/models/documents.model.ts

export interface Document {
  id: string;
  companyId: string;
  name: string;       // e.g., "AnnualReturn2023.pdf"
  type: 'ANNUAL_RETURN' | 'BENEFICIAL_OWNERSHIP';
  uploadDate: Date;
  year: number; // e.g., 2023, 2024, etc.

}
