/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
      type
      enabled
      code
      players {
        items {
          id
          name
          avatar
          createdAt
          updatedAt
        }
        nextToken
      }
      host {
        id
        name
        game {
          id
          name
          type
          enabled
          code
          playerSeconds
          playerNum
          description
          createdAt
          updatedAt
        }
        avatar
        hostOf {
          id
          name
          type
          enabled
          code
          playerSeconds
          playerNum
          description
          createdAt
          updatedAt
        }
        facts {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      facts {
        items {
          id
          player {
            id
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      playerSeconds
      playerNum
      description
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        enabled
        code
        players {
          nextToken
        }
        host {
          id
          name
          avatar
          createdAt
          updatedAt
        }
        facts {
          nextToken
        }
        playerSeconds
        playerNum
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      name
      game {
        id
        name
        type
        enabled
        code
        players {
          nextToken
        }
        host {
          id
          name
          avatar
          createdAt
          updatedAt
        }
        facts {
          nextToken
        }
        playerSeconds
        playerNum
        description
        createdAt
        updatedAt
      }
      avatar
      hostOf {
        id
        name
        type
        enabled
        code
        players {
          nextToken
        }
        host {
          id
          name
          avatar
          createdAt
          updatedAt
        }
        facts {
          nextToken
        }
        playerSeconds
        playerNum
        description
        createdAt
        updatedAt
      }
      facts {
        id
        game {
          id
          name
          type
          enabled
          code
          playerSeconds
          playerNum
          description
          createdAt
          updatedAt
        }
        player {
          id
          name
          avatar
          createdAt
          updatedAt
        }
        facts {
          name
          valid
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        game {
          id
          name
          type
          enabled
          code
          playerSeconds
          playerNum
          description
          createdAt
          updatedAt
        }
        avatar
        hostOf {
          id
          name
          type
          enabled
          code
          playerSeconds
          playerNum
          description
          createdAt
          updatedAt
        }
        facts {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFacts = /* GraphQL */ `
  query GetFacts($id: ID!) {
    getFacts(id: $id) {
      id
      game {
        id
        name
        type
        enabled
        code
        players {
          nextToken
        }
        host {
          id
          name
          avatar
          createdAt
          updatedAt
        }
        facts {
          nextToken
        }
        playerSeconds
        playerNum
        description
        createdAt
        updatedAt
      }
      player {
        id
        name
        game {
          id
          name
          type
          enabled
          code
          playerSeconds
          playerNum
          description
          createdAt
          updatedAt
        }
        avatar
        hostOf {
          id
          name
          type
          enabled
          code
          playerSeconds
          playerNum
          description
          createdAt
          updatedAt
        }
        facts {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      facts {
        name
        valid
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFactss = /* GraphQL */ `
  query ListFactss(
    $filter: ModelFactsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFactss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        game {
          id
          name
          type
          enabled
          code
          playerSeconds
          playerNum
          description
          createdAt
          updatedAt
        }
        player {
          id
          name
          avatar
          createdAt
          updatedAt
        }
        facts {
          name
          valid
        }
        createdAt
        updatedAt
      }
      nextToken
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
        name
        type
        enabled
        code
        players {
          nextToken
        }
        host {
          id
          name
          avatar
          createdAt
          updatedAt
        }
        facts {
          nextToken
        }
        playerSeconds
        playerNum
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
