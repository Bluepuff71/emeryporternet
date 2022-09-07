import { BetterAPI, type GraphQLSubscriptionResult } from "@/utils/better-api";
import { GraphQLAPI, type GraphQLOptions, type GraphQLResult } from "@aws-amplify/api-graphql";
import { describe, it, vi, expect } from "vitest";
import type Observable from "zen-observable-ts";

vi.mock("@aws-amplify/api-graphql", () => {
  const mockObj = {
    stringProp: "string property", 
    arrayProp: [1,2,3], 
    objectProp: { 
      objPropStr: "objectProp string" 
    }
  };

  const mockSingleResponse = {
    data: { 
      singleQuery: mockObj
    }
  }

  const mockArrayResponse = {
    data:{
      arrayQuery: {
        items: [mockObj, mockObj],
        nextToken: null,
        startedAt: null
      }
    }
  }
  const GraphQLAPIClass = vi.fn(() => ({
      graphql: vi.fn(async ({ query }: GraphQLOptions): Promise<GraphQLResult | Observable<GraphQLSubscriptionResult<object>>> => {
        switch (query) {
          case 'singleQuery':
            return mockSingleResponse;
          case 'arrayQuery':
            return mockArrayResponse;
          default:
            throw new Error("Bad test query");
        }
      })
  }));

  const GraphQLAPI = new GraphQLAPIClass();

  return { GraphQLAPIClass, GraphQLAPI };
});

vi.mock('@/utils/auth-utils', () => {
  const getAuthMode = vi.fn(async (isAuthenticated?: boolean) =>  isAuthenticated ? "AWS_IAM" : undefined);

  return { getAuthMode };
});

describe("better-api.ts", () => {

  describe("query", () => {
    const mockVariables = {var1: "test variable 1", var2: "test variable 2"};

    it("should return object for valid single request", async () => {
      const response = await BetterAPI.query<object>('singleQuery', mockVariables);  
      expect(GraphQLAPI.graphql).toBeCalled();
      expect(response).toBeTypeOf('object');
    });

    it("should return ArrayResponse for valid array request", async () => {
      const response = await BetterAPI.query<object[]>('arrayQuery', mockVariables);
      expect(GraphQLAPI.graphql).toBeCalled();
      expect(response).toBeDefined();
      expect(response).toHaveProperty('items');
      expect(response).toHaveProperty('nextToken');
      expect(response).toHaveProperty('startedAt');
    });
  });
});
