import { Col, Container, Form, Row } from 'react-bootstrap';

type SearchInputs = {
  title?: string;
  status?: string;
};

interface TaskSearchProps {
  title: string;
  status: string;
  onSearch: ({ title, status }: SearchInputs) => void;
}

const TaskSearch = ({
  title,
  status,
  onSearch,
}: TaskSearchProps): JSX.Element => {
  return (
    <>
      <Container
        data-bs-theme="dark"
        className="mb-2"
        style={{ width: '100%' }}
      >
        <Row>
          <Form.Group as={Col} controlId="title">
            {/* <Form.Label>Title</Form.Label> */}
            <Form.Control
              value={title}
              onChange={(event) => onSearch({ title: event.target.value })}
              placeholder="Search By title"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="status">
            {/* <Form.Label>Status</Form.Label> */}
            <Form.Select
              value={status}
              placeholder="Filter by status"
              onChange={(event) => onSearch({ status: event.target.value })}
            >
              <option value="">All Tasks</option>
              <option>Completed</option>
              <option>Uncompleted</option>
            </Form.Select>
          </Form.Group>
        </Row>
      </Container>
    </>
  );
};

export default TaskSearch;
