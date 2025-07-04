import { Injectable } from '@nestjs/common';
import { HALogIn } from './Entities/login.entity';
import { CTable } from 'src/central_table/Entities/ctable.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHALogInDTO } from './DTOs/create-halogin.dto';

@Injectable()
export class HoteladminLoginService {
  create(createHALogInDTO: CreateHALogInDTO) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(HALogIn)
    private readonly loginRepo: Repository<HALogIn>,
  ) {}

  async addToLoginTable(ctable: CTable): Promise<void> {
    const loginData = {
      username: ctable.username,
      email: ctable.email,
      password: ctable.password,
      reset_token: null,
    };

    await this.loginRepo.save(loginData);
  }
}
