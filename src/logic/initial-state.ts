import { RootStore } from './root-store';

// Import initial stores
import { BoardDataInitialStore } from './Board/redux';
import { BoardsListInitialStore } from './Boards/redux';
import { ModalDataInitialStore } from './Modal/redux';


export const initialState: RootStore = {
  boardData: BoardDataInitialStore,
  boardsList: BoardsListInitialStore,
  modalData: ModalDataInitialStore
};
