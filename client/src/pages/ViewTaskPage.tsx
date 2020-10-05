import React, { useContext, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonContent, IonLoading, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItemGroup, IonItem, IonLabel, IonAvatar, IonToast } from '@ionic/react';
import { Header } from '../components/Header';
import { Empty } from '../components';
import { commentViewSchema, taskViewSchema } from '../forms/task';
import { AutoForm, TextField } from "uniforms-ionic";
import { AuthContext } from '../AuthContext';
import { useAddComment, useFindComments, useFindTasks } from '../datastore/hooks';

export interface ViewMatchParams {
  id: string
}

export const ViewTaskPage: React.FC<RouteComponentProps<ViewMatchParams>> = ({ history, match }) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const offline = false;
  const { id } = match.params;
  const { profile } = useContext(AuthContext);
  const { save: createComment } = useAddComment();
  const userName = profile?.username || "Anonymous User";

  const submit = (model: any) => {
    if (offline) {
      setShowToast(offline)
    } else {
      createComment({
        ...model, noteId: id
      }).then(() => {
        console.log("comment created")
      }).catch((error) => {
        console.log(error)
      })
    }

  }

  const { error: errorTasks, data,
    subscribeToMore: subscribeToTasks } = useFindTasks(id);
  //useFindComments({ noteId: id });
  const { error: errorComments, data: dataComments,
    subscribeToMore: subscribeToComments } = useFindComments();
  console.log(dataComments);

  //useEffect(() => {
  //const tasksSub = subscribeToTasks();
  //return () => {
  //tasksSub.unsubscribe()
  // }
  //}, [data, subscribeToTasks]);

  // useEffect(() => {
  //   const tasksSub = subscribeToTasks();
  //   const commentSub = subscribeToComments();
  //   return () => {
  //     tasksSub.unsubscribe()
  //     commentSub.unsubscribe();
  //   }
  // }, [dataComments, data, subscribeToTasks, subscribeToComments]);

  // if (errorTasks && errorComments) return (
  //   <pre>{JSON.stringify(errorTasks)}
  //     {JSON.stringify(errorComments)}</pre>);

  if (data) {
    const task = data;
    const Text = TextField as any;
    return (
      <>
        <Header title="Create Task" backHref="/tasks" match={match} />
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Current Task</IonCardTitle>
            </IonCardHeader>
            <AutoForm schema={taskViewSchema} model={task} >
              <Text name="title" readonly />
              <Text name="description" readonly />
            </AutoForm>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Create comment</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <AutoForm schema={commentViewSchema} onSubmit={submit} model={{ author: userName }} disabled={offline} />
            </IonCardContent>
            <IonCardHeader>
              <IonCardTitle>Comments</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItemGroup>
                  {
                    task.comments && task.comments.map((comment: any, key: number) => {
                      return (
                        <IonItem key={key} style={{ padding: '1em 0' }}>
                          <IonAvatar slot="start">
                            <img src="assets/icon/avatar.svg" alt="" />
                          </IonAvatar>
                          <IonLabel>
                            <h3>{comment.author}</h3>
                            <p>{comment.message}</p>
                          </IonLabel>
                        </IonItem>
                      );
                    })
                  }
                </IonItemGroup>
              </IonList>
            </IonCardContent>
          </IonCard>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Cannot add comment when offline"
            position="bottom"
            color="danger"
            duration={4000}
          />
        </IonContent>
      </>
    )
  }
  return (
    <>
      <Header title="task" backHref="/tasks" match={match} />
      <Empty message={<p>No task found</p>} />
    </>
  );
}
