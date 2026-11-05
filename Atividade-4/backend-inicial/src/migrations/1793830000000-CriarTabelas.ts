import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriarTabelas1793830000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tarefas" (
        "id" SERIAL NOT NULL,
        "titulo" VARCHAR NOT NULL,
        "descricao" TEXT,
        "concluida" BOOLEAN NOT NULL DEFAULT false,
        CONSTRAINT "PK_tarefas" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "projetos" (
        "id" SERIAL NOT NULL,
        "nome" VARCHAR NOT NULL,
        "descricao" TEXT,
        "cor" VARCHAR NOT NULL,
        CONSTRAINT "PK_projetos" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "projetos"`);
    await queryRunner.query(`DROP TABLE "tarefas"`);
  }
}