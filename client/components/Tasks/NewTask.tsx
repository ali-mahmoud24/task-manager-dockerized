import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Formik } from 'formik';
import * as yup from 'yup';

interface NewTaskProps {
  show: boolean;
  setShow: (val: boolean) => void;
  onAdd: (values: { title: string }) => void;
}

const NewTask = (props: NewTaskProps) => {
  const { show, setShow, onAdd } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Formik
          onSubmit={onAdd}
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
                  Add Task
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

export default NewTask;

const schema = yup.object({
  title: yup.string().required(),
});

const initialValues = {
  title: '',
};
