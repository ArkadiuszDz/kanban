import { Task, ColumnsData, TasksData } from "./store";
import axios from 'axios';
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { Action } from 'redux';
import { RootStore } from '../root-store';


// Declare - Constants
export const constants = {
  SET_TASKS_LIST: 'SET_TASKS_LIST',
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  CHANGE_STATUS: 'CHANGE_STATUS',
  SET_COLUMNS_LIST: 'SET_COLUMNS_LIST'
};

export const getTasksList = (boardName: string): ThunkAction<void, RootStore, null, Action> => {
  return (dispatch: ThunkDispatch<RootStore, null, Action>) => {
    axios.get(`http://localhost:3001/boards/${boardName}/tasks`)
    .then(res => {
      dispatch(setTasksList(res.data))
    })
    .catch(err => console.log(err))
  }
}

export const getColumnsList = (boardName: string): ThunkAction<void, RootStore, null, Action> => {
  return (dispatch: ThunkDispatch<RootStore, null, Action>) => {
    axios.get(`http://localhost:3001/boards/${boardName}/columns`)
    .then(res => {
      dispatch(setColumnsList(res.data));
      dispatch(getTasksList(boardName));
    })
  }
}

export const setColumnsList = (columns: ColumnsData) => ({
  type: constants.SET_COLUMNS_LIST,
  columns
})

export const setTasksList = (tasks: TasksData) => ({
  type: constants.SET_TASKS_LIST,
  tasks
});

// export const addTask = (task: Task) => ({
//   type: constants.ADD_TASK,
//   task
// });

export const addTask = (boardName: string, task: Task): ThunkAction<void, RootStore, null, Action> => {
  return (dispatch: ThunkDispatch<RootStore, null, Action>) => {
    axios.post(`http://localhost:3001/create-task/${boardName}`,
    {
      task: {
        ...task
      }
    })
    .then(res => {
      dispatch(getTasksList(boardName));
    })
    .catch(err => console.log(err))
  }
}

export const removeTask = (status: string, id: string) => ({
  type: constants.REMOVE_TASK,
  status,
  id
})
// change it to "edit task" action where you can change any property (excluding the name of the task)
export const changeStatus = (prevStatus: string, nextStatus: string, id: string) => ({
  type: constants.CHANGE_STATUS,
  prevStatus,
  nextStatus,
  id
})