import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './DTOs/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDTO: CreateCustomerDTO, @Req() req:any) {
    return this.customerService.create(createCustomerDTO);
  }

  @Get()
  async findAll() {
    return this.customerService.findAll();
  }
}
