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
export const onCreateGreeting = /* GraphQL */ `
  subscription OnCreateGreeting {
    onCreateGreeting {
      username
      title
      body
      vouch
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGreeting = /* GraphQL */ `
  subscription OnUpdateGreeting {
    onUpdateGreeting {
      username
      title
      body
      vouch
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGreeting = /* GraphQL */ `
  subscription OnDeleteGreeting {
    onDeleteGreeting {
      username
      title
      body
      vouch
      createdAt
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
