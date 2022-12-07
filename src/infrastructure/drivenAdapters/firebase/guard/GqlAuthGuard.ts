import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { FirebaseAuthGuard } from './FirebaseAuthGuard'

@Injectable()
export class GqlAuthGuard extends FirebaseAuthGuard {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
