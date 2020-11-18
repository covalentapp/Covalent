/* eslint-disable */
// Queries for api/getFacts

export const getGameFacts = /* GraphQL */ `
  query GetGameFacts($id: ID!) {
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
export const getPlayerPreviousAndTimer = /* GraphQL */ `
  query GetPlayerPreviousAndTimer($id: ID!) {
    getPlayer(id: $id) {
      id
      previous {
        id
        facts {
          facts
        }
      }
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
      facts {
        id
        name
      }
    }
  }
`;