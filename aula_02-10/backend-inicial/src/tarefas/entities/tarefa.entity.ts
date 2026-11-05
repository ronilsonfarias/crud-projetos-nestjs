
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tarefas")
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: "text", nullable: true })
  descricao: string;

  @Column({ default: false })
  concluida: boolean;
}
