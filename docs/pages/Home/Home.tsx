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
    Checkbox,
    useForm,
    Select,
    Switch,
    DatePicker,
    CycleSelect,
    RadioGroup,
    RadioButton,
    Button,
    Slider,
    Textarea,
    FilePicker,
    FileObject,
} from "nuclui";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

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
            contact: {
                initial: { type: "", phone: "" },
            },
            age: {
                initial: 50,
                validate: (v) => {
                    if (v == null) return ["Field cannot be empty"];
                    if (v < 18) return ["Must be over 18"];
                },
            },
            range: {
                initial: [75, 25] as [number, number],
            },
            toc: {
                initial: true,
                validate: (v) => {
                    if (!v) return ["Must be checked"];
                },
            },
            subscribe: {
                initial: false,
            },
            gender: {
                initial: "male",
            },
            dateTime: {
                initial: Date.now(),
            },
            dateTime2: {
                initial: undefined as number | undefined,
            },
            date: {
                initial: Date.now(),
            },
            date2: {
                initial: undefined as number | undefined,
            },
            time: {
                initial: Date.now(),
            },
            time2: {
                initial: undefined as number | undefined,
            },
            experience: {
                initial: "beginner",
            },
            description: {
                initial: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
            },
            file: {
                initial: [] as FileObject<File>[],
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

    const genderOptions = React.useMemo(
        () => [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Alien", value: "alien", disabled: true },
        ],
        []
    );

    const genderOptions2 = React.useMemo(
        () => [
            ...genderOptions,
            { label: "Other1", value: "other1" },
            { label: "Other2", value: "other2" },
            { label: "Other3", value: "other3" },
            { label: "Other4", value: "other4" },
            { label: "Other5", value: "other5" },
            { label: "Other6", value: "other6" },
            { label: "Other7", value: "other7" },
            { label: "Other8", value: "other8" },
            { label: "Other9", value: "other9" },
            { label: "Other10", value: "other10" },
        ],
        [genderOptions]
    );

    const expOptions = React.useMemo(
        () => [
            { label: "Beginner", value: "beginner" },
            { label: "Advanced", value: "advanced" },
            { label: "Expert", value: "expert" },
        ],
        []
    );

    const renderOption = React.useCallback<
        Required<React.ComponentProps<typeof Select>>["renderOption"]
    >((option, i) => {
        return <b>{`${i + 1}. ${option.label}`}</b>;
    }, []);

    const onCreate = React.useCallback((value: string) => {
        if (value == "false") return false;
        if (value == "custom") return { value: "custom", label: "Custom" };
    }, []);

    return (
        <form autoComplete="off" onSubmit={onSubmit}>
            <Select
                creatable
                options={[
                    { value: "1", label: "One" },
                    { value: "2", label: "Two" },
                    { value: "3", label: "Three" },
                    { value: "4", label: "Four" },
                    { value: "5", label: "Five" },
                    { value: "6", label: "Six" },
                    { value: "7", label: "Seven" },
                    { value: "8", label: "Eight" },
                    { value: "9", label: "Nine" },
                    { value: "10", label: "Ten" },
                ]}
            />
            <RadioGroup
                {...fields.gender}
                label="Gender"
                errors={["There is an error"]}
            >
                {_.map(genderOptions, (option) => (
                    <RadioButton
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        disabled={option.disabled}
                    />
                ))}
            </RadioGroup>
            {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size, key) => (
                <FilePicker
                    {...fields.file}
                    accept={["image/*"]}
                    onError={(code) => console.error(code)}
                    size={size}
                    key={key}
                    label={`FilePicker (${size})`}
                />
            ))}
            {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size, key) => (
                <Textarea
                    {...fields.description}
                    resizeable
                    maxRows={6}
                    size={size}
                    key={key}
                    label={`Textarea (${size})`}
                />
            ))}
            {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size, key) => (
                <Textarea
                    {...fields.description}
                    maxRows={6}
                    size={size}
                    key={key}
                    label={`Textarea (${size})`}
                    prepend="Textarea"
                    append="Textarea"
                />
            ))}
            {fields.range.value[0]}, {fields.range.value[1]}
            {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size, key) => (
                <Slider
                    {...fields.range}
                    size={size}
                    key={key}
                    label={`Range (${size})`}
                    step={1}
                    min={5}
                    max={100}
                />
            ))}
            <NumberInput {...fields.age} label="Age" />
            {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size, key) => (
                <Slider
                    {...fields.age}
                    size={size}
                    key={key}
                    label={`Age Slider (${size})`}
                    step={5}
                    min={5}
                    max={100}
                />
            ))}
            {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size, key) => (
                <TextInput
                    {...fields.first}
                    size={size}
                    key={key}
                    label={`First name (${size})`}
                />
            ))}
            Confirm Buttons
            <Flex>
                <FlexItem basis={12}>
                    <Button
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="xs"
                        disableFullAnimation
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="sm"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="md"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="lg"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="xl"
                        icon={<RiAccountCircleFill />}
                    />
                </FlexItem>
                <FlexItem basis={12}>
                    <Button
                        variant="outline"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="xs"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        variant="outline"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="sm"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        variant="outline"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="md"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        variant="outline"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="lg"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        variant="outline"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="xl"
                        icon={<RiAccountCircleFill />}
                    />
                </FlexItem>
                <FlexItem basis={12}>
                    <Button
                        variant="empty"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="xs"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        variant="empty"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="sm"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        variant="empty"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="md"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        variant="empty"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="lg"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        variant="empty"
                        children="Button"
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="xl"
                        icon={<RiAccountCircleFill />}
                    />
                </FlexItem>
                <FlexItem>
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        variant="round"
                        size="xs"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        variant="round"
                        size="sm"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        variant="round"
                        size="md"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        variant="round"
                        size="lg"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        variant="round"
                        size="xl"
                        icon={<RiAccountCircleFill />}
                    />
                </FlexItem>
                <FlexItem>
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="xs"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="sm"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="md"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="lg"
                        icon={<RiAccountCircleFill />}
                    />
                    <Button
                        onClick={() => console.info("Confirmed click!")}
                        confirmDuration={1000}
                        size="xl"
                        icon={<RiAccountCircleFill />}
                    />
                </FlexItem>
            </Flex>
            Button sizes
            <Flex itemBasis={12}>
                <FlexItem>
                    {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size) => (
                        <Button
                            size={size}
                            onClick={() => console.info("Confirmed click!")}
                            color="primary"
                            children={`Button ${size}`}
                            key={size}
                        />
                    ))}
                </FlexItem>
                <FlexItem>
                    {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size) => (
                        <Button
                            size={size}
                            onClick={() => console.info("Confirmed click!")}
                            color="primary"
                            icon={<RiAccountCircleFill />}
                            key={size}
                        />
                    ))}
                </FlexItem>
                <FlexItem>
                    {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size) => (
                        <Button
                            size={size}
                            onClick={() => console.info("Confirmed click!")}
                            color="primary"
                            icon={<RiAccountCircleFill />}
                            key={size}
                            variant="round"
                        />
                    ))}
                </FlexItem>
                <FlexItem>
                    {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size) => (
                        <Button
                            size={size}
                            onClick={() => console.info("Confirmed click!")}
                            color="primary"
                            children={`Button ${size}`}
                            icon={<RiAccountCircleFill />}
                            key={size}
                        />
                    ))}
                </FlexItem>
                <FlexItem>
                    {_.map(["xs", "sm", "md", "lg", "xl"] as const, (size) => (
                        <Button
                            size={size}
                            onClick={() => console.info("Confirmed click!")}
                            color="primary"
                            children={`Button ${size}`}
                            icon={<RiAccountCircleFill />}
                            iconPosition="right"
                            key={size}
                        />
                    ))}
                </FlexItem>
            </Flex>
            Disabled
            <Flex>
                {_.map(
                    [
                        "default",
                        "primary",
                        "secondary",
                        "warn",
                        "danger",
                        "success",
                        "info",
                    ] as (Nui.Context | "default")[],
                    (color) => (
                        <FlexItem key={color}>
                            <Button
                                color={color}
                                icon={<RiAccountCircleFill />}
                                children={_.capitalize(color)}
                                onClick={() => console.info("Clicked!")}
                                disabled
                            />
                        </FlexItem>
                    )
                )}
            </Flex>
            With icon
            <Flex>
                {_.map(
                    [
                        "default",
                        "primary",
                        "secondary",
                        "warn",
                        "danger",
                        "success",
                        "info",
                    ] as (Nui.Context | "default")[],
                    (color) => (
                        <FlexItem key={color}>
                            <Button
                                color={color}
                                icon={<RiAccountCircleFill />}
                                children={_.capitalize(color)}
                                onClick={() => console.info("Clicked!")}
                            />
                        </FlexItem>
                    )
                )}
            </Flex>
            {_.map(["filled", "outline", "empty"] as const, (variant) => (
                <div key={variant}>
                    {variant}
                    <Flex>
                        {_.map(
                            [
                                "default",
                                "primary",
                                "secondary",
                                "warn",
                                "danger",
                                "success",
                                "info",
                            ] as (Nui.Context | "default")[],
                            (color) => (
                                <FlexItem key={color}>
                                    <Button
                                        color={color}
                                        variant={variant}
                                        children={_.capitalize(color)}
                                    />
                                </FlexItem>
                            )
                        )}
                    </Flex>
                </div>
            ))}
            {_.map(
                ["round", "round-outline", "round-empty"] as const,
                (variant) => (
                    <div key={variant}>
                        {variant}
                        <Flex>
                            {_.map(
                                [
                                    "default",
                                    "primary",
                                    "secondary",
                                    "warn",
                                    "danger",
                                    "success",
                                    "info",
                                ] as (Nui.Context | "default")[],
                                (color) => (
                                    <FlexItem key={color}>
                                        <Button
                                            color={color}
                                            variant={variant}
                                            icon={<RiAccountCircleFill />}
                                        />
                                    </FlexItem>
                                )
                            )}
                        </Flex>
                    </div>
                )
            )}
            disableShadow
            <Flex>
                {_.map(
                    [
                        "default",
                        "primary",
                        "secondary",
                        "warn",
                        "danger",
                        "success",
                        "info",
                    ] as (Nui.Context | "default")[],
                    (color) => (
                        <FlexItem key={color}>
                            <Button
                                color={color}
                                disableShadow
                                children={_.capitalize(color)}
                            />
                        </FlexItem>
                    )
                )}
            </Flex>
            {_.map(genderOptions, (option) => (
                <RadioButton
                    key={option.value}
                    name="gender2"
                    label={option.label}
                    value={option.value}
                    disabled={option.disabled}
                    onChange={fields.gender.onChange}
                    checked={option.value == fields.gender.value}
                />
            ))}
            <RadioGroup {...fields.gender} label="Gender">
                {_.map(genderOptions, (option) => (
                    <RadioButton
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        disabled={option.disabled}
                    />
                ))}
            </RadioGroup>
            <DatePicker
                {...fields.dateTime}
                label="Date Time"
                type="datetime"
            />
            <DatePicker
                {...fields.dateTime2}
                label="Date Time 2"
                type="datetime"
            />
            <DatePicker {...fields.date} label="Date" />
            <DatePicker {...fields.date2} label="Date 2" />
            <DatePicker {...fields.time} label="Time" type="time" />
            <DatePicker {...fields.time2} label="Time 2" type="time" />
            <CycleSelect
                {...fields.experience}
                options={expOptions}
                label="Experience"
            />
            <CycleSelect {...fields.experience} label="No options" />
            <Flex>
                <FlexItem>
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                        size="xs"
                        prepend="Prepend"
                        append="Append"
                    />
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                        prepend="Prepend"
                        append="Append"
                    />
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                        size="md"
                        prepend="Prepend"
                        append="Append"
                    />
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                        size="lg"
                        prepend="Prepend"
                        append="Append"
                    />
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                        size="xl"
                        prepend="Prepend"
                        append="Append"
                    />
                </FlexItem>
                <FlexItem>
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                        size="xs"
                    />
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                    />
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                        size="md"
                    />
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                        size="lg"
                    />
                    <TextInput
                        {...fields.first}
                        placeholder="Placeholder"
                        label="First Name"
                        size="xl"
                    />
                </FlexItem>
            </Flex>
            <HR />
            <Flex itemBasis={6}>
                <FlexItem>
                    <Switch
                        {...fields.subscribe}
                        size="xs"
                        label="Subscribe to newsletter"
                    />
                    <Switch
                        {...fields.subscribe}
                        size="sm"
                        label="Subscribe to newsletter"
                    />
                    <Switch
                        {...fields.subscribe}
                        size="md"
                        label="Subscribe to newsletter"
                    />
                    <Switch
                        {...fields.subscribe}
                        size="lg"
                        label="Subscribe to newsletter"
                    />
                    <Switch
                        {...fields.subscribe}
                        size="xl"
                        label="Subscribe to newsletter"
                    />
                </FlexItem>
                <FlexItem>
                    <Switch
                        {...fields.subscribe}
                        disabled
                        size="xs"
                        label="Subscribe to newsletter"
                        onChildren="On"
                        offChildren="Off"
                    />
                    <Switch
                        {...fields.subscribe}
                        size="sm"
                        label="Subscribe to newsletter"
                        onChildren="On"
                        offChildren="Off"
                    />
                    <Switch
                        {...fields.subscribe}
                        disabled
                        size="md"
                        label="Subscribe to newsletter"
                        onChildren="On"
                        offChildren="Off"
                    />
                    <Switch
                        {...fields.subscribe}
                        size="lg"
                        label="Subscribe to newsletter"
                        onChildren="On"
                        offChildren="Off"
                    />
                    <Switch
                        {...fields.subscribe}
                        disabled
                        size="xl"
                        label="Subscribe to newsletter"
                        onChildren="On"
                        offChildren="Off"
                    />
                </FlexItem>
                <FlexItem>
                    <Checkbox
                        {...fields.toc}
                        size="xs"
                        label="Agree to Terms and Conditions"
                    />
                    <Checkbox
                        {...fields.toc}
                        size="sm"
                        label="Agree to Terms and Conditions"
                    />
                    <Checkbox
                        {...fields.toc}
                        size="md"
                        label="Agree to Terms and Conditions"
                    />
                    <Checkbox
                        {...fields.toc}
                        size="lg"
                        label="Agree to Terms and Conditions"
                    />
                    <Checkbox
                        {...fields.toc}
                        size="xl"
                        label="Agree to Terms and Conditions"
                    />
                </FlexItem>
                <FlexItem
                    name="group"
                    direction="column"
                    component={RadioGroup}
                >
                    <RadioButton label="Radio 1" size="xs" />
                    <RadioButton label="Radio 2" size="sm" />
                    <RadioButton label="Radio 3" size="md" />
                    <RadioButton label="Radio 4" size="lg" />
                    <RadioButton label="Radio 5" size="xl" />
                </FlexItem>
            </Flex>
            <RadioGroup name="test">
                <Flex justify="spaceEvenly">
                    <RadioButton value="right" label="Default (right)" />
                    <RadioButton value="top" label="Top" labelPosition="top" />
                    <RadioButton
                        value="bottom"
                        label="Bottom"
                        labelPosition="bottom"
                    />
                    <RadioButton
                        value="left"
                        label="Left"
                        labelPosition="left"
                    />
                </Flex>
            </RadioGroup>
            <Flex justify="spaceEvenly">
                <Switch {...fields.toc} label="Default (right)" />
                <Switch {...fields.toc} label="Top" labelPosition="top" />
                <Switch {...fields.toc} label="Bottom" labelPosition="bottom" />
                <Switch {...fields.toc} label="Left" labelPosition="left" />
            </Flex>
            <Flex justify="spaceEvenly">
                <Checkbox {...fields.toc} label="Default (right)" />
                <Checkbox {...fields.toc} label="Top" labelPosition="top" />
                <Checkbox
                    {...fields.toc}
                    label="Bottom"
                    labelPosition="bottom"
                />
                <Checkbox {...fields.toc} label="Left" labelPosition="left" />
            </Flex>
            <Select
                {...fields.gender}
                label="Gender"
                options={genderOptions}
                renderOption={renderOption}
                variant="underline"
                append="Select"
            />
            <Select
                {...fields.gender}
                label="Gender"
                options={genderOptions2}
                creatable
                onCreate={onCreate}
            />
            <NumberInput
                {...fields.age}
                label="Age"
                min={0}
                max={24}
                step={3}
            />
            <TextInput
                {...fields.first}
                placeholder="Placeholder"
                label="First Name"
                append="Append"
                prepend="Prepend"
            />
            <TextInput
                {...fields.middle}
                placeholder="Placeholder"
                label="Middle Name"
                variant="none"
                prepend="Search"
            />
            <TextInput
                {...fields.last}
                placeholder="Placeholder"
                label="Last Name"
                variant="filled"
                prepend="Search"
            />
            <TextInput
                {...fields.email}
                placeholder="Placeholder"
                label="Email"
                variant="filled-none"
                prepend="Search"
            />
            <TextInput
                {...fields.confirm}
                placeholder="Placeholder"
                label="Confirm Email"
                variant="filled-underline"
                disabled={fields.email.value == ""}
                prepend="Search"
            />
            <TextInput
                {...fields.contact}
                label="Contact Phone"
                prepend={Icon}
                value={fields.contact.value.phone}
                onChange={onContactChange("phone")}
            />
            <TextInput
                {...fields.postalcode}
                label="Postal Code"
                variant="underline"
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
            <Link to="/benchmark">Benchmark</Link>
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
