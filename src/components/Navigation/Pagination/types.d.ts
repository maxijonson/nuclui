export interface PaginationProps {
    children?: never;

    /**
     * The total amount of items to paginate through.
     *
     * @default 1
     */
    count?: number;

    /**
     * The zero-based index of the current page.
     *
     * @default 0
     */
    active?: number;

    /**
     * The maximum amount of pages to display.
     * This does not include extreme pages. \
     * Set to 0 to display all pages. \
     * It is recommended to use odd numbers for esthetic reasons, but it is not required.
     *
     * @default 5
     */
    maxPages?: number;

    /**
     * Whether or not to use the full width of the parent container. \
     * The arrows will be placed on the side and the pages in the middle of the container.
     * Use `spaceEven` to evenly space the pages in the container.
     *
     * @default false
     */
    fluid?: boolean;

    /**
     * When `fluid` is true, this will evenly space the pages in the container.
     *
     * @default false
     */
    spaceEven?: boolean;

    /**
     * When possible, show the first and last page. \
     * Unless you're planning on using the `onExtremeNext` or `onExtremePrev` callbacks, you should turn on either `showExtremePages` or `showExtremeArrows`, since their default behavior is the same.
     *
     * @default true
     */
    showExtremePages?: boolean;

    /**
     * Shows a second set of pagination control arrows. \
     * Unless you're planning on using the `onExtremeNext` or `onExtremePrev` callbacks, you should turn on either `showExtremePages` or `showExtremeArrows`, since their default behavior is the same.
     *
     * @default false
     */
    showExtremeArrows?: boolean;

    /**
     * Called when the next arrow is clicked with the next page index. \
     * Adding this handler will disable the default `onPageChange` callback for the next arrow.
     */
    onNext?: (nextIndex: number) => void;

    /**
     * Called when the extreme next arrow is clicked with the last page index. \
     * Adding this handler will disable the default `onPageChange` callback for the extreme next arrow.
     */
    onExtremeNext?: (lastIndex: number) => void;

    /**
     * Called when the previous arrow is clicked with the previous page index. \
     * Adding this handler will disable the default `onPageChange` callback for the previous arrow.
     */
    onPrevious?: (previousIndex: number) => void;

    /**
     * Called when the extreme previous arrow is clicked with the first page index (0). \
     * Adding this handler will disable the default `onPageChange` callback for the extreme previous arrow.
     */
    onExtremePrevious?: (firstIndex: 0) => void;

    /**
     * Callback function to be called when a page is selected.
     */
    onPageChange?: (index: number) => void;

    /**
     * Defines a custom page index renderer. \
     * By default, the page index is rendered as a number + 1.
     */
    renderPage?: (index: number, active: number) => React.ReactNode;
}

/**
 * Useful to render a paginator to navigate through "pages" of anything.
 */
export type NuiPagination = Nui.FRC<PaginationProps, "nav">;
