import Task from '../../models/task';

import { useMemo, useState } from 'react';

import TaskSearch from './TaskSearch';
import TaskItem from './TaskItem';
import Accordion from 'react-bootstrap/Accordion';

interface TasksListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<any>>;
  onDelete: (id: string) => void;
  onUpdate: (id: string, taskData: { status?: string; title: string }) => void;
}

type SearchInputs = {
  title?: string;
  status?: string;
};

const TasksList = ({ tasks, onDelete, onUpdate }: TasksListProps) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const findTasksHandler = ({ title, status }: SearchInputs) => {
    if (title !== undefined) {
      setTitle(title);
    }

    if (status !== undefined) {
      setStatus(status);
    }
  };

  const filteredTasks = useMemo(
    () =>
      tasks.filter(
        (task: Task) =>
          task.title.toLowerCase().includes(title.toLowerCase()) &&
          (status ? task.status === status : true)
      ),
    [tasks, title, status]
  );

  return (
    <>
      <TaskSearch title={title} status={status} onSearch={findTasksHandler} />
      <Accordion
        data-bs-theme="dark"
        defaultActiveKey="0"
        flush
        style={{ width: '100%' }}
      >
        {filteredTasks.map((task: Task) => (
          <TaskItem
            key={task._id}
            id={task._id}
            title={task.title}
            status={task.status}
            timeSpent={task.timeSpent}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </Accordion>
    </>
  );
};

export default TasksList;
