import React from "react";
import styled from "styled-components";
import _ from "lodash";
import clsx from "clsx";
import { NuiSlider } from "./types";

const Slider: NuiSlider = React.memo(
    React.forwardRef((props, ref) => {
        const {
            min: propsMin = 0,
            max: propsMax = 100,
            className,
            ...restProps
        } = props;

        const min = React.useMemo(() => _.min([propsMin, propsMax]), [
            propsMax,
            propsMin,
        ]);
        // const max = React.useMemo(() => _.max([propsMin, propsMax]), [
        //     propsMax,
        //     propsMin,
        // ]);

        const value = React.useMemo(() => props.value ?? min, [
            min,
            props.value,
        ]);

        const firstValue = React.useMemo(() => {
            if (_.isArray(value)) return _.first(value);
            return value;
        }, [value]);
        const secondValue = React.useMemo(() => {
            if (_.isArray(value)) return _.last(value);
            return undefined;
        }, [value]);

        const classes = React.useMemo(() => clsx(["NuiSlider", className]), [
            className,
        ]);

        return (
            <div className={classes}>
                <div className="NuiSlider__track">
                    <div className="NuiSlider__handle NuiSlider__handle-1" />
                    {secondValue && (
                        <div className="NuiSlider__handle NuiSlider__handle-2" />
                    )}
                </div>
                <input
                    {...restProps}
                    className="NuiSlider__input NuiSlider__input-1"
                    type="hidden"
                    ref={ref}
                    value={firstValue}
                />
                {secondValue && (
                    <input
                        {...restProps}
                        className="NuiSlider__input NuiSlider__input-2"
                        type="hidden"
                        value={secondValue}
                    />
                )}
            </div>
        );
    })
);

const StyledSlider = styled(Slider)`
    position: relative;
    max-width: 100%;
    margin: 10px 0;
    transition: opacity 0.2s;
    width: calc(var(--nui-inputContainer-size) * 18);
`;

export default StyledSlider as typeof Slider;
