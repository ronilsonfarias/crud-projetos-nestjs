import { PartialType } from '@nestjs/mapped-types';
import { CreateTarefaDto } from './create-tarefa.dto';

// PartialType reaproveita os campos (e, depois, as validações) de CreateTarefaDto,
// tornando todos opcionais. A edição também pode enviar "concluida".
//
// TODO (validação): validar "concluida" com @IsOptional() e @IsBoolean().
export class UpdateTarefaDto extends PartialType(CreateTarefaDto) {
  concluida?: boolean;
}
