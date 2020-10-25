export interface MediaQueryContextValue {
    queries: { [query: string]: boolean };
    registerQuery: (query: string) => boolean;
}
