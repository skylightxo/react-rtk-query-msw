import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./features/auth/Login";
import { Box, Center, VStack } from "@chakra-ui/react";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Signup } from "./features/auth/Signup";

function Hooray() {
  return (
    <Center h="500px">
      <VStack>
        <Box>Hooray you logged in!</Box>
        <Box>
          
        </Box>
      </VStack>
    </Center>
  );
}

function App() {
  return (
    <Box>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute path="/">
          <Hooray />
        </PrivateRoute>
      </Switch>
    </Box>
  );
}

export default App;
