import { describe, it, expect, vi, beforeEach } from "vitest";
import { ensure } from "src/utils/ensure";
import { BetterAPI } from "@/utils/better-api"

vi.mock("@/utils/better-api", () => {
    const BetterAPIClass = vi.fn(() => ({
        query: vi.fn(() => ({data: "data"}))
    }));

    const BetterAPI = new BetterAPIClass();

    return { BetterAPIClass, BetterAPI };
});

describe("CharacterCreator.vue", () => {
    
    describe('onCreatePressed', () => {
        it("should clear input fields", () => {
            console.log(BetterAPI.query("test"));
            
            expect(BetterAPI.query).toHaveBeenCalled();
        });
    });
});
