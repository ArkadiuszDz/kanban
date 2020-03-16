import { RootStore } from '../root-store';
import { BoardDataStore } from './store';

export const getBoardData = (state: RootStore): BoardDataStore['board'] => state.boardData.board;