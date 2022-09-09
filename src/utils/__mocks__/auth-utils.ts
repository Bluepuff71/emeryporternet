import { vi } from "vitest";

const getAuthMode = vi.fn(async (isAuthenticated?: boolean) =>  isAuthenticated ? "AWS_IAM" : undefined);

export { getAuthMode }