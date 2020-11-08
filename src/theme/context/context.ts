import { css } from "styled-components";
import defaultTheme from "../defaultTheme";

export default css`
    /** PRIMARY */
    --nui-context-primary: ${({ theme }) =>
        theme.nui?.context?.primary ?? defaultTheme.context.primary};
    --nui-context-primaryVLight: ${({ theme }) =>
        theme.nui?.context?.primaryVLight ??
        defaultTheme.context.primaryVLight};
    --nui-context-primaryLight: ${({ theme }) =>
        theme.nui?.context?.primaryLight ?? defaultTheme.context.primaryLight};
    --nui-context-primaryDark: ${({ theme }) =>
        theme.nui?.context?.primaryDark ?? defaultTheme.context.primaryDark};
    --nui-context-primaryVDark: ${({ theme }) =>
        theme.nui?.context?.primaryVDark ?? defaultTheme.context.primaryVDark};

    /** SECONDARY */
    --nui-context-secondary: ${({ theme }) =>
        theme.nui?.context?.secondary ?? defaultTheme.context.secondary};
    --nui-context-secondaryVLight: ${({ theme }) =>
        theme.nui?.context?.secondaryVLight ??
        defaultTheme.context.secondaryVLight};
    --nui-context-secondaryLight: ${({ theme }) =>
        theme.nui?.context?.secondaryLight ??
        defaultTheme.context.secondaryLight};
    --nui-context-secondaryDark: ${({ theme }) =>
        theme.nui?.context?.secondaryDark ??
        defaultTheme.context.secondaryDark};
    --nui-context-secondaryVDark: ${({ theme }) =>
        theme.nui?.context?.secondaryVDark ??
        defaultTheme.context.secondaryVDark};

    /** SUCCESS */
    --nui-context-success: ${({ theme }) =>
        theme.nui?.context?.success ?? defaultTheme.context.success};
    --nui-context-successVLight: ${({ theme }) =>
        theme.nui?.context?.successVLight ??
        defaultTheme.context.successVLight};
    --nui-context-successLight: ${({ theme }) =>
        theme.nui?.context?.successLight ?? defaultTheme.context.successLight};
    --nui-context-successDark: ${({ theme }) =>
        theme.nui?.context?.successDark ?? defaultTheme.context.successDark};
    --nui-context-successVDark: ${({ theme }) =>
        theme.nui?.context?.successVDark ?? defaultTheme.context.successVDark};

    /** WARN */
    --nui-context-warn: ${({ theme }) =>
        theme.nui?.context?.warn ?? defaultTheme.context.warn};
    --nui-context-warnVLight: ${({ theme }) =>
        theme.nui?.context?.warnVLight ?? defaultTheme.context.warnVLight};
    --nui-context-warnLight: ${({ theme }) =>
        theme.nui?.context?.warnLight ?? defaultTheme.context.warnLight};
    --nui-context-warnDark: ${({ theme }) =>
        theme.nui?.context?.warnDark ?? defaultTheme.context.warnDark};
    --nui-context-warnVDark: ${({ theme }) =>
        theme.nui?.context?.warnVDark ?? defaultTheme.context.warnVDark};

    /** DANGER */
    --nui-context-danger: ${({ theme }) =>
        theme.nui?.context?.danger ?? defaultTheme.context.danger};
    --nui-context-dangerVLight: ${({ theme }) =>
        theme.nui?.context?.dangerVLight ?? defaultTheme.context.dangerVLight};
    --nui-context-dangerLight: ${({ theme }) =>
        theme.nui?.context?.dangerLight ?? defaultTheme.context.dangerLight};
    --nui-context-dangerDark: ${({ theme }) =>
        theme.nui?.context?.dangerDark ?? defaultTheme.context.dangerDark};
    --nui-context-dangerVDark: ${({ theme }) =>
        theme.nui?.context?.dangerVDark ?? defaultTheme.context.dangerVDark};

    /** INFO */
    --nui-context-info: ${({ theme }) =>
        theme.nui?.context?.info ?? defaultTheme.context.info};
    --nui-context-infoVLight: ${({ theme }) =>
        theme.nui?.context?.infoVLight ?? defaultTheme.context.infoVLight};
    --nui-context-infoLight: ${({ theme }) =>
        theme.nui?.context?.infoLight ?? defaultTheme.context.infoLight};
    --nui-context-infoDark: ${({ theme }) =>
        theme.nui?.context?.infoDark ?? defaultTheme.context.infoDark};
    --nui-context-infoVDark: ${({ theme }) =>
        theme.nui?.context?.infoVDark ?? defaultTheme.context.infoVDark};
`;
