import React from "react";
import _ from "lodash";
import produce from "immer";
import { nuiLog } from "@utils";
import MediaQueryCtx, {
    defaultMediaQueryCtxValue as defaultContext,
} from "@components/Layout/MediaQueryContext/MediaQueryCtx";
import {
    useMediaQueryMatches,
    useMediaQueryQueries,
    useMediaQueryRegistry,
} from "./types";

const useMediaQuery = <T>(
    queries: useMediaQueryQueries<T>
): useMediaQueryMatches<T> => {
    type Key = keyof T;

    const ctx = React.useContext(MediaQueryCtx);
    const registry = React.useRef<useMediaQueryRegistry<T>>({});
    const [matches, setMatches] = React.useState(
        _.reduce(
            queries,
            (initial, query, key) => {
                initial[key as Key] = window.matchMedia(query).matches;
                return initial;
            },
            {} as useMediaQueryMatches<T>
        )
    );

    const hasContext = React.useMemo(() => ctx != defaultContext, [ctx]);

    // The MediaQueryList change listener (only used when not using the context queries)
    const onChange = React.useCallback(
        (key: string) =>
            function mqlChange(this: MediaQueryList) {
                setMatches(
                    produce((draft) => {
                        draft[key as Key] = this.matches;
                    })
                );
            },
        []
    );

    React.useEffect(() => {
        // Use the context matches when it is present
        if (hasContext) {
            const nextMatches = _.reduce(
                queries,
                (acc, query, key) => {
                    acc[key as Key] =
                        ctx.queries[query] ?? ctx.registerQuery(query);
                    return acc;
                },
                {} as useMediaQueryMatches<T>
            );
            return setMatches(nextMatches);
        }

        nuiLog.warn(
            "useMediaQuery: a component using the useMediaQuery hook has no parent <MediaQueryContext/>. It will still work as intended. However, it is HIGHLY recommended to have a parent <MediaQueryContext/> to boost performance. Having many of such components can cause perforamnce issues",
            { once: true }
        );

        // When no parent context is present, create a registry manually
        _.forEach(queries, (query, key) => {
            const existing = registry.current[key as Key];

            if (existing) {
                if (existing.mql.media == query) return;
                existing.mql.removeEventListener("change", existing.listener);
            }

            const mql = window.matchMedia(query);
            const listener = onChange(key);
            mql.addEventListener("change", listener);
            registry.current[key as Key] = { mql, listener };
        });
    }, [ctx, hasContext, onChange, queries]);

    React.useEffect(
        () => () => {
            _.forEach(registry.current, (reg) =>
                reg?.mql.removeEventListener("change", reg.listener)
            );
        },
        []
    );

    return matches;
};

export default useMediaQuery;
