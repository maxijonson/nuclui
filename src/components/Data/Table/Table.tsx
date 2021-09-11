import { Pagination } from "@components/Navigation/Pagination";
import { Select, SelectOption } from "@components/Form/Select";
import { background, border, text } from "@theme";
import { createComponentName, nuiLog } from "@utils";
import clsx from "clsx";
import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { TableColumn, TableProps } from "./types";

const getCellClassName = (
    isHeader: boolean,
    align?: "left" | "right" | "center",
    className?: string
) =>
    clsx([
        isHeader && "NuiTable__table__cell NuiTable__table__cell--head",
        !isHeader && "NuiTable__table__cell NuiTable__table__cell--body",
        [
            align === "right" && `NuiTable__table__cell--align-right`,
            align === "center" && `NuiTable__table__cell--align-center`,
        ],
        className,
    ]);

const getInitialMaxVisibleRows = (
    maxRows: number | number[] | undefined
): number | undefined => {
    if (maxRows === undefined) return undefined;

    if (_.isNumber(maxRows)) {
        if (maxRows < 1) {
            nuiLog.warn("A Table must have at least 1 for the 'maxRows' prop", {
                once: "Table-maxRows-number",
            });
            return undefined;
        }
        return maxRows;
    }

    if (maxRows.length <= 0) {
        nuiLog.warn("'maxRows' must have at least 1 option", {
            once: "Table-maxRows-array",
        });
        return undefined;
    }
    return getInitialMaxVisibleRows(maxRows[0]);
};

function NuiTable<T extends Record<string, any>>(
    props: TableProps<T>,
    ref: React.ForwardedRef<HTMLTableElement>
) {
    const {
        items,
        columns,
        maxRows,
        alignCells = "center",
        compact = false,
        className,
        ...tableProps
    } = props;

    const [maxVisibleRows, setMaxVisibleRows] = React.useState<
        number | undefined
    >(getInitialMaxVisibleRows(maxRows));

    const [page, setPage] = React.useState(0);

    const classes = React.useMemo(
        () =>
            clsx([
                "NuiTable",
                [
                    alignCells === "start" && "NuiTable--alignCells-start",
                    alignCells === "end" && "NuiTable--alignCells-end",
                ],
                compact && "NuiTable--compact",
                className,
            ]),
        [alignCells, className, compact]
    );

    const visibleItems = React.useMemo(() => {
        if (maxVisibleRows !== undefined) {
            return items.slice(
                page * maxVisibleRows,
                page * maxVisibleRows + maxVisibleRows
            );
        }
        return items;
    }, [items, maxVisibleRows, page]);

    const maxRowsOptions = React.useMemo(() => {
        if (!_.isArray(maxRows)) return null;
        return maxRows.map(
            (value) =>
                ({
                    value: value.toString(),
                    label: value.toString(),
                } as SelectOption)
        );
    }, [maxRows]);

    const renderColumnHeader = React.useCallback((column: TableColumn<T>) => {
        const columnHeader = column.label ?? column.key;
        const headerClassName = getCellClassName(
            true,
            column.align,
            column.headerClassName
        );
        return (
            <th key={column.key} className={headerClassName}>
                <div className="NuiTable__table__cell__innerContainer">
                    {columnHeader}
                </div>
            </th>
        );
    }, []);

    const renderItemCell = React.useCallback(
        (column: TableColumn<T>, item: T, index: number) => {
            const value = item[column.key] ?? undefined;
            const cellClassName = getCellClassName(
                false,
                column.align,
                column.className
            );
            return (
                <td key={column.key} className={cellClassName}>
                    <div className="NuiTable__table__cell__innerContainer">
                        {column.render?.(item, index) ?? value}
                    </div>
                </td>
            );
        },
        []
    );

    const renderItemRow = React.useCallback(
        (item: T, key: number) => {
            return (
                <tr
                    key={key}
                    className="NuiTable__table__row NuiTable__table__row--body"
                >
                    {_.map(columns, (column) =>
                        renderItemCell(column, item, key)
                    )}
                </tr>
            );
        },
        [columns, renderItemCell]
    );

    const onPageChange = React.useCallback((index: number) => {
        setPage(index);
    }, []);

    const onMaxRowsChange = React.useCallback(
        (value: string) => {
            const next = parseInt(value, 10);
            setMaxVisibleRows(next);
            setPage((currentPage) => {
                return _.clamp(
                    currentPage,
                    0,
                    Math.ceil(items.length / next) - 1
                );
            });
        },
        [items.length]
    );

    console.warn("page", page);

    return (
        <StyledTable className={classes}>
            <div className="NuiTable__header" />
            <div className="NuiTable__tableContainer">
                <table {...tableProps} ref={ref} className="NuiTable__table">
                    <thead className="NuiTable__table__head">
                        <tr className="NuiTable__table__row NuiTable__table__row--head">
                            {_.map(columns, renderColumnHeader)}
                        </tr>
                    </thead>
                    <tbody className="NuiTable__table__body">
                        {_.map(visibleItems, renderItemRow)}
                    </tbody>
                </table>
            </div>
            {maxVisibleRows !== undefined && (
                <div className="NuiTable__footer">
                    <div className="NuiTable__paginationContainer">
                        <Pagination
                            className="NuiTable__pagination"
                            active={page}
                            count={items.length / maxVisibleRows}
                            maxPages={5}
                            onPageChange={onPageChange}
                        />
                    </div>
                    {maxRowsOptions && (
                        <div className="NuiTable__maxRowsSelectContainer">
                            <Select
                                className="NuiTable__maxRowsSelect"
                                value={maxVisibleRows.toString()}
                                label="Rows per page"
                                labelPosition="right"
                                options={maxRowsOptions}
                                onChange={onMaxRowsChange}
                                variant="underline"
                                fluid
                                noGutters
                            />
                        </div>
                    )}
                </div>
            )}
        </StyledTable>
    );
}

const Table = React.memo(React.forwardRef(NuiTable)) as <
    T extends Record<string, any>
>(
    props: TableProps<T>
) => ReturnType<typeof NuiTable>;

const StyledTable = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    .NuiTable__header {
        display: flex;
    }

    .NuiTable__tableContainer {
        width: 100%;
        overflow-x: auto;
    }

    .NuiTable__table {
        border-collapse: collapse;
        width: 100%;
    }

    .NuiTable__table__row {
        ${border.secondary}

        &:not(.NuiTable__table__row--head):hover {
            ${background.active}
        }

        &:not(.NuiTable__table__row--body:last-child) {
            border-bottom-width: 1px;
            border-bottom-style: solid;
        }
    }

    .NuiTable__table__cell {
        ${text.primary}

        padding: 8px;
        font-size: 16px;

        &.NuiTable__table__cell--head {
            font-size: 14px;
            font-weight: 600;
        }

        &.NuiTable__table__cell--align-right {
            .NuiTable__table__cell__innerContainer {
                justify-content: flex-end;
                text-align: right;
            }
        }
        &.NuiTable__table__cell--align-center {
            .NuiTable__table__cell__innerContainer {
                justify-content: center;
                text-align: center;
            }
        }
    }

    .NuiTable__table__cell__innerContainer {
        display: flex;
        align-items: center;
    }

    .NuiTable__footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
    }

    .NuiTable__paginationContainer {
        margin-right: 16px;
    }

    .NuiTable__maxRowsSelectContainer {
        max-width: 172px;
    }

    .NuiTable__maxRowsSelect {
        .NuiInputBase__label {
            white-space: nowrap;
        }
    }

    &.NuiTable--alignCells-start {
        .NuiTable__table__cell__innerContainer {
            align-items: flex-start;
        }
    }
    &.NuiTable--alignCells-end {
        .NuiTable__table__cell__innerContainer {
            align-items: flex-end;
        }
    }

    &.NuiTable--compact {
        .NuiTable__table__cell {
            padding: 0 8px;
        }
    }
`;

StyledTable.displayName = createComponentName("StyledTable");

export default Table;
