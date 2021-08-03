import React from "react";
import { mount } from "enzyme";
import { useForm } from "@hooks";

describe("useForm", () => {
    describe("initialValue", () => {
        it("should return the field with the initial value", () => {
            const Component = () => {
                const [fields, data] = useForm({
                    fields: {
                        test: {
                            initial: "test",
                        },
                    },
                });

                if (fields.test.value !== data.test) return null;
                return <>{data.test}</>;
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("test");
        });
    });

    describe("onChange", () => {
        it("should change the value with a non-function parameter (string)", () => {
            const Component = () => {
                const [fields, data] = useForm({
                    fields: {
                        test: {
                            initial: "test",
                        },
                    },
                });

                React.useEffect(() => {
                    fields.test.onChange("changed");
                }, [fields.test]);

                if (fields.test.value !== data.test) return null;
                return <>{data.test}</>;
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("changed");
        });

        it("should change the value with a non-function parameter (array)", () => {
            const Component = () => {
                const [fields, data] = useForm({
                    fields: {
                        test: {
                            initial: [] as string[],
                        },
                    },
                });

                React.useEffect(() => {
                    fields.test.onChange(["a", "b"]);
                }, [fields.test]);

                if (fields.test.value !== data.test) return null;
                return <>{data.test.join(",")}</>;
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("a,b");
        });

        it("should change the value with a non-function parameter (object)", () => {
            const Component = () => {
                const [fields, data] = useForm({
                    fields: {
                        test: {
                            initial: { value: 1 },
                        },
                    },
                });

                React.useEffect(() => {
                    fields.test.onChange({ value: 2 });
                }, [fields.test]);

                if (fields.test.value !== data.test) return null;
                return <>{data.test.value}</>;
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("2");
        });

        it("should change the value with a non-function parameter (boolean)", () => {
            const Component = () => {
                const [fields, data] = useForm({
                    fields: {
                        test: {
                            initial: false,
                        },
                    },
                });

                React.useEffect(() => {
                    fields.test.onChange(true);
                }, [fields.test]);

                if (fields.test.value !== data.test) return null;
                return <>{`${data.test}`}</>;
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("true");
        });

        it("should change the value with a function parameter", () => {
            const Component = () => {
                const [fields, data] = useForm({
                    fields: {
                        test: {
                            initial: "test",
                        },
                    },
                });

                React.useEffect(() => {
                    fields.test.onChange((v) => `${v}changed`);
                }, [fields.test]);

                if (fields.test.value !== data.test) return null;
                return <>{data.test}</>;
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("testchanged");
        });
    });

    describe("validation", () => {
        it("should have an error", () => {
            const Component = () => {
                const [fields, data] = useForm({
                    fields: {
                        test: {
                            initial: "test",
                            validate: (v) =>
                                v.startsWith("error") ? ["error"] : null,
                        },
                    },
                });
                const renders = React.useRef(0);

                React.useEffect(() => {
                    if (renders.current === 0) {
                        fields.test.onChange("error1");
                    }
                    renders.current += 1;
                });

                if (fields.test.value !== data.test) return null;
                return <>{`${data.test}:${fields.test.errors.length}`}</>;
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("error1:1");
        });

        it("should remove the error after the value is changed to a valid one", () => {
            const Component = () => {
                const [fields, data] = useForm({
                    fields: {
                        test: {
                            initial: "test",
                            validate: (v) =>
                                v.startsWith("error") ? ["error"] : null,
                        },
                    },
                });
                const renders = React.useRef(0);

                React.useEffect(() => {
                    if (renders.current === 0) {
                        fields.test.onChange("error1");
                    } else if (renders.current === 1) {
                        fields.test.onChange("valid");
                    }
                    renders.current += 1;
                });

                if (fields.test.value !== data.test) return null;
                return <>{`${data.test}:${fields.test.errors.length}`}</>;
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("valid:0");
        });

        it("should keep the same reference to the errors when the errors are the same between renders", () => {
            const Component = () => {
                const [fields, data] = useForm({
                    fields: {
                        test: {
                            initial: "test",
                            validate: (v) =>
                                v.startsWith("error") ? ["error"] : null,
                        },
                    },
                });
                const renders = React.useRef(0);
                const prevErrors = React.useRef(fields.test.errors);

                React.useEffect(() => {
                    if (renders.current === 0) {
                        fields.test.onChange("error1");
                    } else if (renders.current === 1) {
                        prevErrors.current = fields.test.errors;
                        fields.test.onChange("error2");
                    }
                    renders.current += 1;
                });

                if (fields.test.value !== data.test) return null;
                return (
                    <>{`${data.test}:${fields.test.errors.length}:${
                        fields.test.errors === prevErrors.current
                    }`}</>
                );
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("error2:1:true");
        });
    });

    describe("bindings", () => {
        it("should not call the onChange handler on unbound fields", () => {
            const Component = () => {
                const [fields] = useForm({
                    fields: {
                        test1: {
                            initial: "test",
                        },
                        test2: {
                            initial: "test2",
                            validate: (_v, { test1 }) =>
                                test1 === "error" ? ["error"] : null,
                        },
                        test3: {
                            initial: "test3",
                        },
                    },
                });
                const renders = React.useRef(0);

                React.useEffect(() => {
                    if (renders.current === 0) {
                        fields.test1.onChange("error");
                    }
                    renders.current += 1;
                });

                return (
                    <>
                        {fields.test1.errors.length}
                        {fields.test2.errors.length}
                        {fields.test3.errors.length}
                    </>
                );
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("000");
        });

        it("should call the onChange handler on bound fields", () => {
            const Component = () => {
                const [fields] = useForm({
                    fields: {
                        test1: {
                            initial: "test",
                        },
                        test2: {
                            initial: "test2",
                            validate: (_v, { test1 }) =>
                                test1 === "error" ? ["error"] : null,
                            bind: ["test1", "test3"],
                        },
                        test3: {
                            initial: "test3",
                        },
                    },
                });
                const renders = React.useRef(0);

                React.useEffect(() => {
                    if (renders.current === 0) {
                        fields.test1.onChange("error");
                    }
                    renders.current += 1;
                });

                return (
                    <>
                        {fields.test1.errors.length}
                        {fields.test2.errors.length}
                        {fields.test3.errors.length}
                    </>
                );
            };
            const wrapper = mount(<Component />);
            expect(wrapper.text()).toBe("010");
        });
    });
});
