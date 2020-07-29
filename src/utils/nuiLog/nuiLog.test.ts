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

            it(`Should log an array of string using the ${level} method`, () => {
                const message = ["a", level, "message"];

                nuiLog[level](message);

                expect(console[level]).toHaveBeenCalledTimes(1);
                expect(console[level]).toHaveBeenCalledWith(
                    "(NUI)",
                    `a\n      ${level}\n      message`
                );
            });
        });
    });
});
