import { connect } from 'react-redux';
import { Action } from 'redux';

import Boards from '../components/Boards';
import { RootStore } from '../logic/root-store';
import { BoardsListStore } from '../logic/Boards/store';
import { getBoardsList } from '../logic/Boards/selectors';
import { getBoardsData } from '../logic/Boards/actions';
import { ThunkDispatch } from 'redux-thunk';

export interface BoardsProps 
  extends Pick<BoardsListStore, 'boards'> {}

export interface BoardsDispatch {
  getBoards: () => void;
}

const mapStateToProps = (state: RootStore): BoardsProps => {
  return {
    boards: getBoardsList(state)
  }
} 

const mapDispatchToProps = (dispatch: ThunkDispatch<RootStore, null, Action>): BoardsDispatch => {
  return {
    getBoards: () => dispatch(getBoardsData())
  }
}

export const BoardsContainer = connect<
  BoardsProps,
  BoardsDispatch,
  {},
  RootStore
>(
  mapStateToProps,
  mapDispatchToProps
)(Boards);