import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateCompany1719100000013 implements MigrationInterface {
  public async up(qr: QueryRunner): Promise<void> {
    await qr.query(`
      CREATE TABLE IF NOT EXISTS "Security"."Company" (
        "CompanyID" SERIAL,
        "Ruc" character varying(25) NOT NULL,
        "Name" character varying(200) NOT NULL,
        "ConnectionString" text NULL,
        CONSTRAINT "PK_Company" PRIMARY KEY ("CompanyID")
      )
    `);
  }

  public async down(qr: QueryRunner): Promise<void> {
    await qr.query(`DROP TABLE IF EXISTS "Security"."Company"`)
  }
}
