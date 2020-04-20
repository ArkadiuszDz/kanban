import { RootStore } from '../root-store';
import { BoardsListStore } from './store';

export const getBoardsList = (state: RootStore): BoardsListStore['boards'] => state.boardsList.boards;