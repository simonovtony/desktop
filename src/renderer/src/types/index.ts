import { ReactNode} from 'react';

export interface DefaultProps {
  children?: ReactNode;
}

export type Colors = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

export enum Status {
  New,
  Completed,
}

export interface Task {
  id: string;
  text: string;
  status: Status;
}

export interface TaskForm {
  text: string;
}