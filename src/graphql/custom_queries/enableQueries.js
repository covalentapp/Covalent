/* eslint-disable */
// Queries for api/enable

export const getGameHostAndPlayers = /* GraphQL */ `
  query GetGameHostAndPlayers($id: ID!) {
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
