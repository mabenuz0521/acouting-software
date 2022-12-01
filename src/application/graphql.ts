
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Token {
    token?: Nullable<string>;
}

export abstract class IQuery {
    abstract login(email: string, password: string): Nullable<Token> | Promise<Nullable<Token>>;
}

type Nullable<T> = T | null;
