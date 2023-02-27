import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import { Provider } from "react-redux";
import { AddFiction } from "./pages/AddFiction";
import { store } from "./store/store";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AddFiction />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
