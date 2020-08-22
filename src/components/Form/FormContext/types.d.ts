export interface RegisterFunc<T extends any = any> {
    (name: string, initialValue: T): {
        setValue: (value: T | ((v: T) => T)) => void;
        value: T;
        unregister: () => void;
        init: () => void;
    };
}

export interface FormCtx<T extends any = any> {
    register: RegisterFunc<T>;
}
