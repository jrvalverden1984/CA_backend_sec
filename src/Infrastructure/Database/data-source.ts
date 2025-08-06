import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production';

const entitiesPath = isProduction ? 'dist/Infrastructure/**/Entities/*.js' : 'src/Infrastructure/**/Entities/*.ts';
const migrationsPath = isProduction ? 'dist/Infrastructure/Database/Migrations/*.js' : 'src/Infrastructure/Database/Migrations/*.ts';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  subscribers: []
})