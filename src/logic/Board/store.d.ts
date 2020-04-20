import { DeepReadonly } from 'ts-essentials';

interface Task {
  _id: string;
  name: string;
  status: string;
  description: string;
}

interface TasksData {
  [status]: Task[];
}

interface Column {
  status: string;
  order: string;
}

interface ColumnsData {
  columnItems: Column[]
}

export interface BoardDataStore
  extends DeepReadonly<{
    columns: ColumnsData<{}>;
    tasks: TaskData<{}>;
  }> {}
