import _ from "lodash";

/**
 * Simple function to check wether a number is between two numbers. By default, the lower and upper bounds are exclusive.
 *
 * @param value the value to test
 * @param min the lower bound
 * @param max the upper bound
 * @param inclusive if the bounds are included in the range (defaults to false)
 */
export default (value: number, min: number, max: number, inclusive = false) => {
    const lower = _.min([min, max]) ?? 0;
    const upper = _.max([min, max]) ?? 0;

    if (lower == upper) {
        return inclusive ? value == lower : false;
    }

    if (inclusive && (value == lower || value == upper)) {
        return true;
    }

    return value > lower && value < upper;
};
