
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    id?: Nullable<number>;
    password: string;
    email: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class LoginResponse {
    access_token: string;
    user: User;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract login(loginUserInput: LoginUserInput): LoginResponse | Promise<LoginResponse>;

    abstract sinup(loginUserInput: LoginUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract user(username: string): User | Promise<User>;

    abstract users(): User[] | Promise<User[]>;
}

export class User {
    id: number;
    password: string;
    email: string;
}

type Nullable<T> = T | null;
