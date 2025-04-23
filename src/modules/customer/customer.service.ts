import { Injectable } from '@nestjs/common';
import { VerifyPossibleLoansDto } from './dto/verify-possible-loans.dto';

type Loans = {
  type: string;
  interest_rate: number;
};

@Injectable()
export class CustomerService {
  verifyPossibleLoans(verifyPossibleLoansDto: VerifyPossibleLoansDto) {
    const { name, age, location, income } = verifyPossibleLoansDto;

    const loans = this.loansCustomerCanTakeOut(income, age, location);

    return {
      name,
      loans,
    };
  }

  loansCustomerCanTakeOut(income: number, age: number, location: string) {
    const loans: Loans[] = [];

    const customerCanTakeConsignedLoan = income > 5000;

    if (customerCanTakeConsignedLoan) {
      loans.push({
        type: 'CONSIGNMENT',
        interest_rate: 2,
      });
    }

    const customerCanTakeOutAPersonalLoanAndGuaranteedLoan =
      income <= 3000 ||
      (income > 3000 && income <= 5000 && age < 30 && location === 'SP');

    if (customerCanTakeOutAPersonalLoanAndGuaranteedLoan) {
      loans.push({
        type: 'PERSONAL',
        interest_rate: 4,
      });

      loans.push({
        type: 'GUARANTEED',
        interest_rate: 3,
      });
    }

    return loans;
  }
}
