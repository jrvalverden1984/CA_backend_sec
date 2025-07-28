import { Logger } from './../../Shared/Utils/Logger';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../Infrastructure/Database/data-source';
import { TypeORMUserRepository } from '../../Infrastructure/Repositories/TypeORMUserRepository';
import { CreateUser } from '../../Application/User/CreateUser';
import { GetUserById } from '../../Application/User/GetUserById';
import { UpdateUser } from '../../Application/User/UpdateUser';
import { DeleteUser } from '../../Application/User/DeleteUser';
import { GetPaginatedUser } from '../../Application/User/GetPaginatedUser';
import { ApiResponse } from '../../Shared/Utils/ApiResponse';
import { BadRequestError } from '../../Shared/Errors/BadRequestError';
import { NotFoundError } from '../../Shared/Errors/NotFoundError';

const repo = new TypeORMUserRepository();

AppDataSource.initialize().then(() => {
  Logger.info('📦 TypeORM connected to PostgreSQL - UserController');
}).catch((error) => Logger.error('Error connecting to TypeORM:', error));

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.Login || req.body.Login.trim() === '') {
      throw new BadRequestError('El Login es obligatorio');
    }

    if (!req.body.FirstName || req.body.FirstName.trim() === '') {
      throw new BadRequestError('El FirstName es obligatorio');
    }

    if (!req.body.LastName || req.body.LastName.trim() === '') {
      throw new BadRequestError('El LastName es obligatorio');
    }

    if (!req.body.Password || req.body.Password.trim() === '') {
      throw new BadRequestError('El Password es obligatorio');
    }

    if (!req.body.CompanyID || req.body.CompanyID === 0) {
      throw new BadRequestError('El CompanyID es obligatorio');
    }
    
    const result = await new CreateUser(repo).execute(req.body);
    Logger.info('User created successfully:', { UserID: result.UserID })
    return res.status(201).json(ApiResponse.created({ UserID: result.UserID }));
  } catch (error) {
    Logger.error('Error in createUserHandler:', error)
    next(error);
  }
};

export const getUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.id;
    
    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestError('El ID del usuario debe ser un número válido mayor a 0');
    }

    const data = await new GetUserById(repo).execute(userId);
    
    if (!data) {
      throw new NotFoundError('Usuario no encontrado');
    }

    Logger.info('User found successfully:', { UserID: data.UserID })
    return res.status(200).json(ApiResponse.success(data));
  } catch (error) {
    Logger.error('Error in getUserByIdHandler:', error)
    next(error);
  }
};

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.id;
    
    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestError('El ID del usuario debe ser un número válido mayor a 0');
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar');
    }

    // Validar campos específicos si están presentes
    if (req.body.Login !== undefined && req.body.Login.trim() === '') {
      throw new BadRequestError('El Login no puede estar vacío');
    }

    if (req.body.FirstName !== undefined && req.body.FirstName.trim() === '') {
      throw new BadRequestError('El FirstName no puede estar vacío');
    }

    if (req.body.LastName !== undefined && req.body.LastName.trim() === '') {
      throw new BadRequestError('El LastName no puede estar vacío');
    }

    if (req.body.Password !== undefined && req.body.Password.trim() === '') {
      throw new BadRequestError('El Password no puede estar vacío');
    }

    if (req.body.CompanyID !== undefined && req.body.CompanyID === 0) {
      throw new BadRequestError('El CompanyID no puede estar vacío');
    }
    
    const result = await new UpdateUser(repo).execute(userId, req.body);
    
    if (!result) {
      throw new NotFoundError('Usuario no encontrado');
    }

    Logger.info('User updated successfully:', { UserID: result.UserID })
    return res.status(200).json(ApiResponse.success(result));
  } catch (error) {
    Logger.error('Error in updateUserHandler:', error)
    next(error);
  }
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.id;
    
    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestError('El ID del usuario debe ser un número válido mayor a 0');
    }

    // Verificar que el usuario existe antes de eliminarlo
    const existingUser = await new GetUserById(repo).execute(userId);
    
    if (!existingUser) {
      throw new NotFoundError('Usuario no encontrado');
    }

    await new DeleteUser(repo).execute(userId);

    Logger.info('User deleted successfully:', { UserID: userId })
    return res.status(204).json(ApiResponse.success(null, 'Usuario eliminado exitosamente'));
  } catch (error) {
    Logger.error('Error in deleteUserHandler:', error)
    next(error);
  }
};

export const getPaginatedUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    
    // Validar parámetros de paginación
    if (page <= 0) {
      throw new BadRequestError('El número de página debe ser mayor a 0');
    }
    
    if (limit <= 0 || limit > 100) {
      throw new BadRequestError('El límite debe estar entre 1 y 100');
    }

    const result = await new GetPaginatedUser(repo).execute(page, limit);
    
    Logger.info('Users found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result));
  } catch (error) {
    Logger.error('Error in getPaginatedUserHandler:', error)
    next(error);
  }
};
