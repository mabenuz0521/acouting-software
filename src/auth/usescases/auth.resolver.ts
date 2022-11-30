import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse, LoginUserInput, User } from '../domain/graphql';
import { GqlAuthGuard } from '../domain/guards/auth.guard';
import { AuthService } from '../infrastructure/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    ////login
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  sinup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.singup(loginUserInput);
  }
}
