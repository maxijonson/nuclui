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
            restProps: {
                value,
                inputValue,
                type = "checkbox",
                inputBaseElementProps = {},
                children,
                className,
                ...inputProps
            },
            ...inputBaseProps
        } = extractInputBaseProps(props);
        const { disabled } = inputBaseProps;

        const labelPosition = props.labelPosition ?? "right";

        return (
            <InputBase
                {...inputBaseElementProps}
                {...inputBaseProps}
                labelPosition={labelPosition}
                className={clsx(["NuiCheckboxContainer", className])}
            >
                <input
                    {...inputProps}
                    disabled={disabled}
                    value={inputValue}
                    checked={value}
                    ref={ref}
                    type={type}
                    className="NuiCheckboxContainer__input"
                />
                {children}
            </InputBase>
        );
    })
);

const StyledCheckboxContainer = styled(CheckboxContainer)`
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

    & .NuiCheckboxContainer__input {
        position: absolute;
        opacity: 0;
    }
`;

StyledCheckboxContainer.displayName = createComponentName("CheckboxContainer");

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
    const { restProps: restBaseProps, ...baseProps } = extractInputBaseProps(
        props
    );
    const {
        value = false,
        inputValue = "",
        type = "checkbox",
        inputBaseElementProps = {},
        ...restProps
    } = restBaseProps;

    return {
        ...baseProps,
        value,
        inputValue,
        type,
        inputBaseElementProps,
        restProps,
    };
};

export default StyledCheckboxContainer as typeof CheckboxContainer;
