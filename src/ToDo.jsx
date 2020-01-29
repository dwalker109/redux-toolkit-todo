import React, { useState } from "react";
import { connect } from "react-redux";
import { toDoAdd, toDoToggle } from "./toDoSlice";

const ToDoList = ({ todos, dispatchToDoAdd, dispatchToDoToggle }) => (
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

const mapStateToProps = state => ({ todos: state.todos });
const mapDispatchToProps = {
  dispatchToDoAdd: toDoAdd,
  dispatchToDoToggle: toDoToggle
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
