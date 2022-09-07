import { BetterAPI, type GraphQLSubscriptionResult } from "@/utils/better-api";
import type { FileInputData } from "@/utils/file-input";
import { GraphQLAPI, type GraphQLOptions, type GraphQLResult } from "@aws-amplify/api-graphql";
import { describe, it, vi, expect } from "vitest";
import type Observable from "zen-observable-ts";

vi.mock("@aws-amplify/storage", () => {
  const StorageClass = vi.fn(() => ({
    put: vi.fn(async () => ({key: "mockKey"}))
  }));

  const Storage = new StorageClass();
  return { StorageClass, Storage };
});

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

  const mockVariables = {var1: "test variable 1", var2: "test variable 2"};
  
  describe("query", () => {

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

  describe("mutate", () => {
    const mockUploadData: FileInputData = {
      s3InputData: {
        bucket: "mockBucket",
        key: "mockKey",
        region: "mockRegion"
      },
      file: new File([], "mockFile")
    }

    it("should return MutateResult for valid single query", async () => {
      const response = await BetterAPI.mutate<object>('singleQuery', mockVariables)
      expect(GraphQLAPI.graphql).toBeCalled();
      expect(response).toBeDefined();
      expect(response).toBeTypeOf('object');
      expect(response).toHaveProperty('mutateResult');
    });

    it("should return MutateResult for valid array query", async () => {
      const response = await BetterAPI.mutate<object[]>('arrayQuery', mockVariables)
      expect(GraphQLAPI.graphql).toBeCalled();
      expect(response).toBeDefined();
      expect(response).toHaveProperty('mutateResult');
      expect(response).toHaveProperty('mutateResult.items');
      expect(response).toHaveProperty('mutateResult.nextToken');
      expect(response).toHaveProperty('mutateResult.startedAt');
    });

    it("should return PutResult for valid single query", async () => {
      const response = await BetterAPI.mutate<object>('singleQuery', mockVariables, mockUploadData)
      expect(GraphQLAPI.graphql).toBeCalled();
      expect(response).toBeDefined();
      expect(response).toBeTypeOf('object');
      expect(response).toHaveProperty('mutateResult');
    });

    it("should return PutResult for valid array query", async () => {
      const response = await BetterAPI.mutate<object[]>('arrayQuery', mockVariables, mockUploadData)
      expect(GraphQLAPI.graphql).toBeCalled();
      expect(response).toBeDefined();
      expect(response).toHaveProperty('uploadResult');
      expect(response.uploadResult).toBeDefined();
    });

  });
});
