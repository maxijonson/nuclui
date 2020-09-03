export type FormProps<FT extends { [key: string]: any }> = {
    /**
     * Function to run when submitting valid data. The first parameter is the form data in an object. The second parameter is the submit event.
     * If there are errors, onSubmitFail will be called instead
     */
    onSubmit?: (formData: FT, evt: React.FormEvent<HTMLFormElement>) => void;

    validate?: (formData: FT) => void | null | { [key in keyof FT]?: string[] };
} & Omit<React.ComponentPropsWithRef<"form">, "onSubmit">;

export interface NuiForm {
    <FT extends { [key: string]: any }>(p: FormProps<FT>): React.ReactElement;
    displayName: string;
}
