import { Repository } from 'typeorm';
import { AppDataSource } from '../Database/data-source';
import { UserEntity } from '../Entities/UserEntity';
import { User } from '../../Domain/User/User';
import { IUserRepository } from '../../Domain/User/IUserRepository';
import CryptoLib from '../../Shared/Utils/CryptoLib';

export class TypeORMUserRepository implements IUserRepository {
  private repo: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);

  private toDomain(e: UserEntity): User {
    return new User(
      e.UserID,
      e.CompanyID,
      e.Login,
      e.FirstName,
      e.LastName,
      e.Password,
      e.ExpirationDate,
      e.Metadata
    );
  }

  async create(data: Omit<User, 'UserID'>) {
    const crypto = new CryptoLib();
    const encrypted = crypto.encryptData(data.Password);
    const entityData = { ...data, Password: encrypted || '' };
    const saved = await this.repo.save(this.repo.create(entityData));
    return this.toDomain(saved);
  }

  async getById(id: number) {
    const e = await this.repo.findOneBy({ UserID: id });
    return e ? this.toDomain(e) : null;
  }

  async update(id: number, data: Partial<Omit<User, 'UserID'>>) {
    const e = await this.repo.findOneBy({ UserID: id });
    if (!e) return null;
    Object.assign(e, data);
    if (data.Password) {
      const crypto = new CryptoLib();
      const encrypted = crypto.encryptData(data.Password);
      e.Password = encrypted || '';
    }
    return this.toDomain(await this.repo.save(e));
  }

  async delete(id: number) {
    await this.repo.delete(id);
  }

  async getPaginated(page: number, limit: number) {
    const list = await this.repo.find({ skip: (page - 1) * limit, take: limit });
    return list.map(this.toDomain);
  }
}