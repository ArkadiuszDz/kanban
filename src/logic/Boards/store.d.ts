import { DeepReadonly } from 'ts-essentials';


interface BoardElement {
  name: string;
}

export interface BoardsListStore
  extends DeepReadonly<{
    boards: BoardElement[];
  }> {}
