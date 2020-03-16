import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Board from '../components/Board';

// Logic & Store & Selectors & Helpers
import { RootStore } from '../logic/root-store';
import { BoardDataStore, CardData } from '../logic/Board/store';
import { getTasksList, addTask, removeTask, changeStatus } from '../logic/Board/actions';
import { getBoardData } from '../logic/Board/selectors';

// Define data typefor container based on store part
export interface BoardProps
  extends Pick<BoardDataStore, 'board'> {}

// Define data type for actions which change store
export interface BoardDispatch {
  getTasksList: (board: BoardDataStore) => void;
  addTask: (task: CardData) => void;
  removeTask: (status: string, id: string) => void;
  changeStatus: (prevStatus: string, nextStatus: string, id: string) => void
}

// Select store parts
const mapStateToProps = (state: RootStore): BoardProps => ({
  board: getBoardData(state),
});

// Dispatch actions which change store
const mapDispatchToProps = (dispatch: Dispatch): BoardDispatch => ({
  getTasksList: (board: BoardDataStore) => dispatch(getTasksList(board)),
  addTask: (task: CardData) => dispatch(addTask(task)),
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
