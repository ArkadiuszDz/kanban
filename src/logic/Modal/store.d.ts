import { DeepReadonly } from 'ts-essentials';

interface Task {
  _id: string;
  name: string;
  status: string;
  description: string;
  comments: string[];
}

export interface ModalDataStore
  extends DeepReadonly<{
    taskItem: Task<{}>;
    visible: boolean;
  }> {}
