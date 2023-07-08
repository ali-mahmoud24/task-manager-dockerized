import axios from 'axios';
import * as yup from 'yup';

import { useContext, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Formik } from 'formik';
import { AuthContext } from '../../context/auth-context';
import AuthContextType from '../../models/authContext';
import Task from '../../models/task';

interface UpdateTaskProps {
  show: boolean;
  setShow: (val: boolean) => void;
  taskId: string;
  task: Task;
  onUpdate: (id: string, taskData: { status?: string; title: string }) => void;
}

const UpdateTask = (props: UpdateTaskProps) => {
  const { show, setShow, taskId, task, onUpdate } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token } = useContext(AuthContext) as AuthContextType;

  const handleClose = () => setShow(false);

  const initialValues = {
    title: task.title,
  };

  const handleFormSubmit = async (values: { title: string }) => {
    const taskData = {
      title: values.title,
    };
    try {
      setIsLoading(true);

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onUpdate(taskId, { title: values.title });

      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={schema}
        >
          {({
            isValid,
            isSubmitting,
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Add a new Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className="text-center">Title</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    isValid={touched['title'] && !errors['title']}
                    isInvalid={touched['title'] && errors['title']}
                    feedback={errors['title']}
                  />

                  <Form.Control.Feedback type="invalid">
                    Title cant be empty.
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  disabled={!isValid || isSubmitting}
                  variant="success"
                  type="submit"
                >
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default UpdateTask;

const schema = yup.object({
  title: yup.string().required(),
});
