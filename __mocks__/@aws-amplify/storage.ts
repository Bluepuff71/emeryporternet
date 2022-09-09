import { vi } from "vitest";

const StorageClass = vi.fn(() => ({
  put: vi.fn(async () => ({key: "mockKey"}))
}));

const Storage = new StorageClass();
export { StorageClass, Storage };