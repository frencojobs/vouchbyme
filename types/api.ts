/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  firstName?: string | null,
  lastName?: string | null,
  avatar?: string | null,
  bio?: string | null,
  twitter?: string | null,
  instagram?: string | null,
  youtube?: string | null,
  linkedin?: string | null,
  website?: string | null,
  github?: string | null,
  hashnode?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  twitter?: ModelStringInput | null,
  instagram?: ModelStringInput | null,
  youtube?: ModelStringInput | null,
  linkedin?: ModelStringInput | null,
  website?: ModelStringInput | null,
  github?: ModelStringInput | null,
  hashnode?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id?: string,
  username?: string,
  email?: string,
  firstName?: string | null,
  lastName?: string | null,
  avatar?: string | null,
  bio?: string | null,
  twitter?: string | null,
  instagram?: string | null,
  youtube?: string | null,
  linkedin?: string | null,
  website?: string | null,
  github?: string | null,
  hashnode?: string | null,
  createdAt?: string,
  updatedAt?: string,
  greeting?: Greeting,
  collections?: ModelCollectionConnection,
};

export type Greeting = {
  __typename: "Greeting",
  username?: string,
  title?: string,
  body?: string,
  vouch?: number,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelCollectionConnection = {
  __typename: "ModelCollectionConnection",
  items?:  Array<Collection | null > | null,
  nextToken?: string | null,
};

export type Collection = {
  __typename: "Collection",
  owner?: string | null,
  createdAt?: string,
  id?: string,
  title?: string,
  layout?: string | null,
  vouch?: number,
  updatedAt?: string,
  posts?: ModelPostConnection,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items?:  Array<Post | null > | null,
  nextToken?: string | null,
};

export type Post = {
  __typename: "Post",
  id?: string,
  collectionId?: string,
  index?: number,
  type?: string,
  title?: string,
  cover?: string | null,
  body?: string | null,
  link?: string | null,
  vouch?: number,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username: string,
  email?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  avatar?: string | null,
  bio?: string | null,
  twitter?: string | null,
  instagram?: string | null,
  youtube?: string | null,
  linkedin?: string | null,
  website?: string | null,
  github?: string | null,
  hashnode?: string | null,
};

export type DeleteUserInput = {
  username: string,
};

export type CreateGreetingInput = {
  username: string,
  title: string,
  body: string,
  vouch: number,
};

export type ModelGreetingConditionInput = {
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  vouch?: ModelIntInput | null,
  and?: Array< ModelGreetingConditionInput | null > | null,
  or?: Array< ModelGreetingConditionInput | null > | null,
  not?: ModelGreetingConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateGreetingInput = {
  username: string,
  title?: string | null,
  body?: string | null,
  vouch?: number | null,
};

export type DeleteGreetingInput = {
  username: string,
};

export type CreateCollectionInput = {
  owner?: string | null,
  id?: string | null,
  title: string,
  layout?: string | null,
  vouch: number,
};

export type ModelCollectionConditionInput = {
  createdAt?: ModelStringInput | null,
  title?: ModelStringInput | null,
  layout?: ModelStringInput | null,
  vouch?: ModelIntInput | null,
  and?: Array< ModelCollectionConditionInput | null > | null,
  or?: Array< ModelCollectionConditionInput | null > | null,
  not?: ModelCollectionConditionInput | null,
};

export type UpdateCollectionInput = {
  owner?: string | null,
  id: string,
  title?: string | null,
  layout?: string | null,
  vouch?: number | null,
};

export type DeleteCollectionInput = {
  id?: string | null,
};

export type CreatePostInput = {
  id?: string | null,
  collectionId: string,
  index: number,
  type: string,
  title: string,
  cover?: string | null,
  body?: string | null,
  link?: string | null,
  vouch: number,
};

export type ModelPostConditionInput = {
  collectionId?: ModelIDInput | null,
  index?: ModelIntInput | null,
  type?: ModelStringInput | null,
  title?: ModelStringInput | null,
  cover?: ModelStringInput | null,
  body?: ModelStringInput | null,
  link?: ModelStringInput | null,
  vouch?: ModelIntInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePostInput = {
  id: string,
  collectionId?: string | null,
  index?: number | null,
  type?: string | null,
  title?: string | null,
  cover?: string | null,
  body?: string | null,
  link?: string | null,
  vouch?: number | null,
};

export type DeletePostInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  twitter?: ModelStringInput | null,
  instagram?: ModelStringInput | null,
  youtube?: ModelStringInput | null,
  linkedin?: ModelStringInput | null,
  website?: ModelStringInput | null,
  github?: ModelStringInput | null,
  hashnode?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelGreetingFilterInput = {
  username?: ModelStringInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  vouch?: ModelIntInput | null,
  and?: Array< ModelGreetingFilterInput | null > | null,
  or?: Array< ModelGreetingFilterInput | null > | null,
  not?: ModelGreetingFilterInput | null,
};

export type ModelGreetingConnection = {
  __typename: "ModelGreetingConnection",
  items?:  Array<Greeting | null > | null,
  nextToken?: string | null,
};

export type ModelCollectionFilterInput = {
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  layout?: ModelStringInput | null,
  vouch?: ModelIntInput | null,
  and?: Array< ModelCollectionFilterInput | null > | null,
  or?: Array< ModelCollectionFilterInput | null > | null,
  not?: ModelCollectionFilterInput | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  collectionId?: ModelIDInput | null,
  index?: ModelIntInput | null,
  type?: ModelStringInput | null,
  title?: ModelStringInput | null,
  cover?: ModelStringInput | null,
  body?: ModelStringInput | null,
  link?: ModelStringInput | null,
  vouch?: ModelIntInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type CreateUserMutationVariables = {
  input?: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName?: string | null,
    lastName?: string | null,
    avatar?: string | null,
    bio?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    website?: string | null,
    github?: string | null,
    hashnode?: string | null,
    createdAt: string,
    updatedAt: string,
    greeting?:  {
      __typename: "Greeting",
      username: string,
      title: string,
      body: string,
      vouch: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    collections?:  {
      __typename: "ModelCollectionConnection",
      items?:  Array< {
        __typename: "Collection",
        owner?: string | null,
        createdAt: string,
        id: string,
        title: string,
        layout?: string | null,
        vouch: number,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName?: string | null,
    lastName?: string | null,
    avatar?: string | null,
    bio?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    website?: string | null,
    github?: string | null,
    hashnode?: string | null,
    createdAt: string,
    updatedAt: string,
    greeting?:  {
      __typename: "Greeting",
      username: string,
      title: string,
      body: string,
      vouch: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    collections?:  {
      __typename: "ModelCollectionConnection",
      items?:  Array< {
        __typename: "Collection",
        owner?: string | null,
        createdAt: string,
        id: string,
        title: string,
        layout?: string | null,
        vouch: number,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input?: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName?: string | null,
    lastName?: string | null,
    avatar?: string | null,
    bio?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    website?: string | null,
    github?: string | null,
    hashnode?: string | null,
    createdAt: string,
    updatedAt: string,
    greeting?:  {
      __typename: "Greeting",
      username: string,
      title: string,
      body: string,
      vouch: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    collections?:  {
      __typename: "ModelCollectionConnection",
      items?:  Array< {
        __typename: "Collection",
        owner?: string | null,
        createdAt: string,
        id: string,
        title: string,
        layout?: string | null,
        vouch: number,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateGreetingMutationVariables = {
  input?: CreateGreetingInput,
  condition?: ModelGreetingConditionInput | null,
};

export type CreateGreetingMutation = {
  createGreeting?:  {
    __typename: "Greeting",
    username: string,
    title: string,
    body: string,
    vouch: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGreetingMutationVariables = {
  input?: UpdateGreetingInput,
  condition?: ModelGreetingConditionInput | null,
};

export type UpdateGreetingMutation = {
  updateGreeting?:  {
    __typename: "Greeting",
    username: string,
    title: string,
    body: string,
    vouch: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGreetingMutationVariables = {
  input?: DeleteGreetingInput,
  condition?: ModelGreetingConditionInput | null,
};

export type DeleteGreetingMutation = {
  deleteGreeting?:  {
    __typename: "Greeting",
    username: string,
    title: string,
    body: string,
    vouch: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCollectionMutationVariables = {
  input?: CreateCollectionInput,
  condition?: ModelCollectionConditionInput | null,
};

export type CreateCollectionMutation = {
  createCollection?:  {
    __typename: "Collection",
    owner?: string | null,
    createdAt: string,
    id: string,
    title: string,
    layout?: string | null,
    vouch: number,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        collectionId: string,
        index: number,
        type: string,
        title: string,
        cover?: string | null,
        body?: string | null,
        link?: string | null,
        vouch: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateCollectionMutationVariables = {
  input?: UpdateCollectionInput,
  condition?: ModelCollectionConditionInput | null,
};

export type UpdateCollectionMutation = {
  updateCollection?:  {
    __typename: "Collection",
    owner?: string | null,
    createdAt: string,
    id: string,
    title: string,
    layout?: string | null,
    vouch: number,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        collectionId: string,
        index: number,
        type: string,
        title: string,
        cover?: string | null,
        body?: string | null,
        link?: string | null,
        vouch: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteCollectionMutationVariables = {
  input?: DeleteCollectionInput,
  condition?: ModelCollectionConditionInput | null,
};

export type DeleteCollectionMutation = {
  deleteCollection?:  {
    __typename: "Collection",
    owner?: string | null,
    createdAt: string,
    id: string,
    title: string,
    layout?: string | null,
    vouch: number,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        collectionId: string,
        index: number,
        type: string,
        title: string,
        cover?: string | null,
        body?: string | null,
        link?: string | null,
        vouch: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input?: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    collectionId: string,
    index: number,
    type: string,
    title: string,
    cover?: string | null,
    body?: string | null,
    link?: string | null,
    vouch: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input?: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    collectionId: string,
    index: number,
    type: string,
    title: string,
    cover?: string | null,
    body?: string | null,
    link?: string | null,
    vouch: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input?: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    collectionId: string,
    index: number,
    type: string,
    title: string,
    cover?: string | null,
    body?: string | null,
    link?: string | null,
    vouch: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  username?: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName?: string | null,
    lastName?: string | null,
    avatar?: string | null,
    bio?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    website?: string | null,
    github?: string | null,
    hashnode?: string | null,
    createdAt: string,
    updatedAt: string,
    greeting?:  {
      __typename: "Greeting",
      username: string,
      title: string,
      body: string,
      vouch: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    collections?:  {
      __typename: "ModelCollectionConnection",
      items?:  Array< {
        __typename: "Collection",
        owner?: string | null,
        createdAt: string,
        id: string,
        title: string,
        layout?: string | null,
        vouch: number,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  username?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      firstName?: string | null,
      lastName?: string | null,
      avatar?: string | null,
      bio?: string | null,
      twitter?: string | null,
      instagram?: string | null,
      youtube?: string | null,
      linkedin?: string | null,
      website?: string | null,
      github?: string | null,
      hashnode?: string | null,
      createdAt: string,
      updatedAt: string,
      greeting?:  {
        __typename: "Greeting",
        username: string,
        title: string,
        body: string,
        vouch: number,
        createdAt: string,
        updatedAt: string,
      } | null,
      collections?:  {
        __typename: "ModelCollectionConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListGreetingsQueryVariables = {
  username?: string | null,
  filter?: ModelGreetingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListGreetingsQuery = {
  listGreetings?:  {
    __typename: "ModelGreetingConnection",
    items?:  Array< {
      __typename: "Greeting",
      username: string,
      title: string,
      body: string,
      vouch: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetGreetingQueryVariables = {
  username?: string,
};

export type GetGreetingQuery = {
  getGreeting?:  {
    __typename: "Greeting",
    username: string,
    title: string,
    body: string,
    vouch: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCollectionQueryVariables = {
  id?: string,
};

export type GetCollectionQuery = {
  getCollection?:  {
    __typename: "Collection",
    owner?: string | null,
    createdAt: string,
    id: string,
    title: string,
    layout?: string | null,
    vouch: number,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        collectionId: string,
        index: number,
        type: string,
        title: string,
        cover?: string | null,
        body?: string | null,
        link?: string | null,
        vouch: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListCollectionsQueryVariables = {
  filter?: ModelCollectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCollectionsQuery = {
  listCollections?:  {
    __typename: "ModelCollectionConnection",
    items?:  Array< {
      __typename: "Collection",
      owner?: string | null,
      createdAt: string,
      id: string,
      title: string,
      layout?: string | null,
      vouch: number,
      updatedAt: string,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id?: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    collectionId: string,
    index: number,
    type: string,
    title: string,
    cover?: string | null,
    body?: string | null,
    link?: string | null,
    vouch: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      id: string,
      collectionId: string,
      index: number,
      type: string,
      title: string,
      cover?: string | null,
      body?: string | null,
      link?: string | null,
      vouch: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName?: string | null,
    lastName?: string | null,
    avatar?: string | null,
    bio?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    website?: string | null,
    github?: string | null,
    hashnode?: string | null,
    createdAt: string,
    updatedAt: string,
    greeting?:  {
      __typename: "Greeting",
      username: string,
      title: string,
      body: string,
      vouch: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    collections?:  {
      __typename: "ModelCollectionConnection",
      items?:  Array< {
        __typename: "Collection",
        owner?: string | null,
        createdAt: string,
        id: string,
        title: string,
        layout?: string | null,
        vouch: number,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName?: string | null,
    lastName?: string | null,
    avatar?: string | null,
    bio?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    website?: string | null,
    github?: string | null,
    hashnode?: string | null,
    createdAt: string,
    updatedAt: string,
    greeting?:  {
      __typename: "Greeting",
      username: string,
      title: string,
      body: string,
      vouch: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    collections?:  {
      __typename: "ModelCollectionConnection",
      items?:  Array< {
        __typename: "Collection",
        owner?: string | null,
        createdAt: string,
        id: string,
        title: string,
        layout?: string | null,
        vouch: number,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName?: string | null,
    lastName?: string | null,
    avatar?: string | null,
    bio?: string | null,
    twitter?: string | null,
    instagram?: string | null,
    youtube?: string | null,
    linkedin?: string | null,
    website?: string | null,
    github?: string | null,
    hashnode?: string | null,
    createdAt: string,
    updatedAt: string,
    greeting?:  {
      __typename: "Greeting",
      username: string,
      title: string,
      body: string,
      vouch: number,
      createdAt: string,
      updatedAt: string,
    } | null,
    collections?:  {
      __typename: "ModelCollectionConnection",
      items?:  Array< {
        __typename: "Collection",
        owner?: string | null,
        createdAt: string,
        id: string,
        title: string,
        layout?: string | null,
        vouch: number,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateGreetingSubscription = {
  onCreateGreeting?:  {
    __typename: "Greeting",
    username: string,
    title: string,
    body: string,
    vouch: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGreetingSubscription = {
  onUpdateGreeting?:  {
    __typename: "Greeting",
    username: string,
    title: string,
    body: string,
    vouch: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGreetingSubscription = {
  onDeleteGreeting?:  {
    __typename: "Greeting",
    username: string,
    title: string,
    body: string,
    vouch: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCollectionSubscription = {
  onCreateCollection?:  {
    __typename: "Collection",
    owner?: string | null,
    createdAt: string,
    id: string,
    title: string,
    layout?: string | null,
    vouch: number,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        collectionId: string,
        index: number,
        type: string,
        title: string,
        cover?: string | null,
        body?: string | null,
        link?: string | null,
        vouch: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateCollectionSubscription = {
  onUpdateCollection?:  {
    __typename: "Collection",
    owner?: string | null,
    createdAt: string,
    id: string,
    title: string,
    layout?: string | null,
    vouch: number,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        collectionId: string,
        index: number,
        type: string,
        title: string,
        cover?: string | null,
        body?: string | null,
        link?: string | null,
        vouch: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteCollectionSubscription = {
  onDeleteCollection?:  {
    __typename: "Collection",
    owner?: string | null,
    createdAt: string,
    id: string,
    title: string,
    layout?: string | null,
    vouch: number,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        collectionId: string,
        index: number,
        type: string,
        title: string,
        cover?: string | null,
        body?: string | null,
        link?: string | null,
        vouch: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    collectionId: string,
    index: number,
    type: string,
    title: string,
    cover?: string | null,
    body?: string | null,
    link?: string | null,
    vouch: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    collectionId: string,
    index: number,
    type: string,
    title: string,
    cover?: string | null,
    body?: string | null,
    link?: string | null,
    vouch: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    collectionId: string,
    index: number,
    type: string,
    title: string,
    cover?: string | null,
    body?: string | null,
    link?: string | null,
    vouch: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
