import React from "react";
import produce from "immer";
import MediaQueryCtx from "./MediaQueryCtx";

export default React.memo((props) => {
    const [queryMatches, setQueryMatches] = React.useState<{
        [query: string]: boolean;
    }>({});

    const onChange = React.useCallback(
        (query: string) =>
            function onMqlChange(this: MediaQueryList) {
                setQueryMatches(
                    produce((draft) => {
                        // eslint-disable-next-line react/no-this-in-sfc
                        draft[query] = this.matches;
                    })
                );
            },
        []
    );

    const registerQuery = React.useCallback(
        (query: string) => {
            const mql = window.matchMedia(query);
            setQueryMatches(
                produce((draft) => {
                    if (draft[query] == undefined) {
                        mql.addEventListener("change", onChange(query));
                        draft[query] = mql.matches;
                    }
                })
            );
            return mql.matches;
        },
        [onChange]
    );

    return (
        <MediaQueryCtx.Provider
            value={{ queries: queryMatches, registerQuery }}
            children={props.children}
        />
    );
});