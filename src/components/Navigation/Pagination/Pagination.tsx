import { background, border, context, text } from "@theme";
import { createComponentName } from "@utils";
import clsx from "clsx";
import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { NuiPagination } from "./types";

const Pagination: NuiPagination = React.memo(
    React.forwardRef((props, ref) => {
        const {
            count: propsCount = 1,
            active: propsActive = 0,
            maxPages: propsMaxPages = 6,
            fluid = false,
            spaceEven = false,
            showExtremePages = true,
            showExtremeArrows = false,
            onNext,
            onExtremeNext,
            onPrevious,
            onExtremePrevious,
            onPageChange,
            renderPage,
            component,
            className,
            ...restProps
        } = props;

        const count = _.max([Math.ceil(propsCount), 1]) as number;
        const active = _.clamp(propsActive, 0, count - 1);
        const showAllPages = propsMaxPages === 0;
        const maxPages = showAllPages
            ? count
            : (_.max([1, propsMaxPages]) as number);
        const pageOffset = Math.floor(maxPages / 2);
        const firstVisiblePageIndex = _.max([
            0,
            _.min([active - pageOffset, count - maxPages]),
        ]) as number;
        const lastVisiblePageIndex = _.min([
            count,
            firstVisiblePageIndex + maxPages,
        ]) as number;
        const pageIndexes = _.range(
            firstVisiblePageIndex,
            lastVisiblePageIndex,
            1
        );
        const showExtremeLeftPage = firstVisiblePageIndex !== 0;
        const showExtremeRightPage = lastVisiblePageIndex !== count;
        const Component = component || "nav";

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiPagination",
                    fluid && "NuiPagination--fluid",
                    spaceEven && "NuiPagination--spaceEven",
                    !showExtremePages && "NuiPagination--no-extreme-pages",
                    showExtremeArrows && "NuiPagination--show-extreme-arrows",
                    className,
                ]),
            [className, fluid, showExtremeArrows, showExtremePages, spaceEven]
        );

        const renderPageNumber = React.useCallback(
            (index: number) => {
                if (renderPage) {
                    return renderPage(index, active);
                }
                return index + 1;
            },
            [active, renderPage]
        );

        const handlePageClick: React.MouseEventHandler<HTMLButtonElement> =
            React.useCallback(
                (e) => {
                    const index = parseInt(
                        e.currentTarget.getAttribute("data-index") || "0",
                        10
                    );

                    if (onPageChange) {
                        onPageChange(index);
                    }
                },
                [onPageChange]
            );

        const onArrowClick: React.MouseEventHandler<HTMLButtonElement> =
            React.useCallback(
                (e) => {
                    const type = e.currentTarget.getAttribute("data-type");

                    switch (type) {
                        case "first":
                            return onExtremePrevious?.(0) ?? onPageChange?.(0);
                        case "prev":
                            return (
                                onPrevious?.(active - 1) ??
                                onPageChange?.(active - 1)
                            );
                        case "next":
                            return (
                                onNext?.(active + 1) ??
                                onPageChange?.(active + 1)
                            );
                        case "last":
                            return (
                                onExtremeNext?.(count - 1) ??
                                onPageChange?.(count - 1)
                            );
                        default:
                    }
                },
                [
                    active,
                    count,
                    onExtremeNext,
                    onExtremePrevious,
                    onNext,
                    onPageChange,
                    onPrevious,
                ]
            );

        return (
            <Component {...restProps} className={classes} ref={ref}>
                {showExtremeArrows && (
                    <button
                        className="NuiPagination__arrowButton NuiPagination__arrowButton--first"
                        type="button"
                        data-type="first"
                        disabled={active === 0}
                        onClick={onArrowClick}
                    >
                        <div className="NuiPagination__arrow NuiPagination__arrow--first" />
                        <div className="NuiPagination__arrow NuiPagination__arrow--first" />
                    </button>
                )}
                <button
                    className="NuiPagination__arrowButton NuiPagination__arrowButton--prev"
                    type="button"
                    data-type="prev"
                    disabled={active === 0}
                    onClick={onArrowClick}
                >
                    <div className="NuiPagination__arrow NuiPagination__arrow--prev" />
                </button>

                <ul className="NuiPagination__list">
                    {showExtremePages && showExtremeLeftPage && (
                        <>
                            <li className="NuiPagination__list__item">
                                <button
                                    className="NuiPagination__list__item__button"
                                    type="button"
                                    data-index={0}
                                    onClick={handlePageClick}
                                >
                                    {renderPageNumber(0)}
                                </button>
                            </li>
                            <li className="NuiPagination__list__item">
                                <div className="NuiPagination__separator">
                                    ···
                                </div>
                            </li>
                        </>
                    )}
                    {_.map(pageIndexes, (index) => (
                        <li
                            className={clsx([
                                "NuiPagination__list__item",
                                index === active &&
                                    "NuiPagination__list__item--active",
                            ])}
                            key={index}
                        >
                            <button
                                className="NuiPagination__list__item__button"
                                type="button"
                                data-index={index}
                                onClick={handlePageClick}
                            >
                                {renderPageNumber(index)}
                            </button>
                        </li>
                    ))}
                    {showExtremePages && showExtremeRightPage && (
                        <>
                            <li className="NuiPagination__list__item">
                                <div className="NuiPagination__separator">
                                    ···
                                </div>
                            </li>
                            <li className="NuiPagination__list__item">
                                <button
                                    className="NuiPagination__list__item__button"
                                    type="button"
                                    data-index={count - 1}
                                    onClick={handlePageClick}
                                >
                                    {renderPageNumber(count - 1)}
                                </button>
                            </li>
                        </>
                    )}
                </ul>

                <button
                    className="NuiPagination__arrowButton NuiPagination__arrowButton--next"
                    type="button"
                    data-type="next"
                    disabled={active === count - 1}
                    onClick={onArrowClick}
                >
                    <div className="NuiPagination__arrow NuiPagination__arrow--next" />
                </button>
                {showExtremeArrows && (
                    <button
                        className="NuiPagination__arrowButton NuiPagination__arrowButton--last"
                        type="button"
                        data-type="last"
                        disabled={active === count - 1}
                        onClick={onArrowClick}
                    >
                        <div className="NuiPagination__arrow NuiPagination__arrow--last" />
                        <div className="NuiPagination__arrow NuiPagination__arrow--last" />
                    </button>
                )}
            </Component>
        );
    })
);

const StyledPagination = styled(Pagination)`
    display: flex;

    .NuiPagination__list {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .NuiPagination__list__item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 4px;

        &.NuiPagination__list__item--active {
            .NuiPagination__list__item__button {
                ${context.primary}
                ${context.primaryActive}
                ${context.primaryContrastText}

                background-color: ${context.varPrimary};
                color: ${context.varPrimaryContrastText};

                &:hover {
                    background-color: ${context.varPrimaryActive};
                }
            }
        }
    }

    .NuiPagination__list__item__button,
    .NuiPagination__arrowButton {
        ${text.primary}

        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        border: none;
        outline: none;
        padding: 4px 8px;
        border-radius: 4px;

        &:not(:disabled):hover {
            cursor: pointer;
            ${background.active}
        }
        &:disabled {
            opacity: 0.7;
        }
    }

    .NuiPagination__arrow {
        ${border.primary}

        width: 5px;
        height: 5px;
        border-width: 0px;
        border-style: solid;
        border-top-width: 2px;
        border-right-width: 2px;
        pointer-events: none;

        &.NuiPagination__arrow--prev,
        &.NuiPagination__arrow--first {
            transform: rotate(-135deg);
        }
        &.NuiPagination__arrow--next,
        &.NuiPagination__arrow--last {
            transform: rotate(45deg);
        }
    }

    &.NuiPagination--fluid {
        justify-content: space-between;

        .NuiPagination__list {
            flex: 1 0 auto;
        }

        &.NuiPagination--spaceEven {
            .NuiPagination__list {
                justify-content: space-evenly;
            }
        }
    }
`;

Pagination.displayName = createComponentName("Pagination");
StyledPagination.displayName = createComponentName("StyledPagination");

export default StyledPagination as typeof Pagination;
