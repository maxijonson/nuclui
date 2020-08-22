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
    Form,
    TextInput,
    InputGroup,
} from "nuclui";

const Home = React.memo(() => {
    const [inputs, setInputs] = React.useState<string[][]>([
        [Date.now().toString()],
    ]);

    const addInputGroup = React.useCallback(() => {
        setInputs((state) =>
            produce(state, (draft) => {
                draft.push([]);
            })
        );
    }, []);

    const addInput = React.useCallback(
        (index: number) => () => {
            setInputs((state) =>
                produce(state, (draft) => {
                    draft[index].push(Date.now().toString());
                })
            );
        },
        []
    );

    const removeInput = React.useCallback(
        (group: number, index: number) => () => {
            setInputs((state) =>
                produce(state, (draft) => {
                    draft[group].splice(index, 1);
                })
            );
        },
        []
    );

    return (
        <Container maxWidth="lg">
            <div>With Form</div>
            <Form>
                {_.map(inputs, (group, i) => (
                    <div key={i}>
                        <InputGroup name={`group${i + 1}`}>
                            {_.map(group, (input, j) => (
                                <div key={input}>
                                    <TextInput
                                        name={input}
                                        initial={`group ${i} input ${j}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={removeInput(i, j)}
                                        children="Remove"
                                    />
                                </div>
                            ))}
                        </InputGroup>
                        <button
                            type="button"
                            onClick={addInput(i)}
                            children="Add Input"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addInputGroup}
                    children="Add Group"
                />
            </Form>
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
