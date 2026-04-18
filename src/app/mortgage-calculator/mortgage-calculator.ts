import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mortgage-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mortgage-calculator.html',
  styleUrl: './mortgage-calculator.scss',
})
export class MortgageCalculator {
  price: number | null = null;
  downPayment: number | null = null;
  monthlyPayment: number | null = null;
  interestRate: number | null = null;
  loanTerm: number = 30; // years

  // calculate Mortage
  calculateMortgage() {
    // what if price is not listed neither is interest rate
    if (this.price == null || this.interestRate == null) return;

    //calcuate principal, monthlyRate, totalPayments, numerator, denominator etc.
    const principal = this.price - (this.downPayment || 0);
    const monthlyRate = this.interestRate / 100 / 12;
    const totalPayments = this.loanTerm * 12;

    const numerator =
      principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments);

    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;

    this.monthlyPayment = numerator / denominator;
  }

  //reset calculator
  resetCalculator() {
    this.price = null;
    this.downPayment = null;
    this.monthlyPayment = null;
    this.interestRate = null;
    this.loanTerm = 30;
  }
}
