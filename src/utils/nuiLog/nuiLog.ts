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
}

const MSG_PREFIX = `(${PROJECT_SHORT})`;

/**
 * Simple logger for Nuclui's messages that could be read by a user
 * @param message the message to show in the console
 * @param options options for the logger
 */
const nuiLog = (message: Message, options?: Options) => {
    const { level }: Options = { level: "info", ...options };

    if (_.isArray(message) && message.length != 0) {
        console[level](
            MSG_PREFIX,
            _.join(message, `\n${MSG_PREFIX.replace(/./g, " ")} `)
        );
    } else {
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

export default nuiLog;
