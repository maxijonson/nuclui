import { Theme } from "nuclui";
import { DeepRequired } from "ts-essentials";

const dark: DeepRequired<Theme> = {
    background: {
        main: "#202020",
        surface: "#181818",
        surfaceAlt: "#2C2C2C",
        active: "#121212",
        activeAlt: "#565656",
    },
    border: {
        primary: "#727272",
        secondary: "#303030",
    },
    context: {
        primary: "#1F81C2",
        primaryActive: "#175C8A",
        primaryActiveAlt: "#161E25",
        primaryContrastText: "#FFFFFF",
        primarySurface: "#81AFCC",
        secondary: "#8B19A5",
        secondaryActive: "#5F0B72",
        secondaryActiveAlt: "#221A24",
        secondaryContrastText: "#FFFFFF",
        secondarySurface: "#BE7FCC",
        success: "#2FA54F",
        successActive: "#12722C",
        successActiveAlt: "#19261C",
        successContrastText: "#FFFFFF",
        successSurface: "#80CC95",
        info: "#119691",
        infoActive: "#08615E",
        infoActiveAlt: "#162726",
        infoContrastText: "#FFFFFF",
        infoSurface: "#7DC4C1",
        danger: "#D42525",
        dangerActive: "#770f0f",
        dangerActiveAlt: "#2D1414",
        dangerContrastText: "#FFFFFF",
        dangerSurface: "#C47E7E",
        warn: "#A1810D",
        warnActive: "#69550B",
        warnActiveAlt: "#262213",
        warnContrastText: "#FFFFFF",
        warnSurface: "#BDAD76",
    },
    shadow: {
        primary: "#0E0E11",
        secondary: "#222227",
    },
    text: {
        primary: "#F5F5F5",
        secondary: "#92A4AC",
        contrast: "#202020",
    },
};

export default dark;
