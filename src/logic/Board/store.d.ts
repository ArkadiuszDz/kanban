import { DeepReadonly } from 'ts-essentials';


interface NewTask {
  name: string;
  status: string;
  description: string;
}

interface Task extends NewTask {
  _id: string;
}

interface TasksData {
  [status]: Task[];
}

interface Column {
  status: string;
  order?: string;
  _id: string;
}

interface ColumnsData {
  columnItems: Column[]
}

export interface BoardDataStore
  extends DeepReadonly<{
    columns: ColumnsData<{}>;
    tasks: TaskData<{}>;
  }> {}
