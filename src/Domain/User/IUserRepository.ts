import { User } from './User'

export interface IUserRepository {
  create(data: Omit<User, 'UserID'>): Promise<User>
  getById(id: number): Promise<User | null>
  update(id: number, data: Omit<User, 'UserID'>): Promise<User | null>
  delete(id: number): Promise<void>
  getPaginated(page: number, limit: number): Promise<User[]>
}