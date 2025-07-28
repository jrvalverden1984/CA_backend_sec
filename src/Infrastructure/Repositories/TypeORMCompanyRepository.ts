import { Repository } from 'typeorm'
import { AppDataSource } from '../Database/data-source'
import { CompanyEntity } from '../Entities/CompanyEntity'
import { Company } from '../../Domain/Company/Company'
import { ICompanyRepository } from '../../Domain/Company/ICompanyRepository'

export class TypeORMCompanyRepository implements ICompanyRepository {
  private repo: Repository<CompanyEntity> = AppDataSource.getRepository(CompanyEntity)

  private toDomain(e: CompanyEntity): Company {
    return new Company(
      e.CompanyID,
      e.Ruc,
      e.Name
    )     
  }

  async create(data: Omit<Company, 'CompanyID'>) {
    const saved = await this.repo.save(this.repo.create(data))
    return this.toDomain(saved)
  }

  async getById(id: number) {
    const e = await this.repo.findOneBy({ CompanyID: id })
    return e ? this.toDomain(e) : null
  }

  async update(id: number, data: Omit<Company, 'CompanyID'>) {
    const e = await this.repo.findOneBy({ CompanyID: id })
    if (!e) return null
    Object.assign(e, data)
    return this.toDomain(await this.repo.save(e))
  }

  async delete(id: number) {
    await this.repo.delete(id)
  }

  async getPaginated(page: number, limit: number) {
    const list = await this.repo.find({ skip: (page - 1) * limit, take: limit })
    return list.map(this.toDomain)
  }

  async getByRuc(ruc: string) {
    const e = await this.repo.findOneBy({ Ruc: ruc })
    return e ? this.toDomain(e) : null
  }
}