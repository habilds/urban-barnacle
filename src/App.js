import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </Router>
            
        </ChakraProvider>
    );
}

export default App;
