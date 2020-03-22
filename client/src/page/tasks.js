import React, { useEffect, useState } from 'react';
import { Checkbox, Button, Input } from 'antd';

import {
  deleteItem,
  getTaskList,
  toggleCompleteItem,
  addItemAction,
} from '../store/actionCreator';
import store from '../store';
import Layout from '../components/layout';
import './tasks.css';

function TaskForm({ addTask }) {
  const [value, setValue] = useState(['']);

  const handleSubmit = () => {
    if (!value) return;

    addTask(value);
    setValue('');
  };

  return (
    <div className="task-form">
      <Input
        placeholder="Add New Task"
        style={{ marginRight: '1em' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={handleSubmit}
      />
      <Button onClick={handleSubmit} type="primary">Save</Button>
    </div>
  );
}


function Task({
  task, completeTask, deleteTask,
}) {
  return (
    <div
      style={{ textDecoration: task.isCompleted ? 'line-through' : '' }}
      className="task"
    >
      <Button type="primary" danger onClick={() => deleteTask(task._id)}>Delete</Button>
      <p className="task-desc">{task.description}</p>
      <div>
        <Checkbox
          name={task._id}
          checked={task.isCompleted}
          onChange={() => completeTask(!task.isCompleted, task._id)}
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
    const action = getTaskList();
    store.dispatch(action);
  }, []);

  const completeTask = (isCompleted, id) => {
    const action = toggleCompleteItem(id, { isCompleted });
    store.dispatch(action);
  };

  const deleteTask = (id) => {
    const action = deleteItem(id);
    store.dispatch(action);
  };

  const addTask = (task) => {
    const action = addItemAction(task);
    store.dispatch(action);
  };

  return (
    <Layout>
      <h3>Task Checklist</h3>
      <div className="task-list">
        <TaskForm addTask={addTask} />
        {state.list.map((task) => (
          <Task
            key={task._id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </Layout>
  );
}
