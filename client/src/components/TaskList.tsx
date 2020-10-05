import React, { useState } from 'react';
import { Task } from './Task';
import { IonList, IonToast } from '@ionic/react';
import { ITask } from '../declarations';
import { Empty } from './Empty';


export const TaskList: React.FC<any> = ({ tasks }) => {

  // const [updateTaskMutation] = useOfflineMutation(updateTask, mutationOptions.updateTask);
  // const [deleteTaskMutation] = useOfflineMutation(deleteTask, mutationOptions.deleteTask);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleError = (error: any) => {
    if (error.offline) {
      error.watchOfflineChange();
    }
    if (error.graphQLErrors) {
      console.log(error.graphQLErrors);
      setErrorMessage(error.message);
      setShowToast(true);
    }
  }

  const handleDelete = (task: ITask) => {
    const { comments, __typename, createdAt, ...input } = task as any;
    // deleteTaskMutation({
    //   variables: { input }
    // }).catch(handleError);
  };

  const handleUpdate = (task: ITask) => {
    const { comments, __typename, ...input } = task as any;
    // updateTaskMutation({
    //   variables: { input }
    // })
    //   .catch(handleError);
  }

  if (tasks.length < 1) {
    const message = (<p>You currently have no tasks.</p>);
    return <Empty message={message} />
  };

  return (
    <>
      <IonList>
        {
          tasks.map((task: ITask) => {
            return <Task key={task._id} task={task} updateTask={handleUpdate} deleteTask={handleDelete} />;
          })
        }
      </IonList>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={errorMessage}
        position="top"
        color="danger"
        duration={2000}
      />
    </>
  );

};
