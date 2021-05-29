import { InputBaseProps, NuiInputBase } from "../InputBase/types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CheckboxContainerProps {}

export type CheckboxContainerPropsWithBase = InputBaseProps &
    CheckboxContainerProps;

/**
 * A container for checkbox-like inputs
 */
export type NuiCheckboxContainer = Nui.FRCWC<
    CheckboxContainerPropsWithBase,
    NuiInputBase
>;
