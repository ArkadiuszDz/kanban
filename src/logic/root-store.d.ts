import { DeepReadonly } from 'ts-essentials';

// Import single store
import { BoardDataStore } from './Board/store';
import { BoardsListStore } from './Boards/store';

export interface RootStore
  extends DeepReadonly<{
    boardData: BoardDataStore;
    boardsList: BoardsListStore;
  }> {}
