/**
 * The default theme for styling
 */
const defaultTheme = {
    background: {
        primary: "#FFFFFF",
        secondary: "#F3F6F9",
        dimmed: "#E9EBEF",
        dark: "#A0A1A3",
    },
    border: {
        primary: "#777E85",
        secondary: "#B5BFC9",
    },
    context: {
        primary: "#1698ED",
        primaryVLight: "#BBE2FB",
        primaryLight: "#86CBF8",
        primaryDark: "#0E6FAF",
        primaryVDark: "#07436A",
        secondary: "#BC21DD",
        secondaryVLight: "#EBB1F8",
        secondaryLight: "#E076F7",
        secondaryDark: "#880EA2",
        secondaryVDark: "#560667",
        success: "#3BDB66",
        successVLight: "#B1FBC5",
        successLight: "#7AF59B",
        successDark: "#199B3C",
        successVDark: "#076520",
        info: "#1ADCD6",
        infoVLight: "#A7F8F5",
        infoLight: "#7CF6F2",
        infoDark: "#0D9692",
        infoVDark: "#056361",
        danger: "#DF2222",
        dangerVLight: "#FCBABA",
        dangerLight: "#F67D7D",
        dangerDark: "#AC1414",
        dangerVDark: "#710606",
        warn: "#F2C312",
        warnVLight: "#FAEAAF",
        warnLight: "#F7DC74",
        warnDark: "#AA8A11",
        warnVDark: "#655105",
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
