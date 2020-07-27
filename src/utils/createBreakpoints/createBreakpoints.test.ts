import createBreakpoints from "./createBreakpoints";

describe("createBreakpoints", () => {
    it("should return the default breakpoints", () => {
        expect(createBreakpoints({})).toEqual({
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0,
        });
    });

    it("should return the default breakpoints with overriden ones", () => {
        expect(createBreakpoints({ md: 1337 })).toEqual({
            xs: 0,
            sm: 0,
            md: 1337,
            lg: 0,
            xl: 0,
        });
    });

    it("should return all the overriden breakpoints", () => {
        expect(
            createBreakpoints({ xs: 5, sm: 10, md: 15, lg: 20, xl: 25 })
        ).toEqual({
            xs: 5,
            sm: 10,
            md: 15,
            lg: 20,
            xl: 25,
        });
    });
});
