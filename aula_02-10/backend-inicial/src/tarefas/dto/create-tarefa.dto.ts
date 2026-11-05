// DTO = Data Transfer Object: descreve o formato esperado do corpo da requisição.
//
// TODO (validação): adicionar os decorators do class-validator para validar o
// formulário. Ex.: @IsString, @IsNotEmpty, @MinLength, @MaxLength, @IsOptional.
// Siga o ROTEIRO-AULA.md.
export class CreateTarefaDto {
  titulo: string;
  descricao?: string;
}
