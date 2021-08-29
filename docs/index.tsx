import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Root, Theme, Container, Select, SelectOption } from "nuclui";
import styled from "styled-components";
import Home from "./pages/Home/Home";
import Benchmark from "./pages/Benchmark/Benchmark";
import { breeze, dark } from "./config/themes";

const App = () => {
    const [activeTheme, setActiveTheme] = React.useState<string>("dark");

    const theme = React.useMemo<Theme | undefined>(() => {
        switch (activeTheme) {
            case "dark":
                return dark;
            case "breeze":
                return breeze;
            default:
            case "light":
                return undefined;
        }
    }, [activeTheme]);

    const themes = React.useMemo<SelectOption[]>(
        () => [
            {
                value: "light",
                label: "Light",
            },
            {
                value: "dark",
                label: "Dark",
            },
            {
                value: "breeze",
                label: "Breeze",
            },
        ],
        []
    );

    const onThemeChange = React.useCallback((v: string) => {
        setActiveTheme(v);
    }, []);

    React.useEffect(() => {
        (window as any).changeTheme = (v: string) => {
            setActiveTheme(v);
        };
    }, []);

    return (
        <Router>
            <Root theme={theme}>
                <AppStyled>
                    <Container>
                        <div className="ThemeSelectContainer">
                            <Select
                                className="ThemeSelect"
                                options={themes}
                                value={activeTheme}
                                onChange={onThemeChange}
                                fluid
                            />
                        </div>
                    </Container>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/benchmark">
                            <Benchmark />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </AppStyled>
            </Root>
        </Router>
    );
};

const AppStyled = styled.div`
    .ThemeSelectContainer {
        width: 140px;
        max-width: 90vw;
        padding-top: 12px;
    }

    .ThemeSelect {
        margin: 0;
    }
`;

ReactDOM.render(<App />, document.getElementById("root"));
