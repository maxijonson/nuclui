import React from "react";
import { Container } from "nuclui";

const Home = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
        <>
            <Container maxWidth="md" ref={ref}>
                Nuclui is under developement! For now, The docs website is only
                a sandbox for developing the components. Docs will be gradually
                created once the core components are made!
            </Container>
        </>
    );
};

Home.displayName = "Home";

export default Home;
