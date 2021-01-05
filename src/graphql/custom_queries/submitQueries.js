/* eslint-disable */
// Queries for api/submit

export const getGameAndPlayer = /* GraphQL */ `
  query GetGameAndPlayer($gameId: ID!, $playerId: ID!) {
    getGame(id: $gameId) {
      id
      facts {
        items {
          id
          player {
            id
          }
        }
      }
    }
    getPlayer(id: $playerId) {
      id
    }
  }
`;
