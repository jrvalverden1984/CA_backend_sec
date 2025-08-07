import { Logger } from './../../Shared/Utils/Logger';
import { Request, Response, NextFunction } from 'express';
import { TypeORMUserRepository } from '../../Infrastructure/Repositories/TypeORMAuthRepository';
import { GetAuth } from '../../Application/Authenticate/GetAuth';
import { Auth } from '../../Domain/Authenticate/Auth';
import { ApiResponse } from '../../Shared/Utils/ApiResponse';
import { BadRequestError } from '../../Shared/Errors/BadRequestError';
import { UnauthorizedError } from '../../Shared/Errors/UnauthorizedError';

const repo = new TypeORMUserRepository();

export const authenticateHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validar campos obligatorios

    if (!req.body.CompanyID || req.body.CompanyID <= 0) {
      throw new BadRequestError('El CompanyID es obligatorio y debe ser mayor a 0');
    }

    if (!req.body.Login || req.body.Login.trim() === '') {
      throw new BadRequestError('El Login es obligatorio');
    }

    if (!req.body.Password || req.body.Password.trim() === '') {
      throw new BadRequestError('El Password es obligatorio');
    }

    // Crear instancia de Auth con los datos validados
    const authData = new Auth(
      req.body.CompanyID,
      req.body.Login.trim(),
      req.body.Password
    );

    // Ejecutar autenticación
    const token = await new GetAuth(repo).execute(authData);
    
    Logger.info('User authenticated successfully:', { 
      CompanyID: authData.CompanyID,
      Login: authData.Login 
    });

    return res.status(200).json(ApiResponse.success({ 
      token,
      message: 'Autenticación exitosa'
    }));
  } catch (error) {
    Logger.error('Error in authenticateHandler:', error);
    
    // Manejar errores específicos de autenticación
    if (error instanceof Error) {
      if (error.message.includes('Usuario no encontrado') || 
          error.message.includes('Empresa no encontrada') ||
          error.message.includes('Contraseña incorrecta')) {
        next(new UnauthorizedError('Credenciales inválidas'));
        return;
      }
      
      if (error.message.includes('JWT_SECRET no está configurado')) {
        Logger.error('Error de configuración JWT:', error);
        next(new Error('Error interno del servidor'));
        return;
      }
    }
    
    next(error);
  }
}; 