import { StrictOmit } from "ts-essentials";
import {
    HTMLInputProps,
    InputContainerPropsWithBase,
} from "../InputContainer/types";
import FileInputError from "./FileInputError";

/**
 * Content type names
 */
export type ContentTypeName =
    | "text"
    | "base64"
    | "dataURL"
    | "binaryString"
    | "arrayBuffer";

/**
 * Potential data type in the `content` attribute of the `FileObject` generated when choosing files
 */
export type ContentType = string | ArrayBuffer;

/**
 * Object generated for each chosen file
 */
export interface FileObject<CT extends ContentType> {
    name: string;
    type: string;
    lastModified: number;
    lastModifiedDate: Date;
    size: number;
    sizeInKb: number;
    sizeInMb: number;
    sizeInGb: number;
    content: CT;
}

/**
 * If `CTN` extends `CTNV`, then the `FileObject` will have a `content` of type `CT`.
 */
type FileObjectIf<
    CTN extends ContentTypeName,
    CTNV extends ContentTypeName,
    CT extends ContentType
> = Nui.Utils.If<CTN, CTNV, FileObject<CT>, never>;

export type FileObjectFor<CTN extends ContentTypeName> =
    | FileObjectIf<CTN, "text" | "base64" | "dataURL" | "binaryString", string>
    | FileObjectIf<CTN, "arrayBuffer", ArrayBuffer>;

/**
 * Props that do not vary in typings
 */
interface FilePickerBaseProps {
    children?: never;
    type?: "file";

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
     * Hides the sub-text that shows the FilePicker constraints.
     *
     * @default false
     */
    hideConfigText?: boolean;

    /**
     * Hides the errors shown in the FilePicker when they occur
     *
     * @default false
     */
    hideErrors?: boolean;
}

/**
 * Props that vary in typings based on the `contentType` prop. `CTN` represents the `contentType` name and `CT` represents the type of the FileObject's `content`.
 */
interface FilePickerDynamicProps<
    CTN extends ContentTypeName,
    CT extends ContentType
> extends FilePickerBaseProps {
    /**
     * The type of the contents in the extracted FileObject.
     *
     * `text`: plain text data
     * `base64`: base64 encoded file
     * `dataURL`: same as `base64`, but with the data declaration prepended to it
     * `binaryString`: similar to `text
     * `arrayBuffer`: content of type `ArrayBuffer`
     *
     * @default "text"
     */
    contentType: CTN;

    /**
     * The current files assigned on the input.
     * This prop is mostly used to display information to the user inside the FilePicker.
     */
    value?: FileObject<CT>[];

    /**
     * Called when files are selected.
     * Those file are converted into an array of `FileObject` (even if one file is selected).
     * The second parameter is the input "onChange" event or the clear click event.
     */
    onChange?: (
        v: FileObject<CT>[],
        e:
            | Parameters<HTMLInputProps["onChange"]>[0]
            | React.MouseEvent<SVGElement, MouseEvent>
    ) => void;
}

/**
 * Default types for the dynamic props when `contentType` is `undefined`
 */
interface FilePickerDefaultDynamicProps extends FilePickerBaseProps {
    contentType?: undefined;
    value?: FileObject<string>[];
    onChange?: (
        v: FileObject<string>[],
        e:
            | Parameters<HTMLInputProps["onChange"]>[0]
            | React.MouseEvent<SVGElement, MouseEvent>
    ) => void;
}

/**
 * All possible combination of content types with their FileObject `content` type associated.
 */
type FilePickerProps =
    | FilePickerDynamicProps<
          "text" | "base64" | "dataURL" | "binaryString",
          string
      >
    | FilePickerDynamicProps<"arrayBuffer", ArrayBuffer>
    | FilePickerDefaultDynamicProps;

/**
 * A file input for letting users choose one or multiple files
 */
export type NuiFilePicker = Nui.FRCWC<
    StrictOmit<InputContainerPropsWithBase, "focused" | "touched"> &
        FilePickerProps,
    "input"
>;
