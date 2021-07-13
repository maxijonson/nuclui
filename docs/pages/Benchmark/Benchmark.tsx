import { Checkbox, Container } from "nuclui";
import React from "react";

const Benchmark = React.memo(() => {
    const [value, setValue] = React.useState(false);
    const [controlled, setControlled] = React.useState(true);
    const ref = React.useRef<HTMLInputElement>(null);

    const onChange = React.useCallback((v: boolean) => {
        setValue(v);
    }, []);

    React.useEffect(() => {
        setInterval(() => {
            setControlled((v) => !v);
        }, 5000);
    }, []);

    return (
        <Container>
            <form>
                <Checkbox
                    value={value}
                    onChange={onChange}
                    label="Controlled"
                />
                <Checkbox
                    readOnly
                    value={value}
                    onChange={onChange}
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
                            ref.current?.checked
                        )
                    }
                    ref={ref}
                />
                <Checkbox label="value only" value />
                <Checkbox
                    value={controlled ? value : undefined}
                    onChange={controlled ? onChange : undefined}
                    label={
                        controlled
                            ? "Interval (Controlled)"
                            : "Interval (Uncontrolled)"
                    }
                />
            </form>
        </Container>
    );
});

export default Benchmark;
