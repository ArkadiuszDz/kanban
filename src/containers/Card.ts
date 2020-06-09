import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import Card from '../components/Card';

// Logic & Store & Selectors & Helpers
import { RootStore } from '../logic/root-store';
import { removeTask, changeStatus } from '../logic/Board/actions';

export interface CardProps {

}

// Define data type for actions which change store
export interface CardDispatch {
  removeTask: (status: string, id: string) => void;
  changeStatus: (prevStatus: string, nextStatus: string, id: string) => void
}

// Select store parts
const mapStateToProps = (state: RootStore) => ({

});

// Dispatch actions which change store
const mapDispatchToProps = (dispatch: ThunkDispatch<RootStore, null, Action>): CardDispatch => ({

  // change those below to asynchronous
  removeTask: (status: string, id: string) => dispatch(removeTask(status, id)),
  changeStatus: (prevStatus: string, nextStatus: string, id: string) => dispatch(changeStatus(prevStatus, nextStatus, id))
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
