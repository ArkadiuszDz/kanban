import { Task } from "./store";
import axios from 'axios';
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { Action } from 'redux';
import { RootStore } from '../root-store';


// Declare - Constants
export const constants = {
  SET_TASK_DATA: 'SET_TASKS_LIST',
};


export const setTaskData = (boardName: string, task: Task) => ({
  type: constants.SET_TASK_DATA,
  task
});


export const getTaskDetails = (boardName: string, task: Task): ThunkAction<void, RootStore, null, Action> => {
  return (dispatch: ThunkDispatch<RootStore, null, Action>) => {
    axios.get(`http://localhost:3001/update-task/${boardName}/${task._id}`)
    .then(res => {
      dispatch(setTaskData(boardName, task));
    })
    .catch(err => console.log(err))
  }
}