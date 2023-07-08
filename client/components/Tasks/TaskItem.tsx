import axios from 'axios';

import { Accordion, Badge, Button, Stack, Form, Col } from 'react-bootstrap';

import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import UpdateTask from './UpdateTask';
import { AuthContext } from '../../context/auth-context';
import AuthContextType from '../../models/authContext';
import { Time } from '../../models/task';

interface TaskItemProps {
  id: string;
  title: string;
  status: string;
  timeSpent: Time;
  onDelete: (taskId: string) => void;
  onUpdate: (id: string, taskData: { status?: string; title: string }) => void;
}

const TaskItem = (props: TaskItemProps): JSX.Element => {
  const { id, title, status, timeSpent, onUpdate, onDelete } = props;
  const exploreLink = `/tasks/${id}`;

  const statusBg = status === 'Completed' ? 'success' : 'danger';

  const router = useRouter();

  const navigateToTask = () => {
    router.push(exploreLink);
  };

  const [show, setShow] = useState<boolean>(false);

  const showModal = () => {
    setShow(true);
  };

  return (
    <>
      <Accordion.Item eventKey={title}>
        <Accordion.Header>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3>{title}</h3>
            <h4 className="me-2">
              <Badge pill bg={statusBg}>
                {status}
              </Badge>
            </h4>
          </div>
        </Accordion.Header>

        <Accordion.Body>
          <div
            className="mb-2"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div className="mb-3">
              <h2 style={{ display: 'inline' }}>
                Time Spent: {timeSpent.hours}:{timeSpent.minutes}:
                {timeSpent.seconds}
              </h2>
            </div>
            <Form>
              <Form.Group controlId="status">
                <Form.Select
                  onChange={(event) => {
                    if (event.target.value !== '') {
                      onUpdate(id, { status: event.target.value });
                    }
                  }}
                >
                  <option value="">Change Status</option>
                  <option value={'Completed'}>Completed</option>
                  <option value={'Uncompleted'}>Uncompleted</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
          <Stack direction="horizontal">
            <Button variant="primary" onClick={navigateToTask}>
              Start task
            </Button>

            <div className="ms-auto">
              <Button onClick={showModal} className="me-1" variant="secondary">
                Edit
              </Button>
              <Button onClick={() => onDelete(id)} variant="danger">
                Delete
              </Button>
            </div>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>

      <UpdateTask
        show={show}
        setShow={setShow}
        taskId={id}
        task={{ title, timeSpent, _id: id, status }}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default TaskItem;
