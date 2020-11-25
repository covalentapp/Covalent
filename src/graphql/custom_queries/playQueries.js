/* eslint-disable */
// Queries for api/play

export const getGameAndPlayerID = /* GraphQL */ `
  query GetGameAndPlayerID($gameId: ID!, $playerId: ID!) {
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
    }
  }
`;
