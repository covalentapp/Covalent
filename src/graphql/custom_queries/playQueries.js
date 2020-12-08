/* eslint-disable */
// Queries for api/play

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
    }
  }
`;
