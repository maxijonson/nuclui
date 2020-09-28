export interface UseFormOptions<T extends {}> {
    fields: {
        [name in keyof T]: {
            /** Initial value */
            initial: T[name];
            /** Validation function. Errors are returned in a string[] */
            validate?: (value: T[name], values: T) => void | null | string[];
            /** Bind the field to other fields. When the binded field value updates, this field is re-evaluated. This is useful when some fields' validation depends on another fields' value */
            bind?: (keyof T)[];
        };
    };
}

export type FieldProps<T extends {}> = {
    [name in keyof T]: {
        name: name;
        value: T[name];
        errors: string[];
        onChange: (v: T[name] | ((current: T[name]) => T[name])) => void;
    };
};

export type FormErrors<T extends {}> = {
    [name in keyof T]: string[];
};
