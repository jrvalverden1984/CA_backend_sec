import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSchema1719100000012 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    await qr.query(`CREATE SCHEMA IF NOT EXISTS "Security"`)   
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`select 'NO SE PUEDE ELIMINAR EL SHEMA [Security]'`)
  }
}
