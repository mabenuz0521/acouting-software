import { IAuth } from 'src/domain/model/data/AuthModel'
import { AuthTokenResponse } from 'src/application/graphql'

export class AuthPresenter extends AuthTokenResponse{
  constructor(userAuth: IAuth){
    super()
    this.token = userAuth.token
  }
}
