import { describe, it, expect } from "vitest";
import { ensure } from "src/utils/ensure";

describe("ensure.ts", () => {
  it("should throw error on undefined data", () => {
    const data = undefined;

    expect(() => ensure(data)).toThrowError("Ensure failed for Object.");
  });

  it("should throw error on null data", () => {
    const data = null;

    expect(() => ensure(data)).toThrowError("Ensure failed for Object.");
  });

  it("should return Nonnullable data", () => {
    const data: object | undefined = {};

    expect(ensure(data)).toBeTypeOf("object");
  });
});
