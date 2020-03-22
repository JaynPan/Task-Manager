import Cookies from 'js-cookie';

import {
  ADD_TASK_ITEM,
  DELETE_TASK_ITEM,
  INIT_LIST_ACTION,
  COMPLETE_TASK_ITEM,
} from './actionTypes';

export const getAddItemAction = (task) => ({
  type: ADD_TASK_ITEM,
  task,
});

export const addItemAction = (description) => (dispatch) => {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
    body: JSON.stringify({ description }),
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    }

    throw new Error('Something went wrong!');
  }).then((data) => {
    const action = getAddItemAction(data);
    dispatch(action);
  }).catch((e) => {
    console.log(e);
  });
};

export const getDeleteItemAction = (id) => ({
  type: DELETE_TASK_ITEM,
  id,
});

export const deleteItem = (id) => (dispatch) => {
  fetch(`/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  }).then((res) => {
    if (res.status === 200) {
      const action = getDeleteItemAction(id);
      dispatch(action);
    }
  });
};

export const getToggleCompleteItem = (task) => ({
  type: COMPLETE_TASK_ITEM,
  task,
});

export const toggleCompleteItem = (id, body) => (dispatch) => {
  fetch(`/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }

    throw new Error('Something went wrong!');
  }).then((data) => {
    const action = getToggleCompleteItem(data);
    dispatch(action);
  }).catch((e) => console.log(e));
};

const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data,
});

export const getTaskList = () => (dispatch) => {
  fetch('/tasks', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return []; // unauthorized, still thinking about how to do
  }).then((data) => {
    const action = initListAction(data);
    dispatch(action);
  });
};
