import defaultTheme from "@theme/defaultTheme";
import { DeepPartial } from "ts-essentials";

export type Theme = DeepPartial<typeof defaultTheme>;

export interface RootProps {
    theme?: Theme;
}
