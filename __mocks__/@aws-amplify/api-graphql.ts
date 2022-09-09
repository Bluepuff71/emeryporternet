import { GraphQLOptions, GraphQLResult } from "@aws-amplify/api-graphql";
import { vi } from "vitest";
import Observable from "zen-observable-ts";
import { GraphQLSubscriptionResult } from "../../src/utils/better-api";

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

export { GraphQLAPIClass, GraphQLAPI };