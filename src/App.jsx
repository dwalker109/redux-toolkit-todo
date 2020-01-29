import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import ToDoList from "./ToDo";

const store = configureStore({ reducer: rootReducer });

const App = () => (
  <Provider store={store}>
    <ToDoList />
  </Provider>
);
export default App;
