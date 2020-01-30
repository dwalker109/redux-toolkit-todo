import React, { useState } from "react";
import { connect } from "react-redux";
import { toDoAdd, toDoToggle } from "./toDoSlice";
import { filters, filterSet } from "./filterSlice";
import { createSelector } from "@reduxjs/toolkit";

const ToDoList = ({
  todos,
  dispatchToDoAdd,
  dispatchToDoToggle,
  dispatchFilterSet
}) => (
  <>
    <h1>ToDos</h1>
    <ul>
      {todos.map(item => (
        <ToDoItem
          key={item.id}
          {...item}
          dispatchToDoToggle={dispatchToDoToggle}
        />
      ))}
    </ul>
    <AddToDo dispatchToDoAdd={dispatchToDoAdd} />
    <Filter dispatchFilterSet={dispatchFilterSet} />
  </>
);

const ToDoItem = ({ id, title, done, dispatchToDoToggle }) => (
  <li>
    {title} - {done ? "done" : "not done"}
    <button onClick={e => dispatchToDoToggle(id)}>Toggle</button>
  </li>
);

const AddToDo = ({ dispatchToDoAdd }) => {
  const [newText, setNewText] = useState("");
  const submitForm = e => {
    e.preventDefault();
    dispatchToDoAdd(newText);
    setNewText("");
  };

  return (
    <form onSubmit={submitForm}>
      <input value={newText} onChange={e => setNewText(e.target.value)}></input>
      <input type="submit" />
    </form>
  );
};

const selectTodos = state => state.todos;
const selectFilter = state => state.filter;
const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    return {
      [filters.ALL]: () => todos,
      [filters.DONE]: () => todos.filter(todo => todo.done),
      [filters.REMAINING]: () => todos.filter(todo => !todo.done)
    }[filter]();
  }
);

const Filter = ({ dispatchFilterSet }) =>
  Object.values(filters).map(filter => (
    <button onClick={e => dispatchFilterSet(filter)}>{filter}</button>
  ));

const mapStateToProps = state => ({ todos: selectFilteredTodos(state) });
const mapDispatchToProps = {
  dispatchToDoAdd: toDoAdd,
  dispatchToDoToggle: toDoToggle,
  dispatchFilterSet: filterSet
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
