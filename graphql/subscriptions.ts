/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateLink = /* GraphQL */ `
  subscription OnCreateLink {
    onCreateLink {
      id
      owner
      createdAt
      name
      url
      updatedAt
    }
  }
`;
export const onUpdateLink = /* GraphQL */ `
  subscription OnUpdateLink {
    onUpdateLink {
      id
      owner
      createdAt
      name
      url
      updatedAt
    }
  }
`;
export const onDeleteLink = /* GraphQL */ `
  subscription OnDeleteLink {
    onDeleteLink {
      id
      owner
      createdAt
      name
      url
      updatedAt
    }
  }
`;
export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection {
    onCreateCollection {
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
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection {
    onUpdateCollection {
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
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection {
    onDeleteCollection {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
