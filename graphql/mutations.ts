/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      avatar
      bio
      createdAt
      updatedAt
      links {
        items {
          id
          owner
          createdAt
          name
          url
          updatedAt
        }
        nextToken
      }
      collections {
        items {
          owner
          createdAt
          id
          title
          vouchFor
          vouch
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      avatar
      bio
      createdAt
      updatedAt
      links {
        items {
          id
          owner
          createdAt
          name
          url
          updatedAt
        }
        nextToken
      }
      collections {
        items {
          owner
          createdAt
          id
          title
          vouchFor
          vouch
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      avatar
      bio
      createdAt
      updatedAt
      links {
        items {
          id
          owner
          createdAt
          name
          url
          updatedAt
        }
        nextToken
      }
      collections {
        items {
          owner
          createdAt
          id
          title
          vouchFor
          vouch
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createLink = /* GraphQL */ `
  mutation CreateLink(
    $input: CreateLinkInput!
    $condition: ModelLinkConditionInput
  ) {
    createLink(input: $input, condition: $condition) {
      id
      owner
      createdAt
      name
      url
      updatedAt
    }
  }
`;
export const updateLink = /* GraphQL */ `
  mutation UpdateLink(
    $input: UpdateLinkInput!
    $condition: ModelLinkConditionInput
  ) {
    updateLink(input: $input, condition: $condition) {
      id
      owner
      createdAt
      name
      url
      updatedAt
    }
  }
`;
export const deleteLink = /* GraphQL */ `
  mutation DeleteLink(
    $input: DeleteLinkInput!
    $condition: ModelLinkConditionInput
  ) {
    deleteLink(input: $input, condition: $condition) {
      id
      owner
      createdAt
      name
      url
      updatedAt
    }
  }
`;
export const createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $input: CreateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    createCollection(input: $input, condition: $condition) {
      owner
      createdAt
      id
      title
      vouchFor
      vouch
      updatedAt
      posts {
        items {
          id
          collectionId
          index
          type
          title
          cover
          body
          link
          vouch
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $input: UpdateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    updateCollection(input: $input, condition: $condition) {
      owner
      createdAt
      id
      title
      vouchFor
      vouch
      updatedAt
      posts {
        items {
          id
          collectionId
          index
          type
          title
          cover
          body
          link
          vouch
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $input: DeleteCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    deleteCollection(input: $input, condition: $condition) {
      owner
      createdAt
      id
      title
      vouchFor
      vouch
      updatedAt
      posts {
        items {
          id
          collectionId
          index
          type
          title
          cover
          body
          link
          vouch
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      collectionId
      index
      type
      title
      cover
      body
      link
      vouch
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      collectionId
      index
      type
      title
      cover
      body
      link
      vouch
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      collectionId
      index
      type
      title
      cover
      body
      link
      vouch
      createdAt
      updatedAt
      owner
    }
  }
`;
