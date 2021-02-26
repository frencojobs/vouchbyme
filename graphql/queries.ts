/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      username
      email
      firstName
      lastName
      avatar
      bio
      twitter
      instagram
      youtube
      linkedin
      website
      github
      hashnode
      createdAt
      updatedAt
      greeting {
        username
        title
        body
        vouch
        createdAt
        updatedAt
      }
      collections {
        items {
          username
          createdAt
          id
          title
          layout
          vouch
          updatedAt
          posts {
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $username: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        username
        email
        firstName
        lastName
        avatar
        bio
        twitter
        instagram
        youtube
        linkedin
        website
        github
        hashnode
        createdAt
        updatedAt
        greeting {
          username
          title
          body
          vouch
          createdAt
          updatedAt
        }
        collections {
          items {
            username
            createdAt
            id
            title
            layout
            vouch
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listGreetings = /* GraphQL */ `
  query ListGreetings(
    $username: String
    $filter: ModelGreetingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGreetings(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        username
        title
        body
        vouch
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGreeting = /* GraphQL */ `
  query GetGreeting($username: String!) {
    getGreeting(username: $username) {
      username
      title
      body
      vouch
      createdAt
      updatedAt
    }
  }
`;
export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      username
      createdAt
      id
      title
      layout
      vouch
      updatedAt
      posts {
        items {
          id
          username
          collectionId
          createdAt
          type
          title
          cover
          body
          link
          vouch
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        username
        createdAt
        id
        title
        layout
        vouch
        updatedAt
        posts {
          items {
            id
            username
            collectionId
            createdAt
            type
            title
            cover
            body
            link
            vouch
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listCollectionsByUsername = /* GraphQL */ `
  query ListCollectionsByUsername(
    $username: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollectionsByUsername(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        username
        createdAt
        id
        title
        layout
        vouch
        updatedAt
        posts {
          items {
            id
            username
            collectionId
            createdAt
            type
            title
            cover
            body
            link
            vouch
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      username
      collectionId
      createdAt
      type
      title
      cover
      body
      link
      vouch
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        collectionId
        createdAt
        type
        title
        cover
        body
        link
        vouch
        updatedAt
      }
      nextToken
    }
  }
`;
