/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import _ from "lodash";
import produce from "immer";
import {
    Container,
    Flex,
    FlexItem,
    Spacer,
    Card,
    HR,
    Form,
    TextInput,
    InputGroup,
} from "nuclui";
import { TextInputProps } from "nuclui/components/Form/TextInput/types";
import { useForm } from "nuclui/components/Form/Form";

interface FD {
    first: string;
    last: string;
    email: string;
    confirm: string;
    postalcode: string;
}

const UseFormTest = React.memo(() => {
    const [fields] = useForm<FD>({
        fields: {
            first: {
                initial: "",
                validate: (v) => {
                    if (v == "error") return ["error"];
                },
            },
            last: {
                initial: "",
                validate: (v) => {
                    if (v == "error") return ["error"];
                },
            },
            email: {
                initial: "",
            },
            confirm: {
                initial: "",
            },
            postalcode: {
                initial: "",
            },
        },
    });

    const onChangeFirst = React.useCallback(
        (e) => {
            fields.first.onChange(e.target.value);
        },
        [fields.first]
    );
    const onChangeLast = React.useCallback(
        (e) => {
            fields.last.onChange(e.target.value);
        },
        [fields.last]
    );

    return (
        <>
            <input type="text" {...fields.first} onChange={onChangeFirst} />
            <div>{fields.first.errors.length}</div>
            <input type="text" {...fields.last} onChange={onChangeLast} />
            <div>{fields.last.errors.length}</div>
        </>
    );
});

const TypicalForm = () => {
    const validateEmail = React.useCallback((value: string) => {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
            return "Enter a valid email address";
    }, []);

    const validatePostalCode = React.useCallback((value: string) => {
        if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value))
            return "Enter a valid postal code";
    }, []);

    const postalCodeMask = React.useMemo(
        () => [/[A-Za-z]/, /\d/, /[A-Za-z]/, " ", /\d/, /[A-Za-z]/, /\d/],
        []
    );

    const transformPostalCode = React.useCallback(
        (_prev: string, next: string) => next.toUpperCase(),
        []
    );

    const onSubmit = React.useCallback<
        NonNullable<React.ComponentProps<typeof Form>["onSubmit"]>
    >((fd, evt) => {
        evt.preventDefault();
        console.info("fd", fd);
    }, []);

    return (
        <>
            <Form onSubmit={onSubmit}>
                <button type="submit" hidden />
                <TextInput
                    name="first"
                    label="First Name"
                    placeholder="First Name"
                    required
                    autoComplete="off"
                />
                <TextInput
                    name="last"
                    label="Last Name"
                    placeholder="Last Name"
                    required
                    autoComplete="off"
                />
                <TextInput
                    name="email"
                    label="Email"
                    placeholder="Email"
                    validate={validateEmail}
                    validateWhen="blur"
                    required
                    autoComplete="off"
                />
                <TextInput
                    name="confirm"
                    label="Confirm"
                    placeholder="Confirm"
                    validate={validateEmail}
                    validateWhen="blur"
                    required
                    autoComplete="off"
                />
                <TextInput
                    name="postalcode"
                    label="Postal Code"
                    placeholder="Postal Code"
                    validate={validatePostalCode}
                    transform={transformPostalCode}
                    mask={postalCodeMask}
                    validateWhen="blur"
                    required
                    autoComplete="off"
                />
            </Form>
        </>
    );
};

const Home = React.memo(() => {
    const [inputs, setInputs] = React.useState<string[][]>([
        [Date.now().toString()],
    ]);
    const ref = React.useRef<HTMLButtonElement>(null);

    const addInputGroup = React.useCallback(() => {
        setInputs((state) =>
            produce(state, (draft) => {
                draft.push([]);
            })
        );
    }, []);

    const addInput = React.useCallback(
        (index: number) => () => {
            setInputs((state) =>
                produce(state, (draft) => {
                    draft[index].push(Date.now().toString());
                })
            );
        },
        []
    );

    const removeInput = React.useCallback(
        (group: number, index: number) => () => {
            setInputs((state) =>
                produce(state, (draft) => {
                    draft[group].splice(index, 1);
                })
            );
        },
        []
    );

    const onSubmit = React.useCallback<
        NonNullable<React.ComponentProps<typeof Form>["onSubmit"]>
    >((fd, evt) => {
        evt.preventDefault();
        console.info("fd", fd);
    }, []);

    const buttonClick = React.useCallback(() => {
        if (ref.current) {
            ref.current.click();
        }
    }, []);

    const validate = React.useCallback((v: string) => {
        if (v == "custom") return "this is a custom error";
        if (v == "default") return false;
    }, []);

    const transform = React.useCallback((prev: string, v: string) => {
        console.warn("transform", prev, v);
        if (v.length == 3) return `${v} `;
        if (v.length == 4 && prev.length > 4) return v.substring(0, 3);
        if (v.length == 4) return `${v.substring(0, 3)} ${v[3]}`;
        if (v.length > 7) return prev;
        return v;
    }, []);

    return (
        <Container maxWidth="lg">
            <div>useForm Test</div>
            <UseFormTest />
            <div>Typical Form</div>
            <TypicalForm />
            <div>With Form</div>
            <button type="button" onClick={buttonClick} children="Submit" />
            <Form onSubmit={onSubmit}>
                <button type="submit" ref={ref} hidden />
                {/* {_.map(
                    [
                        "outline",
                        "underline",
                        "filled",
                        "filled-underline",
                        "filled-none",
                        "none",
                    ] as NonNullable<TextInputProps["variant"]>[],
                    (variant) => (
                        <TextInput
                            key={variant}
                            name={variant}
                            initial={variant}
                            label={variant}
                            placeholder={variant}
                            variant={variant}
                            autoComplete="off"
                        />
                    )
                )} */}
                <HR />
                {_.map(inputs, (group, i) => (
                    <div key={i}>
                        <InputGroup name={`group${i + 1}`}>
                            {_.map(group, (input, j) => (
                                <Flex key={input}>
                                    <TextInput
                                        name={input}
                                        required
                                        initial="Hello"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeInput(i, j)}
                                        children="Remove"
                                    />
                                </Flex>
                            ))}
                        </InputGroup>
                        <button
                            type="button"
                            onClick={addInput(i)}
                            children="Add Input"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addInputGroup}
                    children="Add Group"
                />
                {/* <TextInput
                    name="test"
                    label="Test"
                    validate={validate}
                    validateWhen="blur"
                    required
                    initialTouched
                    transform={transform}
                    transformWhen="change"
                /> */}
            </Form>
            Nuclui is under developement! For now, The docs website is only a
            sandbox for developing the components. Docs will be gradually
            created once the core components are made!
            <HR />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
            libero consequatur voluptatibus dicta ad sunt, ipsa, reprehenderit
            animi quis veritatis laboriosam, necessitatibus distinctio vel
            voluptatum aliquam obcaecati dolor quidem voluptates. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Nobis totam doloremque
            suscipit fugiat perferendis eius repellat alias culpa libero,
            voluptatem, sed sunt itaque dicta enim nostrum eum sit at tenetur?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            qui a accusantium sunt, dolor nostrum suscipit placeat dolorum,
            necessitatibus veritatis fugit magnam repellendus laboriosam neque
            eius. Possimus earum amet nisi?
            {_.map(
                ["none", "xs", "sm", "md", "lg", "xl"] as const,
                (bp, key) => (
                    <Card padding={bp} key={key} disableShadow={key % 3 == 0}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit.
                    </Card>
                )
            )}
            <Flex itemGrow={0} itemBasis="25%" justify="left">
                {_.map(
                    ["none", "xs", "sm", "md", "lg", "xl"] as const,
                    (bp, key) => (
                        <FlexItem key={key}>
                            <Card padding={bp} disableShadow={key % 3 == 0}>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Dolores pariatur quibusdam ab
                                quasi inventore, quas voluptates praesentium
                                voluptas ea maiores in perspiciatis sint
                                voluptate, iure non a unde recusandae illum!
                            </Card>
                        </FlexItem>
                    )
                )}
            </Flex>
            <Spacer />
            <Flex>
                <FlexItem xs={12} sm={6}>
                    <Card>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum illum voluptate a atque quisquam ab
                        consectetur nesciunt consequatur, reiciendis voluptates
                        odio corporis autem eos qui eveniet quas mollitia, nam
                        quae.
                    </Card>
                </FlexItem>
                <FlexItem xs={12} sm={6}>
                    <Card>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum illum voluptate a atque quisquam ab
                        consectetur nesciunt consequatur, reiciendis voluptates
                        odio corporis autem eos qui eveniet quas mollitia, nam
                        quae.
                    </Card>
                </FlexItem>
                <FlexItem xs={12} sm={6}>
                    <Card>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum illum voluptate a atque quisquam ab
                        consectetur nesciunt consequatur, reiciendis voluptates
                        odio corporis autem eos qui eveniet quas mollitia, nam
                        quae.
                    </Card>
                </FlexItem>
                <FlexItem xs={12} sm={6}>
                    <Card>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum illum voluptate a atque quisquam ab
                        consectetur nesciunt consequatur, reiciendis voluptates
                        odio corporis autem eos qui eveniet quas mollitia, nam
                        quae.
                    </Card>
                </FlexItem>
            </Flex>
        </Container>
    );
});

Home.displayName = "Home";

export default Home;
