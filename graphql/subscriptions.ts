/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($username: String) {
    onCreateUser(username: $username) {
      id
      username
      email
      name
      avatar
      bio
      links {
        type
        url
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($username: String) {
    onUpdateUser(username: $username) {
      id
      username
      email
      name
      avatar
      bio
      links {
        type
        url
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($username: String) {
    onDeleteUser(username: $username) {
      id
      username
      email
      name
      avatar
      bio
      links {
        type
        url
      }
      createdAt
      updatedAt
    }
  }
`;
