import defaultTheme from "@theme/defaultTheme";
import { DeepPartial } from "ts-essentials";

export interface RootProps {
    theme?: DeepPartial<typeof defaultTheme>;
}
