import { Auth } from './Auth'

export interface IAuthRepository {
  authenticate(data: Auth): Promise<string>
}