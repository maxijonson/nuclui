import defaultTheme from "@theme/defaultTheme";
import { DeepPartial } from "ts-essentials";

export interface NuiRootProps {
    theme?: DeepPartial<typeof defaultTheme>;
}
