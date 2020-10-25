import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Root } from "nuclui";
import Home from "./pages/Home/Home";
import Benchmark from "./pages/Benchmark/Benchmark";

ReactDOM.render(
    <Router>
        <Root>
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
        </Root>
    </Router>,
    document.getElementById("root")
);
