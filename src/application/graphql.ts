
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class Token {
    token?: Nullable<string>;
    user?: Nullable<UserResponse>;
}

export abstract class IQuery {
    abstract login(email: string, password: string): Nullable<Token> | Promise<Nullable<Token>>;

    abstract greetings(): string | Promise<string>;

    abstract greeting(): string | Promise<string>;

    abstract getUsers(): UserResponse[] | Promise<UserResponse[]>;

    abstract getUser(id: string): UserResponse | Promise<UserResponse>;

    abstract getUserByEmail(email: string): UserResponse | Promise<UserResponse>;
}

export abstract class IMutation {
    abstract singup(email: string, password: string): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

    abstract updateUser(id: string, userInput: UserInput): UserResponse | Promise<UserResponse>;
}

export class UserResponse {
    id?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

type Nullable<T> = T | null;
