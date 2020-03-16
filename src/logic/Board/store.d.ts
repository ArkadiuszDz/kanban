import { DeepReadonly } from 'ts-essentials';

interface CardData {
  id: string;
  name: string;
  status: string;
  description: string;
}

interface StageData {
  [stage]: CardData[];
}

export interface BoardDataStore
  extends DeepReadonly<{
    board: StageData;
  }> {}
