import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceHistoryComponent } from './compliance-history.component';

describe('ComplianceHistoryComponent', () => {
  let component: ComplianceHistoryComponent;
  let fixture: ComponentFixture<ComplianceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplianceHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
