import React from "react";

export interface TableColumn<T extends Record<string, any>> {
    /**
     * A unique key for this column. \
     * If the `key` is a property of an item, its value will be used as the default cell renderer.
     */
    key: string;

    /**
     * The label displayed in the header of the table for this column. \
     * If not specified, the `key` will be used.
     */
    label?: string | React.ReactNode;

    /**
     * Class name to apply to the header cell.
     */
    headerClassName?: string;

    /**
     * Class name to apply to the cell.
     */
    className?: string;

    /**
     * The position of the text in this column.
     *
     * @default "left"
     */
    align?: "left" | "center" | "right";

    /**
     * Defines how the cells in this column should be rendered, given an item. \
     * If not specified, the item value for the property defined by `key` will be used. If `key` isn't a property of the item, the cell will be empty.
     */
    render?: (item: T, index: number) => React.ReactNode;

    /**
     * Describes how the cells in this column should be sorted.
     */
    sort?: (a: T, b: T) => number;
}

export interface TableBaseProps<T extends Record<string, any>> {
    children?: never;

    /**
     * The list of items to display in the table.
     */
    items: T[];

    /**
     * The table column definitions.
     */
    columns: TableColumn<T>[];

    /**
     * Max rows to display. \
     * Use the array to give the user the ability to select one of the amounts provided.
     */
    maxRows?: number | number[];

    /**
     * When `true` and `maxRows` is set, empty rows will be rendered to fill the table.
     *
     * @default false
     */
    fill?: boolean;

    /**
     * Vertical alignment of the table cells.
     *
     * @default "center"
     */
    alignCells?: "start" | "center" | "end";

    /**
     * When true, removes cell vertical padding.
     *
     * @default false
     */
    compact?: boolean;
}

export type TableProps<T extends Record<string, any>> = TableBaseProps<T> &
    React.ComponentPropsWithRef<"table">;
