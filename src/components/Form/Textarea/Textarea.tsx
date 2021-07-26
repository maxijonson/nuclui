import React from "react";
import clsx from "clsx";
import styled from "styled-components";
import _ from "lodash";
import { createComponentName, mergeRefs } from "@utils";
import { scrollbar } from "@styles";
import { useForceUpdate, useControllable } from "@hooks";
import { NuiTextarea } from "./types";
import { InputContainer } from "../InputContainer";
import { extractInputContainerProps } from "../InputContainer/InputContainer";

/** Returns the height without padding, the bottom padding and the top padding (in pixels) */
const decomposeElementHeight = (element: HTMLElement) => {
    const { paddingTop, paddingBottom, borderTop, borderBottom } =
        window.getComputedStyle(element);
    const padding = parseFloat(paddingTop) + parseFloat(paddingBottom);
    const border = parseFloat(borderTop) + parseFloat(borderBottom);
    return {
        height: element.scrollHeight - padding - border,
        excess: padding + border,
        padding,
        border,
    };
};

const Textarea: NuiTextarea = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: {
                value,
                onChange,
                resizeable = false,
                minRows = 1,
                maxRows,
                defaultValue,
                className,
                ...textAreaProps
            },
            ...inputContainerProps
        } = extractInputContainerProps(props);
        const { onFocus, onBlur } = textAreaProps;
        const { disabled } = inputContainerProps;

        const forceUpdate = useForceUpdate();

        const textareaRef = React.useRef<HTMLTextAreaElement>(null);
        const mergedRefs = React.useMemo(
            () => mergeRefs(ref, textareaRef),
            [ref]
        );

        const [controllableValue, controllableOnChange, readOnly] =
            useControllable(defaultValue ?? "", props);

        const hiddenTextareaRef = React.useRef<HTMLTextAreaElement>(null);
        const rowHeight = React.useRef(0);
        const excessHeight = React.useRef(0);

        const [hasInit, setHasInit] = React.useState(false);
        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiTextarea",
                    resizeable && "NuiTextarea--resizeable",
                    className,
                ]),
            [className, resizeable]
        );

        const min = React.useMemo(() => {
            const m = _.min([minRows, maxRows]);
            if (!m || m <= 0) return 1;
            return m;
        }, [maxRows, minRows]);
        const max = React.useMemo(() => {
            if (maxRows === undefined) return undefined;
            const m = _.max([minRows, maxRows]);
            if (!m || m <= 0) return 1;
            return m;
        }, [maxRows, minRows]);

        const autoResize = React.useCallback(() => {
            /* istanbul ignore next */
            if (!textareaRef?.current || !hiddenTextareaRef?.current) {
                forceUpdate();
                return;
            }
            // Disallow auto-resize when the `resize` prop is given
            if (resizeable) {
                return;
            }
            const { height, excess } = decomposeElementHeight(
                hiddenTextareaRef.current
            );
            const minHeight = min * rowHeight.current;
            const maxHeight = max ? max * rowHeight.current : Infinity;
            const next = _.clamp(height, minHeight, maxHeight);

            textareaRef.current.style.height = `${next + excess}px`;
        }, [forceUpdate, max, min, resizeable]);

        const handleFocus = React.useCallback<
            React.FocusEventHandler<HTMLTextAreaElement>
        >(
            (e) => {
                setFocused(true);
                if (onFocus) {
                    onFocus(e);
                }
            },
            [onFocus]
        );

        const handleChange = React.useCallback<
            React.ChangeEventHandler<HTMLTextAreaElement>
        >(
            (e) => {
                controllableOnChange(e.target.value, e);
            },
            [controllableOnChange]
        );

        const handleBlur = React.useCallback<
            React.FocusEventHandler<HTMLTextAreaElement>
        >(
            (e) => {
                setFocused(false);
                setTouched(true);
                if (onBlur) {
                    onBlur(e);
                }
            },
            [onBlur]
        );

        React.useEffect(() => {
            /* istanbul ignore next */
            if (!hiddenTextareaRef?.current) {
                forceUpdate();
                return;
            }
            hiddenTextareaRef.current.value = "M";
            const { height, excess } = decomposeElementHeight(
                hiddenTextareaRef.current
            );
            rowHeight.current = height;
            excessHeight.current = excess;
            setHasInit(true);
        }, [forceUpdate]);

        React.useEffect(() => {
            if (!hasInit) return;
            autoResize();
        }, [hasInit, autoResize, controllableValue]);

        React.useEffect(() => {
            /* istanbul ignore next */
            if (!textareaRef.current || rowHeight.current === undefined) return;
            const minHeight = min * rowHeight.current + excessHeight.current;
            const maxHeight = max
                ? max * rowHeight.current + excessHeight.current
                : Infinity;

            textareaRef.current.style.minHeight = `${minHeight}px`;
            if (maxHeight !== Infinity) {
                textareaRef.current.style.maxHeight = `${maxHeight}px`;
            }
        }, [max, min]);

        return (
            <StyledTextarea
                {...inputContainerProps}
                focused={focused}
                touched={touched}
                className={classes}
            >
                <div className="NuiTextarea__container">
                    <textarea
                        {...textAreaProps}
                        ref={mergedRefs}
                        readOnly={readOnly}
                        className="NuiTextarea__textarea"
                        value={controllableValue}
                        disabled={disabled}
                        rows={min}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <textarea
                        ref={hiddenTextareaRef}
                        readOnly
                        aria-hidden="true"
                        tabIndex={-1}
                        className="NuiTextarea__hidden"
                        value={controllableValue}
                    />
                </div>
            </StyledTextarea>
        );
    })
);

const StyledTextarea = styled(InputContainer)`
    & .NuiTextarea__container {
        display: flex;
        position: relative;
        width: 100%;
    }

    & .NuiTextarea__textarea {
        ${scrollbar}
        resize: none;
    }

    &.NuiTextarea--resizeable .NuiTextarea__textarea {
        resize: vertical;
    }

    & .NuiTextarea__hidden.NuiTextarea__hidden {
        position: absolute !important;
        visibility: hidden !important;
        height: 0 !important;
        min-height: 0 !important;
        overflow: hidden !important;
        top: 0 !important;
        right: 0 !important;
        pointer-events: none !important;
    }
`;

StyledTextarea.displayName = createComponentName("StyledTextarea");
Textarea.displayName = createComponentName("Textarea");

export default Textarea;
