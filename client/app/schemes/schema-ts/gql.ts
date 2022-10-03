/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}": types.LoginDocument,
    "mutation refreshTokens {\n  getNewTokens {\n    accessToken\n    user {\n      role\n    }\n  }\n}": types.RefreshTokensDocument,
    "mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}": types.RegisterDocument,
    "query Users {\n  getAll {\n    id\n    username\n    email\n  }\n}": types.UsersDocument,
};

export function graphql(source: "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}"): (typeof documents)["mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}"];
export function graphql(source: "mutation refreshTokens {\n  getNewTokens {\n    accessToken\n    user {\n      role\n    }\n  }\n}"): (typeof documents)["mutation refreshTokens {\n  getNewTokens {\n    accessToken\n    user {\n      role\n    }\n  }\n}"];
export function graphql(source: "mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}"): (typeof documents)["mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}"];
export function graphql(source: "query Users {\n  getAll {\n    id\n    username\n    email\n  }\n}"): (typeof documents)["query Users {\n  getAll {\n    id\n    username\n    email\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;