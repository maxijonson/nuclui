import React from "react";
import { nuiLog } from "@utils";
import { MediaQueryContextValue } from "./types";

export const defaultMediaQueryCtxValue = Object.freeze({
    queries: {},
    registerQuery: () => {
        nuiLog.error(
            "MediaQueryContext: you attempted to register a query when there is no parent MediaQueryContext.",
            { once: true }
        );
        return true;
    },
});

const MediaQueryCtx = React.createContext<MediaQueryContextValue>(
    defaultMediaQueryCtxValue
);

export default MediaQueryCtx;
