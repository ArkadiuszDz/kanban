import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import Board from '../components/Board';

// Logic & Store & Selectors & Helpers
import { RootStore } from '../logic/root-store';
import { BoardDataStore, Task } from '../logic/Board/store';
import { getTasksList, getColumnsList, addTask, removeTask, changeStatus } from '../logic/Board/actions';
import { getColumnsData, getTasksData } from '../logic/Board/selectors';

// Define data typefor container based on store part
export interface BoardProps
  extends Pick<BoardDataStore, 'columns' | 'tasks'> {}

// Define data type for actions which change store
export interface BoardDispatch {
  getTasksList: (boardName: string) => void;
  getColumnsList: (boardName: string) => void;
  addTask: (task: Task) => void;
  removeTask: (status: string, id: string) => void;
  changeStatus: (prevStatus: string, nextStatus: string, id: string) => void
}

// Select store parts
const mapStateToProps = (state: RootStore): BoardProps => ({
  columns: getColumnsData(state),
  tasks: getTasksData(state)
});

// Dispatch actions which change store
const mapDispatchToProps = (dispatch: ThunkDispatch<RootStore, null, Action>): BoardDispatch => ({
  getTasksList: (boardName: string) => dispatch(getTasksList(boardName)),
  getColumnsList: (boardName: string) => dispatch(getColumnsList(boardName)),
  // change those below to asynchronous
  addTask: (task: Task) => dispatch(addTask(task)),
  removeTask: (status: string, id: string) => dispatch(removeTask(status, id)),
  changeStatus: (prevStatus: string, nextStatus: string, id: string) => dispatch(changeStatus(prevStatus, nextStatus, id))
});

export const BoardContainer = connect<
  BoardProps,
  BoardDispatch,
  {},
  RootStore
>(
  mapStateToProps,
  mapDispatchToProps
)(Board);
