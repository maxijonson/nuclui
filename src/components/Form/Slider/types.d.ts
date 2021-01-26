export interface SliderProps {
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
     * The current value of the slider. Provide a single number value for a single slider and an array of 2 numbers for a dual slider.
     *
     * @default `min`
     */
    value?: number | [number, number];
}

export type NuiSlider = Nui.FRCWC<SliderProps, "input">;
