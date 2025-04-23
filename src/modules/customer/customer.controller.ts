import { Controller, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  VerifyPossibleLoansDto,
  verifyPossibleLoansSchema,
} from './dto/verify-possible-loans.dto';
import { ZodValidationPipe } from 'src/pipe/zod-validation.pipe';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('customer-loans')
  create(
    @Body(new ZodValidationPipe(verifyPossibleLoansSchema))
    verifyPossibleLoansDto: VerifyPossibleLoansDto,
  ) {
    return this.customerService.verifyPossibleLoans(verifyPossibleLoansDto);
  }
}
