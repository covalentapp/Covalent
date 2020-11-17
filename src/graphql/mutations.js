/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
          ttl
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      facts {
        items {
          id
          ttl
          createdAt
          updatedAt
        }
        nextToken
      }
      previous {
        items {
          id
          ttl
          createdAt
          updatedAt
        }
        nextToken
      }
      playerSeconds
      playerNum
      description
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
          ttl
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      facts {
        items {
          id
          ttl
          createdAt
          updatedAt
        }
        nextToken
      }
      previous {
        items {
          id
          ttl
          createdAt
          updatedAt
        }
        nextToken
      }
      playerSeconds
      playerNum
      description
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
          ttl
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      facts {
        items {
          id
          ttl
          createdAt
          updatedAt
        }
        nextToken
      }
      previous {
        items {
          id
          ttl
          createdAt
          updatedAt
        }
        nextToken
      }
      playerSeconds
      playerNum
      description
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
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
          ttl
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
        ttl
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
          ttl
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
        ttl
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
          ttl
          createdAt
          updatedAt
        }
        player {
          id
          name
          avatar
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          name
          valid
        }
        ttl
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
          ttl
          createdAt
          updatedAt
        }
        player {
          id
          name
          avatar
          ttl
          createdAt
          updatedAt
        }
        facts {
          facts
          correct
        }
        ttl
        createdAt
        updatedAt
      }
      timer {
        id
        player {
          id
          name
          avatar
          ttl
          createdAt
          updatedAt
        }
        time
        ttl
        createdAt
        updatedAt
      }
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
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
          ttl
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
        ttl
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
          ttl
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
        ttl
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
          ttl
          createdAt
          updatedAt
        }
        player {
          id
          name
          avatar
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          name
          valid
        }
        ttl
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
          ttl
          createdAt
          updatedAt
        }
        player {
          id
          name
          avatar
          ttl
          createdAt
          updatedAt
        }
        facts {
          facts
          correct
        }
        ttl
        createdAt
        updatedAt
      }
      timer {
        id
        player {
          id
          name
          avatar
          ttl
          createdAt
          updatedAt
        }
        time
        ttl
        createdAt
        updatedAt
      }
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
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
          ttl
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
        ttl
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
          ttl
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
        ttl
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
          ttl
          createdAt
          updatedAt
        }
        player {
          id
          name
          avatar
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          name
          valid
        }
        ttl
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
          ttl
          createdAt
          updatedAt
        }
        player {
          id
          name
          avatar
          ttl
          createdAt
          updatedAt
        }
        facts {
          facts
          correct
        }
        ttl
        createdAt
        updatedAt
      }
      timer {
        id
        player {
          id
          name
          avatar
          ttl
          createdAt
          updatedAt
        }
        time
        ttl
        createdAt
        updatedAt
      }
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const createFacts = /* GraphQL */ `
  mutation CreateFacts(
    $input: CreateFactsInput!
    $condition: ModelFactsConditionInput
  ) {
    createFacts(input: $input, condition: $condition) {
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
          ttl
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
        ttl
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      facts {
        id
        name
        valid
      }
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const updateFacts = /* GraphQL */ `
  mutation UpdateFacts(
    $input: UpdateFactsInput!
    $condition: ModelFactsConditionInput
  ) {
    updateFacts(input: $input, condition: $condition) {
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
          ttl
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
        ttl
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      facts {
        id
        name
        valid
      }
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const deleteFacts = /* GraphQL */ `
  mutation DeleteFacts(
    $input: DeleteFactsInput!
    $condition: ModelFactsConditionInput
  ) {
    deleteFacts(input: $input, condition: $condition) {
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
          ttl
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
        ttl
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      facts {
        id
        name
        valid
      }
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const createPrevious = /* GraphQL */ `
  mutation CreatePrevious(
    $input: CreatePreviousInput!
    $condition: ModelPreviousConditionInput
  ) {
    createPrevious(input: $input, condition: $condition) {
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
          ttl
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
        ttl
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      facts {
        facts
        correct
      }
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const updatePrevious = /* GraphQL */ `
  mutation UpdatePrevious(
    $input: UpdatePreviousInput!
    $condition: ModelPreviousConditionInput
  ) {
    updatePrevious(input: $input, condition: $condition) {
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
          ttl
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
        ttl
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      facts {
        facts
        correct
      }
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const deletePrevious = /* GraphQL */ `
  mutation DeletePrevious(
    $input: DeletePreviousInput!
    $condition: ModelPreviousConditionInput
  ) {
    deletePrevious(input: $input, condition: $condition) {
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
          ttl
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
        ttl
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      facts {
        facts
        correct
      }
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const createTimer = /* GraphQL */ `
  mutation CreateTimer(
    $input: CreateTimerInput!
    $condition: ModelTimerConditionInput
  ) {
    createTimer(input: $input, condition: $condition) {
      id
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      time
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const updateTimer = /* GraphQL */ `
  mutation UpdateTimer(
    $input: UpdateTimerInput!
    $condition: ModelTimerConditionInput
  ) {
    updateTimer(input: $input, condition: $condition) {
      id
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      time
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const deleteTimer = /* GraphQL */ `
  mutation DeleteTimer(
    $input: DeleteTimerInput!
    $condition: ModelTimerConditionInput
  ) {
    deleteTimer(input: $input, condition: $condition) {
      id
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
          ttl
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
          ttl
          createdAt
          updatedAt
        }
        facts {
          id
          ttl
          createdAt
          updatedAt
        }
        previous {
          id
          ttl
          createdAt
          updatedAt
        }
        timer {
          id
          time
          ttl
          createdAt
          updatedAt
        }
        ttl
        createdAt
        updatedAt
      }
      time
      ttl
      createdAt
      updatedAt
    }
  }
`;
