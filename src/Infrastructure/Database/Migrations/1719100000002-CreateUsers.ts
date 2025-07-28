import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1719100000014 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Security"."User" (
                "UserID" SERIAL,
                "CompanyID" integer NOT NULL,
                "Login" varchar(15) NOT NULL,
                "FirstName" varchar(35) NOT NULL,
                "LastName" varchar(35) NOT NULL,
                "Password" text NOT NULL,
                "ExpirationDate" date,
                "Metadata" jsonb,
                CONSTRAINT "PK_User" PRIMARY KEY ("UserID"),
                CONSTRAINT "FK_User_Company" FOREIGN KEY ("CompanyID") REFERENCES "Security"."Company"("CompanyID") ON DELETE SET NULL  
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Security"."User"`);
    }
}
