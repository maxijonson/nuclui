import { TextInput, useForm } from "nuclui";
import React from "react";

const Benchmark = React.memo(() => {
    const [fields] = useForm({
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
        },
    });
    return (
        <>
            A page to benchmark individual components
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
        </>
    );
});

export default Benchmark;
