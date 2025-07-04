import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CTable } from './Entities/ctable.entity';
import { HALogIn } from 'src/hoteladmin-login/Entities/login.entity';
import { CentralTableService } from './central_table.service';
import { CentralTableController } from './central_table.controller';


@Module({
  imports: [TypeOrmModule.forFeature([CTable, HALogIn])],
  providers: [CentralTableService],
  controllers: [CentralTableController]
})
export class CentralTableModule {}
