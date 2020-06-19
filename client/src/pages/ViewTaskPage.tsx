import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { IonContent, IonLoading, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItemGroup, IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { Header } from '../components/Header';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Empty } from '../components';
import { createComment, getTask, findTasks } from '../graphql/generated';
import { commentViewSchema, taskViewSchema } from '../forms/task';
import { AutoForm, TextField } from "uniforms-ionic";

export interface ViewMatchParams {
  id: string
}

export const ViewTaskPage: React.FC<RouteComponentProps<ViewMatchParams>> = ({ history, match }) => {
  const { id } = match.params;

  const [createCommentMutation] = useMutation(
    createComment, { refetchQueries: [{ query: findTasks }] }
  );

  const submit = (model: any) => {
    createCommentMutation({
      variables: { input: { ...model, noteId: id } }
    }).then((comment) => {
      console.log("comment created")
    }).catch((error) => {
      console.log(error)
    })
  }

  const { loading, error, data } = useQuery(getTask, {
    variables: { id },
    fetchPolicy: 'cache-only',
  });

  if (error) return <pre>{JSON.stringify(error)}</pre>;

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  if (data && data.getTask) {
    const task = data.getTask;
    const Text = TextField as any;
    return (
      <>
        <Header title="Task" backHref="/tasks" match={match} />
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
              <AutoForm schema={commentViewSchema} onSubmit={submit} model={{ author: "Starter User" }} />
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
                            <h3>{ comment.author }</h3>
                            <p>{ comment.message }</p>
                          </IonLabel>
                        </IonItem>
                      );
                    })
                  }
                </IonItemGroup>
              </IonList>
            </IonCardContent>
          </IonCard>
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
