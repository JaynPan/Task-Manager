import React, { useEffect, useState } from 'react';

import {
  deleteItem,
  getTodoList,
  toggleCompleteItem,
} from '../store/actionCreator';
import store from '../store';
import Layout from '../components/layout';
import './tasks.css';

function Task({
  todo, completeTodo, deleteTodo,
}) {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
      className="todo"
    >
      <button type="button" onClick={() => deleteTodo(todo._id)}>Delete</button>
      {todo.description}
      <div>
        <input
          name={todo._id}
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => completeTodo(!todo.isCompleted, todo._id)}
        />
      </div>
    </div>
  );
}

export default function Tasks() {
  const [state, setState] = useState(store.getState());


  const handleStoreChange = () => {
    setState(store.getState());
  };

  store.subscribe(handleStoreChange);

  useEffect(() => {
    const action = getTodoList();
    store.dispatch(action);
  }, []);

  const completeTodo = (isCompleted, id) => {
    const action = toggleCompleteItem(id, { isCompleted });
    store.dispatch(action);
  };

  const deleteTodo = (id) => {
    const action = deleteItem(id);
    store.dispatch(action);
  };

  return (
    <Layout>
      <div className="todo-list">
        {state.list.map((todo) => (
          <Task
            key={todo._id}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </Layout>
  );
}
