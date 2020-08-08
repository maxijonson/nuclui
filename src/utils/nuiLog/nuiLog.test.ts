/* eslint-disable no-console */
import _ from "lodash";
import mockConsole from "jest-mock-console";
import nuiLog from "./nuiLog";

type Level = Exclude<
    Exclude<Parameters<typeof nuiLog>[1], undefined>["level"],
    undefined
>;

describe("nuiLog", () => {
    _.forEach(["log", "info", "warn", "error"] as Level[], (level) => {
        describe(level, () => {
            beforeEach(() => mockConsole(level));

            it(`should log the message using the ${level} method`, () => {
                const message = `A ${level} message`;

                nuiLog[level](message);

                expect(console[level]).toHaveBeenCalledTimes(1);
                expect(console[level]).toHaveBeenCalledWith("(NUI)", message);

                nuiLog[level](message, { level });

                expect(console[level]).toHaveBeenCalledTimes(2);
                expect(console[level]).toHaveBeenLastCalledWith(
                    "(NUI)",
                    message
                );
            });

            it("should log the message using the options", () => {
                const message = `A ${level} message`;

                nuiLog(message, { level });

                expect(console[level]).toHaveBeenCalledTimes(1);
                expect(console[level]).toHaveBeenCalledWith("(NUI)", message);
            });

            it(`should log an array of string using the ${level} method`, () => {
                const message = ["a", level, "message"];

                nuiLog[level](message);

                expect(console[level]).toHaveBeenCalledTimes(1);
                expect(console[level]).toHaveBeenCalledWith(
                    "(NUI)",
                    `a\n      ${level}\n      message`
                );
            });

            it(`should log the message only once using the ${level} method with "once" as a boolean`, () => {
                const message = `A ${level} unique message`;

                _.times(2, () => nuiLog[level](message, { once: true }));
                expect(console[level]).toHaveBeenCalledTimes(1);
                expect(console[level]).toHaveBeenLastCalledWith(
                    "(NUI)",
                    message
                );
            });

            it(`should log the message only once using the ${level} method with "once" as a string`, () => {
                const message = `A unique ${level} message`;
                const once = `id-${level}`;

                _.times(2, () => nuiLog[level](message, { once }));
                expect(console[level]).toHaveBeenCalledTimes(1);
                expect(console[level]).toHaveBeenLastCalledWith(
                    "(NUI)",
                    message
                );

                nuiLog[level](message, { once: true });
                expect(console[level]).toHaveBeenCalledTimes(2);
                expect(console[level]).toHaveBeenLastCalledWith(
                    "(NUI)",
                    message
                );
            });

            it(`should log the message array only once using the ${level} method with "once" as a boolean`, () => {
                const message = ["unique", level, "message"];

                _.times(2, () => nuiLog[level](message, { once: true }));
                expect(console[level]).toHaveBeenCalledTimes(1);
                expect(console[level]).toHaveBeenCalledWith(
                    "(NUI)",
                    `unique\n      ${level}\n      message`
                );
            });

            it(`should log the message array only once using the ${level} method with "once" as a string`, () => {
                const message = ["uniqueid", level, "message"];
                const once = `idarr-${level}`;

                _.times(2, () => nuiLog[level](message, { once }));
                expect(console[level]).toHaveBeenCalledTimes(1);
                expect(console[level]).toHaveBeenCalledWith(
                    "(NUI)",
                    `uniqueid\n      ${level}\n      message`
                );

                nuiLog[level](message, { once: true });
                expect(console[level]).toHaveBeenCalledTimes(2);
                expect(console[level]).toHaveBeenCalledWith(
                    "(NUI)",
                    `uniqueid\n      ${level}\n      message`
                );
            });
        });
    });

    it("should clear the history", () => {
        mockConsole("info");
        const message = "clear me!";
        nuiLog(message, { once: true });
        nuiLog.clearHistory();
        const deleted = nuiLog.deleteFromHistory(message);
        expect(deleted).toBeFalsy();
    });

    it("should delete a history entry", () => {
        mockConsole("info");
        const id = "delete-id";
        nuiLog("Delete id", { once: id });
        const deleted = nuiLog.deleteFromHistory(id);
        expect(deleted).toBeTruthy();
    });
});
