export interface InputGroupProps<T> {
    name: string;
    children?: React.ReactNode;
    initial?: T[];
}

export interface NuiInputGroup {
    <T extends any = any>(props: InputGroupProps<T>): React.ReactElement;
    displayName: string;
}
