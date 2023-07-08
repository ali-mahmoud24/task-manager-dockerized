import { Button, Card, Container, Stack } from 'react-bootstrap';

import { useStopwatch } from 'react-timer-hook';

import { isNumber } from '../../utils/numbers';
import Digit from './Digit';

import Task, { Time } from '../../models/task';

import { useRouter } from 'next/router';

const getOffsetTimestamp = (
  hours: number,
  minutes: number,
  seconds: number
) => {
  const offsetDate = new Date();

  if (isNumber(hours) && isNumber(minutes) && isNumber(seconds)) {
    offsetDate.setHours(offsetDate.getHours() + hours);
    offsetDate.setMinutes(offsetDate.getMinutes() + minutes);
    offsetDate.setSeconds(offsetDate.getSeconds() + seconds);
  }

  return offsetDate;
};

interface TaskTimerProps {
  title: string;
  hours: number;
  minutes: number;
  seconds: number;
  onSubmit: (timeSpent: Time) => void;
}

const TaskTimer = ({
  hours,
  minutes,
  seconds,
  title,
  //   task,
  onSubmit,
}: TaskTimerProps) => {
  //   console.log(task);
  //   const { title, timeSpent } = task;

  const {
    seconds: ss,
    minutes: mm,
    hours: hh,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({
    // offsetTimestamp: getOffsetTimestamp(hours, minutes, seconds),
    offsetTimestamp: getOffsetTimestamp(hours, minutes, seconds),
  });

  const router = useRouter();

  const submitTimeSpentHandler = () => {
    pause();
    const timeSpent: Time = { hours: hh, minutes: mm, seconds: ss };
    onSubmit(timeSpent);

    router.push('/tasks');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card>
        <Card.Header as="h1" className="text-center">
          {title}
        </Card.Header>
        <Card.Body>
          {/* <Card.Title>Special title treatment</Card.Title> */}
          <div>
            <h2 className="text-center">Time Elapsed</h2>
            <h2 className="text-center">
              <Digit value={hh} />:<Digit value={mm} />:<Digit value={ss} />
            </h2>
          </div>
          <Stack className="align-items-center">
            <div>
              <Button
                className="me-1"
                size="lg"
                variant="success"
                onClick={start}
                disabled={isRunning}
              >
                Start
              </Button>
              <Button
                className="me-1"
                size="lg"
                variant="secondary"
                onClick={pause}
                disabled={!isRunning}
              >
                Pause
              </Button>
              <Button
                className="me-1"
                size="lg"
                variant="danger"
                onClick={submitTimeSpentHandler}
              >
                End
              </Button>
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskTimer;
