import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import { background, border, context, shadow } from "@theme";
import { createComponentName } from "@utils";
import { quicksand } from "@fonts";
import {
    InputContainerProps,
    InputContainerPropsWithBase,
    NuiInputContainer,
} from "./types";
import InputBase, { extractInputBaseProps } from "../InputBase/InputBase";
import { InputBaseProps } from "../InputBase/types";

const InputContainer: NuiInputContainer = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: {
                variant,
                prepend,
                append,
                className,
                children,
                ...inputBaseElementProps
            },
            ...inputBaseProps
        } = extractInputBaseProps(props);

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiInputContainer",
                    [
                        variant == "underline" &&
                            "NuiInputContainer--variant-underline",
                        variant == "none" && "NuiInputContainer--variant-none",
                        variant == "filled" &&
                            "NuiInputContainer--variant-filled",
                        variant == "filled-underline" &&
                            "NuiInputContainer--variant-filled-underline",
                        variant == "filled-none" &&
                            "NuiInputContainer--variant-filled-none",
                    ],
                    className,
                ]),
            [className, variant]
        );

        return (
            <InputBase
                {...inputBaseElementProps}
                {...inputBaseProps}
                ref={ref}
                className={classes}
            >
                {prepend && (
                    <div
                        className="NuiInputContainer__prepend"
                        children={prepend}
                    />
                )}
                <div className="NuiInputContainer__main" children={children} />
                {append && (
                    <div
                        className="NuiInputContainer__append"
                        children={append}
                    />
                )}
                <div className="NuiInputContainer__underline" />
            </InputBase>
        );
    })
);

const TRANSITION_TIME = 0.2;

const StyledInputContainer = styled(InputContainer)`
    ${quicksand}
    ${context}
    --nui-inputContainer-underline: 1px;
    --nui-inputContainer-pad: 8px;

    & .NuiInputBase__container {
        ${border.secondary}
        ${shadow.secondary}

        display: flex;
        width: 100%;
        position: relative;
        box-sizing: border-box;
        transition: border-color ${TRANSITION_TIME}s;
        padding: 0;
        box-shadow: 0 1px 2px -1px var(--nui-shadow);
        border-style: solid;
        border-width: 1px;

        & input,
        & textarea {
            padding: var(--nui-inputContainer-pad);
            font-size: var(--nui-inputContainer-font);
            box-sizing: border-box;
            width: 100%;
            background: transparent;
            border: none;
            min-width: 30%;

            &:focus {
                outline: none;
            }

            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus {
                -webkit-text-fill-color: inherit;
                box-shadow: 0 0 0px 1000px inherit inset;
                transition: background-color 5000s ease-in-out 0s;
            }
        }
    }

    & .NuiInputContainer__main {
        position: relative;
        display: flex;
        flex: 1 1 0px;
    }

    & .NuiInputContainer__prepend,
    & .NuiInputContainer__append {
        ${background.secondary}

        display: flex;
        align-items: center;
        margin-bottom: 0px;
        padding: 0 var(--nui-inputContainer-pad);
        font-size: calc(var(--nui-inputContainer-font) / 1.2);
        min-width: 0;
        overflow: hidden;

        & svg {
            fill: currentColor;
            width: 1em;
            height: 1em;
            font-size: 1rem;
            user-select: none;
        }
    }

    & .NuiInputContainer__underline {
        position: absolute;
        width: 100%;
        height: var(--nui-inputContainer-underline);
        left: 0;
        bottom: 0;
        background-color: var(--nui-context-primary);
        transform-origin: 50% 50%;
        transform: scaleX(0);
        transition: transform ${TRANSITION_TIME}s;
    }

    &.NuiInputContainer--variant-underline {
        & .NuiInputContainer__prepend,
        & .NuiInputContainer__append {
            ${background.secondary}
        }

        & .NuiInputBase__container {
            box-shadow: none;
            border-width: 0px;
            border-bottom-width: 1px;
        }
    }

    &.NuiInputContainer--variant-none {
        & .NuiInputContainer__prepend,
        & .NuiInputContainer__append {
            ${background.secondary}
        }

        & .NuiInputBase__container {
            box-shadow: none;
            border-width: 0;
            border-left: none;
            border-right: none;
            border-top: none;
        }

        & .NuiInputContainer__underline {
            display: none;
        }
    }

    &.NuiInputContainer--variant-filled {
        & .NuiInputContainer__prepend,
        & .NuiInputContainer__append {
            ${background.dimmed}
        }

        & .NuiInputBase__container {
            ${background.secondary}

            box-shadow: 0 1px 2px -1px var(--nui-shadow);
            border-width: 1px;
        }
    }

    &.NuiInputContainer--variant-filled-underline {
        & .NuiInputContainer__prepend,
        & .NuiInputContainer__append {
            ${background.dimmed}
        }

        & .NuiInputBase__container {
            ${background.secondary}

            box-shadow: 0 1px 2px -1px var(--nui-shadow);
            border-width: 1px;
            border-left: none;
            border-right: none;
            border-top: none;
        }
    }

    &.NuiInputContainer--variant-filled-none {
        & .NuiInputContainer__prepend,
        & .NuiInputContainer__append {
            ${background.dimmed}
        }

        & .NuiInputBase__container {
            ${background.secondary}

            box-shadow: none;
            border-width: 0;
            border-left: none;
            border-right: none;
            border-top: none;
        }

        & .NuiInputContainer__underline {
            display: none;
        }
    }

    &.NuiInputBase--focused {
        & .NuiInputBase__container {
            border-color: var(--nui-context-primary);
        }

        & .NuiInputContainer__underline {
            transform: scaleX(1);
        }
    }

    &.NuiInputBase--invalid {
        & .NuiInputBase__container {
            border-color: var(--nui-context-danger);
        }

        & .NuiInputContainer__underline {
            background-color: var(--nui-context-danger);
        }
    }

    &.NuiInputBase--size-xs {
        --nui-inputContainer-underline: 1px;
        --nui-inputContainer-pad: 4px;
    }
    &.NuiInputBase--size-md {
        --nui-inputContainer-underline: 1px;
        --nui-inputContainer-pad: 10px;
    }
    &.NuiInputBase--size-lg {
        --nui-inputContainer-underline: 2px;
        --nui-inputContainer-pad: 12px;
    }
    &.NuiInputBase--size-xl {
        --nui-inputContainer-underline: 2px;
        --nui-inputContainer-pad: 14px;
    }
`;

StyledInputContainer.displayName = createComponentName("StyledInputContainer");
InputContainer.displayName = createComponentName("InputContainer");

/**
 * Extracts all relevant props for the InputContainer and gives them a default value, if needed. The excess is placed in the `restProps` property.
 */
export const extractInputContainerProps = <
    T extends InputContainerPropsWithBase
>(
    props: T
): Required<InputContainerPropsWithBase> & {
    restProps: Omit<Omit<T, keyof InputBaseProps>, keyof InputContainerProps>;
} => {
    const { restProps: restBaseProps, ...baseProps } =
        extractInputBaseProps(props);
    const {
        append = null,
        prepend = null,
        variant = "outline",
        ...restProps
    } = restBaseProps;

    return {
        ...baseProps,
        append,
        prepend,
        variant,
        restProps,
    };
};

export default StyledInputContainer as typeof InputContainer;
