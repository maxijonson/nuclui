import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
} from "react-router-dom";
import {
    Root,
    Theme,
    Container,
    Select,
    SelectOption,
    useForceUpdate,
} from "nuclui";
import styled from "styled-components";
import Home from "./pages/Home/Home";
import Benchmark from "./pages/Benchmark/Benchmark";
import Form from "./pages/Form/Form";
import { breeze, dark } from "./config/themes";
import Data from "./pages/Data/Data";

const App = () => {
    const [activeTheme, setActiveTheme] = React.useState<string>("light");
    const history = useHistory();
    const forceUpdate = useForceUpdate();

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

    const pages = React.useMemo<SelectOption[]>(
        () => [
            {
                value: "/",
                label: "Home",
            },
            {
                value: "/benchmark",
                label: "Benchmark",
            },
            {
                value: "/form",
                label: "Form",
            },
            {
                value: "/data",
                label: "Data",
            },
        ],
        []
    );

    const onThemeChange = React.useCallback((v: string) => {
        setActiveTheme(v);
    }, []);
    const onPageChange = React.useCallback(
        (v: string) => {
            history.push(v);
        },
        [history]
    );

    React.useEffect(() => {
        (window as any).changeTheme = (v: string) => {
            setActiveTheme(v);
        };
    }, []);

    React.useEffect(() => {
        const unsubscribe = history.listen(() => {
            forceUpdate();
        });
        return () => {
            unsubscribe();
        };
    }, [forceUpdate, history]);

    return (
        <Root theme={theme}>
            <AppStyled>
                <Container>
                    <div className="SelectsContainer">
                        <Select
                            className="Select"
                            options={themes}
                            value={activeTheme}
                            onChange={onThemeChange}
                            fluid
                        />
                        <Select
                            className="Select"
                            options={pages}
                            value={history.location.pathname}
                            onChange={onPageChange}
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
                    <Route exact path="/form">
                        <Form />
                    </Route>
                    <Route exact path="/data">
                        <Data />
                    </Route>
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </AppStyled>
        </Root>
    );
};

const AppStyled = styled.div`
    .SelectsContainer {
        display: flex;
        max-width: 90vw;
        padding-top: 12px;
    }

    .Select {
        flex-basis: 140px;
        margin: 0;

        &:not(:last-child) {
            margin-right: 12px;
        }
    }
`;

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);
