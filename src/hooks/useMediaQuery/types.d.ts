export type useMediaQueryQueries<T> = { [key in keyof T]: string };

export type useMediaQueryMatches<T> = { [key in keyof T]: boolean };

export type useMediaQueryRegistry<T> = {
    [key in keyof T]?: {
        mql: MediaQueryList;
        listener: (this: MediaQueryList) => any;
    };
};
