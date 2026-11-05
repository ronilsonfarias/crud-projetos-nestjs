
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjetoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  nome: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  descricao?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['vermelho', 'verde', 'azul', 'amarelo', 'roxo'])
  cor: string;
}
