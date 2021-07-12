import { createBasicTests } from "@utils/test";
import CheckboxContainer, {
    extractCheckboxContainerProps,
} from "./CheckboxContainer";
import "jest-styled-components";
import { CheckboxContainerPropsWithBase } from "./types";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(CheckboxContainer, {});

describe("CheckboxContainer", () => {
    testRendering();
    testDisplayName("NuiCheckboxContainer", "NuiStyledCheckboxContainer");
    testRef("div");
    testClassName("div", "NuiCheckboxContainer");
});

describe("extractCheckboxContainerProps", () => {
    it("should extract the default CheckoutContainer props and put other props in the restProps", () => {
        const customProps = { test: true } as const;
        const { restProps, ...baseProps } = extractCheckboxContainerProps({
            ...customProps,
            disabled: undefined,
        });
        expect(restProps).toEqual(customProps);
        expect(baseProps).toEqual({
            disabled: false,
            errors: [],
            fluid: false,
            focused: false,
            label: "",
            labelPosition: "right",
            size: "sm",
            touched: true,
        });
    });

    it("should extract the CheckoutContainer props and put other props in the restProps", () => {
        const checkboxContainerProps: Required<CheckboxContainerPropsWithBase> =
            {
                disabled: true,
                errors: ["test error"],
                fluid: true,
                focused: true,
                label: "test label",
                labelPosition: "bottom",
                size: "xs",
                touched: false,
            };
        const customProps = { test: true } as const;
        const props = { ...checkboxContainerProps, ...customProps };
        const { restProps, ...baseProps } =
            extractCheckboxContainerProps(props);
        expect(restProps).toEqual(customProps);
        expect(baseProps).toEqual(checkboxContainerProps);
    });
});
