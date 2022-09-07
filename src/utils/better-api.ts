import type {
  GraphQLOptions,
  GraphQLResult,
  GRAPHQL_AUTH_MODE,
} from "@aws-amplify/api-graphql";
import { GraphQLAPI } from "@aws-amplify/api-graphql";
import type { AWSAppSyncRealTimeProvider } from "@aws-amplify/pubsub";
import type { PutResult } from "@aws-amplify/storage";
import { Storage } from "@aws-amplify/storage";
import type Observable from "zen-observable-ts";
import { getAuthMode } from "./auth-utils";
import { ensure } from "./ensure";
import type { FileInputData } from "./file-input";

export interface GraphQLSubscriptionResult<T> {
  provider: AWSAppSyncRealTimeProvider;
  value: GraphQLResult<T>;
}

export interface ArrayResponse<T extends object[]> {
  items: T;
  nextToken: string;
  startedAt: object;
}

export interface MutateResult<T> {
  mutateResult: GraphQLResult<T>;
  uploadResult?: PutResult;
}

const betterAPIOperation = (
  query: any,
  variables?: {},
  authMode?: keyof typeof GRAPHQL_AUTH_MODE,
  authToken?: string,
  userAgentSuffix?: string
) => ({
  query,
  variables,
  authMode,
  authToken,
  userAgentSuffix,
});

export class BetterAPIClass { //TODO: move this out into it's own module
  public async query<
    R extends object | object[],
    V extends GraphQLOptions["variables"] = GraphQLOptions["variables"]
  >(
    query: string,
    variables?: V
  ): Promise<R extends object[] ? ArrayResponse<R> : R> {
    try {
      const response = (await this.makeRequest<R>(
        query,
        variables
      )) as GraphQLResult<R>;
      return Object.entries(ensure(response.data))[0][1];
    } catch (err) {
      console.error(err);
      throw new Error("Api query error");
    }
  }

  public async mutate<
    R extends object | object[],
    V extends GraphQLOptions["variables"] = GraphQLOptions["variables"]
  >(query: string, variables: V, uploadData?: FileInputData) {
    try {
      const mutateResult: MutateResult<R> = {
        mutateResult: (await this.makeRequest<R>(
          query,
          variables
        )) as GraphQLResult<R>,
      };
      if (uploadData) {
        mutateResult.uploadResult = await Storage.put(
          uploadData.s3InputData.key,
          uploadData.file,
          { contentType: uploadData.file.type }
        );
      }
    } catch (err) {
      console.error(err);
      throw new Error("Api mutate error");
    }
  }

  public async listen<
    R extends object,
    V extends GraphQLOptions["variables"] = GraphQLOptions["variables"]
  >(query: string, variables?: V) {
    try {
      return (await this.makeRequest<R>(query, variables)) as Observable<
        GraphQLSubscriptionResult<R>
      >;
    } catch (err) {
      console.error(err);
      throw new Error("Api subscription error");
    }
  }

  private async makeRequest<
    R extends object,
    V extends GraphQLOptions["variables"] = GraphQLOptions["variables"]
  >(
    query: string,
    variables?: V
  ): Promise<GraphQLResult<R> | Observable<GraphQLSubscriptionResult<R>>> {
    const authMode = await getAuthMode(); //TODO: this is going to end up slowing down for large requests.
    return GraphQLAPI.graphql(
      betterAPIOperation(query, variables, authMode)
    ) as GraphQLResult<R>;
  }
}

export const BetterAPI = new BetterAPIClass();
