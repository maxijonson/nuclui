import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { context } from "@theme";
import { createComponentName } from "@utils";
import { NuiCheckboxContainer } from "./types";
import { InputBase } from "../InputBase";

const CheckboxContainer: NuiCheckboxContainer = React.memo(
    React.forwardRef((props, ref) => {
        const {
            className,
            label,
            onFocus,
            onChange,
            onBlur,
            value,
            inputValue,
            errors,
            children,
            focused,
            touched,
            size,
            fluid,
            labelPosition = "right",
            type = "checkbox",
            ...restProps
        } = props;

        return (
            <InputBase
                className={clsx(["NuiCheckboxContainer", className])}
                label={label}
                labelPosition={labelPosition}
                size={size}
                fluid={fluid}
                errors={errors}
                touched={touched}
                focused={focused}
                disabled={props.disabled}
            >
                <input
                    {...restProps}
                    value={inputValue}
                    checked={value}
                    onFocus={onFocus}
                    onChange={onChange}
                    onBlur={onBlur}
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

export default StyledCheckboxContainer as typeof CheckboxContainer;
