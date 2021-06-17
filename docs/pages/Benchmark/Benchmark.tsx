import { Button } from "nuclui";
import React from "react";

const Benchmark = React.memo(() => {
    const onClick = React.useCallback(() => {
        // eslint-disable-next-line no-alert
        alert("Clicked");
    }, []);
    return (
        <>
            <Button size="xl" onClick={onClick}>
                Click Me!
            </Button>
            <Button size="xl" onClick={onClick} confirmDuration={2000}>
                Confirm Click Me!
            </Button>
            Text
        </>
    );
});

export default Benchmark;
