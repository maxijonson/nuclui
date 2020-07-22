import breakpointUnder from "./breakpointUnder";

describe("breakpointUnder", () => {
    it("should be true when 'bp' is equal to 'under'", () => {
        expect(breakpointUnder("md", "md")).toBeTruthy();
    });

    it("should be true when 'bp' is under 'under'", () => {
        expect(breakpointUnder("md", "lg", false)).toBeTruthy();
    });

    it("should be false when 'bp' is over 'under'", () => {
        expect(breakpointUnder("lg", "md")).toBeFalsy();
    });

    it("should be false when 'equal' is false and 'bp' is equal to 'under'", () => {
        expect(breakpointUnder("md", "md", false)).toBeFalsy();
    });

    it("should be false when 'bp' is not a breakpoint", () => {
        expect(breakpointUnder("potato", "lg")).toBeFalsy();
    });

    it("should be false when 'bp' is undefined", () => {
        expect(breakpointUnder(undefined, "lg")).toBeFalsy();
    });
});
