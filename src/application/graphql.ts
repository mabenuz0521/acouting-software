
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

export abstract class IQuery {
    abstract login(email: string, password: string): Nullable<Token> | Promise<Nullable<Token>>;

    abstract singup(email: string, password: string): Nullable<User> | Promise<Nullable<User>>;

    abstract greetings(): string | Promise<string>;

    abstract greeting(): string | Promise<string>;

    abstract users(): User[] | Promise<User[]>;
}

export class User {
    id?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

type Nullable<T> = T | null;
