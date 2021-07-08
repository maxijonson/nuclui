import React from "react";
import { mount } from "enzyme";
import { createBasicTests } from "@utils/test";
import { act } from "react-dom/test-utils";
import Button from "./Button";
import "jest-styled-components";

const { testClassName, testDisplayName, testRef, testRendering } =
    createBasicTests(Button, {});

describe("Button", () => {
    testRendering();
    testDisplayName("NuiStyledButton", "NuiButton");
    testRef("button");
    testClassName("button", "NuiButton");

    describe("icon", () => {
        it("should not render any icon container when no icon is given", () => {
            const wrapper = mount(<Button />);

            const iconContainer = wrapper.find(".NuiButton__icon");
            expect(iconContainer.length).toBe(0);

            const main = wrapper.find(".NuiButton__main");
            expect(main.length).toBe(0);
        });

        it("should render the given icon in the icon container", () => {
            const className = "NuiButton__icon--test";
            const wrapper = mount(
                <Button icon={<div className={className} />} />
            );

            const iconContainer = wrapper.find(".NuiButton__icon");
            expect(iconContainer.length).toBe(1);

            const icon = iconContainer.find(`.${className}`);
            expect(icon.length).toBe(1);

            const main = wrapper.find(".NuiButton__main");
            expect(main.length).toBe(0);
        });

        it("should render both the icon and the children", () => {
            const iconClassName = "NuiButton__icon--test";
            const childrenClassName = "NuiButton__main--test";
            const wrapper = mount(
                <Button
                    icon={<div className={iconClassName} />}
                    children={<div className={childrenClassName} />}
                />
            );

            const iconContainer = wrapper.find(".NuiButton__icon");
            expect(iconContainer.length).toBe(1);

            const icon = iconContainer.find(`.${iconClassName}`);
            expect(icon.length).toBe(1);

            const main = wrapper.find(".NuiButton__main");
            expect(main.length).toBe(1);
        });
    });

    describe("iconPosition", () => {
        it("should render the icon to the left by default", () => {
            const wrapper = mount(<Button icon={<div />} />);
            expect(
                wrapper.render().hasClass("NuiButton--iconposition-right")
            ).toBeFalsy();
        });

        it("should render the icon to the left", () => {
            const wrapper = mount(
                <Button icon={<div />} iconPosition="left" />
            );
            expect(
                wrapper.render().hasClass("NuiButton--iconposition-right")
            ).toBeFalsy();
        });

        it("should render the icon to the right", () => {
            const wrapper = mount(
                <Button icon={<div />} iconPosition="right" />
            );
            expect(
                wrapper.render().hasClass("NuiButton--iconposition-right")
            ).toBeTruthy();
        });
    });

    describe("size", () => {
        const modifier = "NuiButton--size";

        it("should use the 'sm' size by default", () => {
            const wrapper = mount(<Button />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each(["xs", "sm", "md", "lg", "xl"] as const)(
            "should use the '%s' size",
            (size) => {
                const wrapper = mount(<Button size={size} />);
                const { className } = wrapper.getDOMNode();

                if (size == "sm") {
                    expect(className).not.toContain(modifier);
                } else {
                    expect(
                        wrapper.render().hasClass(`${modifier}-${size}`)
                    ).toBeTruthy();

                    expect(
                        className.split(" ").filter((c) => c.includes(modifier))
                            .length
                    ).toBe(1);
                }
            }
        );
    });

    describe("variant", () => {
        const modifier = "NuiButton--variant";

        it("should use the 'filled' variant by default", () => {
            const wrapper = mount(<Button />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each([
            "filled",
            "outline",
            "empty",
            "round",
            "round-outline",
            "round-empty",
        ] as const)("should use the '%s' variant", (variant) => {
            const wrapper = mount(<Button variant={variant} />);
            const { className } = wrapper.getDOMNode();

            if (variant == "filled") {
                expect(className).not.toContain(modifier);
            } else {
                expect(
                    wrapper.render().hasClass(`${modifier}-${variant}`)
                ).toBeTruthy();

                expect(
                    className.split(" ").filter((c) => c.includes(modifier))
                        .length
                ).toBe(1);
            }
        });
    });

    describe("color", () => {
        const modifier = "NuiButton--color";

        it("should use the 'default' color by default", () => {
            const wrapper = mount(<Button />);
            expect(wrapper.getDOMNode().className).not.toContain(modifier);
        });

        it.each([
            "default",
            "primary",
            "secondary",
            "warn",
            "danger",
            "success",
            "info",
        ] as const)("should use the '%s' color", (color) => {
            const wrapper = mount(<Button color={color} />);
            const { className } = wrapper.getDOMNode();

            if (color == "default") {
                expect(className).not.toContain(modifier);
            } else {
                expect(
                    wrapper.render().hasClass(`${modifier}-${color}`)
                ).toBeTruthy();

                expect(
                    className.split(" ").filter((c) => c.includes(modifier))
                        .length
                ).toBe(1);
            }
        });
    });

    describe("disableShadow", () => {
        it("should not disable the shadow by default", () => {
            const wrapper = mount(<Button />);
            expect(
                wrapper.render().hasClass("NuiButton--disableshadow")
            ).toBeFalsy();
        });

        it("should not disable the shadow", () => {
            const wrapper = mount(<Button disableShadow={false} />);
            expect(
                wrapper.render().hasClass("NuiButton--disableshadow")
            ).toBeFalsy();
        });

        it("should disable the shadow", () => {
            const wrapper = mount(<Button disableShadow />);
            expect(
                wrapper.render().hasClass("NuiButton--disableshadow")
            ).toBeTruthy();
        });
    });

    describe("confirmDuration", () => {
        it("should call the onClick method instantly when no confirmDuration is given", () => {
            const onClick = jest.fn();
            const wrapper = mount(<Button onClick={onClick} />);
            const button = wrapper.find("button");
            button.simulate("click");
            expect(onClick).toHaveBeenCalledTimes(1);
            expect(onClick).toHaveBeenCalledWith(expect.any(Object));
        });

        it("should call the onClick method instantly when the confirmDuration is 0", () => {
            const onClick = jest.fn();
            const wrapper = mount(
                <Button onClick={onClick} confirmDuration={0} />
            );
            const button = wrapper.find("button");
            button.simulate("click");
            expect(onClick).toHaveBeenCalledTimes(1);
            expect(onClick).toHaveBeenCalledWith(expect.any(Object));
        });

        it("should have a confirmDuration specific class when confirmDuration is set", () => {
            const wrapper = mount(<Button confirmDuration={500} />);
            expect(
                wrapper.render().hasClass("NuiButton--confirm")
            ).toBeTruthy();
        });

        it("should call the onClick method when the confirmDuration is reached", async () => {
            const ref = React.createRef<HTMLButtonElement>();
            const onClick = jest.fn();
            const wrapper = mount(
                <Button onClick={onClick} confirmDuration={500} ref={ref} />
            );
            const button = wrapper.find("button");

            if (!ref.current) {
                throw new Error("Ref not set");
            }

            ref.current.style.width = "500px";
            button.simulate("click");
            expect(onClick).toHaveBeenCalledTimes(0);

            ref.current.style.width = "0px"; // Simulate ::after reaching the button's width
            button.simulate("click");
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe("disableFullAnimation", () => {
        it("should play the full click animation by default", async () => {
            const wrapper = mount(<Button />);
            const button = wrapper.find("button");
            button.simulate("pointerdown");
            expect(
                wrapper.render().hasClass("NuiButton--recentlyPressed")
            ).toBeTruthy();

            await act(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 101);
                });
            });
            expect(
                wrapper.render().hasClass("NuiButton--recentlyPressed")
            ).toBeFalsy();
        });

        it("should play the full click animation when disableFullAnimation is false", () => {
            const wrapper = mount(<Button disableFullAnimation={false} />);
            const button = wrapper.find("button");
            button.simulate("pointerdown");
            expect(
                wrapper.render().hasClass("NuiButton--recentlyPressed")
            ).toBeTruthy();
        });

        it("should not play the full click animation when disableFullAnimation is true", () => {
            const wrapper = mount(<Button disableFullAnimation />);
            const button = wrapper.find("button");
            button.simulate("pointerdown");
            expect(
                wrapper.render().hasClass("NuiButton--recentlyPressed")
            ).toBeFalsy();
        });
    });

    describe("onClick", () => {
        it("should behave like a normal button even if there is no onClick provided", () => {
            const onClick = jest.fn();
            const ref = React.createRef<HTMLButtonElement>();
            mount(<Button ref={ref} />);

            if (!ref.current) {
                throw new Error("Ref not set");
            }
            ref.current.addEventListener("click", onClick);
            ref.current.click();
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it("should detect when the click event is not from a mouse", () => {
            const wrapper = mount(<Button confirmDuration={500} />);
            const button = wrapper.find("button");

            button.simulate("pointerdown", { pointerType: "jest" });
            expect(
                wrapper.render().hasClass("NuiButton--isTouch")
            ).toBeTruthy();
        });
    });

    describe("onDoubleClick", () => {
        it("should handle double clicks", () => {
            const onDoubleClick = jest.fn();
            const wrapper = mount(<Button onDoubleClick={onDoubleClick} />);
            const button = wrapper.find("button");
            button.simulate("doubleclick");
            expect(onDoubleClick).toHaveBeenCalledTimes(0);
        });
    });
});
