import React from "react";
import styled from "styled-components";
import _ from "lodash";
import clsx from "clsx";
import Draggable, {
    DraggableBounds,
    DraggableData,
    DraggableEventHandler,
} from "react-draggable";
import { Popover } from "@components/Layout/Popover";
import { context, shadow } from "@theme";
import { useForceUpdate } from "@hooks";
import { createComponentName } from "@utils";
import {
    NuiSlider,
    SliderChangeEvent,
    SliderOnChangeRange,
    SliderOnChangeSingle,
} from "./types";
import { InputBase } from "../InputBase";
import { extractInputBaseProps } from "../InputBase/InputBase";

// TODO: [Feature] Vertical Slider
// TODO: [Feature] Support multiple handles
// TODO: [Feature] Show track ticks
// TODO: [Feature] Track tick labels
// TODO: [Bug] Support decimal steps

/** Adjusts the `value` to a divisible of `step` */
/* istanbul ignore next */
const adjustImprecision = (value: number, step: number) => {
    const stepValue = value * step;
    const slippage = stepValue % step;
    if (slippage == 0) return stepValue;
    if (slippage > 0.5) {
        return stepValue + (step - slippage);
    }
    return stepValue - slippage;
};

/** Gets the position of the handle on the track for it's current value */
/* istanbul ignore next */
const getHandlePosition = (
    value: number,
    min: number,
    max: number,
    step: number,
    trackWidth: number,
    axis: "x" | "y" = "x"
) => {
    const trackSteps = (max - min) / step;
    const unit = trackWidth / trackSteps;
    const pos = _.clamp(
        unit * (value / step) - unit * (min / step),
        0,
        trackWidth
    );
    return axis == "x" ? { x: pos, y: 0 } : { x: 0, y: pos };
};

/* istanbul ignore next */
const sortArray = <T extends number[]>(arr: T) =>
    arr.slice(0).sort((a, b) => a - b) as T;

/** Gets the offseted position by which the handle should move */
/* istanbul ignore next */
const getHandlePositionOffset = (handleWidth: number, axis: "x" | "y" = "x") =>
    axis == "x"
        ? { x: -(handleWidth / 2), y: 0 }
        : { x: 0, y: -(handleWidth / 2) };

const getElementSize = (trackRef: React.RefObject<HTMLDivElement>) =>
    trackRef.current?.getBoundingClientRect().width ?? 0;

/* istanbul ignore next */
const findClosestIndex = <T extends number[]>(origin: number, targets: T) => {
    return _.reduce(
        targets,
        (closest, target, index) => {
            const distance = Math.abs(origin - target);
            if (closest.index === -1) return { distance, index };
            if (distance < closest.distance) return { distance, index };
            return closest;
        },
        { distance: 0, index: -1 }
    ).index;
};

enum Handle {
    FIRST = 0,
    SECOND = 1,
}

enum Key {
    UP = "ArrowUp",
    RIGHT = "ArrowRight",
    DOWN = "ArrowDown",
    LEFT = "ArrowLeft",
}

const Slider: NuiSlider = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: {
                min: propsMin = 0,
                max: propsMax = 100,
                onChange,
                value: propsValue,
                name,
                step = 1,
                shiftStep = 10,
                hideHandlePopover = false,
                className,
                ...inputBaseElementProps
            },
            ...inputBaseProps
        } = extractInputBaseProps(props);
        const { onFocus, onBlur } = inputBaseElementProps;
        const { disabled } = inputBaseProps;

        const forceUpdate = useForceUpdate();

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);
        const [swap, setSwap] = React.useState(false);
        const [activeIndex, setActiveIndex] = React.useState(-1);

        const trackRef = React.useRef<HTMLDivElement>(null);
        const firstHandleRef = React.useRef<HTMLDivElement>(null);
        const secondHandleRef = React.useRef<HTMLDivElement>(null);

        const trackWidth = getElementSize(trackRef);
        const firstHandleWidth = getElementSize(firstHandleRef);
        const secondHandleWidth = getElementSize(secondHandleRef);

        const firstPositionOffset = React.useMemo(
            () => getHandlePositionOffset(firstHandleWidth),
            [firstHandleWidth]
        );
        const secondPositionOffset = React.useMemo(
            () => getHandlePositionOffset(secondHandleWidth),
            [secondHandleWidth]
        );

        const min = React.useMemo(
            () => _.min([propsMin, propsMax]) as number,
            [propsMax, propsMin]
        );
        const max = React.useMemo(
            () => _.max([propsMin, propsMax]) as number,
            [propsMax, propsMin]
        );
        const value = React.useMemo(() => propsValue ?? min, [min, propsValue]);

        const firstValue = React.useMemo(() => {
            if (_.isArray(value)) {
                /* istanbul ignore next */
                if (swap) return value[Handle.SECOND];
                return value[Handle.FIRST];
            }
            return value;
        }, [value, swap]);
        const secondValue = React.useMemo(() => {
            if (_.isArray(value)) {
                /* istanbul ignore next */
                if (swap) return value[Handle.FIRST];
                return value[Handle.SECOND];
            }
            return undefined;
        }, [value, swap]);

        const grid = React.useMemo<[number, number]>(() => {
            const trackSteps = (max - min) / step;
            const gridStepSize = trackWidth / trackSteps;

            return [gridStepSize, 0];
        }, [max, min, step, trackWidth]);
        const bounds = React.useMemo<Required<DraggableBounds>>(
            () => ({
                right: trackWidth,
                left: 0,
                top: 0,
                bottom: 0,
            }),
            [trackWidth]
        );

        const firstPosition = React.useMemo(
            () => getHandlePosition(firstValue, min, max, step, trackWidth),
            [firstValue, max, min, step, trackWidth]
        );
        const secondPosition = React.useMemo(() => {
            if (secondValue == undefined) {
                return { x: 0, y: 0 };
            }
            return getHandlePosition(secondValue, min, max, step, trackWidth);
        }, [secondValue, max, min, step, trackWidth]);

        const firstName = React.useMemo(() => {
            if (!name) return undefined;
            if (_.isArray(name)) return _.first(name);
            return name;
        }, [name]);
        const secondName = React.useMemo(() => {
            if (!name) return undefined;
            if (_.isArray(name)) return _.last(name);
            return `_${name}`;
        }, [name]);

        const classes = React.useMemo(
            () => clsx(["NuiSlider", className]),
            [className]
        );
        const trackFillerStyle = React.useMemo<React.CSSProperties>(() => {
            const start = _.min([firstPosition.x, secondPosition.x]) as number;
            const end = _.max([firstPosition.x, secondPosition.x]) as number;

            return {
                transform: `translateX(${start}px)`,
                width: `${end - start}px`,
            };
        }, [firstPosition.x, secondPosition.x]);

        /* istanbul ignore next */
        const handleChange = React.useCallback(
            (
                relativePos: number,
                handle: Handle,
                e: SliderChangeEvent,
                data?: DraggableData
            ) => {
                if (!onChange) {
                    return;
                }

                const trackSteps = (max - min) / step;
                const unit = trackWidth / trackSteps;
                const next = _.clamp(
                    min + adjustImprecision(relativePos / unit, step),
                    min,
                    max
                );

                if (secondValue == undefined) {
                    (onChange as SliderOnChangeSingle)(next, e, data);
                } else {
                    const valueArr = [firstValue, secondValue] as [
                        number,
                        number
                    ];
                    valueArr[handle] = next;
                    const nextSwap =
                        valueArr[Handle.FIRST] > valueArr[Handle.SECOND];

                    if (nextSwap != swap) {
                        setSwap(nextSwap);
                    }
                    (onChange as SliderOnChangeRange)(
                        sortArray(valueArr),
                        e,
                        data
                    );
                }
            },
            [
                firstValue,
                max,
                min,
                onChange,
                secondValue,
                step,
                swap,
                trackWidth,
            ]
        );

        const handleFocus = React.useCallback(
            (e: React.FocusEvent<HTMLDivElement>) => {
                setFocused(true);
                if (onFocus) {
                    onFocus(e);
                }
            },
            [onFocus]
        );

        const handleDragStart = React.useCallback<DraggableEventHandler>(
            (_e, data) => {
                setActiveIndex(Number(data.node.dataset.handleindex));
            },
            []
        );

        /* istanbul ignore next */
        const handleDrag = React.useCallback<DraggableEventHandler>(
            (e, data) => {
                return handleChange(
                    data.x,
                    Number(data.node.dataset.handleindex) as Handle,
                    e,
                    data
                );
            },
            [handleChange]
        );

        const handleDragStop = React.useCallback<DraggableEventHandler>(() => {
            setActiveIndex(-1);
        }, []);

        /* istanbul ignore next */
        const handleTrackPointerDown = React.useCallback(
            (e: React.PointerEvent<HTMLDivElement>) => {
                if (!trackRef.current) {
                    forceUpdate();
                    return;
                }
                if (e.target !== trackRef.current) return;
                const { x: tX } = trackRef.current.getBoundingClientRect();
                const { clientX: pX } = e;
                const relativePos = Math.abs(pX - tX);
                const handle = findClosestIndex(relativePos, [
                    firstPosition.x,
                    secondPosition.x,
                ]) as Handle;
                return handleChange(relativePos, handle, e);
            },
            [firstPosition.x, forceUpdate, handleChange, secondPosition.x]
        );

        /* istanbul ignore next */
        const handleKeydown = React.useCallback(
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (!trackRef.current) {
                    forceUpdate();
                    return;
                }
                const { x: tX } = trackRef.current.getBoundingClientRect();
                const { x: hX, width: hW } =
                    e.currentTarget.getBoundingClientRect();
                const currentPos = Math.abs(hX + hW / 2 - tX);

                const stepAmount = e.shiftKey ? shiftStep : step;
                const trackSteps = (max - min) / stepAmount;
                const unit = trackWidth / trackSteps;

                const handle = Number(
                    e.currentTarget.dataset.handleindex
                ) as Handle;

                if (e.key === Key.DOWN || e.key === Key.UP) {
                    e.preventDefault();
                }

                switch (e.key) {
                    case Key.RIGHT:
                    case Key.UP:
                        handleChange(currentPos + unit, handle, e);
                        break;
                    case Key.LEFT:
                    case Key.DOWN:
                        handleChange(currentPos - unit, handle, e);
                        break;
                    default:
                        break;
                }
            },
            [forceUpdate, handleChange, max, min, shiftStep, step, trackWidth]
        );

        const handleBlur = React.useCallback(
            (e: React.FocusEvent<HTMLDivElement>) => {
                setFocused(false);
                setTouched(true);
                if (onBlur) {
                    onBlur(e);
                }
            },
            [onBlur]
        );

        // Initizalize the element refs on first render
        React.useEffect(() => {
            forceUpdate();
        }, [trackRef, firstHandleRef, secondHandleRef, forceUpdate]);

        // Re-calculate component when the window is resized
        /* istanbul ignore next */
        React.useEffect(() => {
            let prevTrackSize = getElementSize(trackRef);
            const onWindowResize = () => {
                const currentTrackSize = getElementSize(trackRef);
                if (prevTrackSize != currentTrackSize) {
                    prevTrackSize = currentTrackSize;
                    forceUpdate();
                }
            };
            window.addEventListener("resize", onWindowResize);
            return () => {
                window.removeEventListener("resize", onWindowResize);
            };
        }, [forceUpdate]);

        return (
            <StyledSlider
                {...inputBaseElementProps}
                {...inputBaseProps}
                focused={focused}
                touched={touched}
                ref={ref}
                className={classes}
            >
                <div className="NuiSlider__container">
                    <div
                        className="NuiSlider__track"
                        ref={trackRef}
                        onPointerDown={handleTrackPointerDown}
                    >
                        <div
                            className="NuiSlider__track__filler"
                            style={trackFillerStyle}
                        />
                        <Draggable
                            axis="x"
                            bounds={bounds}
                            disabled={disabled}
                            position={firstPosition}
                            positionOffset={firstPositionOffset}
                            grid={grid}
                            onStart={handleDragStart}
                            onDrag={handleDrag}
                            onStop={handleDragStop}
                            defaultClassName="NuiSlider__handle NuiSlider__handle-1"
                            defaultClassNameDragged="NuiSlider__handle--dragged"
                            defaultClassNameDragging="NuiSlider__handle--dragging"
                            children={
                                <div
                                    ref={firstHandleRef}
                                    data-handleindex={Handle.FIRST}
                                    onKeyDown={handleKeydown}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    role="slider"
                                    aria-valuenow={firstValue}
                                    aria-valuemin={min}
                                    aria-valuemax={max}
                                    tabIndex={0}
                                >
                                    <Popover
                                        children={firstValue}
                                        className="NuiSlider__handle__popover NuiSlider__handle__popover-1"
                                        open={
                                            !hideHandlePopover &&
                                            activeIndex === Handle.FIRST
                                        }
                                    />
                                </div>
                            }
                        />
                        {secondValue && (
                            <Draggable
                                axis="x"
                                bounds={bounds}
                                disabled={disabled}
                                position={secondPosition}
                                positionOffset={secondPositionOffset}
                                grid={grid}
                                onStart={handleDragStart}
                                onDrag={handleDrag}
                                onStop={handleDragStop}
                                defaultClassName="NuiSlider__handle NuiSlider__handle-2"
                                defaultClassNameDragged="NuiSlider__handle--dragged"
                                defaultClassNameDragging="NuiSlider__handle--dragging"
                                children={
                                    <div
                                        ref={secondHandleRef}
                                        data-handleindex={Handle.SECOND}
                                        onKeyDown={handleKeydown}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        role="slider"
                                        aria-valuenow={secondValue}
                                        aria-valuemin={min}
                                        aria-valuemax={max}
                                        tabIndex={0}
                                    >
                                        <Popover
                                            children={secondValue}
                                            className="NuiSlider__handle__popover NuiSlider__handle__popover-2"
                                            open={
                                                !hideHandlePopover &&
                                                activeIndex === Handle.SECOND
                                            }
                                        />
                                    </div>
                                }
                            />
                        )}
                    </div>
                    <input
                        className="NuiSlider__input NuiSlider__input-1"
                        type="number"
                        tabIndex={-1}
                        value={firstValue}
                        name={firstName}
                        readOnly
                    />
                    {secondValue && (
                        <input
                            className="NuiSlider__input NuiSlider__input-2"
                            type="number"
                            tabIndex={-1}
                            value={secondValue}
                            name={secondName}
                            readOnly
                        />
                    )}
                </div>
            </StyledSlider>
        );
    })
);

const StyledSlider = styled(InputBase)`
    ${context.primary}
    ${context.primaryActiveAlt}
    ${context.primarySurface}
    --nui-slider-size: 20px;
    --nui-slider-pad: 8px;
    --nui-slider-tracksize: 4px;
    --nui-slider-trackradius: 2px;
    --nui-slider-handlesize: 12px;
    --nui-slider-labelpad: 2px;

    & .NuiSlider__container {
        position: relative;
        display: flex;
        align-items: center;
        height: var(--nui-slider-size);
        padding: var(--nui-slider-pad) 0;
        margin-top: 1px;
        user-select: none;
    }

    & .NuiSlider__track {
        display: flex;
        align-items: center;
        width: 100%;
        height: 30%;
        background: ${context.varPrimarySurface};
        height: var(--nui-slider-tracksize);
        border-radius: var(--nui-slider-trackradius);
        overflow: hidden;
        cursor: pointer;
    }

    & .NuiSlider__track__filler {
        height: 100%;
        background: ${context.varPrimary};
        pointer-events: none;
    }

    & .NuiSlider__handle {
        ${shadow.primary}

        position: absolute;
        width: var(--nui-slider-handlesize);
        height: var(--nui-slider-handlesize);
        background: transparent;
        box-shadow: 0 2px 3px -1px ${shadow.varPrimary};
        border-radius: 50%;
        cursor: pointer;
        box-sizing: border-box;

        &::before,
        &::after {
            content: "";
            position: absolute;
            background: ${context.varPrimary};
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        &::before {
            background: ${context.varPrimaryActiveAlt};
            opacity: 0;
            transform: scale(0.75);
            transition: opacity 0.2s, transform 0.2s;
        }

        &:focus-visible {
            outline: none;

            &::before {
                opacity: 0.5;
                transform: scale(2);
            }
        }
    }

    & .NuiPopover {
        cursor: default;
        user-select: none;
        pointer-events: none;
        font-size: 0.675em;
        padding: var(--nui-slider-labelpad);
    }

    & .NuiSlider__input {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }

    &.NuiInputBase--size-xs {
        --nui-slider-size: 14px;
        --nui-slider-pad: 4px;
        --nui-slider-tracksize: 2px;
        --nui-slider-trackradius: 3px;
        --nui-slider-handlesize: 8px;
        --nui-slider-labelpad: 2px;
    }
    &.NuiInputBase--size-md {
        --nui-slider-size: 23px;
        --nui-slider-pad: 12px;
        --nui-slider-tracksize: 5px;
        --nui-slider-trackradius: 3px;
        --nui-slider-handlesize: 16px;
        --nui-slider-labelpad: 3px;
    }
    &.NuiInputBase--size-lg {
        --nui-slider-size: 27px;
        --nui-slider-pad: 16px;
        --nui-slider-tracksize: 6px;
        --nui-slider-trackradius: 3px;
        --nui-slider-handlesize: 20px;
        --nui-slider-labelpad: 4px;
    }
    &.NuiInputBase--size-xl {
        --nui-slider-size: 35px;
        --nui-slider-pad: 20px;
        --nui-slider-tracksize: 7px;
        --nui-slider-trackradius: 4px;
        --nui-slider-handlesize: 24px;
        --nui-slider-labelpad: 5px;
    }
`;

StyledSlider.displayName = createComponentName("StyledSlider");
Slider.displayName = createComponentName("Slider");

export default Slider;
