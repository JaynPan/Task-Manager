import {
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  INIT_LIST_ACTION,
  COMPLETE_TODO_ITEM,
} from './actionTypes';

const defaultState = {
  inputValue: '',
  list: [],
};

// reducer 可以接受state，但是決不能修改state
// reducer中不可以使用異步請求, 不能含有副作用
// reducer 必須為純函數,給定輸入,輸出必為固定值
export default (prevState = defaultState, action) => {
  if (action.type === INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(prevState));

    newState.list = action.data;
    return newState;
  }

  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(prevState));

    newState.list.push(action.task);
    return newState;
  }

  if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(prevState));
    const taskIndex = newState.list.findIndex(({ _id }) => _id === action.id);

    newState.list.splice(taskIndex, 1);
    return newState;
  }

  if (action.type === COMPLETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(prevState));
    const taskIndex = newState.list.findIndex(({ _id }) => _id === action.id);

    newState.list[taskIndex].isCompleted = action.isCompleted;
    return newState;
  }

  return prevState;
};
