import React from "react";
import { Container, Flex, FlexItem } from "nuclui";

const Home = () => (
    <Container maxWidth="lg">
        Nuclui is under developement! For now, The docs website is only a
        sandbox for developing the components. Docs will be gradually created
        once the core components are made!
        <Flex>
            <FlexItem style={{ background: "red" }}>Item</FlexItem>
            <FlexItem style={{ background: "red" }}>Item</FlexItem>
            <FlexItem style={{ background: "red" }}>Item</FlexItem>
            <FlexItem style={{ background: "red" }}>Item</FlexItem>
        </Flex>
    </Container>
);

Home.displayName = "Home";

export default Home;
