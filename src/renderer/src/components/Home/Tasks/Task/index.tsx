import { FC, useCallback } from 'react';
import { Task as TaskModel } from "../../../../types";
import classNames from './index.module.scss';
import { getColorOfStatus, getLabelOfStatus } from '../../../../utilities';
import { Button, Typography } from "@mui/material";

export interface TaskProps {
  task: TaskModel;
  onStatusChange: (task: TaskModel) => void;
  onRemove: (task: TaskModel) => void;
}

const Task: FC<TaskProps> = ({
  task,
  onStatusChange,
  onRemove,
}) => {
  const handleStatusChangeClick = useCallback(() => {
    onStatusChange(task);
  }, [task, onStatusChange]);

  const handleRemove = useCallback(() => {
    onRemove(task);
  }, [task, onRemove]);

  return (
    <div className={classNames.task}>
      <div className={`${classNames.task__item} ${classNames.task__item_content}`}>
        {task.text}
      </div>
      <div className={`${classNames.task__item} ${classNames.task__item_actions}`}>
        <Button
          variant="outlined"
          color={getColorOfStatus(task.status)}
          onClick={handleStatusChangeClick}
        >
          {getLabelOfStatus(task.status)}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleRemove}
        >
          <Typography>
            Remove
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Task;