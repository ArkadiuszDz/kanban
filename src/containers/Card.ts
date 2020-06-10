import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Task } from '../logic/Board/store';
import Card from '../components/Card';

// Logic & Store & Selectors & Helpers
import { RootStore } from '../logic/root-store';
import { removeTask, editTask } from '../logic/Board/actions';

export interface CardProps {

}

// Define data type for actions which change store
export interface CardDispatch {
  removeTask: (status: string, id: string) => void;
  editTask: (boardName: string, task: Task) => void;
}

// Select store parts
const mapStateToProps = (state: RootStore) => ({

});

// Dispatch actions which change store
const mapDispatchToProps = (dispatch: ThunkDispatch<RootStore, null, Action>): CardDispatch => ({
  editTask: (boardName: string, task: Task) => dispatch(editTask(boardName, task)),
    // change those below to asynchronous
  removeTask: (status: string, id: string) => dispatch(removeTask(status, id)),
});

export const CardContainer = connect<
  CardProps,
  CardDispatch,
  {},
  RootStore
>(
  mapStateToProps,
  mapDispatchToProps
)(Card);
