/* eslint-disable */

export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
      id
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
    }
  }
`;
