import React, { useEffect } from 'react';
import { useFindTasks } from '../datastore/hooks';
import { add } from 'ionicons/icons';
import {
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonFooter,
  IonLoading,
  IonFab,
  IonFabButton,
  IonContent,
} from '@ionic/react';

import { Empty, TaskList, NetworkBadge, OfflineQueueBadge, Header } from '../components';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

export const TaskPage: React.FC<RouteComponentProps> = ({ match }) => {
  const isOnline = true;
  const { isLoading: loading, error, data, subscribeToMore } = useFindTasks();

  useEffect(() => {
    const subscription = subscribeToMore();
    return () => subscription.unsubscribe();
  }, [data, subscribeToMore]);

  if (error && !error) {
    return <pre>{JSON.stringify(error)}</pre>
  };

  if (loading) return <IonLoading
    isOpen={loading}
    message={'Loading...'}
  />;

  const content = (data && data.length > 0)
    ? <TaskList tasks={data} />
    : <Empty message={<p>No tasks available</p>} />;

  return (
    <IonPage>
      <Header title="Manage Tasks" match={match} isOnline={isOnline} />
      <IonContent className="ion-padding" >
        <IonSegment>
          <IonSegmentButton value="all">
            <IonLabel>All Tasks</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {content}
        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ 'marginBottom': '2em', 'marginRight': '1em' }}>
          <Link to="/addTask">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
          </Link>
        </IonFab>
      </IonContent>
      <IonFooter>
        <div>
          <OfflineQueueBadge isOnline={isOnline} />
          <NetworkBadge isOnline={isOnline} />
        </div>
      </IonFooter>
    </IonPage>
  );

};
