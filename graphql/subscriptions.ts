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
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection {
    onUpdateCollection {
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
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection {
    onDeleteCollection {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
