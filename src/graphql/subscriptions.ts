/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCharacter = /* GraphQL */ `
  subscription OnCreateCharacter(
    $filter: ModelSubscriptionCharacterFilterInput
  ) {
    onCreateCharacter(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCharacter = /* GraphQL */ `
  subscription OnUpdateCharacter(
    $filter: ModelSubscriptionCharacterFilterInput
  ) {
    onUpdateCharacter(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCharacter = /* GraphQL */ `
  subscription OnDeleteCharacter(
    $filter: ModelSubscriptionCharacterFilterInput
  ) {
    onDeleteCharacter(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
