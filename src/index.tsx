import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { worker } from "./mocks/browser";

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// Start the mocking conditionally.
if (process.env.NODE_ENV === "development") {
  worker
    .start({ quiet: true })
    .then(() => ReactDOM.render(app, document.getElementById("root")));
} else {
  ReactDOM.render(app, document.getElementById("root"));
}
