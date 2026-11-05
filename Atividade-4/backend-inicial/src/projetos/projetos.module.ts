import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetosController } from './projetos.controller';
import { ProjetosService } from './projetos.service';
import { Projeto } from './entities/projeto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projeto])],
  controllers: [ProjetosController],
  providers: [ProjetosService],
})
export class ProjetosModule {}