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
            <TextInput {...fields.first} label="First Name" />
            <TextInput {...fields.last} label="Last Name" variant="filled" />
            <TextInput {...fields.email} label="Email" variant="filled-none" />
            <TextInput
                {...fields.confirm}
                label="Confirm Email"
                variant="filled-underline"
                disabled={fields.email.value == ""}
            />
            <TextInput
                {...fields.postalcode}
                label="Postal Code"
                variant="underline"
                mask={mask}
                pipe={pipe}
                guide={false}
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
                inline
                label="Contact Type"
                value={fields.contact.value.type}
                onChange={onContactChange("type")}
            />
            <TextInput
                inline
                label="Contact Phone"
                value={fields.contact.value.phone}
                onChange={onContactChange("phone")}
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
