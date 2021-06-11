import React from "react";
import styled from "styled-components";
import _ from "lodash";
import clsx from "clsx";
import Draggable, {
    DraggableBounds,
    DraggableEventHandler,
} from "react-draggable";
import { quicksand } from "@fonts";
import { context, shadow } from "@theme";
import { NuiSlider, SliderOnChangeRange, SliderOnChangeSingle } from "./types";
import { InputBase } from "../InputBase";
import { extractInputBaseProps } from "../InputBase/InputBase";

// TODO: Fix handle staying in position when resizing (not just the window resizing? The element could resize without the window resizing)
// TODO: Move forceUpdate to separate hook
// TODO: Make track clickable to set value
// TODO: [Feature] Support multiple handles

/** Adjusts the `value` to a divisible of `step` */
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

const sortArray = <T extends number[]>(arr: T) =>
    arr.slice(0).sort((a, b) => a - b) as T;

/** Gets the offseted position by which the handle should move */
const getHandlePositionOffset = (handleWidth: number, axis: "x" | "y" = "x") =>
    axis == "x"
        ? { x: -(handleWidth / 2), y: 0 }
        : { x: 0, y: -(handleWidth / 2) };

enum Handle {
    FIRST = 0,
    SECOND = 1,
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
                className,
                ...inputBaseElementProps
            },
            ...inputBaseProps
        } = extractInputBaseProps(props);
        const { disabled } = inputBaseProps;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);
        const [swap, setSwap] = React.useState(false);
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

        const trackRef = React.useRef<HTMLDivElement>(null);
        const firstHandleRef = React.useRef<HTMLDivElement>(null);
        const secondHandleRef = React.useRef<HTMLDivElement>(null);

        const trackWidth = trackRef.current?.clientWidth ?? 0;

        const firstHandleWidth = firstHandleRef.current?.clientWidth ?? 0;
        const secondHandleWidth = secondHandleRef.current?.clientWidth ?? 0;

        const firstPositionOffset = React.useMemo(
            () => getHandlePositionOffset(firstHandleWidth),
            [firstHandleWidth]
        );
        const secondPositionOffset = React.useMemo(
            () => getHandlePositionOffset(secondHandleWidth),
            [secondHandleWidth]
        );

        const min = React.useMemo(() => _.min([propsMin, propsMax]) as number, [
            propsMax,
            propsMin,
        ]);
        const max = React.useMemo(() => _.max([propsMin, propsMax]) as number, [
            propsMax,
            propsMin,
        ]);
        const value = React.useMemo(() => propsValue ?? min, [min, propsValue]);

        const firstValue = React.useMemo(() => {
            if (_.isArray(value)) {
                if (swap) return _.last(value) ?? max;
                return _.first(value) ?? min;
            }
            return value;
        }, [value, swap, max, min]);
        const secondValue = React.useMemo(() => {
            if (_.isArray(value)) {
                if (swap) return _.first(value) ?? min;
                return _.last(value) ?? max;
            }
            return undefined;
        }, [value, swap, min, max]);

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

        const handleDragStart = React.useCallback(() => {
            setFocused(true);
        }, []);

        const handleChange = React.useCallback<DraggableEventHandler>(
            (e, data) => {
                if (onChange) {
                    const trackSteps = (max - min) / step;
                    const unit = trackWidth / trackSteps;
                    const next = _.clamp(
                        min + adjustImprecision(data.x / unit, step),
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
                        const handle = Number(data.node.dataset.handle);
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
                }
            },
            [
                onChange,
                max,
                min,
                step,
                trackWidth,
                secondValue,
                firstValue,
                swap,
            ]
        );

        const handleDragStop = React.useCallback(() => {
            setFocused(false);
            setTouched(true);
        }, []);

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

        const classes = React.useMemo(() => clsx(["NuiSlider", className]), [
            className,
        ]);

        // Initizalize the element refs on first render
        React.useEffect(() => {
            forceUpdate();
        }, [trackRef, firstHandleRef, secondHandleRef]);

        return (
            <InputBase
                {...inputBaseElementProps}
                {...inputBaseProps}
                focused={focused}
                touched={touched}
                ref={ref}
                className={classes}
            >
                <div className="NuiSlider__container">
                    <div className="NuiSlider__track" ref={trackRef}>
                        <Draggable
                            axis="x"
                            bounds={bounds}
                            disabled={disabled}
                            position={firstPosition}
                            positionOffset={firstPositionOffset}
                            grid={grid}
                            onStart={handleDragStart}
                            onDrag={handleChange}
                            onStop={handleDragStop}
                            defaultClassName="NuiSlider__handle NuiSlider__handle-1"
                            defaultClassNameDragged="NuiSlider__handle--dragged"
                            defaultClassNameDragging="NuiSlider__handle--dragging"
                            children={
                                <div
                                    ref={firstHandleRef}
                                    data-handle={Handle.FIRST}
                                />
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
                                onDrag={handleChange}
                                onStop={handleDragStop}
                                defaultClassName="NuiSlider__handle NuiSlider__handle-2"
                                defaultClassNameDragged="NuiSlider__handle--dragged"
                                defaultClassNameDragging="NuiSlider__handle--dragging"
                                children={
                                    <div
                                        ref={secondHandleRef}
                                        data-handle={Handle.SECOND}
                                    />
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
            </InputBase>
        );
    })
);

const StyledSlider = styled(Slider)`
    ${quicksand}
    ${context}
    --nui-slider-size: 20px;
    --nui-slider-pad: 8px;
    --nui-slider-tracksize: 5px;
    --nui-slider-trackradius: 2px;
    --nui-slider-handlesize: 16px;

    & .NuiSlider__container {
        position: relative;
        display: flex;
        align-items: center;
        height: var(--nui-slider-size);
        padding: var(--nui-slider-pad) 0;
        margin-top: 1px;
    }

    & .NuiSlider__track {
        display: flex;
        align-items: center;
        width: 100%;
        height: 30%;
        background: var(--nui-context-primaryVLight);
        height: var(--nui-slider-tracksize);
        border-radius: var(--nui-slider-trackradius);
    }

    & .NuiSlider__handle {
        ${shadow.primary}

        position: absolute;
        width: var(--nui-slider-handlesize);
        height: var(--nui-slider-handlesize);
        background: var(--nui-context-primary);
        box-shadow: 0 2px 3px -1px var(--nui-shadow);
        border-radius: 50%;
        cursor: pointer;
        box-sizing: border-box;

        &.NuiSlider__handle-2 {
            background: #f0f;
        }
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
        --nui-slider-tracksize: 3px;
        --nui-slider-trackradius: 3px;
        --nui-slider-handlesize: 10px;
    }
    &.NuiInputBase--size-md {
        --nui-slider-size: 23px;
        --nui-slider-pad: 12px;
        --nui-slider-tracksize: 6px;
        --nui-slider-trackradius: 3px;
        --nui-slider-handlesize: 20px;
    }
    &.NuiInputBase--size-lg {
        --nui-slider-size: 27px;
        --nui-slider-pad: 16px;
        --nui-slider-tracksize: 7px;
        --nui-slider-trackradius: 3px;
        --nui-slider-handlesize: 24px;
    }
    &.NuiInputBase--size-xl {
        --nui-slider-size: 35px;
        --nui-slider-pad: 20px;
        --nui-slider-tracksize: 8px;
        --nui-slider-trackradius: 4px;
        --nui-slider-handlesize: 28px;
    }
`;

export default StyledSlider as typeof Slider;
