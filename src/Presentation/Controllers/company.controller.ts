import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../../Infrastructure/Database/data-source'
import { TypeORMCompanyRepository } from '../../Infrastructure/Repositories/TypeORMCompanyRepository'
import { CreateCompany } from '../../Application/Company/CreateCompany'
import { GetCompanyById } from '../../Application/Company/GetCompanyById'
import { UpdateCompany } from '../../Application/Company/UpdateCompany'
import { DeleteCompany } from '../../Application/Company/DeleteCompany'
import { GetPaginatedCompany } from '../../Application/Company/GetPaginatedCompany'
import { GetCompanyByRuc } from '../../Application/Company/GetCompanyByRuc'
import { ApiResponse } from '../../Shared/Utils/ApiResponse'
import { BadRequestError } from '../../Shared/Errors/BadRequestError'
import { NotFoundError } from '../../Shared/Errors/NotFoundError'
import { Logger } from '../../Shared/Utils/Logger'

const repo = new TypeORMCompanyRepository()

AppDataSource.initialize().then(() => {
  Logger.info('📦 TypeORM connected to PostgreSQL - CompanyController')
}).catch((error) => Logger.error('Error connecting to TypeORM:', error))

export const createCompanyHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    if (!req.body.Ruc || req.body.Ruc.trim() === '') {
      throw new BadRequestError('La Ruc es obligatoria')
    }

    if (!req.body.Name || req.body.Name.trim() === '') {
      throw new BadRequestError('La Name es obligatoria')
    }

    const result = await new CreateCompany(repo).execute(req.body)

    Logger.info('Company created successfully:', { CompanyID: result.CompanyID })
    return res.status(201).json(ApiResponse.created({ CompanyID: result.CompanyID }))
  } catch (error) {
    Logger.error('Error in createCompanyHandler:', error)
    next(error)
  }
}

export const getCompanyByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = +req.params.id
    
    if (isNaN(companyId) || companyId <= 0) {
      throw new BadRequestError('El ID de la empresa debe ser un número válido mayor a 0')
    }

    const data = await new GetCompanyById(repo).execute(companyId)
    
    if (!data) {
      throw new NotFoundError('Empresa no encontrada')
    }

    Logger.info('Company found successfully:', { CompanyID: data.CompanyID })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getCompanyByIdHandler:', error)
    next(error)
  }
}

export const updateCompanyHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = +req.params.id
    
    if (isNaN(companyId) || companyId <= 0) {
      throw new BadRequestError('El ID de la empresa debe ser un número válido mayor a 0')
    }

    // Validar que al menos un campo sea proporcionado para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError('Se debe proporcionar al menos un campo para actualizar')
    }

    // Validar campos específicos si están presentes
    if (req.body.Ruc !== undefined && req.body.Ruc.trim() === '') {
      throw new BadRequestError('La Ruc no puede estar vacía')
    }

    if (req.body.Name !== undefined && req.body.Name.trim() === '') {
      throw new BadRequestError('El Name no puede estar vacío')
    }

    const result = await new UpdateCompany(repo).execute(companyId, req.body)
    
    if (!result) {
      throw new NotFoundError('Empresa no encontrada')
    }

    Logger.info('Company updated successfully:', { CompanyID: result.CompanyID })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in updateCompanyHandler:', error)
    next(error)
  }
}

export const deleteCompanyHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = +req.params.id
    
    if (isNaN(companyId) || companyId <= 0) {
      throw new BadRequestError('El ID de la empresa debe ser un número válido mayor a 0')
    }

    // Verificar que la empresa existe antes de eliminarla
    const existingCompany = await new GetCompanyById(repo).execute(companyId)
    
    if (!existingCompany) {
      throw new NotFoundError('Empresa no encontrada')
    }

    await new DeleteCompany(repo).execute(companyId)

    return res.status(204).json(ApiResponse.success(null, 'Empresa eliminada exitosamente'))
  } catch (error) {
    Logger.error('Error in deleteCompanyHandler:', error)
    next(error)
  }
}

export const getPaginatedCompanyHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    
    // Validar parámetros de paginación
    if (page <= 0) {
      throw new BadRequestError('El número de página debe ser mayor a 0')
    }
    
    if (limit <= 0 || limit > 100) {
      throw new BadRequestError('El límite debe estar entre 1 y 100')
    }

    const result = await new GetPaginatedCompany(repo).execute(page, limit)
    
    Logger.info('Companies found successfully:', { page, limit, total: result.length })
    return res.status(200).json(ApiResponse.success(result))
  } catch (error) {
    Logger.error('Error in getPaginatedCompanyHandler:', error)
    next(error)
  }
}

export const getCompanyByRucHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ruc = req.params.ruc
    
    if (!ruc || ruc.trim() === '') {
      throw new BadRequestError('El RUC es obligatorio')
    }

    const data = await new GetCompanyByRuc(repo).execute(ruc)
    
    if (!data) {
      throw new NotFoundError('Empresa no encontrada')
    }

    Logger.info('Company found successfully by RUC:', { RUC: ruc })
    return res.status(200).json(ApiResponse.success(data))
  } catch (error) {
    Logger.error('Error in getCompanyByRucHandler:', error)
    next(error)
  }
}