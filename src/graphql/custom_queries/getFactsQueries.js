/* eslint-disable */
// Queries for api/getFacts

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      players {
        items {
          id
        }
      }
      facts {
        items {
          id
          player {
            id
          }
        }
      }
    }
  }
`;

// Used by getFacts.js
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      previous {
        id
        facts {
          facts
        }
      }
      avatar
      timer {
        id
      }
    }
  }
`;

export const getFacts = /* GraphQL */ `
  query GetFacts($id: ID!) {
    getFacts(id: $id) {
      id
      player {
        id
        name
      }
      facts {
        id
        name
      }
    }
  }
`;
