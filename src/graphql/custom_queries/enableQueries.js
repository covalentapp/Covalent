/* eslint-disable */
// Queries for api/enable

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
       players {
        items {
          id
        }
      }
      host {
        id
      }
    }
  }
`;
