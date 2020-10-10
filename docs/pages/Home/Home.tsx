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
    TextInput,
    NumberInput,
    useForm,
} from "nuclui";
import { TextInputProps } from "nuclui/components/Form/TextInput/types";

const Icon = (
    <svg viewBox="0 0 640 512">
        <path
            fill="currentColor"
            d="M322.1 252v-1l-51.2-65.8s-12 1.6-25 15.1c-9 9.3-242.1 239.1-243.4 240.9-7 10 1.6 6.8 15.7 1.7.8 0 114.5-36.6 114.5-36.6.5-.6-.1-.1.6-.6-.4-5.1-.8-26.2-1-27.7-.6-5.2 2.2-6.9 7-8.9l92.6-33.8c.6-.8 88.5-81.7 90.2-83.3zm160.1 120.1c13.3 16.1 20.7 13.3 30.8 9.3 3.2-1.2 115.4-47.6 117.8-48.9 8-4.3-1.7-16.7-7.2-23.4-2.1-2.5-205.1-245.6-207.2-248.3-9.7-12.2-14.3-12.9-38.4-12.8-10.2 0-106.8.5-116.5.6-19.2.1-32.9-.3-19.2 16.9C250 75 476.5 365.2 482.2 372.1zm152.7 1.6c-2.3-.3-24.6-4.7-38-7.2 0 0-115 50.4-117.5 51.6-16 7.3-26.9-3.2-36.7-14.6l-57.1-74c-5.4-.9-60.4-9.6-65.3-9.3-3.1.2-9.6.8-14.4 2.9-4.9 2.1-145.2 52.8-150.2 54.7-5.1 2-11.4 3.6-11.1 7.6.2 2.5 2 2.6 4.6 3.5 2.7.8 300.9 67.6 308 69.1 15.6 3.3 38.5 10.5 53.6 1.7 2.1-1.2 123.8-76.4 125.8-77.8 5.4-4 4.3-6.8-1.7-8.2z"
        />
    </svg>
);

const UseFormTest = React.memo(() => {
    const [fields, data] = useForm({
        fields: {
            first: {
                initial: "",
                validate: (v) => {
                    if (v.length == 0) return ["This field is required"];
                },
            },
            last: {
                initial: "",
                validate: (v) => {
                    if (v.length == 0) return ["This field is required"];
                },
            },
            middle: {
                initial: "",
                validate: (v) => {
                    if (v.length == 0) return ["This field is required"];
                },
            },
            email: {
                initial: "",
                validate: (v) => {
                    if (v.length == 0) return ["This field is required"];
                },
            },
            confirm: {
                initial: "",
                validate: (v, fd) => {
                    if (v != fd.email) return ["Emails do not match"];
                },
                bind: ["email"],
            },
            postalcode: {
                initial: "",
                validate: (v) => {
                    if (!/^[A-Z]\d[A-Z]\s\d[A-Z]\d$/.test(v)) {
                        return ["Invalid postal code"];
                    }
                },
            },
            adresses: {
                initial: ["Address One", "Address Two"] as string[],
            },
            grades: {
                initial: [{ class: "", grade: 0 }] as {
                    class: string;
                    grade: number;
                }[],
            },
            contact: {
                initial: { type: "", phone: "" },
            },
            age: {
                initial: 0,
                validate: (v) => {
                    if (v == null) return ["Field cannot be empty"];
                    if (v < 18) return ["Must be over 18"];
                },
            },
        },
    });

    const onAddressChange = React.useCallback(
        (index: number) => (v: string) => {
            fields.adresses.onChange((current) =>
                produce(current, (draft) => {
                    draft[index] = v;
                })
            );
        },
        [fields.adresses]
    );

    const onContactChange = React.useCallback(
        (index: keyof typeof fields.contact.value) => (v: string) => {
            fields.contact.onChange((current) =>
                produce(current, (draft) => {
                    draft[index] = v;
                })
            );
        },
        [fields]
    );

    const onSubmit = React.useCallback(
        (e: any) => {
            e.preventDefault();
            console.info(data);
        },
        [data]
    );

    const mask = React.useMemo(
        () => [/[A-Za-z]/, /\d/, /[A-Za-z]/, " ", /\d/, /[A-Za-z]/, /\d/],
        []
    );

    const pipe = React.useCallback<NonNullable<TextInputProps["pipe"]>>(
        (conformed) => conformed.toUpperCase(),
        []
    );

    return (
        <form autoComplete="off" onSubmit={onSubmit}>
            <NumberInput
                {...fields.age}
                label="Age"
                min={0}
                max={24}
                step={3}
            />
            <TextInput {...fields.first} label="First Name" size="100%" />
            <TextInput
                {...fields.middle}
                label="Middle Name"
                variant="none"
                prepend="Search"
            />
            <TextInput
                {...fields.last}
                label="Last Name"
                variant="filled"
                prepend="Search"
            />
            <TextInput
                {...fields.email}
                label="Email"
                variant="filled-none"
                prepend="Search"
            />
            <TextInput
                {...fields.confirm}
                label="Confirm Email"
                variant="filled-underline"
                disabled={fields.email.value == ""}
                prepend="Search"
            />
            <TextInput
                label="Contact Phone Test"
                prepend={Icon}
                value={fields.contact.value.phone}
                onChange={onContactChange("phone")}
            />
            <Flex
                justify="spaceBetween"
                itemBasis={5}
                itemSpacing="none"
                gap="sm"
            >
                <FlexItem>
                    <TextInput
                        size="100%"
                        label="Contact Phone"
                        prepend={Icon}
                        value={fields.contact.value.phone}
                        onChange={onContactChange("phone")}
                    />
                </FlexItem>
                <FlexItem>
                    <TextInput
                        size="100%"
                        label="Contact Phone"
                        prepend="Search"
                        value={fields.contact.value.phone}
                        onChange={onContactChange("phone")}
                    />
                </FlexItem>
                <FlexItem>
                    <TextInput
                        size="100%"
                        label="Contact Phone"
                        value={fields.contact.value.phone}
                        onChange={onContactChange("phone")}
                    />
                </FlexItem>
            </Flex>
            <TextInput
                label="Contact Phone"
                prepend={Icon}
                value={fields.contact.value.phone}
                onChange={onContactChange("phone")}
            />
            <TextInput
                {...fields.postalcode}
                label="Postal Code"
                variant="underline"
                mask={mask}
                pipe={pipe}
                guide={false}
                prepend="Search"
            />
            {_.map(fields.adresses.value, (v, i) => (
                <TextInput
                    key={`Address${i}`}
                    label={`Address ${i + 1}`}
                    value={v}
                    onChange={onAddressChange(i)}
                />
            ))}
            <TextInput
                label="Contact Type"
                prepend={<div style={{ height: "50px" }}>{Icon}</div>}
                value={fields.contact.value.type}
                onChange={onContactChange("type")}
            />
            <button
                type="submit"
                children="Submit"
                style={{ display: "block" }}
            />
        </form>
    );
});

const Home = React.memo(() => {
    return (
        <Container maxWidth="lg">
            <div>useForm Test</div>
            <UseFormTest />
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
