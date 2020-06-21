import createComponentName from "./createComponentName";

describe("createComponentName", () => {
    it("should return 'NuiUnnamed' when no name is provided", () => {
        const componentName = createComponentName();
        expect(componentName).toEqual("NuiUnnamed");
    });

    it("should return 'NuiTest' when the provided name is 'test'", () => {
        const componentName = createComponentName("test");
        expect(componentName).toEqual("NuiTest");
    });

    it("should return 'NuiP' when the provided name is 'p'", () => {
        const componentName = createComponentName("p");
        expect(componentName).toEqual("NuiP");
    });
});
