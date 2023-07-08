import axios from 'axios';
import Task from '../../models/task';

import { useContext, useEffect, useState } from 'react';

import { Container, Row, Button, Col } from 'react-bootstrap';

import NewTask from './NewTask';
import TasksList from './TasksList';

import { AuthContext } from '../../context/auth-context';
import AuthContextType from '../../models/authContext';

const TasksPage = () => {
  const [loadedTasks, setLoadedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token } = useContext(AuthContext) as AuthContextType;

  const addTask = async (values: { title: string }) => {
    const taskData = {
      title: values.title,
    };

    try {
      const addTaskResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShow(false);
      setLoadedTasks((loadedTasks) => [addTaskResponse.data, ...loadedTasks]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTaskHandler = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setLoadedTasks((loadedTasks) =>
          loadedTasks.filter((task) => task._id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskHandler = async (
    id: string,
    taskData: {
      title?: string;
      status?: string;
    }
  ) => {
    const updatedTaskData = { ...taskData };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
        updatedTaskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setLoadedTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task._id === id) {
              const updatedTask = {
                ...task,
                ...taskData,
              };

              return updatedTask;
            }

            return task;
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setIsLoading(false);
          const loadedTasks = response.data;
          setLoadedTasks(loadedTasks);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchTasks();
  }, [token]);

  const [show, setShow] = useState<boolean>(false);

  const showModal = () => {
    setShow(true);
  };

  return (
    <>
      <NewTask show={show} onAdd={addTask} setShow={setShow} />

      <Container
        style={{
          width: '100%',
          borderRadius: '20px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
          padding: '1rem 2rem',
        }}
      >
        <Row className="justify-content-md-center align-items-center">
          <h1 className="text-center">My Tasks</h1>

          <Col
            className="mb-2"
            style={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              style={{ width: '1000%' }}
              variant="primary"
              onClick={showModal}
            >
              Add Task +
            </Button>
          </Col>

          {isLoading ? (
            <p>Loading</p>
          ) : (
            <TasksList
              tasks={loadedTasks}
              onDelete={deleteTaskHandler}
              onUpdate={updateTaskHandler}
              setTasks={setLoadedTasks}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export default TasksPage;
