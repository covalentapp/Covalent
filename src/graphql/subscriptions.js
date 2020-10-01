/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
        previous {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      previous {
        items {
          id
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
        previous {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      previous {
        items {
          id
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
        previous {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      previous {
        items {
          id
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
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
        previous {
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
        previous {
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
      previous {
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
          facts
          correct
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
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
        previous {
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
        previous {
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
      previous {
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
          facts
          correct
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
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
        previous {
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
        previous {
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
      previous {
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
          facts
          correct
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFacts = /* GraphQL */ `
  subscription OnCreateFacts {
    onCreateFacts {
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
        previous {
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
        previous {
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
export const onUpdateFacts = /* GraphQL */ `
  subscription OnUpdateFacts {
    onUpdateFacts {
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
        previous {
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
        previous {
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
export const onDeleteFacts = /* GraphQL */ `
  subscription OnDeleteFacts {
    onDeleteFacts {
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
        previous {
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
        previous {
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
export const onCreatePrevious = /* GraphQL */ `
  subscription OnCreatePrevious {
    onCreatePrevious {
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
        previous {
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
        previous {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      facts {
        facts
        correct
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePrevious = /* GraphQL */ `
  subscription OnUpdatePrevious {
    onUpdatePrevious {
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
        previous {
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
        previous {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      facts {
        facts
        correct
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePrevious = /* GraphQL */ `
  subscription OnDeletePrevious {
    onDeletePrevious {
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
        previous {
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
        previous {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      facts {
        facts
        correct
      }
      createdAt
      updatedAt
    }
  }
`;
