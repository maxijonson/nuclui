enum FileInputError {
    /** When there are less files than specified by the `minFiles` prop */
    TOO_FEW_FILES,
    /** When there are less files than specified by the `maxFiles` prop */
    TOO_MANY_FILES,
    /** Should no occur, but happens if there were no files on the event */
    NO_FILES,
    /** When any file does not match the specified `accept` prop */
    INVALID_FILE_TYPE,
    /** When any file is smaller than the specified `minFileSize` prop */
    FILE_TOO_SMALL,
    /** When any file is smaller than the specified `maxFileSize` prop */
    FILE_TOO_LARGE,
    /** Unknown error */
    UNKNOWN,
}

export default FileInputError;
