import React from "react";

/**
 * A classic hook that returns a function that will trigger a component update when called.
 *
 * Note that, as per [React's documentation on useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer),
 * the returned function guarantees that it will not change over time. Hence, it is safe to omit it from dependency arrays.
 * If you're using ESLint rules for react hooks, you will still get a warning, because ESLint can't detect that the function
 * is from `useReducer`. You can either ignore the rule for the line, or simply add it to the dependency array since it won't
 * change anyway.
 *
 * @returns the force update function to call when you want to trigger an update
 */
const useForceUpdate = () => {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

    return forceUpdate;
};

export default useForceUpdate;
