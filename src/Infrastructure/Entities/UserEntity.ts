import { CompanyEntity } from './CompanyEntity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User', { schema: 'Security' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'UserID' })
  UserID: number;

  @Column({ name: 'CompanyID', type: 'int' })
  CompanyID: number;

  @Column({ name: 'Login', type: 'varchar', length: 15 })
  Login: string;

  @Column({ name: 'FirstName', type: 'varchar', length: 35 })
  FirstName: string;

  @Column({ name: 'LastName', type: 'varchar', length: 35 })
  LastName: string;

  @Column({ name: 'Password', type: 'text' })
  Password!: string;

  @Column({ name: 'ExpirationDate', type: 'date', nullable: true })
  ExpirationDate: Date;

  @Column({ name: 'Metadata', type: 'jsonb', nullable: true })
  Metadata: any;

  @ManyToOne(() => CompanyEntity, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'CompanyID',
    referencedColumnName: 'CompanyID',
    foreignKeyConstraintName: 'FK_User_Company'
  })
  company?: CompanyEntity
}
