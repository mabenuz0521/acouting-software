
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserInput {
    id?: Nullable<string>;
    name: string;
    lastname: string;
    email: string;
    password: string;
    nickname?: Nullable<string>;
}

export class AuthTokenResponse {
    token: string;
}

export abstract class IMutation {
    abstract login(email: string, password: string): Nullable<AuthTokenResponse> | Promise<Nullable<AuthTokenResponse>>;

    abstract signup(userInput?: Nullable<UserInput>): Nullable<AuthTokenResponse> | Promise<Nullable<AuthTokenResponse>>;

    abstract updateUser(id: string, userInput: UserInput): UserResponse | Promise<UserResponse>;
}

export class UserResponse {
    id?: Nullable<string>;
    email?: Nullable<string>;
    name?: Nullable<string>;
    lastname?: Nullable<string>;
    nickname?: Nullable<string>;
}

export abstract class IQuery {
    abstract getUsers(): UserResponse[] | Promise<UserResponse[]>;

    abstract getUser(id: string): UserResponse | Promise<UserResponse>;

    abstract getUserByEmail(email: string): UserResponse | Promise<UserResponse>;

    abstract greeting(): string | Promise<string>;
}

type Nullable<T> = T | null;
