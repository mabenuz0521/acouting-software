import { IUser } from 'src/domain/model/data/UserModel'
import { UserResponse } from 'src/application/graphql'

export class UserPresenter extends UserResponse {
  constructor(user: IUser) {
    super()
    this.id = user.id
    this.email = user.email
    this.name = user.name
    this.lastname = user.lastname
    this.nickname = user.nickname
  }
}
