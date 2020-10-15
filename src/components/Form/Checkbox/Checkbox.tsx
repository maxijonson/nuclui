import { border, context } from "@theme";
import { createComponentName } from "@utils";
import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import { HTMLInputProps } from "../InputContainer/types";
import { NuiCheckbox } from "./types";

// TODO: errors
// TODO: touched
// TODO: focused
// TODO: disabled
const Checkbox: NuiCheckbox = React.memo(
    React.forwardRef((props, ref) => {
        const {
            className,
            label,
            onChange,
            value,
            inputValue,
            labelPosition,
            ...restProps
        } = props;

        const handleChange = React.useCallback<HTMLInputProps["onChange"]>(
            (e) => {
                if (onChange) {
                    onChange(e.currentTarget.checked, e);
                }
            },
            [onChange]
        );

        return (
            <label className={clsx(["NuiCheckbox", className])}>
                {label && <div className="NuiCheckbox__label">{label}</div>}
                <div className="NuiCheckbox__inputContainer">
                    <input
                        {...restProps}
                        value={inputValue}
                        checked={value}
                        onChange={handleChange}
                        ref={ref}
                        type="checkbox"
                        className="NuiCheckbox__input"
                    />
                    <div className="NuiCheckbox__customInput" />
                </div>
            </label>
        );
    })
);

const StyledCheckbox = styled(Checkbox)`
    ${context}

    position: relative;
    display: flex;
    width: fit-content;
    align-items: center;
    pointer-events: none;

    gap: ${({ labelPosition }) => {
        switch (labelPosition) {
            case "left":
            case "right":
            case undefined:
                return "10px";
            default:
                return undefined;
        }
    }};

    flex-direction: ${({ labelPosition }) => {
        switch (labelPosition) {
            case "top":
                return "column";
            default:
            case "right":
                return "row-reverse";
            case "bottom":
                return "column-reverse";
            case "left":
                return "row";
        }
    }};

    .NuiCheckbox__inputContainer {
        position: relative;
        width: 18px;
        height: 18px;
    }

    .NuiCheckbox__input,
    .NuiCheckbox__customInput,
    .NuiCheckbox__label {
        cursor: pointer;
        pointer-events: all;
    }

    .NuiCheckbox__input {
        position: absolute;
        opacity: 0;

        &:checked ~ .NuiCheckbox__customInput {
            background-color: var(--nui-context-primary);
            transform: scale(1);
            border-color: transparent;
        }

        /** Checkmark icon (visible) */
        &:checked ~ .NuiCheckbox__customInput::after {
            border: 0px solid white;
            border-right-width: 2px;
            border-bottom-width: 2px;
            transform: rotate(35deg) scale(1);
        }
    }

    .NuiCheckbox__customInput {
        ${border.primary}

        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: transparent;
        border-radius: 2px;
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        transition: background-color 200ms ease-out, border-color 200ms ease-out;

        /** Checkmark icon (hidden) */
        &::after {
            position: absolute;
            left: 0.3375em;
            top: 0.105em;
            width: 3px;
            height: 9px;
            transform: rotate(35deg) scale(0);
            transition: transform 300ms ease-out;
            content: "";
        }
    }
`;

StyledCheckbox.displayName = createComponentName("Checkbox");

export default StyledCheckbox as typeof Checkbox;
