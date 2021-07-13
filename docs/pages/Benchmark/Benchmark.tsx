import { Checkbox, Container, Flex, FlexItem, TextInput } from "nuclui";
import { NumberInput } from "nuclui/components";
import React from "react";

const Benchmark = React.memo(() => {
    const [controlled, setControlled] = React.useState(true);

    const [checkboxValue, setCheckboxValue] = React.useState(false);
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    const onCheckboxChange = React.useCallback((v: boolean) => {
        setCheckboxValue(v);
    }, []);

    const [textInputValue, setTextInputValue] = React.useState("");
    const textInputRef = React.useRef<HTMLInputElement>(null);
    const onTextInputChange = React.useCallback((v: string) => {
        setTextInputValue(v);
    }, []);

    const [numberInputValue, setNumberInputValue] = React.useState(0);
    const numberInputRef = React.useRef<HTMLInputElement>(null);
    const onNumberInputChange = React.useCallback((v: number) => {
        setNumberInputValue(v);
    }, []);

    React.useEffect(() => {
        setInterval(() => {
            setControlled((v) => !v);
        }, 5000);
    }, []);

    return (
        <Container>
            <form>
                <Flex itemBasis={4}>
                    <FlexItem>
                        <Checkbox
                            value={checkboxValue}
                            onChange={onCheckboxChange}
                            label="Controlled"
                        />
                        <Checkbox
                            readOnly
                            value={checkboxValue}
                            onChange={onCheckboxChange}
                            label="Controlled (readOnly)"
                        />
                        <Checkbox label="Uncontrolled" />
                        <Checkbox
                            defaultChecked
                            label="Uncontrolled (defaultChecked)"
                        />
                        <Checkbox
                            label="onChange only"
                            onChange={(v) =>
                                console.info(
                                    "Uncontrolled change",
                                    v,
                                    checkboxRef.current?.checked
                                )
                            }
                            ref={checkboxRef}
                        />
                        <Checkbox label="value only" value />
                        <Checkbox
                            value={controlled ? checkboxValue : undefined}
                            onChange={controlled ? onCheckboxChange : undefined}
                            label={
                                controlled
                                    ? "Interval (Controlled)"
                                    : "Interval (Uncontrolled)"
                            }
                        />
                    </FlexItem>
                    <FlexItem>
                        <TextInput
                            value={textInputValue}
                            onChange={onTextInputChange}
                            label="Controlled"
                        />
                        <TextInput
                            readOnly
                            value={textInputValue}
                            onChange={onTextInputChange}
                            label="Controlled (readOnly)"
                        />
                        <TextInput label="Uncontrolled" />
                        <TextInput
                            defaultValue="Default"
                            label="Uncontrolled (defaultValue)"
                        />
                        <TextInput
                            label="onChange only"
                            onChange={(v) =>
                                console.info(
                                    "Uncontrolled change",
                                    v,
                                    textInputRef.current?.value
                                )
                            }
                            ref={textInputRef}
                        />
                        <TextInput label="value only" value="Value" />
                        <TextInput
                            value={controlled ? textInputValue : undefined}
                            onChange={
                                controlled ? onTextInputChange : undefined
                            }
                            label={
                                controlled
                                    ? "Interval (Controlled)"
                                    : "Interval (Uncontrolled)"
                            }
                        />
                    </FlexItem>
                    <FlexItem>
                        <NumberInput
                            value={numberInputValue}
                            onChange={onNumberInputChange}
                            label="Controlled"
                        />
                        <NumberInput
                            readOnly
                            value={numberInputValue}
                            onChange={onNumberInputChange}
                            label="Controlled (readOnly)"
                        />
                        <NumberInput label="Uncontrolled" />
                        <NumberInput
                            defaultValue={1337}
                            label="Uncontrolled (defaultValue)"
                        />
                        <NumberInput
                            label="onChange only"
                            onChange={(v) =>
                                console.info(
                                    "Uncontrolled change",
                                    v,
                                    numberInputRef.current?.value
                                )
                            }
                            ref={numberInputRef}
                        />
                        <NumberInput label="value only" value={66} />
                        <NumberInput
                            value={controlled ? numberInputValue : undefined}
                            onChange={
                                controlled ? onNumberInputChange : undefined
                            }
                            label={
                                controlled
                                    ? "Interval (Controlled)"
                                    : "Interval (Uncontrolled)"
                            }
                        />
                        <input
                            type="number"
                            onChange={(e) =>
                                console.info(
                                    e.currentTarget.value,
                                    e.currentTarget.valueAsNumber
                                )
                            }
                        />
                    </FlexItem>
                </Flex>
            </form>
        </Container>
    );
});

export default Benchmark;
