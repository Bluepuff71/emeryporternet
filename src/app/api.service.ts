/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateCharacter: OnCreateCharacterSubscription;
  onUpdateCharacter: OnUpdateCharacterSubscription;
  onDeleteCharacter: OnDeleteCharacterSubscription;
};

export type CreateCharacterInput = {
  id?: string | null;
  name: string;
  description: string;
  samplePath: string;
  picturePath: string;
};

export type ModelCharacterConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  samplePath?: ModelStringInput | null;
  picturePath?: ModelStringInput | null;
  and?: Array<ModelCharacterConditionInput | null> | null;
  or?: Array<ModelCharacterConditionInput | null> | null;
  not?: ModelCharacterConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Character = {
  __typename: "Character";
  id: string;
  name: string;
  description: string;
  samplePath: string;
  picturePath: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCharacterInput = {
  id: string;
  name?: string | null;
  description?: string | null;
  samplePath?: string | null;
  picturePath?: string | null;
};

export type DeleteCharacterInput = {
  id: string;
};

export type ModelCharacterFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  samplePath?: ModelStringInput | null;
  picturePath?: ModelStringInput | null;
  and?: Array<ModelCharacterFilterInput | null> | null;
  or?: Array<ModelCharacterFilterInput | null> | null;
  not?: ModelCharacterFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelCharacterConnection = {
  __typename: "ModelCharacterConnection";
  items: Array<Character | null>;
  nextToken?: string | null;
};

export type ModelSubscriptionCharacterFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  samplePath?: ModelSubscriptionStringInput | null;
  picturePath?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionCharacterFilterInput | null> | null;
  or?: Array<ModelSubscriptionCharacterFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type CreateCharacterMutation = {
  __typename: "Character";
  id: string;
  name: string;
  description: string;
  samplePath: string;
  picturePath: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCharacterMutation = {
  __typename: "Character";
  id: string;
  name: string;
  description: string;
  samplePath: string;
  picturePath: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCharacterMutation = {
  __typename: "Character";
  id: string;
  name: string;
  description: string;
  samplePath: string;
  picturePath: string;
  createdAt: string;
  updatedAt: string;
};

export type GetCharacterQuery = {
  __typename: "Character";
  id: string;
  name: string;
  description: string;
  samplePath: string;
  picturePath: string;
  createdAt: string;
  updatedAt: string;
};

export type ListCharactersQuery = {
  __typename: "ModelCharacterConnection";
  items: Array<{
    __typename: "Character";
    id: string;
    name: string;
    description: string;
    samplePath: string;
    picturePath: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateCharacterSubscription = {
  __typename: "Character";
  id: string;
  name: string;
  description: string;
  samplePath: string;
  picturePath: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCharacterSubscription = {
  __typename: "Character";
  id: string;
  name: string;
  description: string;
  samplePath: string;
  picturePath: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCharacterSubscription = {
  __typename: "Character";
  id: string;
  name: string;
  description: string;
  samplePath: string;
  picturePath: string;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateCharacter(
    input: CreateCharacterInput,
    condition?: ModelCharacterConditionInput
  ): Promise<CreateCharacterMutation> {
    const statement = `mutation CreateCharacter($input: CreateCharacterInput!, $condition: ModelCharacterConditionInput) {
        createCharacter(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          samplePath
          picturePath
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCharacterMutation>response.data.createCharacter;
  }
  async UpdateCharacter(
    input: UpdateCharacterInput,
    condition?: ModelCharacterConditionInput
  ): Promise<UpdateCharacterMutation> {
    const statement = `mutation UpdateCharacter($input: UpdateCharacterInput!, $condition: ModelCharacterConditionInput) {
        updateCharacter(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          samplePath
          picturePath
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCharacterMutation>response.data.updateCharacter;
  }
  async DeleteCharacter(
    input: DeleteCharacterInput,
    condition?: ModelCharacterConditionInput
  ): Promise<DeleteCharacterMutation> {
    const statement = `mutation DeleteCharacter($input: DeleteCharacterInput!, $condition: ModelCharacterConditionInput) {
        deleteCharacter(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          samplePath
          picturePath
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCharacterMutation>response.data.deleteCharacter;
  }
  async GetCharacter(id: string): Promise<GetCharacterQuery> {
    const statement = `query GetCharacter($id: ID!) {
        getCharacter(id: $id) {
          __typename
          id
          name
          description
          samplePath
          picturePath
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCharacterQuery>response.data.getCharacter;
  }
  async ListCharacters(
    filter?: ModelCharacterFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCharactersQuery> {
    const statement = `query ListCharacters($filter: ModelCharacterFilterInput, $limit: Int, $nextToken: String) {
        listCharacters(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            description
            samplePath
            picturePath
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCharactersQuery>response.data.listCharacters;
  }
  OnCreateCharacterListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCharacter">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCharacter {
        onCreateCharacter {
          __typename
          id
          name
          description
          samplePath
          picturePath
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCharacter">>
  >;

  OnUpdateCharacterListener(
    filter?: ModelSubscriptionCharacterFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCharacter">>
  > {
    const statement = `subscription OnUpdateCharacter($filter: ModelSubscriptionCharacterFilterInput) {
        onUpdateCharacter(filter: $filter) {
          __typename
          id
          name
          description
          samplePath
          picturePath
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCharacter">>
    >;
  }

  OnDeleteCharacterListener(
    filter?: ModelSubscriptionCharacterFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCharacter">>
  > {
    const statement = `subscription OnDeleteCharacter($filter: ModelSubscriptionCharacterFilterInput) {
        onDeleteCharacter(filter: $filter) {
          __typename
          id
          name
          description
          samplePath
          picturePath
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCharacter">>
    >;
  }
}
