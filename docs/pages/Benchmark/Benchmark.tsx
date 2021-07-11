import { useForm, RadioGroup, RadioButton } from "nuclui";
import React from "react";

const Benchmark = React.memo(() => {
    const [fields] = useForm({
        fields: {
            gender: {
                initial: "male",
            },
        },
    });

    // eslint-disable-next-line no-console
    console.clear();

    return (
        <form>
            <RadioGroup {...fields.gender} label="Radio Group">
                <RadioButton label="Male" value="male" />
                <RadioButton label="Female" value="female" />
            </RadioGroup>
            Radio buttons
            <RadioButton
                name="gender"
                label="Male solo"
                value="male"
                onChange={fields.gender.onChange}
                checked={fields.gender.value == "male"}
            />
            <RadioButton
                name="gender"
                label="Female solo"
                value="female"
                onChange={fields.gender.onChange}
                checked={fields.gender.value == "female"}
            />
        </form>
    );
});

export default Benchmark;
