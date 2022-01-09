import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./features/auth/Login";
import { Box, Center, VStack } from "@chakra-ui/react";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Signup } from "./features/auth/Signup";
import { DataTable } from "./components/DataTable";

function Hooray() {
  return (
    <Center>
      <VStack>
        <Box>Hooray you logged in!</Box>
        <DataTable />
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
        {/* <PrivateRoute path="/"> */}
        <Route exact path="/">
          <Hooray />
          {/* </PrivateRoute> */}
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
