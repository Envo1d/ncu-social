/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime'];
  generalCategory?: Maybe<Category>;
  generalCategoryId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  products?: Maybe<Array<Product>>;
  subcategories?: Maybe<Array<Category>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CategoryPartInput = {
  categoryId: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateCategoryInput = {
  general?: InputMaybe<CategoryPartInput>;
  title: Scalars['String'];
};

export type CreateCountryInput = {
  title: Scalars['String'];
};

export type CreateOrderInput = {
  productsInfo: Array<OrderPartInput>;
};

export type CreatePostInput = {
  content?: InputMaybe<Scalars['Upload']>;
  text: Scalars['String'];
  title: Scalars['String'];
};

export type CreateProductInput = {
  categories: Array<CategoryPartInput>;
  description: Scalars['String'];
  price: Scalars['Float'];
  title: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Scalars['Boolean'];
  createCountry: Scalars['Boolean'];
  createOrder: Order;
  createPost: Post;
  createProduct: Scalars['Boolean'];
  getNewTokens: Scalars['Boolean'];
  login: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  removeCategory: Scalars['Boolean'];
  removeCountry: Scalars['Boolean'];
  removeOrder: Scalars['Boolean'];
  removeProduct: Product;
  updateCategory: Scalars['Boolean'];
  updateCountry: Scalars['Boolean'];
  updateOrder: Scalars['Boolean'];
  updateProduct: Product;
  verifyEmail: Scalars['Boolean'];
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateCountryArgs = {
  data: CreateCountryInput;
};


export type MutationCreateOrderArgs = {
  data: CreateOrderInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCountryArgs = {
  id: Scalars['String'];
};


export type MutationRemoveOrderArgs = {
  id: Scalars['String'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
};


export type MutationUpdateCountryArgs = {
  data: UpdateCountryInput;
};


export type MutationUpdateOrderArgs = {
  data: UpdateOrderInput;
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
};


export type MutationVerifyEmailArgs = {
  data: VerifyEmailInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  customer: User;
  id: Scalars['ID'];
  products: Array<ProductOrder>;
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type OrderPartInput = {
  amount: Scalars['Int'];
  productId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  contentUrl: Scalars['String'];
  id: Scalars['ID'];
  likedBy?: Maybe<Array<User>>;
  registeredAt: Scalars['DateTime'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Product = {
  __typename?: 'Product';
  categories: Array<Category>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  imagesUrl: Scalars['String'];
  orders?: Maybe<Array<ProductOrder>>;
  owner: User;
  ownerId: Scalars['String'];
  price: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductOrder = {
  __typename?: 'ProductOrder';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  order: Order;
  orderId: Scalars['String'];
  product: Product;
  productId: Scalars['String'];
  quantity: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  countries: Array<Country>;
  country: Country;
  getAll: Array<User>;
  order: Order;
  orders: Array<Order>;
  product: Product;
  products: Array<Product>;
  profile: User;
  sendVerificationCode: Scalars['Boolean'];
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryCountryArgs = {
  id: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['String'];
};


export type QueryProductArgs = {
  id: Scalars['String'];
};

export type RegisterInput = {
  countryId: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateCategoryInput = {
  general?: InputMaybe<CategoryPartInput>;
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCountryInput = {
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateOrderInput = {
  id: Scalars['ID'];
  productsInfo: Array<OrderPartInput>;
};

export type UpdateProductInput = {
  categories?: InputMaybe<Array<CategoryPartInput>>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  price?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isVerified: Scalars['String'];
  lastName: Scalars['String'];
  likes?: Maybe<Array<Post>>;
  passwordHash: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  registeredAt: Scalars['DateTime'];
  role: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserInfoResponse = {
  __typename?: 'UserInfoResponse';
  email: Scalars['String'];
  id: Scalars['String'];
  role: Scalars['String'];
};

export type VerifyEmailInput = {
  verifyCode: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokensMutation = { __typename?: 'Mutation', getNewTokens: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type GetCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', title: string, id: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', profile: { __typename?: 'User', role: string, avatarUrl?: string | null, isVerified: string, username: string } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, avatarUrl?: string | null, posts?: Array<{ __typename?: 'Post', title: string, text: string }> | null, likes?: Array<{ __typename?: 'Post', title: string }> | null } };

export type ProfileInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileInfoQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, gender?: string | null, country?: string | null, avatarUrl?: string | null, email: string, isVerified: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', getAll: Array<{ __typename?: 'User', id: string, username: string, email: string }> };

export type GetCodeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCodeQuery = { __typename?: 'Query', sendVerificationCode: boolean };

export type VerifyMutationVariables = Exact<{
  data: VerifyEmailInput;
}>;


export type VerifyMutation = { __typename?: 'Mutation', verifyEmail: boolean };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNewTokens"}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetCountriesQuery, GetCountriesQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const ProfileInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]} as unknown as DocumentNode<ProfileInfoQuery, ProfileInfoQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const GetCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendVerificationCode"}}]}}]} as unknown as DocumentNode<GetCodeQuery, GetCodeQueryVariables>;
export const VerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<VerifyMutation, VerifyMutationVariables>;