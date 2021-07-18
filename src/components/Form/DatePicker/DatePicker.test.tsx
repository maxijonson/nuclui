import React from "react";
import { mount } from "enzyme";
import _ from "lodash";
import { createBasicTests } from "@utils/test";
import DatePicker from "./DatePicker";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(DatePicker, {});

describe("DatePicker", () => {
    testRendering();
    testDisplayName("NuiDatePicker", "NuiStyledDatePicker");
    testRef("input");
    testClassName("div", "NuiDatePicker");

    describe("type", () => {
        it("should use the default type (date)", () => {
            const wrapper = mount(<DatePicker />);
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const calendar = wrapper.find(
                ".NuiDatePicker__popover > .NuiDatePicker__calendar"
            );
            expect(calendar.length).toBe(1);

            const dateTimeToggle = wrapper.find(".NuiDatePicker__time-toggle");
            expect(dateTimeToggle.length).toBe(0);
        });

        it.each(["time", "date", "datetime"] as const)(
            "should use the %s type",
            (type) => {
                const wrapper = mount(<DatePicker type={type} />);
                const input = wrapper.find(".NuiDatePicker__input");

                input.simulate("focus");

                const calendar = wrapper.find(
                    ".NuiDatePicker__popover > .NuiDatePicker__calendar"
                );
                expect(calendar.length).toBe(type === "time" ? 0 : 1);

                const clock = wrapper.find(
                    ".NuiDatePicker__popover > .NuiDatePicker__clock"
                );
                expect(clock.length).toBe(type === "time" ? 1 : 0);

                const dateTimeToggle = wrapper.find(
                    ".NuiDatePicker__time-toggle"
                );
                expect(dateTimeToggle.length).toBe(type === "datetime" ? 1 : 0);
            }
        );
    });

    describe("value", () => {
        it("should render correctly without a value", () => {
            const wrapper = mount(<DatePicker type="datetime" />);
            const input = wrapper.find(".NuiDatePicker__input");

            expect(input.props().value).toBe("");

            input.simulate("focus");

            const selectedDay = wrapper.find(
                ".NuiDatePicker__calendar__day--selected"
            );
            expect(selectedDay.length).toBe(0);
        });

        it.each([undefined, "time", "date", "datetime"] as const)(
            "should render correctly with a given value and type (%s)",
            (type) => {
                const now = new Date();
                const value = now.getTime();
                const year = now.getFullYear();
                const month = _.padStart(`${now.getMonth() + 1}`, 2, "0");
                const day = _.padStart(`${now.getDate()}`, 2, "0");
                const hour = _.padStart(`${now.getHours()}`, 2, "0");
                const minute = _.padStart(`${now.getMinutes()}`, 2, "0");
                const second = _.padStart(`${now.getSeconds()}`, 2, "0");

                const wrapper = mount(<DatePicker value={value} type={type} />);
                const input = wrapper.find(".NuiDatePicker__input");

                switch (type) {
                    case "datetime":
                        expect(input.props().value).toBe(
                            `${year}/${month}/${day} ${hour}:${minute}:${second}`
                        );
                        break;
                    case "time":
                        expect(input.props().value).toBe(
                            `${hour}:${minute}:${second}`
                        );
                        break;
                    default:
                    case "date":
                        expect(input.props().value).toBe(
                            `${year}/${month}/${day}`
                        );
                        break;
                }

                input.simulate("focus");

                if (type === "time") {
                    const selectedHour = wrapper.find(
                        ".NuiDatePicker__dial__hour--selected"
                    );
                    const selectedMinute = wrapper.find(
                        ".NuiDatePicker__dial__minute--selected"
                    );
                    const selectedSecond = wrapper.find(
                        ".NuiDatePicker__dial__second--selected"
                    );
                    expect(selectedHour.length).toBe(1);
                    expect(selectedMinute.length).toBe(1);
                    expect(selectedSecond.length).toBe(1);
                } else {
                    const selectedDay = wrapper.find(
                        ".NuiDatePicker__calendar__day--selected"
                    );
                    expect(selectedDay.length).toBe(1);
                }
            }
        );
    });

    describe("onChange", () => {
        it("should still work without an onChange callback or value", () => {
            const onFocus = jest.fn();
            const onBlur = jest.fn();
            const wrapper = mount(
                <DatePicker type="datetime" onFocus={onFocus} onBlur={onBlur} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");
            expect(onFocus).toHaveBeenCalled();

            const popover = wrapper.find(
                ".NuiDatePicker__container > .NuiDatePicker__popover"
            );
            popover.simulate("mousedown");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(17);
            day.simulate("click");

            const dateTimeToggle = wrapper.find(".NuiDatePicker__time-toggle");
            dateTimeToggle.simulate("click");

            const hourDial = wrapper.find(".NuiDatePicker__dial__hour").at(0);
            hourDial.simulate("click");

            const minuteDial = wrapper
                .find(".NuiDatePicker__dial__minute")
                .at(0);
            minuteDial.simulate("click");

            const secondDial = wrapper
                .find(".NuiDatePicker__dial__second")
                .at(0);
            secondDial.simulate("click");

            dateTimeToggle.simulate("click");

            input.simulate("blur");
            expect(onBlur).toHaveBeenCalled();
        });

        it("should call the onChange callback when no value is given", () => {
            const onChange = jest.fn();
            const wrapper = mount(<DatePicker onChange={onChange} />);
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(8);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                expect.any(Number),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback when a value is given", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(4);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(2021, 6, 1, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback with an out of month date", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(3);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(2021, 5, 30, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching months", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const monthCycleSelect = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__month .NuiCycleSelect__input"
            );
            monthCycleSelect.simulate("click");

            const month = wrapper
                .find(".NuiDatePicker__calendar__months__month")
                .at(5);
            month.simulate("click");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(2);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(2021, 5, 1, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching to the previous month", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const prevMonthButton = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__month .NuiCycleSelect__button--prev"
            );
            prevMonthButton.simulate("click");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(2);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(2021, 5, 1, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching to the next month", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const nextMonthButton = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__month .NuiCycleSelect__button--next"
            );
            nextMonthButton.simulate("click");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(0);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(2021, 7, 1, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching years", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const yearCycleSelect = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__year .NuiCycleSelect__input"
            );
            yearCycleSelect.simulate("click");

            const year = wrapper
                .find(".NuiDatePicker__calendar__years__year")
                .at(7);
            year.simulate("click");

            const month = wrapper
                .find(".NuiDatePicker__calendar__months__month")
                .at(6);
            month.simulate("click");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(3);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(2020, 6, 1, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching to the previous year", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const prevYearButton = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__year .NuiCycleSelect__button--prev"
            );
            prevYearButton.simulate("click");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(3);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(2020, 6, 1, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching to the next year", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const nextYearButton = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__year .NuiCycleSelect__button--next"
            );
            nextYearButton.simulate("click");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(5);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(2022, 6, 1, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching to the previous year interval", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const yearCycleSelect = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__year .NuiCycleSelect__input"
            );
            yearCycleSelect.simulate("click");

            const prevYearIntervalButton = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__yearInterval .NuiCycleSelect__button--prev"
            );
            prevYearIntervalButton.simulate("click");

            const year = wrapper
                .find(".NuiDatePicker__calendar__years__year")
                .at(1);
            year.simulate("click");

            const month = wrapper
                .find(".NuiDatePicker__calendar__months__month")
                .at(6);
            month.simulate("click");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(3);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(1998, 6, 1, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching to the next year interval", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker onChange={onChange} value={date.getTime()} />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const yearCycleSelect = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__year .NuiCycleSelect__input"
            );
            yearCycleSelect.simulate("click");

            const nextYearIntervalButton = wrapper.find(
                ".NuiDatePicker__calendar__header > .NuiDatePicker__calendar__header__yearInterval .NuiCycleSelect__button--next"
            );
            nextYearIntervalButton.simulate("click");

            const year = wrapper
                .find(".NuiDatePicker__calendar__years__year")
                .at(1);
            year.simulate("click");

            const month = wrapper
                .find(".NuiDatePicker__calendar__months__month")
                .at(6);
            month.simulate("click");

            const day = wrapper.find(".NuiDatePicker__calendar__day").at(1);
            day.simulate("click");

            expect(onChange).toHaveBeenCalledWith(
                new Date(2030, 6, 1, 1, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching hour", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker
                    type="time"
                    onChange={onChange}
                    value={date.getTime()}
                />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const hour = wrapper.find(".NuiDatePicker__dial__hour").at(0);
            hour.simulate("click");
            expect(onChange).toHaveBeenCalledWith(
                new Date(2021, 6, 27, 0, 33, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching minute", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker
                    type="time"
                    onChange={onChange}
                    value={date.getTime()}
                />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const minute = wrapper.find(".NuiDatePicker__dial__minute").at(0);
            minute.simulate("click");
            expect(onChange).toHaveBeenCalledWith(
                new Date(2021, 6, 27, 1, 0, 7).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });

        it("should call the onChange callback after switching second", () => {
            const onChange = jest.fn();
            const date = new Date(2021, 6, 27, 1, 33, 7);
            const wrapper = mount(
                <DatePicker
                    type="time"
                    onChange={onChange}
                    value={date.getTime()}
                />
            );
            const input = wrapper.find(".NuiDatePicker__input");

            input.simulate("focus");

            const second = wrapper.find(".NuiDatePicker__dial__second").at(0);
            second.simulate("click");
            expect(onChange).toHaveBeenCalledWith(
                new Date(2021, 6, 27, 1, 33, 0).getTime(),
                expect.any(Object)
            );

            input.simulate("blur");
        });
    });
});
