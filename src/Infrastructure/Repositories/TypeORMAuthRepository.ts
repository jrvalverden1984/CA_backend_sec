import { Repository } from 'typeorm';
import { AppDataSource } from '../Database/data-source';
import { UserEntity } from '../Entities/UserEntity';
import { CompanyEntity } from '../Entities/CompanyEntity'
import { Auth } from '../../Domain/Authenticate/Auth'
import { IAuthRepository } from '../../Domain/Authenticate/IAuthRepository';
import CryptoLib from '../../Shared/Utils/CryptoLib';
import jwt from 'jsonwebtoken';

export class TypeORMUserRepository implements IAuthRepository {
  private repoUser: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);
  private repoCompany: Repository<CompanyEntity> = AppDataSource.getRepository(CompanyEntity);

  async authenticate(data: Auth) {

    const company = await this.repoCompany.findOneBy({ CompanyID: data.CompanyID });

    if (!company) {
      throw new Error('Empresa no encontrada');
    }

    const user = await this.repoUser.findOneBy({ Login: data.Login, CompanyID: data.CompanyID });

    if (!user) {
      throw new Error(`Usuario no encontrado para la Compañia ${company.Name}`);
    }

    const crypto = new CryptoLib();
    const Password = crypto.decryptData(user.Password);

    if (Password !== data.Password) {
      throw new Error('Contraseña incorrecta');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }

    const tokenExpiration = process.env.JWT_EXPIRATION || '30m';

    const token = jwt.sign({ UserID: user.UserID, CompanyID: company.CompanyID, Login: user.Login }, process.env.JWT_SECRET, { expiresIn: tokenExpiration as any });

    return token;
  }

}