import { ICompanyRepository } from '../../Domain/Company/ICompanyRepository'
import { Company } from '../../Domain/Company/Company'

export class CreateCompany {
  constructor(private repo: ICompanyRepository) {}
  execute(data: Omit<Company, 'CompanyID'>) {
    return this.repo.create(data)
  }
}