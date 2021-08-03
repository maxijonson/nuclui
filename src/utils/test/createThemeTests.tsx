import React from "react";
import { shallow } from "enzyme";
import styled, { css } from "styled-components";
import "jest-styled-components";
import defaultTheme from "@theme/defaultTheme";

const createThemeTests =
    <
        T extends typeof defaultTheme,
        K extends string & keyof T,
        N extends string & keyof T[K]
    >(
        themeName: K,
        cssTestValue: string,
        cssProperty?: string
    ) =>
    (name: N, theme: ReturnType<typeof css>) => {
        const cssVar = `--nui-${themeName}-${name}`;
        const Component = styled.div`
            ${theme}
        `;

        describe(name, () => {
            it(`should use the default ${name} theme value`, () => {
                const wrapper = shallow(<Component />);
                expect(wrapper).toHaveStyleRule(
                    cssVar,
                    (defaultTheme as T)[themeName][name]
                );
                if (cssProperty) {
                    expect(wrapper).toHaveStyleRule(
                        cssProperty,
                        `var(${cssVar})`
                    );
                }
            });

            it(`should use the provided ${name} theme value`, () => {
                const wrapper = shallow(
                    <Component
                        theme={{
                            nui: { [themeName]: { [name]: cssTestValue } },
                        }}
                    />
                );
                expect(wrapper).toHaveStyleRule(cssVar, cssTestValue);
                if (cssProperty) {
                    expect(wrapper).toHaveStyleRule(
                        cssProperty,
                        `var(${cssVar})`
                    );
                }
            });
        });
    };

export default createThemeTests;
