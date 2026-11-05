
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { TarefasService } from './tarefas.service';
import { Tarefa } from './entities/tarefa.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tarefas')
@UseGuards(JwtAuthGuard)
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  findAll(): Promise<Tarefa[]> {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Tarefa> {
    return this.tarefasService.findOne(id);
  }

  @Post()
  create(@Body() tarefa: Partial<Tarefa>): Promise<Tarefa> {
    return this.tarefasService.create(tarefa);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tarefa: Partial<Tarefa>,
  ): Promise<Tarefa> {
    return this.tarefasService.update(id, tarefa);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tarefasService.remove(id);
  }
}
