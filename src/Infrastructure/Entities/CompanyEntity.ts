import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({  name: 'Company', schema: 'Security' })
export class CompanyEntity {
  @PrimaryGeneratedColumn({ name: 'CompanyID' })
  CompanyID!: number;

  @Column({ length: 25 })
  Ruc!: string;

  @Column({ length: 200 })
  Name!: string;

  // @Column({ type: 'text', nullable: true }) 
  // ConnectionString!: string;

}