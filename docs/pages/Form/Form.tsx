import _ from "lodash";
import {
    Checkbox,
    Container,
    Flex,
    FlexItem,
    TextInput,
    Switch,
    Select,
    SelectOption,
    DatePicker,
    useForm,
    RadioButton,
    CycleSelect,
    Button,
    Slider,
    FileObject,
    FilePicker,
    Card,
    Spacer,
    theme,
} from "nuclui";
import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import styled from "styled-components";

const Form = React.memo(() => {
    const [fields] = useForm({
        fields: {
            text: {
                initial: "",
            },
            select: {
                initial: "male",
            },
            cycle: {
                initial: "beginner",
            },
            date: {
                initial: Date.now(),
            },
            checkbox: {
                initial: false,
            },
            file: {
                initial: [] as FileObject<File>[],
            },
            slider: {
                initial: 50,
            },
            confirm: {
                initial: false,
            },
        },
    });

    const selectOptions = React.useMemo<SelectOption[]>(
        () => [
            {
                label: "Male",
                value: "male",
            },
            {
                label: "Female",
                value: "female",
            },
        ],
        []
    );

    const cycleSelectOptions = React.useMemo(
        () => [
            {
                label: "Beginner",
                value: "beginner",
            },
            {
                label: "Intermediate",
                value: "intermediate",
            },
            {
                label: "Expert",
                value: "expert",
            },
        ],
        []
    );

    return (
        <Container>
            <Spacer />
            <Flex
                direction="column"
                itemGrow={1}
                itemShrink={1}
                itemBasis="0px"
                itemSpacing="none"
            >
                <FlexItem>
                    <Flex
                        itemGrow={1}
                        itemShrink={1}
                        itemBasis="0px"
                        itemSpacing="none"
                    >
                        {_.map(
                            [
                                "main",
                                "surface",
                                "surfaceAlt",
                                "active",
                                "activeAlt",
                            ] as const,
                            (bg) => (
                                <FlexItem key={bg}>
                                    <Flex itemSpacing="none">
                                        <FlexItem grow={0} shrink={1}>
                                            <Square
                                                className={`Square--background-${bg}`}
                                            />
                                        </FlexItem>
                                        <FlexItem>background.{bg}</FlexItem>
                                    </Flex>
                                </FlexItem>
                            )
                        )}
                    </Flex>
                </FlexItem>
                {_.map(
                    [
                        "primary",
                        "secondary",
                        "success",
                        "info",
                        "danger",
                        "warn",
                    ] as const,
                    (context) => (
                        <FlexItem key={context}>
                            <Flex
                                itemGrow={1}
                                itemShrink={1}
                                itemBasis="0px"
                                itemSpacing="none"
                            >
                                {_.map(
                                    [
                                        "",
                                        "Active",
                                        "ActiveAlt",
                                        "Surface",
                                    ] as const,
                                    (shade) => (
                                        <FlexItem key={shade}>
                                            <Flex itemSpacing="none">
                                                <FlexItem grow={0} shrink={1}>
                                                    <Square
                                                        className={`Square--context-${context}${shade}`}
                                                    />
                                                </FlexItem>
                                                <FlexItem>
                                                    context.{context}
                                                    {shade}
                                                </FlexItem>
                                            </Flex>
                                        </FlexItem>
                                    )
                                )}
                            </Flex>
                        </FlexItem>
                    )
                )}
            </Flex>
            <Flex itemBasis={2}>
                {_.map(
                    [
                        "none",
                        "underline",
                        "outline",
                        "filled",
                        "filled-underline",
                        "filled-none",
                    ] as const,
                    (variant) => (
                        <FlexItem key={variant}>
                            <TextInput
                                {...fields.text}
                                variant={variant}
                                label={variant}
                                placeholder="Enter text"
                                prepend="Prepend"
                                fluid
                            />
                        </FlexItem>
                    )
                )}
            </Flex>
            <Flex itemBasis={2}>
                {_.map(
                    [
                        "none",
                        "underline",
                        "outline",
                        "filled",
                        "filled-underline",
                        "filled-none",
                    ] as const,
                    (variant) => (
                        <FlexItem key={variant}>
                            <Select
                                {...fields.select}
                                options={selectOptions}
                                variant={variant}
                                label={variant}
                                placeholder="Enter text"
                                prepend="Prepend"
                                fluid
                            />
                        </FlexItem>
                    )
                )}
            </Flex>
            <Flex itemBasis={2}>
                {_.map(
                    [
                        "none",
                        "underline",
                        "outline",
                        "filled",
                        "filled-underline",
                        "filled-none",
                    ] as const,
                    (variant) => (
                        <FlexItem key={variant}>
                            <CycleSelect
                                {...fields.cycle}
                                options={cycleSelectOptions}
                                variant={variant}
                                label={variant}
                                placeholder="Enter text"
                                prepend="Prepend"
                                fluid
                            />
                        </FlexItem>
                    )
                )}
            </Flex>
            <Flex itemBasis={2}>
                {_.map(
                    [
                        "none",
                        "underline",
                        "outline",
                        "filled",
                        "filled-underline",
                        "filled-none",
                    ] as const,
                    (variant) => (
                        <FlexItem key={variant}>
                            <DatePicker
                                {...fields.date}
                                variant={variant}
                                label={variant}
                                placeholder="Enter text"
                                prepend="Prepend"
                                fluid
                            />
                        </FlexItem>
                    )
                )}
            </Flex>
            <Flex itemBasis={2}>
                {_.map(
                    [
                        "none",
                        "underline",
                        "outline",
                        "filled",
                        "filled-underline",
                        "filled-none",
                    ] as const,
                    (variant) => (
                        <FlexItem key={variant}>
                            <DatePicker
                                {...fields.date}
                                variant={variant}
                                label={variant}
                                placeholder="Enter text"
                                prepend="Prepend"
                                fluid
                            />
                        </FlexItem>
                    )
                )}
            </Flex>
            <Flex itemBasis={2}>
                {_.map(
                    [
                        "none",
                        "underline",
                        "outline",
                        "filled",
                        "filled-underline",
                        "filled-none",
                    ] as const,
                    (variant) => (
                        <FlexItem key={variant}>
                            <FilePicker
                                {...fields.file}
                                size="xs"
                                variant={variant}
                                label={variant}
                                prepend="Prepend"
                                fluid
                            />
                        </FlexItem>
                    )
                )}
            </Flex>
            <Flex itemBasis={2}>
                <FlexItem>
                    <Checkbox {...fields.checkbox} />
                </FlexItem>
                <FlexItem>
                    <Checkbox
                        {...fields.checkbox}
                        value={!fields.checkbox.value}
                        onChange={(v) => fields.checkbox.onChange(!v)}
                    />
                </FlexItem>
                <FlexItem>
                    <Switch {...fields.checkbox} />
                </FlexItem>
                <FlexItem>
                    <Switch
                        {...fields.checkbox}
                        value={!fields.checkbox.value}
                        onChange={(v) => fields.checkbox.onChange(!v)}
                        onChildren="On"
                        offChildren="Off"
                    />
                </FlexItem>
                <FlexItem>
                    <RadioButton
                        checked={fields.checkbox.value}
                        onChange={() =>
                            fields.checkbox.onChange(!fields.checkbox.value)
                        }
                    />
                </FlexItem>
                <FlexItem>
                    <RadioButton
                        checked={!fields.checkbox.value}
                        onChange={() =>
                            fields.checkbox.onChange(!fields.checkbox.value)
                        }
                    />
                </FlexItem>
            </Flex>
            <Slider {...fields.slider} size="md" fluid />
            <Switch {...fields.confirm} label="Confirm" />
            {_.map(["filled", "outline", "empty"] as const, (variant) => (
                <Flex key={variant}>
                    {_.map(
                        [
                            "default",
                            "primary",
                            "secondary",
                            "success",
                            "info",
                            "danger",
                            "warn",
                        ] as const,
                        (color) => (
                            <FlexItem
                                key={color}
                                style={{ textAlign: "center" }}
                            >
                                <Button
                                    variant={variant}
                                    color={color}
                                    icon={<RiAccountCircleFill />}
                                    confirmDuration={
                                        fields.confirm.value ? 1000 : 0
                                    }
                                >
                                    Button
                                </Button>
                            </FlexItem>
                        )
                    )}
                </Flex>
            ))}
            <Card>
                {_.map(
                    ["round", "round-outline", "round-empty"] as const,
                    (variant) => (
                        <Flex key={variant}>
                            {_.map(
                                [
                                    "default",
                                    "primary",
                                    "secondary",
                                    "success",
                                    "info",
                                    "danger",
                                    "warn",
                                ] as const,
                                (color) => (
                                    <FlexItem
                                        key={color}
                                        style={{ textAlign: "center" }}
                                    >
                                        <Button
                                            variant={variant}
                                            color={color}
                                            icon={<RiAccountCircleFill />}
                                            confirmDuration={
                                                fields.confirm.value ? 1000 : 0
                                            }
                                        />
                                    </FlexItem>
                                )
                            )}
                        </Flex>
                    )
                )}
            </Card>
            <Spacer size="xl" />
        </Container>
    );
});

const Square = styled.div`
    ${theme.context.primary}
    ${theme.context.primaryActive}
    ${theme.context.primaryActiveAlt}
    ${theme.context.primarySurface}
    
    ${theme.context.secondary}
    ${theme.context.secondaryActive}
    ${theme.context.secondaryActiveAlt}
    ${theme.context.secondarySurface}
    
    ${theme.context.success}
    ${theme.context.successActive}
    ${theme.context.successActiveAlt}
    ${theme.context.successSurface}
    
    ${theme.context.info}
    ${theme.context.infoSurface}
    ${theme.context.infoActiveAlt}
    ${theme.context.infoActive}
    
    ${theme.context.danger}
    ${theme.context.dangerSurface}
    ${theme.context.dangerActiveAlt}
    ${theme.context.dangerActive}
    
    ${theme.context.warn}
    ${theme.context.warnSurface}
    ${theme.context.warnActiveAlt}
    ${theme.context.warnActive}

    ${theme.background.surface}
    ${theme.border.primary}

    width: 25px;
    height: 25px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    margin-right: 12px;

    &.Square--context-primary {
        background-color: ${theme.context.varPrimary};
    }
    &.Square--context-primaryActive {
        background-color: ${theme.context.varPrimaryActive};
    }
    &.Square--context-primaryActiveAlt {
        background-color: ${theme.context.varPrimaryActiveAlt};
    }
    &.Square--context-primarySurface {
        background-color: ${theme.context.varPrimarySurface};
    }

    &.Square--context-secondary {
        background-color: ${theme.context.varSecondary};
    }
    &.Square--context-secondaryActive {
        background-color: ${theme.context.varSecondaryActive};
    }
    &.Square--context-secondaryActiveAlt {
        background-color: ${theme.context.varSecondaryActiveAlt};
    }
    &.Square--context-secondarySurface {
        background-color: ${theme.context.varSecondarySurface};
    }

    &.Square--context-success {
        background-color: ${theme.context.varSuccess};
    }
    &.Square--context-successActive {
        background-color: ${theme.context.varSuccessActive};
    }
    &.Square--context-successActiveAlt {
        background-color: ${theme.context.varSuccessActiveAlt};
    }
    &.Square--context-successSurface {
        background-color: ${theme.context.varSuccessSurface};
    }

    &.Square--context-info {
        background-color: ${theme.context.varInfo};
    }
    &.Square--context-infoActive {
        background-color: ${theme.context.varInfoActive};
    }
    &.Square--context-infoActiveAlt {
        background-color: ${theme.context.varInfoActiveAlt};
    }
    &.Square--context-infoSurface {
        background-color: ${theme.context.varInfoSurface};
    }

    &.Square--context-danger {
        background-color: ${theme.context.varDanger};
    }
    &.Square--context-dangerActive {
        background-color: ${theme.context.varDangerActive};
    }
    &.Square--context-dangerActiveAlt {
        background-color: ${theme.context.varDangerActiveAlt};
    }
    &.Square--context-dangerSurface {
        background-color: ${theme.context.varDangerSurface};
    }

    &.Square--context-warn {
        background-color: ${theme.context.varWarn};
    }
    &.Square--context-warnActive {
        background-color: ${theme.context.varWarnActive};
    }
    &.Square--context-warnActiveAlt {
        background-color: ${theme.context.varWarnActiveAlt};
    }
    &.Square--context-warnSurface {
        background-color: ${theme.context.varWarnSurface};
    }

    &.Square--background-main {
        ${theme.background.main};
    }
    &.Square--background-surface {
        ${theme.background.surface};
    }
    &.Square--background-surfaceAlt {
        ${theme.background.surfaceAlt};
    }
    &.Square--background-active {
        ${theme.background.active};
    }
    &.Square--background-activeAlt {
        ${theme.background.activeAlt};
    }
`;

export default Form;
