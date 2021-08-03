import isBetween from "./isBetween";

describe("isBetween", () => {
    it("should return true if value is between min and max", () => {
        expect(isBetween(1, 0, 2)).toBe(true);
    });

    it("should return true if the value is between min and max inclusive", () => {
        expect(isBetween(2, 0, 2, true)).toBe(true);
    });

    it("should return true if min and max are the same (inclusive)", () => {
        expect(isBetween(2, 2, 2, true)).toBe(true);
    });

    it("should return false if value is not between min and max", () => {
        expect(isBetween(2, 0, 2)).toBe(false);
    });

    it("should return false if the value is between min and max exclusive", () => {
        expect(isBetween(2, 0, 2)).toBe(false);
    });

    it("should return false if min and max are the same (exclusive)", () => {
        expect(isBetween(2, 2, 2)).toBe(false);
    });
});
