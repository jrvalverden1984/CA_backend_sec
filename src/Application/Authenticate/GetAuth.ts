import { IAuthRepository } from '../../Domain/Authenticate/IAuthRepository'
import { Auth } from '../../Domain/Authenticate/Auth'

export class GetAuth {
  constructor(private repo: IAuthRepository) {}
  execute(data: Auth) {
    return this.repo.authenticate(data)
  }
}