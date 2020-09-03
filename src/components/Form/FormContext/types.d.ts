/** Errors type */
type E = string[];

export interface RegisterFunc<T extends any = any> {
    (name: string, initialValue: T): {
        value: T;
        setValue: (value: T | ((v: T) => T)) => void;
        errors: E;
        setErrors: (error: E | E[0] | null | ((e: E) => E)) => void;
        unregister: () => void;
        init: () => void;
    };
}

export interface FormCtx<T extends any = any> {
    register: RegisterFunc<T>;
}
