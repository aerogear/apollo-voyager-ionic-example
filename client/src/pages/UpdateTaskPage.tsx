import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonContent,
  IonLoading,
  IonToast,
  IonCard,
} from '@ionic/react';

import { Header } from '../components/Header';
import { Empty } from '../components/Empty';
import { TaskForm } from '../forms/TaskForm';
import { useFindTasks } from '../datastore/hooks';

export interface IUpdateMatchParams {
  id: string
}

export const UpdateTaskPage: React.FC<RouteComponentProps<IUpdateMatchParams>> = ({ history, match }) => {
  const { id } = match.params;
  const [showToast, setShowToast] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { isLoading: loading, error, data, subscribeToMore } = useFindTasks(id);
  console.log(data);
  useEffect(() => {
    const subscription = subscribeToMore();
    return () => subscription.unsubscribe();
  }, [data, subscribeToMore]);

  // const [updateTaskMutation] = useOfflineMutation(
  //   updateTask, mutationOptions.updateTask,
  // );

  const handleError = (error: any) => {
    if (error.offline) {
      error.watchOfflineChange();
      history.push('/');
      return;
    }
    console.log(error);
    setErrorMessage(error.message);
    setShowToast(true);
  }

  const submit = (model: any) => {
    const { __typename, comments, createdAt, ...input } = model;
    // updateTaskMutation({
    //   variables: { input }
    // })
    //   .then(() => history.push('/'))
    //   .catch(handleError);
  }

  if (error) return <pre>{JSON.stringify(error)}</pre>;

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  if (data && data.getTask) {
    const task = data.getTask;
    return (
      <>
        <Header title="Update task" backHref="/tasks" match={match} />
        <IonContent>
          <IonCard>
            <TaskForm handleSubmit={submit} model={task} />
          </IonCard>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={errorMessage}
            position="top"
            color="danger"
            duration={2000}
          />
        </IonContent>
      </>
    )
  };

  return (
    <>
      <Header title="Update task" backHref="/tasks" match={match} />
      <Empty message={<p>No task found</p>} />
    </>
  );

}
