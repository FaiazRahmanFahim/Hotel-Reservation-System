import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CentralTableService } from './central_table.service';
import { CreateCTableDTO } from './DTOs/create_ctable.dto';

@Controller('central_table')
export class CentralTableController {
    constructor(private readonly cTableService: CentralTableService) {}

    @Post()
    async create(@Body() createCTableDto: CreateCTableDTO) {
        return this.cTableService.create(createCTableDto);
    }

    @Get()
    async findAll() {
        return this.cTableService.findAll();
    }

    @Get(':UID')
    async findOne(@Param('UID') uid: number) {
        return this.cTableService.findOne(String(uid));
    }
}

