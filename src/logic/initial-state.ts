import { RootStore } from './root-store';

// Import initial stores
import { BoardDataInitialStore } from './Board/redux';

export const initialState: RootStore = {
  boardData: BoardDataInitialStore,
};
