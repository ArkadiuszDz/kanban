import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import Modal from '../components/Modal';

// Logic & Store & Selectors & Helpers
import { RootStore } from '../logic/root-store';
import { ModalDataStore, Task } from '../logic/Modal/store';
import { getTaskDetails } from '../logic/Modal/actions';
import { getModalData } from '../logic/Modal/selectors';


// Define data typefor container based on store part
export interface ModalProps
  extends Pick<ModalDataStore, 'taskItem'> {}

// Define data type for actions which change store
export interface ModalDispatch {
  getTaskDetails: (boardName: string, task: Task) => void;
}

// Select store parts
const mapStateToProps = (state: RootStore): ModalProps => ({
  taskItem: getModalData(state),
});

// Dispatch actions which change store
const mapDispatchToProps = (dispatch: ThunkDispatch<RootStore, null, Action>): ModalDispatch => ({
  getTaskDetails: (boardName: string, task: Task) => dispatch(getTaskDetails(boardName, task)),
});

export const ModalContainer = connect<
  ModalProps,
  ModalDispatch,
  {},
  RootStore
>(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
