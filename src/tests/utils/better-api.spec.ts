import { BetterAPI } from "@/utils/better-api";
import type { FileInputData } from "@/utils/file-input";
import { GraphQLAPI } from "@aws-amplify/api-graphql";
import { describe, it, vi, expect } from "vitest";

vi.mock("@aws-amplify/api-graphql");

vi.mock('@/utils/auth-utils');

vi.mock("@aws-amplify/storage");

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
