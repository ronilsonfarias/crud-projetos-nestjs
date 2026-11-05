import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';

@Injectable()
export class ProjetosService {
  constructor(
    @InjectRepository(Projeto)
    private readonly projetosRepository: Repository<Projeto>,
  ) {}

  async findAll(): Promise<Projeto[]> {
    return this.projetosRepository.find();
  }

  async findOne(id: number): Promise<Projeto> {
    const projeto = await this.projetosRepository.findOneBy({ id });

    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return projeto;
  }

  async create(dto: CreateProjetoDto): Promise<Projeto> {
    const projeto = this.projetosRepository.create(dto);
    return this.projetosRepository.save(projeto);
  }

  async update(id: number, dto: UpdateProjetoDto): Promise<Projeto> {
    const projeto = await this.findOne(id);
    Object.assign(projeto, dto);
    return this.projetosRepository.save(projeto);
  }

  async remove(id: number): Promise<void> {
    const projeto = await this.findOne(id);
    await this.projetosRepository.remove(projeto);
  }
}