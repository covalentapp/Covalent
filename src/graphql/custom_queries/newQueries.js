/* eslint-disable */
// Queries for api/new

// Get the minimum amount of data to check if a game with this code exists
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
