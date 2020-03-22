import Cookies from 'js-cookie';

import {
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  CHANGE_INPUT_VALUE,
  INIT_LIST_ACTION,
  COMPLETE_TODO_ITEM,
} from './actionTypes';

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value,
});

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM,
});

export const getDeleteItemAction = (id) => ({
  type: DELETE_TODO_ITEM,
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

export const getToggleCompleteItem = (id, isCompleted) => ({
  type: COMPLETE_TODO_ITEM,
  id,
  isCompleted,
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
      const action = getToggleCompleteItem(id, body.isCompleted);
      dispatch(action);
    }
  });
};

const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data,
});

export const getTodoList = () => (dispatch) => {
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
