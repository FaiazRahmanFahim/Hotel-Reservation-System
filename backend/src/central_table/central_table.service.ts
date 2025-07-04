import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCTableDTO } from './DTOs/create_ctable.dto';
import { CTable } from './Entities/ctable.entity';
import { HALogIn } from 'src/hoteladmin-login/Entities/login.entity';


@Injectable()
export class CentralTableService {
    constructor(
        @InjectRepository(CTable)
        private readonly cTableRepo: Repository<CTable>,
        @InjectRepository(HALogIn)
        private readonly loginRepo: Repository<HALogIn>
    ) {}

    async create(createCTableDto: CreateCTableDTO): Promise<CTable> 
    {
        const newCTable = this.cTableRepo.create(createCTableDto);
        const savedCTable = await this.cTableRepo.save(newCTable);

        // Sync data from hoteladmin_login if applicable
        await this.syncAdminDataToCentralTable(savedCTable);

        return savedCTable;
    }

    private async syncAdminDataToCentralTable(ctable: CTable): Promise<void> {
        const loginData = await this.loginRepo.findOne({ where: { ID: Number(ctable.UID) } });
        if (loginData) {
            ctable.username = loginData.username;
            ctable.email = loginData.email;
            ctable.password = loginData.password;
            await this.cTableRepo.save(ctable);
        }
    }

    async findAll(): Promise<CTable[]> {
        return this.cTableRepo.find();
    }

    async findOne(UID: string): Promise<CTable> {
        const ctable = await this.cTableRepo.findOne({ where: { UID } });
        if (!ctable) {
            throw new NotFoundException(`CTable with UID ${UID} not found`);
        }
        return ctable;
    }
}
