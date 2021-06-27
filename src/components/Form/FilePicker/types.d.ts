import { StrictOmit } from "ts-essentials";
import {
    HTMLInputProps,
    InputContainerPropsWithBase,
} from "../InputContainer/types";
import FileInputError from "./FileInputError";

export type FileContentType =
    | "text"
    | "base64"
    | "dataURL"
    | "binaryString"
    | "arrayBuffer";

export type ContentType = string | ArrayBuffer;

export interface FileObject {
    name: string;
    type: string;
    lastModified: number;
    lastModifiedDate: Date;
    size: number;
    sizeInKb: number;
    sizeInMb: number;
    sizeInGb: number;
    content: ContentType;
}

interface FilePickerProps {
    children?: never;
    type?: "file";

    /**
     * This prop serves no purpose other than maintaining compatibility with the `useForm` hook when spreading props.
     * It is not used in any way, since an input of type `file` cannot be given a value.
     */
    value?: any;

    /**
     * Called when files are selected.
     * Those file are converted into an array of `FileObject` (even if one file is selected).
     * The second parameter is the input "onChange" event.
     */
    onChange?: (
        v: FileObject[],
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * Called when an occurs after selecting files.
     * The second parameter is the event.
     */
    onError?: (
        error: FileInputError,
        e: Parameters<HTMLInputProps["onChange"]>[0]
    ) => void;

    /**
     * The minimum amount of files that have to be selected
     *
     * @default 1
     */
    minFiles?: number;

    /**
     * The maximum amount of files that can be selected
     */
    maxFiles?: number;

    /**
     * Minimum file size (in bytes) of the selected files
     */
    minFileSize?: number;

    /**
     * Maximum file size (in bytes) of the selected files
     */
    maxFileSize?: number;

    /**
     * Specifies the filters for what file types can be selected.
     * This can be a MIME type (application/*, application/json) or an extension (jpg, .jpg)
     */
    accept?: string[];

    /**
     * The type of the contents in the extracted FileObject.
     *
     * `text`: plain text data
     * `base64`: base64 encoded file
     * `dataURL`: same as `base64`, but with the data declaration prepended to it
     *
     * @default "text"
     */
    contentType?: FileContentType;
}

/**
 * A file input for letting users choose one or multiple files
 */
export type NuiFilePicker = Nui.FRCWC<
    StrictOmit<InputContainerPropsWithBase, "focused" | "touched"> &
        FilePickerProps,
    "input"
>;
