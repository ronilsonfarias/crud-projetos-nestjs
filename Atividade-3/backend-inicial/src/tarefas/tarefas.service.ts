
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarefa } from './entities/tarefa.entity';

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefasRepository: Repository<Tarefa>,
  ) {}

  async findAll(): Promise<Tarefa[]> {
    return this.tarefasRepository.find();
  }

  async findOne(id: number): Promise<Tarefa> {
    const tarefa = await this.tarefasRepository.findOneBy({ id });

    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return tarefa;
  }

  async create(dto: Partial<Tarefa>): Promise<Tarefa> {
    const tarefa = this.tarefasRepository.create(dto);
    return this.tarefasRepository.save(tarefa);
  }

  async update(id: number, dto: Partial<Tarefa>): Promise<Tarefa> {
    const tarefa = await this.findOne(id);

    Object.assign(tarefa, dto);

    return this.tarefasRepository.save(tarefa);
  }

  async remove(id: number): Promise<void> {
    const tarefa = await this.findOne(id);
    await this.tarefasRepository.remove(tarefa);
  }
}
