import defaultTheme from "@theme/defaultTheme";
import { DeepPartial } from "ts-essentials";

interface NuiRootProps {
    theme?: DeepPartial<typeof defaultTheme>;
    children: React.ReactElement;
}
