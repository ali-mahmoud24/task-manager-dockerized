import axios from 'axios';

import TaskDetail from '../../components/Tasks/TaskDetail';
import { GetServerSideProps } from 'next';
import Task from '../../models/task';

import { useRouter } from 'next/router';

interface TaskDetailPageProps {
  task: Task;
}

const TaskDetailPage = (props: TaskDetailPageProps) => {
  const { task } = props;

  const router = useRouter();

  const { taskId } = router.query;

  return (
    <>
      <TaskDetail taskId={taskId} />
    </>
  );
};

export default TaskDetailPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { taskId } = context.params!;

//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`
//   );

//   const task = response.data;

//   if (!task) {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       task,
//     },
//   };
// };
