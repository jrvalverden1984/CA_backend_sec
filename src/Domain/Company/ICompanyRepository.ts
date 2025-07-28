
import { Company } from './Company'

export interface ICompanyRepository {
  create(data: Omit<Company, 'CompanyID'>): Promise<Company>
  getById(id: number): Promise<Company | null>
  update(id: number, data: Omit<Company, 'CompanyID'>): Promise<Company | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<Company[]>
  getByRuc(ruc: string): Promise<Company | null>
}
