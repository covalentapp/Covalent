/* eslint-disable */
// Queries for api/postFacts

export const getGameAndPlayer = /* GraphQL */ `
  query GetGameAndPlayer($gameId: ID!, $playerId: ID!) {
    getGame(id: $gameId) {
      id
      players {
        items {
          id
        }
      }
      facts {
        items {
          id
        }
      }
      playerSeconds
    }
    getPlayer(id: $playerId) {
      id
      previous {
        id
        facts {
          facts
        }
      }
      timer {
        id
        time
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
        valid
      }
    }
  }
`;

export const getPrevious = /* GraphQL */ `
  query GetPrevious($id: ID!) {
    getPrevious(id: $id) {
      id
      facts {
        facts
        correct
      }
    }
  }
`;
