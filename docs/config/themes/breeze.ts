import { Theme } from "nuclui";
import { DeepRequired } from "ts-essentials";

const dark: DeepRequired<Theme> = {
    background: {
        main: "#f1f5fa",
        surface: "#e2ebf4",
        surfaceAlt: "#89a1b9",
        active: "#86A7C9",
        activeAlt: "#344A60",
    },
    border: {
        primary: "#7F92A7",
        secondary: "#58697C",
    },
    context: {
        primary: "#4C87A6",
        primaryActive: "#366F8D",
        primaryActiveAlt: "#98C3D9",
        primaryContrastText: "#FFFFFF",
        primarySurface: "#CEECFC",
        secondary: "#BC21DD",
        secondaryActive: "#880EA2",
        secondaryActiveAlt: "#EBB1F8",
        secondaryContrastText: "#FFFFFF",
        secondarySurface: "#F1C0FC",
        success: "#3BDB66",
        successActive: "#199B3C",
        successActiveAlt: "#B1FBC5",
        successContrastText: "#FFFFFF",
        successSurface: "#B9FFCC",
        info: "#1ADCD6",
        infoActive: "#0D9692",
        infoActiveAlt: "#7CF6F2",
        infoContrastText: "#FFFFFF",
        infoSurface: "#A7F8F5",
        danger: "#DF2222",
        dangerActive: "#AC1414",
        dangerActiveAlt: "#F67D7D",
        dangerContrastText: "#FFFFFF",
        dangerSurface: "#FCBABA",
        warn: "#F2C312",
        warnActive: "#AA8A11",
        warnActiveAlt: "#F7DC74",
        warnContrastText: "#FFFFFF",
        warnSurface: "#FAEAAF",
    },
    shadow: {
        primary: "#0E0E11",
        secondary: "#222227",
    },
    text: {
        primary: "#201E18",
        secondary: "#54667A",
        contrast: "#F4F0EC",
    },
};

export default dark;
