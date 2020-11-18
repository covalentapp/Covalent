/* eslint-disable */
// Queries for api/results

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      players {
        items {
          id
          name
        }
      }
      facts {
        items {
          id
          player {
            id
            name
          }
        }
      }
      previous {
        items {
          id
          facts {
            facts
            correct
          }
          player {
            id
          }
        }
      }
    }
  }
`;