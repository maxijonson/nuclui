export type FormProps<FT extends { [key: string]: any }> = {
    onSubmit?: (formData: FT, evt: React.FormEvent<HTMLFormElement>) => void;
} & Omit<React.ComponentPropsWithRef<"form">, "onSubmit">;

export interface NuiForm {
    <FT extends { [key: string]: any }>(
        p: FormProps<FT>,
        ref:
            | ((instance: HTMLFormElement | null) => void)
            | React.RefObject<HTMLFormElement>
            | null
            | undefined
    ): React.ReactElement;
    displayName: string;
}
