export interface InputGroupProps<T> {
    name: string;
    children?: React.ReactNode;
}

export interface NuiInputGroup {
    <T extends any = any>(props: InputGroupProps<T>): React.ReactElement;
    displayName: string;
}
