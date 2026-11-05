
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tarefa } from "./tarefas/entities/tarefa.entity";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || "todo",
  password: process.env.DB_PASSWORD || "todo",
  database: process.env.DB_NAME || "todo",
  entities: [Tarefa],
  synchronize: false,
});
