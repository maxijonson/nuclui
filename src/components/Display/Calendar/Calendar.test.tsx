import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import Calendar from "./Calendar";
import "jest-styled-components";
import { CalendarDay } from "./types";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Calendar, {});

describe("Calendar", () => {
    testRendering();
    testDisplayName("NuiStyledCalendar", "NuiCalendar");
    testRef("div");
    testClassName("div", "NuiCalendar");

    describe("renderDay", () => {
        it("should render days correctly using the default renderer", () => {
            const wrapper = mount(<Calendar />);
            const dayElements = wrapper.find(".NuiCalendar__day");
            dayElements.children().forEach((node) => {
                expect(Number(node.html())).not.toBeNaN();
            });
        });

        it("should render days correctly given a renderDay prop", () => {
            const testClass = "NuiCalendar__test-class";
            const wrapper = mount(
                <Calendar
                    renderDay={(day) => {
                        return <div className={testClass}>{day.label}</div>;
                    }}
                />
            );
            const dayElements = wrapper.find(".NuiCalendar__day");
            expect(dayElements.children().every(`.${testClass}`)).toBeTruthy();
        });
    });

    describe("year", () => {
        it("should display days in today's year when none is given", () => {
            const days: CalendarDay[] = [];
            const year = new Date().getFullYear();
            mount(
                <Calendar
                    renderDay={(day) => {
                        days.push(day);
                        return day.label;
                    }}
                />
            );
            expect(
                days.every(
                    (day) =>
                        new Date(day.value).getFullYear() === year &&
                        day.year === year
                )
            ).toBeTruthy();
        });

        it("should display days in the given year", () => {
            const days: CalendarDay[] = [];
            const year = 2020;
            mount(
                <Calendar
                    year={year}
                    renderDay={(day) => {
                        days.push(day);
                        return day.label;
                    }}
                />
            );
            expect(
                days.every(
                    (day) =>
                        new Date(day.value).getFullYear() === year &&
                        day.year === year
                )
            ).toBeTruthy();
        });
    });

    describe("month", () => {
        it("should display days in today's month when none is given", () => {
            const days: CalendarDay[] = [];
            const month = new Date().getMonth();
            mount(
                <Calendar
                    renderDay={(day) => {
                        if (!day.outOfMonth) {
                            days.push(day);
                        }
                        return day.label;
                    }}
                />
            );
            expect(
                days.every(
                    (day) =>
                        new Date(day.value).getMonth() === month &&
                        day.month === month
                )
            ).toBeTruthy();
        });

        it("should display days in the given month", () => {
            const days: CalendarDay[] = [];
            const month = 6;
            mount(
                <Calendar
                    month={month}
                    renderDay={(day) => {
                        if (!day.outOfMonth) {
                            days.push(day);
                        }
                        return day.label;
                    }}
                />
            );
            expect(
                days.every(
                    (day) =>
                        new Date(day.value).getMonth() === month &&
                        day.month === month
                )
            ).toBeTruthy();
        });
    });

    describe("year and month", () => {
        it("should display days in the given year and month", () => {
            const days: CalendarDay[] = [];
            const month = 6;
            const year = 2020;
            mount(
                <Calendar
                    year={year}
                    month={month}
                    renderDay={(day) => {
                        if (!day.outOfMonth) {
                            days.push(day);
                        }
                        return day.label;
                    }}
                />
            );
            expect(
                days.every((day) => {
                    const date = new Date(day.value);
                    return (
                        date.getMonth() === month &&
                        date.getFullYear() === year &&
                        day.month === month &&
                        day.year === year
                    );
                })
            ).toBeTruthy();
        });

        it("should begin dates with the previous year's December last days", () => {
            const year = 2020;
            const month = 0;
            const prevDays: CalendarDay[] = [];
            let isPrevDays = true;
            mount(
                <Calendar
                    year={year}
                    month={month}
                    renderDay={(day) => {
                        if (isPrevDays) {
                            if (!day.outOfMonth) {
                                isPrevDays = false;
                            } else {
                                prevDays.push(day);
                            }
                        }
                        return day.label;
                    }}
                />
            );
            expect(prevDays.length).toBeGreaterThan(0);
            expect(
                prevDays.every((day) => {
                    const date = new Date(day.value);
                    return (
                        date.getMonth() === 11 &&
                        date.getFullYear() === year - 1 &&
                        day.month === 11 &&
                        day.year === year - 1
                    );
                })
            ).toBeTruthy();
        });

        it("should end dates with the next year's January first days", () => {
            const year = 2020;
            const month = 11;
            const nextDays: CalendarDay[] = [];
            let isPrevDays = true;
            let isNextDays = false;
            mount(
                <Calendar
                    year={year}
                    month={month}
                    renderDay={(day) => {
                        if (!day.outOfMonth) {
                            isPrevDays = false;
                        }
                        if (!isPrevDays && day.outOfMonth) {
                            isNextDays = true;
                        }
                        if (isNextDays) {
                            nextDays.push(day);
                        }
                        return day.label;
                    }}
                />
            );
            expect(nextDays.length).toBeGreaterThan(0);
            expect(
                nextDays.every((day) => {
                    const date = new Date(day.value);
                    return (
                        date.getMonth() === 0 &&
                        date.getFullYear() === year + 1 &&
                        day.month === 0 &&
                        day.year === year + 1
                    );
                })
            ).toBeTruthy();
        });
    });
});
