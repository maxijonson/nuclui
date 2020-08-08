/* eslint-disable no-console */
import _ from "lodash";
import { PROJECT_SHORT } from "@config";

type Message = any | any[];

interface Options {
    /**
     * The level of the log
     * @default info
     */
    level?: "log" | "info" | "warn" | "error";

    /**
     * If the message should be logged only once.
     * If specified as a boolean, the message string is compared for uniqueness.
     * If specified as a string, this string represents a unique id that will be used for comparison instead of the message itself.
     * @default false
     */
    once?: boolean | string;
}

/**
 * The message prefix for logging
 */
const MSG_PREFIX = `(${PROJECT_SHORT})`;

/**
 * History of unique logs. Used to log messages only once to the console.
 */
const history = new Set<string>();

/**
 * Simple logger for Nuclui's messages that could be read by a user
 * @param message the message to show in the console
 * @param options options for the logger
 */
const nuiLog = (message: Message, options?: Options) => {
    const { level, once }: Options = { level: "info", once: false, ...options };

    if (_.isArray(message) && message.length != 0) {
        const msg = _.join(message, `\n${MSG_PREFIX.replace(/./g, " ")} `);

        if (once) {
            if (history.has(typeof once === "boolean" ? msg : once)) return;
            history.add(typeof once === "boolean" ? msg : once);
        }

        console[level](MSG_PREFIX, msg);
    } else {
        if (once) {
            if (history.has(typeof once === "boolean" ? message : once)) return;
            history.add(typeof once === "boolean" ? message : once);
        }

        console[level](MSG_PREFIX, message);
    }
};

/**
 * Logs a message to the console with the "log" level
 * @param message the message to show in the console
 * @param options options for the logger
 */
nuiLog.log = (message: Message, options: Options = {}) => {
    nuiLog(message, { level: "log", ...options });
};

/**
 * Logs a message to the console with the "info" level
 * @param message the message to show in the console
 * @param options options for the logger
 */
nuiLog.info = (message: Message, options: Options = {}) => {
    nuiLog(message, { level: "info", ...options });
};

/**
 * Logs a message to the console with the "warn" level
 * @param message the message to show in the console
 * @param options options for the logger
 */
nuiLog.warn = (message: Message, options: Options = {}) => {
    nuiLog(message, { level: "warn", ...options });
};

/**
 * Logs a message to the console with the "error" level
 * @param message the message to show in the console
 * @param options options for the logger
 */
nuiLog.error = (message: Message, options: Options = {}) => {
    nuiLog(message, { level: "error", ...options });
};

nuiLog.clearHistory = () => history.clear();

nuiLog.deleteFromHistory = (value: string) => history.delete(value);

export default nuiLog;
