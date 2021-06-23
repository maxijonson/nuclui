import React from "react";
import { DraggableData, DraggableEvent } from "react-draggable";
import { InputBaseProps, NuiInputBase } from "../InputBase/types";

export interface GridData {
    grid: [number, number];
    values: {
        [trackPosition: number]: number;
    };
}

export type SliderChangeEvent =
    | DraggableEvent
    | React.PointerEvent<HTMLDivElement>
    | React.KeyboardEvent<HTMLDivElement>;

export type SliderOnChangeSingle = (
    v: number,
    e: SliderChangeEvent,
    data?: DraggableData
) => void;
export interface SliderPropsSingle extends SliderProps {
    /**
     * Fired when the value is changed. The event passed as second and third parameter is the DraggableEvent and DraggableData of the Draggable component provided by react-draggable.
     * When the user clicks on the track to change the value, the event is then a PointerEvent and there will be no DraggableData.
     * When the user uses the keyboard arrows to change the value, the event is then a KeyboardEvent and there will be no DraggableData.
     */
    onChange?: SliderOnChangeSingle;

    /**
     * The current value of the slider. Provide a single number value for a single slider and an array of 2 numbers for a dual slider.
     *
     * @default `min`
     */
    value?: number;
}
export type SliderOnChangeRange = (
    v: [number, number],
    e: SliderChangeEvent,
    data?: DraggableData
) => void;
export interface SliderPropsRange extends SliderProps {
    /**
     * Fired when the value is changed. The event passed as second and third parameter is the DraggableEvent and DraggableData of the Draggable component provided by react-draggable.
     * When the user clicks on the track to change the value, the event is then a PointerEvent and there will be no DraggableData.
     * When the user uses the keyboard arrows to change the value, the event is then a KeyboardEvent and there will be no DraggableData.
     */
    onChange?: SliderOnChangeRange;

    /**
     * The current value of the slider. Provide a single number value for a single slider and an array of 2 numbers for a dual slider.
     *
     * @default `min`
     */
    value?: [number, number];
}

export interface SliderProps {
    children?: never;

    /**
     * The minimum value allowed
     *
     * @default 0
     */
    min?: number;

    /**
     * The maximum value allowed
     *
     * @default 100
     */
    max?: number;

    /**
     * The `name` prop on the input(s) of the Slider. If it is a string, then the main input takes that string, but the second input (if any) will have the "_`name`" format.
     */
    name?: string | [string, string];

    /**
     * The amount by which the value is allowed to change.
     * Because of floating point imprecision, it is not recommended to provide a decimal `step`.
     * Proper support for decimal `step` may come in a future release.
     *
     * @default 1
     */
    step?: number;

    /**
     * The amount by which the value is allowed to change while holding the shift key and using the keyboard arrows
     *
     * @default 10
     */
    shiftStep?: number;

    /**
     * When `true`, prevents the Popover from appearing while dragging the handles
     *
     * @default false
     */
    hideHandlePopover?: boolean;
}

export type SliderPropsWithBase = InputBaseProps &
    (SliderPropsSingle | SliderPropsRange);

/**
 * A range slider for selecting a bounded value or range of values
 */
export type NuiSlider = Nui.FRCWC<SliderPropsWithBase, NuiInputBase>;
