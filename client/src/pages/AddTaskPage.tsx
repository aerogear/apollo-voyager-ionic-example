import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonContent, IonToast, IonCard } from '@ionic/react';
import { Header } from '../components/Header';
import { TaskForm } from '../forms/TaskForm';
import { useAddTask } from '../datastore/hooks';


export const AddTaskPage: React.FC<RouteComponentProps> = ({ history, match }) => {

  const [showToast, setShowToast] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { isLoading: loading, error, data, save: createTask } = useAddTask()

  console.log("Saved item", loading, error, data)

  const handleError = (error: any) => {
    if (error.offline) {
      error.watchOfflineChange();
      history.push('/');
      return;
    }
    setErrorMessage(error.message);
    setShowToast(true);
  };

  const submit = (model: any) => {
    createTask({ ...model })
      .then(() => history.push('/'))
      .catch(handleError);
  };

  return (
    <>
      <Header title="Add task" backHref="/tasks" match={match} />
      <IonContent>
        <IonCard>
          <TaskForm handleSubmit={submit} model={{}} />
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
}
