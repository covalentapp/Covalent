/* eslint-disable */
// Queries for api/game

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
      enabled
      players {
        items {
          id
          name
        }
      }
      host {
        id
        name
      }
      facts {
        items {
          id
          player {
            id
          }
        }
      }
      playerSeconds
      playerNum
    }
  }
`;

export const gameByCode = /* GraphQL */ `
  query GameByCode(
    $code: String
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameByCode(
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
    }
  }
`;
