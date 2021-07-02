import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { context } from "@theme";
import { createComponentName } from "@utils";
import {
    CheckboxContainerProps,
    CheckboxContainerPropsWithBase,
    NuiCheckboxContainer,
} from "./types";
import { InputBase } from "../InputBase";
import { InputBaseProps } from "../InputBase/types";
import { extractInputBaseProps } from "../InputBase/InputBase";

const CheckboxContainer: NuiCheckboxContainer = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: { children, className, ...inputBaseElementProps },
            ...inputBaseProps
        } = extractInputBaseProps(props);

        return (
            <StyledCheckboxContainer
                {...inputBaseElementProps}
                {...inputBaseProps}
                ref={ref}
                className={clsx(["NuiCheckboxContainer", className])}
            >
                {children}
            </StyledCheckboxContainer>
        );
    })
);

const StyledCheckboxContainer = styled(InputBase)`
    ${context}
    --nui-inputBase-size: 18px;

    width: fit-content;

    & .NuiInputBase__container {
        position: relative;
        flex-shrink: 0;
        width: var(--nui-inputBase-size);
        height: var(--nui-inputBase-size);
    }

    & .NuiInputBase__label-container {
        align-items: center;
    }
`;

StyledCheckboxContainer.displayName = createComponentName(
    "StyledCheckboxContainer"
);
CheckboxContainer.displayName = createComponentName("CheckboxContainer");

/**
 * Extracts all relevant props for the CheckboxContainer and gives them a default value, if needed. The excess is placed in the `restProps` property.
 */
export const extractCheckboxContainerProps = <
    T extends CheckboxContainerPropsWithBase
>(
    props: T
): Required<CheckboxContainerPropsWithBase> & {
    restProps: Omit<
        Omit<T, keyof InputBaseProps>,
        keyof CheckboxContainerProps
    >;
} => {
    const { restProps, ...baseProps } = extractInputBaseProps({
        labelPosition: "right",
        ...props,
    });

    return {
        ...baseProps,
        restProps,
    };
};

export default CheckboxContainer;
