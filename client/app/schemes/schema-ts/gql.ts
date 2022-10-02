/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}": types.LoginDocument,
    "mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}": types.RegisterDocument,
};

export function graphql(source: "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}"): (typeof documents)["mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}"];
export function graphql(source: "mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}"): (typeof documents)["mutation Register($data: RegisterInput!) {\n  register(data: $data) {\n    accessToken\n    user {\n      role\n    }\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;