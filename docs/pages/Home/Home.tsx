import React from "react";
import { Container, Flex } from "nuclui";

const Home = () => (
    <Container maxWidth="lg">
        Nuclui is under developement! For now, The docs website is only a
        sandbox for developing the components. Docs will be gradually created
        once the core components are made!
        <Flex>
            <div style={{ background: "red", margin: "0 10px" }}>Item</div>
            <div style={{ background: "red", margin: "0 10px" }}>Item</div>
            <div style={{ background: "red", margin: "0 10px" }}>Item</div>
            <div style={{ background: "red", margin: "0 10px" }}>Item</div>
        </Flex>
    </Container>
);

Home.displayName = "Home";

export default Home;
