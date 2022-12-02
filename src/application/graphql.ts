
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Token {
    token?: Nullable<string>;
    user?: Nullable<User>;
}

export class User {
    id?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export abstract class IQuery {
    abstract login(email: string, password: string): Nullable<Token> | Promise<Nullable<Token>>;

    abstract singup(email: string, password: string): Nullable<User> | Promise<Nullable<User>>;

    abstract greeting(): string | Promise<string>;
}

type Nullable<T> = T | null;
