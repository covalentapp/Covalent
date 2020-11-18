/* eslint-disable */
// Queries for api/submit

export const getGameAndPlayer = /* GraphQL */ `
  query GetGameAndPlayer($gameId: ID!, $playerId: ID!) {
    getGame(id: $gameId) {
      id
    }
    getPlayer(id: $playerId) {
      id
      facts {
        id
      }
    }
  }
`;