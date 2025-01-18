// src/app/models/company.model.ts
import { ComplianceStatus } from './enums/compliance-status.enum';

export interface Company {
  id: string;
  name: string;
  registrationNo: string;
  createdAt: Date;
  complianceStatus: ComplianceStatus;
  annualReturnUploaded: boolean;
  beneficialOwnershipUploaded: boolean;
}
