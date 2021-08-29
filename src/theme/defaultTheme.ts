/**
 * The default theme for styling
 */
const defaultTheme = {
    background: {
        main: "#FFFFFF",
        surface: "#FAFAFC",
        surfaceAlt: "#E9EBEF",
        active: "#CCD0D4",
        activeAlt: "#29292A",
    },
    border: {
        primary: "#777E85",
        secondary: "#B5BFC9",
    },
    context: {
        primary: "#1698ED",
        primaryActive: "#0E6FAF",
        primaryActiveAlt: "#86CBF8",
        primaryContrastText: "#FFFFFF",
        primarySurface: "#BBE2FB",
        secondary: "#BC21DD",
        secondaryActive: "#880EA2",
        secondaryActiveAlt: "#EBB1F8",
        secondaryContrastText: "#FFFFFF",
        secondarySurface: "#F0BCFC",
        success: "#3BDB66",
        successActive: "#199B3C",
        successActiveAlt: "#B1FBC5",
        successContrastText: "#FFFFFF",
        successSurface: "#C7FFD6",
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
        primary: "#687784",
        secondary: "#A3B2C2",
    },
    text: {
        primary: "#202020",
        secondary: "#69777D",
        contrast: "#F5F5F5",
    },
};

/**
 * Utility to create consistent CSS variable names for themes
 *
 * @param themeName the theme group name
 * @returns a function that creates a CSS variable name for a given property of the theme group
 */
const createTheme =
    <
        T extends typeof defaultTheme,
        K extends string & keyof T,
        N extends string & keyof T[K]
    >(
        themeName: K
    ) =>
    (name: N) => {
        const cssVarName = `--nui-${themeName}-${name}`;
        return {
            varName: cssVarName,
            var: `var(${cssVarName})`,
            getVarValue: ({ theme }: { theme: { nui?: T } }) => {
                if (
                    theme.nui &&
                    theme.nui[themeName] &&
                    theme.nui[themeName][name]
                ) {
                    return theme.nui[themeName][name];
                }
                return (defaultTheme as T)[themeName][name];
            },
        };
    };

export const createBackgroundTheme = createTheme("background");
export const createBorderTheme = createTheme("border");
export const createShadowTheme = createTheme("shadow");
export const createTextTheme = createTheme("text");
export const createContextTheme = createTheme("context");

export default defaultTheme;
