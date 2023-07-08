import axios from 'axios';
import Task, { Time } from '../../models/task';

import { useContext, useEffect, useState } from 'react';
import { Button, Card, Container, Stack } from 'react-bootstrap';

import { useStopwatch } from 'react-timer-hook';

import AuthContextType from '../../models/authContext';
import { AuthContext } from '../../context/auth-context';

import { isNumber } from '../../utils/numbers';
import TaskTimer from '../Timer/TaskTimer';

interface TaskDetailProps {
  taskId: string;
}

// const getOffsetTimestamp = (
//   hours: number,
//   minutes: number,
//   seconds: number
// ) => {
//   const offsetDate = new Date();

//   if (isNumber(hours) && isNumber(minutes) && isNumber(seconds)) {
//     offsetDate.setHours(offsetDate.getHours() + hours);
//     offsetDate.setMinutes(offsetDate.getMinutes() + minutes);
//     offsetDate.setSeconds(offsetDate.getSeconds() + seconds);
//   }

//   return offsetDate;
// };

// const Digit = ({ value }: { value: number }) => {
//   const leftDigit = value >= 10 ? value.toString()[0] : '0';
//   const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
//   return (
//     <>
//       <span>{leftDigit}</span>
//       <span>{rightDigit}</span>
//     </>
//   );
// };

const TaskDetail = ({ taskId }: TaskDetailProps) => {
  const [loadedTask, setLoadedTask] = useState<Task>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { token } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const loadedTask = response.data;
          console.log(response.data);
          setLoadedTask(loadedTask);

          console.log(loadedTask);

          // setLoadedTask({
          //   ...loadedTask,
          //   timeSpent: {
          //     hours: loadedTask?.timeSpent?.hours,
          //     minutes: loadedTask?.timeSpent?.minutes,
          //     seconds: loadedTask?.timeSpent?.seconds,
          //   },
          // });

          console.log(loadedTask);

          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchTask();
  }, [taskId, token]);

  const updateTimeSpent = async (timeSpent: Time) => {
    const taskData = { timeSpent };
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // setLoadedTask({
        //   ...loadedTask,
        //   timeSpent: {
        //     hours: timeSpent.hours,
        //     minutes: timeSpent.minutes,
        //     seconds: timeSpent.seconds,
        //   },
        // });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      {!isLoading && (
        <TaskTimer
          title={loadedTask?.title}
          hours={loadedTask?.timeSpent.hours}
          minutes={loadedTask?.timeSpent.minutes}
          seconds={loadedTask?.timeSpent.seconds}
          onSubmit={updateTimeSpent}
        />
      )}
    </>
  );
};

// const TaskTimer = ({ title, hours, minutes, seconds, onSubmit }) => {
//   const {
//     seconds: ss,
//     minutes: mm,
//     hours: hh,
//     days,
//     isRunning,
//     start,
//     pause,
//     reset,
//   } = useStopwatch({
//     offsetTimestamp: getOffsetTimestamp(hours, minutes, seconds),
//   });

//   const submit = () => {
//     pause();
//     const timeElapsed = { hours: hh, minutes: mm, seconds: ss };
//     onSubmit(timeElapsed);
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center">
//       <Card>
//         <Card.Header as="h1" className="text-center">
//           {title}
//         </Card.Header>
//         <Card.Body>
//           {/* <Card.Title>Special title treatment</Card.Title> */}
//           <div>
//             <h2 className="text-center">Time Elapsed</h2>
//             <h2 className="text-center">
//               <Digit value={hh} />:<Digit value={mm} />:<Digit value={ss} />
//             </h2>
//           </div>
//           <Stack className="align-items-center">
//             <div>
//               <Button
//                 className="me-1"
//                 size="lg"
//                 variant="success"
//                 onClick={start}
//                 disabled={isRunning}
//               >
//                 Start
//               </Button>
//               <Button
//                 className="me-1"
//                 size="lg"
//                 variant="secondary"
//                 onClick={pause}
//                 disabled={!isRunning}
//               >
//                 Pause
//               </Button>
//               <Button
//                 className="me-1"
//                 size="lg"
//                 variant="danger"
//                 onClick={submit}
//               >
//                 End
//               </Button>
//             </div>
//           </Stack>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

export default TaskDetail;
