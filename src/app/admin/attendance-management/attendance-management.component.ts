import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailsService } from 'src/app/service/details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-attendance-management',
  templateUrl: './attendance-management.component.html',
  styleUrls: ['./attendance-management.component.css']
})
export class AttendanceManagementComponent {
  filterForm: FormGroup;
  filteredEmployees: any[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private detailsService: DetailsService
  ) {
    this.filterForm = this.formBuilder.group({
      startRange: ['', Validators.required],
      endRange: ['', Validators.required]
    });
  }

  filterEmployees(): void {
    if (this.filterForm.valid) {
      const startRange = this.filterForm.get('startRange')?.value;
      const endRange = this.filterForm.get('endRange')?.value;
      this.detailsService.getFilteredEmployees(startRange, endRange)
        .subscribe(
          (data: any[]) => {
            this.filteredEmployees = data;
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  } 
  // notifyEmployee(employee: any): void {
    
  //   console.log(`Notifying ${employee.name}...`);
  // }
  notifyEmployee(employee: any): void {
    const index = this.filteredEmployees.findIndex(emp => emp.name === employee.name);
    if (index !== -1) {
      this.filteredEmployees[index].notified = true;
    }
  }
}
