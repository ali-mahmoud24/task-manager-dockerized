import Head from 'next/head';

import Tasks from '../../components/Tasks/TasksPage';

import { ProtectedRoute } from '../../utils/auth-routes';

const TasksPage = () => {
  return (
    <>
      <Head>
        <title>Task Manager || My Tasks</title>
        <meta
          name="description"
          content="Start tracking and adding tasks now"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Tasks />
    </>
  );
};

export default ProtectedRoute(TasksPage);
