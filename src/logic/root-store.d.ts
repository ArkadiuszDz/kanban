import { DeepReadonly } from 'ts-essentials';

// Import single store
import { BoardDataStore } from './Board/store';

export interface RootStore
  extends DeepReadonly<{
    boardData: BoardDataStore;
  }> {}
