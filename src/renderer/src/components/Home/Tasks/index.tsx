import { FC } from "react";
import classNames from './index.module.scss';
import { Task as TaskModel } from "../../../types";
import Task from "./Task";

export interface TasksProps {
  tasks: TaskModel[];
  onTaskStatusChange: (selectedTask: TaskModel) => void;
  onTaskRemove: (selectedTask: TaskModel) => void;
}

const Tasks: FC<TasksProps> = ({
  tasks,
  onTaskStatusChange,
  onTaskRemove,
}) => {
  return (
    <div className={classNames.tasks}>
      {tasks.map(task => (
        <div key={task.id} className={classNames.tasks__item}>
          <Task
            task={task}
            onStatusChange={onTaskStatusChange} 
            onRemove={onTaskRemove} 
          />
        </div>
      ))}
    </div>
  );
};

export default Tasks;