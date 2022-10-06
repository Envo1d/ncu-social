/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation Login($data: LoginInput!) {\n  login(data: $data)\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation refreshTokens {\n  getNewTokens\n}": types.RefreshTokensDocument,
    "mutation Register($data: RegisterInput!) {\n  register(data: $data)\n}": types.RegisterDocument,
    "query Me {\n  profile {\n    role\n    avatarUrl\n    isVerified\n    username\n  }\n}": types.MeDocument,
    "query Profile {\n  profile {\n    id\n    firstName\n    lastName\n    username\n    gender\n    country\n    avatarUrl\n    email\n    isVerified\n  }\n}": types.ProfileDocument,
    "query Users {\n  getAll {\n    id\n    username\n    email\n  }\n}": types.UsersDocument,
    "query GetCode {\n  sendVerificationCode\n}": types.GetCodeDocument,
    "mutation Verify($data: VerifyEmailInput!) {\n  verifyEmail(data: $data)\n}": types.VerifyDocument,
};

export function graphql(source: "mutation Login($data: LoginInput!) {\n  login(data: $data)\n}"): (typeof documents)["mutation Login($data: LoginInput!) {\n  login(data: $data)\n}"];
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
export function graphql(source: "mutation refreshTokens {\n  getNewTokens\n}"): (typeof documents)["mutation refreshTokens {\n  getNewTokens\n}"];
export function graphql(source: "mutation Register($data: RegisterInput!) {\n  register(data: $data)\n}"): (typeof documents)["mutation Register($data: RegisterInput!) {\n  register(data: $data)\n}"];
export function graphql(source: "query Me {\n  profile {\n    role\n    avatarUrl\n    isVerified\n    username\n  }\n}"): (typeof documents)["query Me {\n  profile {\n    role\n    avatarUrl\n    isVerified\n    username\n  }\n}"];
export function graphql(source: "query Profile {\n  profile {\n    id\n    firstName\n    lastName\n    username\n    gender\n    country\n    avatarUrl\n    email\n    isVerified\n  }\n}"): (typeof documents)["query Profile {\n  profile {\n    id\n    firstName\n    lastName\n    username\n    gender\n    country\n    avatarUrl\n    email\n    isVerified\n  }\n}"];
export function graphql(source: "query Users {\n  getAll {\n    id\n    username\n    email\n  }\n}"): (typeof documents)["query Users {\n  getAll {\n    id\n    username\n    email\n  }\n}"];
export function graphql(source: "query GetCode {\n  sendVerificationCode\n}"): (typeof documents)["query GetCode {\n  sendVerificationCode\n}"];
export function graphql(source: "mutation Verify($data: VerifyEmailInput!) {\n  verifyEmail(data: $data)\n}"): (typeof documents)["mutation Verify($data: VerifyEmailInput!) {\n  verifyEmail(data: $data)\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;