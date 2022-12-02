import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseAuthGuard } from 'nestjs-firebase-passport';

@Injectable()
export class GqlAuthGuard extends FirebaseAuthGuard {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}