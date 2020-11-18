/* eslint-disable */
// Queries for api/join

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
        enabled
        players {
          items {
            id
          }
        }
        playerNum
      }
    }
  }
`;