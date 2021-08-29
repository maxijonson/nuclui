/* istanbul ignore file */
import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import _ from "lodash";
import { BsBoxArrowInDown } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { createComponentName, mergeRefs } from "@utils";
import { background, context, text } from "@theme";
import { InputContainer } from "../InputContainer";
import {
    ContentTypeName,
    FileObject,
    FileObjectFor,
    NuiFilePicker,
} from "./types";
import { extractInputContainerProps } from "../InputContainer/InputContainer";
import { HTMLInputProps } from "../InputContainer/types";
import FileInputError from "./FileInputError";
import * as fileReaders from "./fileReaders";

const MAX_DISPLAYED_LENGTH = 30;

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

const getFileContents = <
    CTN extends ContentTypeName,
    R extends Promise<FileObjectFor<CTN>["content"]>
>(
    file: File,
    type: CTN
): R => {
    switch (type) {
        case "arrayBuffer":
            return fileReaders.arrayBuffer(file) as R;
        case "base64":
            return fileReaders.base64(file) as R;
        case "binaryString":
            return fileReaders.binaryString(file) as R;
        case "dataURL":
            return fileReaders.dataUrl(file) as R;
        case "text":
            return fileReaders.text(file) as R;
        case "file":
        default:
            return Promise.resolve(file) as R;
    }
};

const extractFileObject = async <
    CTN extends ContentTypeName,
    FO extends FileObjectFor<CTN>
>(
    file: File,
    accept: string[],
    type: CTN,
    minSize?: number,
    maxSize?: number
): Promise<FO> => {
    validateFile(file, accept, minSize, maxSize);
    const content = (await getFileContents(file, type)) as FO["content"];

    return {
        name: file.name,
        type: file.type,
        lastModified: file.lastModified,
        lastModifiedDate: new Date(file.lastModified),
        content,
        size: file.size,
        sizeInKb: file.size / 1000,
        sizeInMb: file.size / 1000000,
        sizeInGb: file.size / 1000000000,
    } as FO;
};

/** https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript */
const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
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
                minFileSize: propsMinFileSize,
                maxFileSize: propsMaxFileSize,
                accept: propsAccept = [],
                contentType = "file",
                hideConfigText = false,
                hideErrors = false,
                className,
                ...inputProps
            },
            ...inputContainerProps
        } = extractInputContainerProps(props);
        const { onFocus, onBlur } = inputProps;
        const { disabled, size } = inputContainerProps;

        const inputRef = React.useRef<HTMLInputElement>(null);
        const mergedRefs = React.useMemo(() => mergeRefs(ref, inputRef), [ref]);

        const [isDragging, setIsDragging] = React.useState(false);

        const [focused, setFocused] = React.useState(false);
        const [touched, setTouched] = React.useState(false);
        const [error, setError] = React.useState<string | null>(null);
        const [subError, setSubError] = React.useState<string | null>(null);

        const errorTimeout = React.useRef<number>();

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

        const minFileSize = React.useMemo(() => {
            if (!propsMinFileSize && !propsMaxFileSize) return undefined;
            if (!propsMinFileSize && propsMaxFileSize) return propsMaxFileSize;
            if (!propsMaxFileSize) return propsMinFileSize;
            return _.min([propsMinFileSize, propsMaxFileSize]);
        }, [propsMaxFileSize, propsMinFileSize]);
        const maxFileSize = React.useMemo(() => {
            if (!propsMaxFileSize) return undefined;
            return _.max([propsMinFileSize, propsMaxFileSize]);
        }, [propsMaxFileSize, propsMinFileSize]);

        const mainText = React.useMemo(() => {
            if (error && !hideErrors) {
                return error;
            }
            if (!value || _.isEmpty(value)) {
                return "Click or drag files here";
            }
            if (value.length === 1) {
                const file = value[0];
                if (file.name.length > MAX_DISPLAYED_LENGTH) {
                    return `${file.name.slice(0, MAX_DISPLAYED_LENGTH)}...`;
                }
                return value[0].name;
            }
            return `${value.length} files selected`;
        }, [error, hideErrors, value]);

        const configText = React.useMemo(() => {
            if (error && !hideErrors) {
                return subError;
            }
            if (!value || _.isEmpty(value)) {
                return clsx([
                    minFiles == maxFiles &&
                        `Choose ${minFiles} file${minFiles > 1 ? "s" : ""}. `,
                    minFiles == 1 &&
                        maxFiles != 1 &&
                        `Choose up to ${maxFiles} files. `,
                    minFiles != 1 &&
                        maxFiles != minFiles &&
                        `Choose between ${minFiles} and ${maxFiles} files. `,
                    minFileSize && `${formatBytes(minFileSize)} minimum. `,
                    maxFileSize && `${formatBytes(maxFileSize)} maximum. `,
                ]);
            }
            const totalSize = _.reduce(
                value,
                (acc, file) => {
                    // For some reason, file can be typed as "number" or "string". This enforces the FileObject type
                    if (typeof file === "object") {
                        return acc + file.size;
                    }
                    return acc;
                },
                0
            );
            return formatBytes(totalSize);
        }, [
            error,
            hideErrors,
            maxFileSize,
            maxFiles,
            minFileSize,
            minFiles,
            subError,
            value,
        ]);

        const classes = React.useMemo(
            () =>
                clsx([
                    "NuiFilePicker",
                    [
                        size == "xs" && "NuiFilePicker--size-xs",
                        size == "md" && "NuiFilePicker--size-md",
                        size == "lg" && "NuiFilePicker--size-lg",
                        size == "xl" && "NuiFilePicker--size-xl",
                    ],
                    isDragging && "NuiFilePicker--isDragging",
                    value && value.length > 0 && "NuiFilePicker--clearable",
                    error && !hideErrors && "NuiFilePicker--hasError",
                    className,
                ]),
            [className, error, hideErrors, isDragging, size, value]
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

        const handleDragEnter = React.useCallback<
            React.DragEventHandler<HTMLInputElement>
        >(() => {
            setIsDragging(true);
        }, []);

        const raiseError = React.useCallback(
            (
                code: FileInputError,
                event: React.ChangeEvent<HTMLInputElement>
            ) => {
                let message: string | null = null;
                let subMessage: string | null = null;

                switch (code) {
                    case FileInputError.TOO_FEW_FILES:
                        message = `Too few files`;
                        subMessage = `${minFiles} files minimum`;
                        break;
                    case FileInputError.TOO_MANY_FILES:
                        message = `Too many files`;
                        subMessage = `${maxFiles} files maximum`;
                        break;
                    case FileInputError.FILE_TOO_SMALL:
                        message = `File too small`;
                        subMessage = `${formatBytes(minFileSize ?? 0)} minimum`;
                        break;
                    case FileInputError.FILE_TOO_LARGE:
                        message = `File too large`;
                        subMessage = `${formatBytes(maxFileSize ?? 0)} maximum`;
                        break;
                    case FileInputError.INVALID_FILE_TYPE:
                        message = "Invalid file type";
                        break;
                    case FileInputError.NO_FILES:
                        message = "No files detected";
                        break;
                    case FileInputError.UNKNOWN:
                    default:
                        message = "An unknown error occured";
                        break;
                }

                window.clearTimeout(errorTimeout.current);
                setError(message);
                setSubError(subMessage);
                errorTimeout.current = window.setTimeout(() => {
                    setError(null);
                    setSubError(null);
                }, 2000);
                return onError?.(code, event);
            },
            [maxFileSize, maxFiles, minFileSize, minFiles, onError]
        );

        const clearInputFiles = React.useCallback(() => {
            if (inputRef.current) {
                inputRef.current.files = new DataTransfer().files;
            }
        }, []);

        const handleChange = React.useCallback<HTMLInputProps["onChange"]>(
            async (e) => {
                try {
                    const { files } = e.target;

                    if (!files) {
                        throw FileInputError.NO_FILES;
                    }
                    if (files.length < minFiles) {
                        throw FileInputError.TOO_FEW_FILES;
                    }
                    if (files.length > maxFiles) {
                        throw FileInputError.TOO_MANY_FILES;
                    }
                    if (onChange) {
                        const next = await Promise.all(
                            _.map(files, (file) =>
                                extractFileObject(
                                    file,
                                    accept,
                                    contentType,
                                    minFileSize,
                                    maxFileSize
                                )
                            )
                        );
                        onChange(
                            next as FileObject<string & ArrayBuffer & File>[],
                            e
                        );
                    }
                } catch (err) {
                    clearInputFiles();
                    if (typeof err === "number") {
                        return raiseError(err, e);
                    }
                    return raiseError(FileInputError.UNKNOWN, e);
                }
            },
            [
                accept,
                clearInputFiles,
                contentType,
                maxFileSize,
                maxFiles,
                minFileSize,
                minFiles,
                onChange,
                raiseError,
            ]
        );

        const handleDragLeave = React.useCallback<
            React.DragEventHandler<HTMLInputElement>
        >(() => {
            setIsDragging(false);
        }, []);

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

        const clearFiles = React.useCallback<
            React.MouseEventHandler<SVGElement>
        >(
            (e) => {
                e.stopPropagation();
                e.preventDefault();
                clearInputFiles();
                if (onChange) {
                    onChange([], e);
                }
            },
            [clearInputFiles, onChange]
        );

        React.useEffect(
            () => () => {
                window.clearTimeout(errorTimeout.current);
            },
            []
        );

        return (
            <StyledFilePicker
                {...inputContainerProps}
                focused={focused || isDragging}
                touched={touched}
                className={classes}
            >
                <input
                    {...inputProps}
                    ref={mergedRefs}
                    className="NuiFilePicker__input"
                    disabled={disabled}
                    type="file"
                    multiple={maxFiles > 1}
                    accept={acceptStr}
                    onFocus={handleFocus}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDragLeave}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div className="NuiFilePicker__overlay">
                    {error ? (
                        <IoMdCloseCircleOutline className="NuiFilePicker__drop-icon NuiFilePicker__drop-icon--error" />
                    ) : (
                        <BsBoxArrowInDown className="NuiFilePicker__drop-icon NuiFilePicker__drop-icon--normal" />
                    )}
                    <div
                        className="NuiFilePicker__action-tip"
                        children={mainText}
                    />
                    {!hideConfigText && (
                        <div
                            className="NuiFilePicker__config"
                            children={configText}
                        />
                    )}
                </div>
                <GrFormClose
                    className="NuiFilePicker__clear"
                    onClick={clearFiles}
                />
            </StyledFilePicker>
        );
    })
);

const StyledFilePicker = styled(InputContainer)`
    ${context.danger}
    ${context.dangerActiveAlt}

    --nui-filepicker-height: 120px;
    --nui-filepicker-configsize: 0.6em;

    & .NuiFilePicker__input {
        height: var(--nui-filepicker-height);
        opacity: 0;
        cursor: pointer;
    }

    & .NuiFilePicker__overlay {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        pointer-events: none;
        text-align: center;
        overflow: hidden;
    }

    & .NuiFilePicker__config {
        ${text.secondary}

        font-size: var(--nui-filepicker-configsize);
        max-width: 80%;
    }

    & .NuiFilePicker__clear {
        display: none;
        cursor: pointer;
        position: absolute;
        top: 4px;
        right: 4px;

        & > path {
            ${text.primary}

            stroke: ${text.varPrimary};
        }
    }

    &.NuiFilePicker--isDragging {
        & .NuiFilePicker__overlay {
            ${background.active}
        }
    }

    &.NuiFilePicker--clearable {
        & .NuiFilePicker__clear {
            display: block;
        }
    }

    &.NuiFilePicker--hasError {
        color: ${context.varDanger};

        & .NuiFilePicker__config {
            color: ${context.varDangerActiveAlt};
        }
    }

    &.NuiFilePicker--size-xs {
        --nui-filepicker-height: 80px;
        --nui-filepicker-configsize: 0.8em;
    }
    &.NuiFilePicker--size-md {
        --nui-filepicker-height: 160px;
    }
    &.NuiFilePicker--size-lg {
        --nui-filepicker-height: 200px;
    }
    &.NuiFilePicker--size-xl {
        --nui-filepicker-height: 240px;
    }
`;

StyledFilePicker.displayName = createComponentName("StyledFilePicker");
FilePicker.displayName = createComponentName("FilePicker");

export default FilePicker;
