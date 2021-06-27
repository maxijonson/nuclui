import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import _ from "lodash";
import { createComponentName } from "@utils";
import { InputContainer } from "../InputContainer";
import { FileContentType, FileObject, NuiFilePicker } from "./types";
import { extractInputContainerProps } from "../InputContainer/InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import FileInputError from "./FileInputError";
import * as fileReaders from "./fileReaders";

// TODO: Dynamically type the content type based on "contentType" prop

/** Returns nothing when it is valid and throws an error when it doesn't */
const validateFile = (
    file: File,
    accept: string[],
    minSize?: number,
    maxSize?: number
): void => {
    const validType =
        accept.length == 0
            ? true
            : _.some(accept, (type) => {
                  if (type == "*") {
                      return true;
                  }
                  if (type.includes("*")) {
                      return file.type.startsWith(type.split("*")[0]);
                  }
                  if (type.includes("/")) {
                      return file.type == type;
                  }
                  return file.name.endsWith(type);
              });
    if (!validType) throw FileInputError.INVALID_FILE_TYPE;

    if (minSize && file.size < minSize) throw FileInputError.FILE_TOO_SMALL;
    if (maxSize && file.size > maxSize) throw FileInputError.FILE_TOO_LARGE;
};

const getFileContents = (file: File, type: FileContentType) => {
    switch (type) {
        case "base64":
            return fileReaders.base64(file);
        case "dataURL":
            return fileReaders.dataUrl(file);
        case "binaryString":
            return fileReaders.binaryString(file);
        case "arrayBuffer":
            return fileReaders.arrayBuffer(file);
        case "text":
        default:
            return fileReaders.text(file);
    }
};

const extractFileObject = async (
    file: File,
    accept: string[],
    type: FileContentType,
    minSize?: number,
    maxSize?: number
): Promise<FileObject> => {
    validateFile(file, accept, minSize, maxSize);

    return {
        name: file.name,
        type: file.type,
        lastModified: file.lastModified,
        lastModifiedDate: new Date(file.lastModified),
        content: await getFileContents(file, type),
        size: file.size,
        sizeInKb: file.size / 1000,
        sizeInMb: file.size / 1000000,
        sizeInGb: file.size / 1000000000,
    };
};

const FilePicker: NuiFilePicker = React.memo(
    React.forwardRef((props, ref) => {
        const {
            restProps: {
                type,
                value,
                onChange,
                onError,
                minFiles: propsMinFiles = 1,
                maxFiles: propsMaxFiles = 1,
                minFileSize,
                maxFileSize,
                accept: propsAccept = [],
                contentType = "text",
                className,
                ...inputProps
            },
            ...inputContainerProps
        } = extractInputContainerProps(props);
        const { onFocus, onBlur } = inputProps;
        const { disabled } = inputContainerProps;

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);

        const minFiles = React.useMemo(() => {
            if (propsMinFiles < 1) return 1;
            return propsMinFiles;
        }, [propsMinFiles]);
        const maxFiles = React.useMemo(() => {
            if (propsMaxFiles < 1 || propsMaxFiles < minFiles) return minFiles;
            return propsMaxFiles;
        }, [minFiles, propsMaxFiles]);

        const accept = React.useMemo(() => propsAccept, [propsAccept]);
        const acceptStr = React.useMemo(
            () =>
                _(accept)
                    .map((acceptType) => {
                        if (acceptType.includes("/")) return acceptType; // MIME
                        if (acceptType[0] == ".") return acceptType; // Extension
                        return `.${acceptType}`; // Hopefully an extension without the "."
                    })
                    .join(","),
            [accept]
        );

        const handleFocus = React.useCallback<HTMLInputProps["onFocus"]>(
            (e) => {
                setFocused(true);
                if (onFocus) {
                    onFocus(e);
                }
            },
            [onFocus]
        );

        const handleChange = React.useCallback<HTMLInputProps["onChange"]>(
            async (e) => {
                try {
                    const { files } = e.currentTarget;

                    if (!files) {
                        throw FileInputError.NO_FILES;
                    }
                    if (files.length < minFiles) {
                        throw FileInputError.TOO_FEW_FILES;
                    }
                    if (files.length > maxFiles) {
                        throw FileInputError.TOO_MANY_FILES;
                    }
                    console.info(
                        await Promise.all(
                            _.map(files, (file) =>
                                extractFileObject(
                                    file,
                                    accept,
                                    contentType,
                                    minFileSize,
                                    maxFileSize
                                )
                            )
                        )
                    );
                } catch (err) {
                    if (typeof err === "number") {
                        return onError?.(err, e);
                    }
                    return onError?.(FileInputError.UNKNOWN, e);
                }
            },
            [
                accept,
                contentType,
                maxFileSize,
                maxFiles,
                minFileSize,
                minFiles,
                onError,
            ]
        );

        const handleBlur = React.useCallback<HTMLInputProps["onBlur"]>(
            (e) => {
                setFocused(false);
                setTouched(true);
                if (onBlur) {
                    onBlur(e);
                }
            },
            [onBlur]
        );

        return (
            <StyledFilePicker
                {...inputContainerProps}
                focused={focused}
                touched={touched}
                className={clsx(["NuiFilePicker", className])}
            >
                <input
                    {...inputProps}
                    ref={ref}
                    className="NuiFilePicker__input"
                    disabled={disabled}
                    type="file"
                    multiple={maxFiles > 1}
                    accept={acceptStr}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </StyledFilePicker>
        );
    })
);

const StyledFilePicker = styled(InputContainer)``;

StyledFilePicker.displayName = createComponentName("StyledFilePicker");
FilePicker.displayName = createComponentName("FilePicker");

export default FilePicker;
