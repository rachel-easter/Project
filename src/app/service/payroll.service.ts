import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor() { }

  // Method to calculate salary details and log the results
  calculateSalary(workedHours: number, basicPay: number, hra: number, incomeTax: number, providentFund: number): SalaryDetails {
    let grossEarnings = 0;
    let totalDeduction = 0;
    let totalNetPayable = 0;

    // Calculate gross earnings based on basic pay and HRA
    grossEarnings = basicPay + hra;

    // Apply deductions based on income tax and provident fund
    totalDeduction = this.calculateDeduction(workedHours, grossEarnings, incomeTax, providentFund);

    // Calculate total net payable
    totalNetPayable = grossEarnings - totalDeduction;

    // Log the results in the console
    console.log('Gross Earnings:', grossEarnings);
    console.log('Total Deduction:', totalDeduction);
    console.log('Total Net Payable:', totalNetPayable);

    // Return calculated values
    return {
      grossEarnings: grossEarnings,
      totalDeduction: totalDeduction,
      totalNetPayable: totalNetPayable
    };
  }

  // Method to calculate deductions
  private calculateDeduction(workedHours: number, grossEarnings: number, incomeTax: number, providentFund: number): number {
    // Implement your deduction logic here based on worked hours, gross earnings, income tax, and provident fund
    let totalDeduction = 0;

    // Implement your deduction logic based on the provided details
    // For example:
    if (workedHours >= 248) {
      totalDeduction = 0;
    } else if (workedHours >= 200) {
      totalDeduction = grossEarnings * 0.05;
    } else if (workedHours >= 150) {
      totalDeduction = grossEarnings * 0.10;
    } else if (workedHours >= 100) {
      totalDeduction = grossEarnings * 0.20;
    } else if (workedHours >= 50) {
      totalDeduction = grossEarnings * 0.50;
    } else {
      totalDeduction = 0; // No salary
    }

    // Add additional deductions such as income tax and provident fund
    totalDeduction += incomeTax + providentFund;

    return totalDeduction;
  }
}

// Interface for holding salary details
export interface SalaryDetails {
  grossEarnings: number;
  totalDeduction: number;
  totalNetPayable: number;
}
